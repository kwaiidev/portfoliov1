# Conduit and ZPM-TUNA source notes

Research completed September 19, 2026, before drafting the two project bodies. These are source reviews, not hardware or runtime validation.

## Conduit

- Submission: https://devpost.com/software/conduit-y8gqoj
- Reviewed revision: https://github.com/kwaiidev/conduit/tree/55a4904bd5c0ae804c1adadbe641137a7bd15303
- Contribution evidence: Jason's commits `36e321b1` (speech and keyboard), `97feed64` (ASL frontend integration), `f8cadba2` (session state), and `8cd81906` (shared camera broker). Commit metadata and changed-file lists were inspected.
- Implementation sources: `camera_broker/broker.py`, `VoiceTTS/tts.py`, `ASLCV/Sign-Language-Recognition/app/api.py`, `eyegaze/eye_tracker_runtime.py`, `eyegaze/gaze_processing.py`, `eyegaze/filters.py`, `eyegaze/event_bus.py`, and `muse/realtime_muse.py`.
- Updated highlights to describe Jason's evidenced integration work rather than personally attributing the gaze implementation to him.
- Camera queues drop incoming frames when full; they do not guarantee that every consumer immediately sees the newest frame.
- ASL aggregates ten accepted predictions, then clears its batch. The threshold is applied to a raw model output before softmax; the article deliberately does not call the threshold a calibrated probability.
- Voice and ASL can act on the desktop directly as well as publish events. Do not claim that a single fusion controller is the exclusive execution path.
- EEG window duration is calculated from the default sample rate; it is not a measured end-to-end latency. No accuracy, user-study, or latency benchmark is asserted.
- The checked voice command handler executes generated Python. The suggested explicit action interface is future work, not an existing protection.

## ZPM-TUNA

- Submission: https://devpost.com/software/zero-panic-in-movement-zpm
- The browser reader failed for this page; its public HTML was successfully retrieved with curl and inspected, including contribution text, source links, and award.
- Original ROS repository: https://github.com/ZPM-TUNA/zpm-ros/tree/7591419dc83c49aba200f158dfb000023b004c35
- Original app repository: https://github.com/ZPM-TUNA/zpm/tree/e3f5a19345492f44e489e41aa3575339587468b9
- First-person account: `content/articles/khviii-deepdive.md`. Supports hardware ownership, network failure, uncertain vendor-firmware diagnosis, Gazebo-to-Tkinter pivot, and first ROS2 project.
- The separate `kwaiidev/zpm` repository explicitly calls itself version 2. It was inspected for context and excluded from claims about the original implementation.
- Implementation sources: ROS `main/main.ino`, `robot_coordination_service.py`, `ros2_multi_robot_mvp4.py`; app `backend/pathfinding.py`, `backend/main_server.py`, `backend/ai_coordinator.py`, and `frontend/lib/src/services/api_service.dart`.
- The ROS MVP's normal navigation uses hardcoded waypoints. Coordination helpers exist, but the article does not claim that the normal loop invokes them automatically.
- Peer choice uses straight-line distance to the goal. This is not a demonstrated decentralized learning algorithm.
- Flask's four-neighbor A* uses a Euclidean heuristic. The obstacle example is an explanation of source behavior, not a reported test.
- Devpost describes Gemini, ElevenLabs, and YOLOv8. The reviewed `ai_coordinator.py` instead uses templated guidance and disables voice generation. Both are explicitly distinguished.
- The Flutter service contains endpoint calls absent from the reviewed Flask server. No claim of a verified complete deployment is made.
- Updated the summary and highlights to describe a simulation prototype rather than completed physical autonomous drones. Preserved existing photos, aliases, ordering, award, and hackathon-story link.
