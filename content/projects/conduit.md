---
title: "Conduit"
year: "2026"
order: 2
summary: "Connecting gaze, speech, hand signs, and EEG inputs into one desktop interface, with a closer look at the services that make them work together."
tech: ["Python", "TypeScript", "Electron", "OpenCV", "FastAPI", "Flask", "PyTorch", "Gemini", "ElevenLabs"]
highlights:
  - "Built speech-to-text and keyboard control, then connected voice and ASL services to the desktop interface."
  - "Added a shared camera broker so gaze tracking and hand-sign recognition could use the same webcam."
  - "Our team combined four input modes and won Second in Healthcare at Hacklytics 2026."
links:
  - label: "Source revision"
    href: "https://github.com/kwaiidev/conduit/tree/55a4904bd5c0ae804c1adadbe641137a7bd15303"
  - label: "Devpost"
    href: "https://devpost.com/software/conduit-y8gqoj"
award: "Healthcare 2nd @ Hacklytics 2026"
images:
  - src: "/projects/conduit/1.jpg"
    alt: "Conduit dashboard with controls for the CV cursor, EEG jaw clench, voice-to-text, sign-to-text, and EEG training."
    width: 806
    height: 523
    focalPoint: "center top"
  - src: "/projects/conduit/2.jpg"
    alt: "Conduit feature overview covering EEG mouse control, computer vision eye tracking, ASL recognition, and voice control."
    width: 806
    height: 537
    caption: "The four input modes presented together."
    focalPoint: "center top"
  - src: "/projects/conduit/3.jpg"
    alt: "Conduit visualizations screen with an EEG heatmap and separate live brain-wave traces for multiple frequency bands."
    width: 806
    height: 453
    focalPoint: "center top"
  - src: "/projects/conduit/4.jpg"
    alt: "Two Conduit developers leaning over a laptop while working together at a table."
    width: 3240
    height: 2160
    focalPoint: "center top"
published: true
featured: true
---

## Building Conduit

We built Conduit at Hacklytics 2026 to give people more ways to control a computer. The idea was to let someone choose between gaze, speech, hand signs, and an EEG headset instead of assuming one input method would work for everyone. Our team won Second in Healthcare. The [Devpost](https://devpost.com/software/conduit-y8gqoj) has the project overview; this write-up follows the services underneath the interface.

A gaze tracker and a speech recognizer have very different jobs. One needs to keep updating a cursor while the other waits for a recording and a network response. Putting both behind the same dashboard doesn't automatically make them work well together. They still need to share hardware, respect pause controls, and turn their outputs into deliberate computer input.

That integration is where much of my work went. I [added speech-to-text and keyboard control](https://github.com/kwaiidev/conduit/commit/36e321b1e7153acc900fce2591fe63c5f65ce20f), [connected ASL to the frontend](https://github.com/kwaiidev/conduit/commit/97feed64d9ccfc5af05d1a6e0e1bae26f003425c), and [added the camera broker](https://github.com/kwaiidev/conduit/commit/8cd81906b5a395530cdbf74adf2d481936d784db). Adrian worked on gaze tracking and runtime integration, Dhruv on EEG processing and visualization, and Elizabeth on the Electron interface and onboarding. The system was a team build.

The implementation below refers to [revision `55a4904`](https://github.com/kwaiidev/conduit/tree/55a4904bd5c0ae804c1adadbe641137a7bd15303). It has several direct control paths as well as structured events, which matters when explaining what actually causes a click or a keystroke.

## Four inputs, different timing

Each modality has its own processing loop. The desktop interface starts, pauses, and displays those services, while the services handle recognition and computer control.

| Input | Processing | Output |
| --- | --- | --- |
| Gaze | Face and iris geometry, calibration, adaptive filtering | Screen target and cursor movement |
| Speech | Audio recording, transcription, text or command interpretation | Typed text or a desktop command |
| Hand signs | Hand preprocessing, model inference, prediction aggregation | Letters and sign events |
| EEG | Filtered signal windows, feature extraction, classification | Gated mouse clicks and live visualizations |

This split lets each input keep its own timing. A speech request can be waiting on a remote service while camera processing continues locally. It also gives us smaller pieces to debug: a working video stream, for example, tells us something different from a working classifier or a working keyboard backend.

## Sharing one webcam

Eye tracking and hand-sign recognition both need the camera. If each service opens the physical device independently, starting the second can interfere with the first. I added a broker that opens the webcam once and exposes an HTTP MJPEG stream for the consumers.

```text
webcam → camera broker → gaze service
                      → ASL service
```

The [broker](https://github.com/kwaiidev/conduit/blob/55a4904bd5c0ae804c1adadbe641137a7bd15303/camera_broker/broker.py) captures a frame, JPEG-encodes it, and distributes the bytes to subscriber queues. Each streaming client gets a queue with room for two frames. Publishing is nonblocking: when a queue fills, the broker drops the incoming frame for that subscriber rather than waiting for it to catch up.

That keeps a slow consumer from holding up capture for everyone else. It doesn't make every consumer see the newest frame immediately; queued frames still have to be read. The tradeoff is bounded buffering plus the cost of JPEG encoding and decoding. For this prototype, that was a practical way to let two separate Python services share one camera.

## From speech to keyboard input

The voice service records audio through a push-to-talk flow. Once recording stops, it encodes the samples as WAV and sends them to ElevenLabs for transcription. Gemini then interprets the transcript as text to type or a command to execute.

The [voice pipeline](https://github.com/kwaiidev/conduit/blob/55a4904bd5c0ae804c1adadbe641137a7bd15303/VoiceTTS/tts.py) handles the two network stages separately. If transcription times out, it emits a no-op. If the Gemini stage times out, it falls back to the raw transcript. Empty results also stop before typing. The service records transcription, interpretation, and total processing times so those delays can be inspected independently.

For ordinary text, the keyboard backend types into the focused application. The service then broadcasts an event containing the text, original transcript, and timing fields. The event describes a result after the local action; it isn't the only route through which the operating system receives input.

Commands were a much rougher hackathon shortcut: this revision executes Python generated by the model. Before extending that mode, I would replace it with a small set of explicit actions and validated arguments. Opening an application or pressing a shortcut should have a predictable interface.

## Turning hand signs into deliberate letters

Recognizing a hand shape once is only part of typing. A camera keeps seeing the same hand across many frames, and a user also needs time to move between signs without every intermediate pose becoming a letter.

The [ASL service](https://github.com/kwaiidev/conduit/blob/55a4904bd5c0ae804c1adadbe641137a7bd15303/ASLCV/Sign-Language-Recognition/app/api.py) uses MediaPipe hand landmarks to prepare a masked image. It runs the model on both the original and mirrored versions, combines their outputs, and collects accepted predictions. At the checked revision, ten accepted predictions form a batch; the most frequent label becomes the output, and the batch is cleared.

A separate typing cooldown suppresses the same letter for 1.5 seconds after it was last typed. That distinction is useful: prediction aggregation decides which letter to accept, while the cooldown limits repeated keyboard input. These values are implementation settings, not a measured accuracy or typing-speed result.

I also added a session gate alongside the modality's active flag. Both must allow inference. That lets the interface pause the overall session without losing the user's per-mode setting, and lets the camera preview stay available while recognition is paused.

## Keeping gaze steady

The gaze work had a different problem: small landmark changes can become visible cursor jitter. The runtime estimates head and iris geometry, converts that into a screen target, filters the target, and clamps it to the monitor bounds. It includes multiple mapping modes and fallbacks, so a single calibration path doesn't describe every configuration. [Gaze runtime](https://github.com/kwaiidev/conduit/blob/55a4904bd5c0ae804c1adadbe641137a7bd15303/eyegaze/eye_tracker_runtime.py).

The [One Euro filter](https://github.com/kwaiidev/conduit/blob/55a4904bd5c0ae804c1adadbe641137a7bd15303/eyegaze/filters.py) adjusts smoothing using the estimated rate of change:

```text
cutoff = min_cutoff + beta × magnitude(filtered_velocity)
```

When the target is moving slowly, the lower cutoff damps small fluctuations. Faster motion raises the cutoff so the output can follow more quickly. A fixed, heavily smoothed cursor would be calmer but could lag behind an intentional movement across the screen. This gives the tracker a way to balance those behaviors.

Calibration still matters. A filter can smooth a target that points to the wrong place just as easily as one that points to the right place.

## EEG windows and click control

The EEG service consumes Muse signal data in 256-sample windows with a stride of 64 samples. At the feature extractor's default 256 Hz rate, that's a one-second window advanced by a quarter second. It bandpass-filters the channels and extracts ten features per channel, including signal statistics, band-power features, and differences between log band powers.

The [runtime](https://github.com/kwaiidev/conduit/blob/55a4904bd5c0ae804c1adadbe641137a7bd15303/muse/realtime_muse.py) puts classifier outputs through a three-result vote buffer, repeated-result checks, a confidence gate, and a cooldown before allowing a click. Its action mapping includes idle, left click, and right click. Those are narrow control outputs; the interface isn't interpreting arbitrary thoughts.

The wave plots and heatmap make the incoming signal visible, but a moving plot alone doesn't establish whether the resulting clicks are reliable. That would need measurements across users and sessions, including how often an unintended click gets through.

## What the integration taught me

The most useful work was often between the models: sharing a camera, preserving session state, separating network waits from local processing, and deciding when a repeated prediction should become another action.

The prototype also leaves a clear next step. Some services act on the desktop directly while also broadcasting events. I would put action execution behind one shared controller, then measure latency, repeated inputs, and unintended actions across combinations of modes. That would make it easier to answer a practical question: when someone pauses Conduit, does every path that can move the mouse or type a character stop with it?
