# Guido case-study evidence

Audit date: 2026-09-19. Article: `/projects/guido`.

## Source boundary

- Local source repository: `/home/kwaii/guido`, remote `https://github.com/kwaiidev/guido.git`.
- Local `main` / `origin/main`: `f4ffeb961348135ce492677f28294cc86a2b3c6f`.
- Audited late snapshot: `origin/frontier-mapping`, `62f19642095d6897c43d557ce47c0857b2ba7e72`, March 29, 2026. Read from a temporary `git archive`; the source worktree and its pre-existing changes were left untouched.
- Vendored LD19 submodule: `1067ec00afe8b410d3b01a19d69dfa66309331fc`; local submodule HEAD matches that gitlink.
- Reviewed [Michael's article](https://www.michaelml.dev/projects/guido) and [Devpost](https://devpost.com/software/guido-k7f5ei). They support team context and demonstrated capabilities, not quantitative performance claims. Michael's article describes a different, earlier autonomy architecture than the late snapshot.
- Consulted upstream Humble SLAM Toolbox `src/laser_utils.cpp` and `src/slam_toolbox_common.cpp` for parameter semantics; Nav2's Humble DWB and inflation implementation for conceptual descriptions. The exact installed robot package builds are not pinned in the project.

## Inventory and launch reconstruction

| Area | Files inspected / findings |
| --- | --- |
| ROS packages | `guido_base`, `guido_bringup`, `auto_nav`, `guido_navigation`; package manifests, entry points, installed config and launch paths; LD19 submodule packages |
| Base | `guido_base/guido_base/serial_bridge.py`, `keyboard_teleop.py`, `config/serial_bridge.yaml`; signed PWM over serial, ODOM parsing, optional IMU parsing, command watchdog |
| Firmware | `firmware/wheelchair_arduino.ino` and history; encoder interrupts, PWM pins, gyro integration, command-derived encoder sign, 500 ms firmware timeout; hardware pin mapping differs across revisions |
| Robot model | `guido_bringup/urdf/guido.urdf.xml`; fixed joints only, no Xacro or wheel-joint velocity interface; large visual geometry and mount height remain |
| LD19 | Driver component, underlying serial/data processing interfaces, launch files, lifecycle config, udev setup; 455 bins, `ldlidar_link`, `/ldlidar_node/scan`, 230400 baud |
| Live mapping | `auto_nav/launch/slam_teleop.launch.py`, `slam_nav.launch.py`, `navigation.launch.py`, `frontier_mapping.launch.py`; async SLAM, distinct motion routing and EKF selection |
| State estimator | `guido_bringup/config/ekf.yaml`; 2D, 50 Hz target, forward velocity and yaw rate from odometry, yaw rate from optional IMU; frontier launch explicitly enables EKF and disables bridge TF |
| Nav2 | `auto_nav/config/nav2.yaml`, `launch/guido_navigation.launch.py`; NavFn A*, DWB, SimpleSmoother, behaviors, BT navigator, waypoint follower, open-loop velocity smoother, lifecycle manager |
| Costmaps | 5 cm local/global grids; local rolling 4 × 4 m in odom; global in map; static layer globally, obstacle and inflation layers in both; rectangular footprint, no robot-radius setting |
| Commands | `auto_nav/navigation/command_node.py`, `navigation_node.py`, adapters/messages/supervisor/waypoint storage; `/auto_nav/command` → `/auto_nav/request` → `/navigate_to_pose`; result/status return |
| Frontier mode | `frontier_explorer.py`; preview uses ComputePathToPose, execution directly publishes Twist; latest loop does not follow preview path through DWB; initial approval and auto-approval toggle |
| Alternate navigation | All custom navigation configuration, node interfaces, filtering/planning/control logic; `guido_mapping.launch.py` uses custom planner/controller and filtered scan; `guido_autonomy.launch.py` optionally enables map server/AMCL; not combined with the Nav2 graph |
| AMCL | `guido_bringup/config/amcl.yaml`, `nav_lifecycle_mgr.yaml`; enabled only by alternate launch option; map YAML provided as argument; likelihood-field, 250–1500 particles |
| Debug/startup | `START.md`, README, `docs/autonomous_navigation.md`, setup/install scripts, `fake_odom.py`, `auto_nav/bin/verify_nav_motion`, RViz configs, FastRTPS profile, preserved runtime log |
| Voice/frontend | Agent/backend, transcript bridge, speech utility, telemetry bridge, frontend tree and package metadata; treated as team work, not claimed as Jason's individual implementation |
| Tests | Existing auto_nav and scan-filter test suites inspected as code evidence, not hardware benchmark data; no robot code modified or physical tests performed for this portfolio task |

## Attribution

Commit names alone were not treated as authorship proof. In particular, `5f62023` (“initial SLAM”) only adds a gitlink. `f4ffeb9` restores substantial teammate-authored navigation code after a revert; it is not evidence Jason originally authored all those files.

| Commit | Author | Evidence used |
| --- | --- | --- |
| `6c74fd5` | Jason Sacerio | Initial LiDAR bringup, URDF, configuration, setup scripts |
| `731fff8` | Jason Sacerio | Initial serial bridge and Arduino motor/odometry firmware |
| `f073a3e`, `376b6ef`, `1f543c9`, `a9dc079` | Carlos | Base launch and motor direction/gain/minimum PWM calibration |
| `873b65c`, `1b51797`, `a602f23` | Michael | Earlier SLAM/Nav2/supervisor/exploration work; latter also adds firmware timeout and command-derived encoder direction |
| `1a27791` | Jason / kwaiidev | IMU bridge parsing, EKF config, sensor joint, component-based LD19 launch, custom navigation alternative and Humble integration |
| `537d7f1` | Jason / kwaiidev | ROS queues reduced; SLAM interval 0.25→0.5 s, map update 2→5 s, throttling 1→5 |
| `a924ec2`, `bdc9d8f` | Jason / kwaiidev | Frontier infrastructure, smoother server config, explicit Humble BT paths |
| `cbaf0b2` | Jason / kwaiidev | Removes static odometry fallback, enables EKF, rewrites odometry topic and introduces velocity forwarding bridge |
| `888f26d` | Jason / kwaiidev | Footprint 0.70×0.60→0.24×0.16 m, inflation 0.35→0.15 m, goal tolerances, SLAM throttling 5→3 and map refresh 5→3 s |
| `30f0474` | Jason / kwaiidev | Late direct explorer command settings; not represented as Nav2 limits or measured motor response |
| `62f1964` | Carlos | Waypoint backend and telemetry frontend |

Adrian's agent and STT integration is credited at team level. Physical assembly roles beyond the user's stated responsibility cannot be apportioned from Git alone.

## Evidence limits that affect the article

- The final firmware emits `ODOM` only. The bridge accepts `IMU` but a separate firmware producer is absent. Do not claim demonstrated dual-stream EKF fusion.
- Encoder sign is inferred from commands, not quadrature. Firmware geometry and ticks/revolution are marked placeholders. No calibration measurements were found.
- `minimum_laser_range` in the late SLAM YAML differs from upstream Humble's `min_laser_range`. Treat it as intended filtering, not verified behavior.
- The final frontier explorer publishes `/cmd_vel` directly, bypassing DWB/smoothing. Its 19 rad/s cap is a software request limit, not a measured chassis rate. Missing scan returns infinity; scan freshness is not checked there.
- The custom navigation safety monitor is not part of the frontier launch. Do not assign its protections to the direct explorer.
- The URDF's 0.70×0.60 m visual box and 1 m mount are inconsistent with the small navigation footprint. No measured model calibration record exists.
- Firmware timeout checking shares a loop with blocking serial reads; 500 ms is a configured threshold, not a guaranteed stopping latency.
- `.guido/logs/frontier_mapping.log` contains 2,508 lines spanning multiple startup attempts, real shared-memory and lifecycle failures, missing executable directory, missing map-frame waits, and shutdown errors. No controlled before/after success comparison is preserved.
- No ROS bags, CSV measurement series, generated Guido occupancy map, serialized pose graph, recorded trajectory or formal benchmark output found in the audited workspace/snapshot. Vendored driver screenshots are upstream examples, not Guido results. No quantitative graph was created.

## Media and diagrams

The five existing portfolio JPGs were visually inspected and retained with the site's optimized Next.js gallery. No teammate artwork was copied. Four original static SVGs use site colors and contain accessible titles/descriptions plus article alt text:

- `perception.svg`: LD19/SLAM/Nav2 inputs and odometry path; IMU gap explicit.
- `tf-tree.svg`: transform authorities, fixed offsets and optional bridge/EKF ownership.
- `navigation.svg`: Nav2 velocity remappings, hardware interface and feedback; bypass explicit.
- `costmap.svg`: 5 cm cells, 15 cm inflation radius, 24×16 cm footprint. Clearly labeled schematic, not recorded map data or exact inflation costs.

Total diagram payload: approximately 17 KB uncompressed. No visualization dependency or client JavaScript added. Numerical PWM and footprint-radius examples are derived arithmetic, explicitly not measurements.

## Portfolio validation

- `npm run check` passed: ESLint, TypeScript, and production build; all 20 static pages generated. No separate unit-test runner is configured in this portfolio.
- Production Chromium checks passed at 320, 390, 820 and 1440 px. All nine page images decoded successfully; new diagram text bounds fit; article heading anchors resolve; local image and navigation URLs return 200; code/table scrolling remains contained; article and homepage have no horizontal page overflow. The existing horizontally scrolling photo strip is intentional and excluded from off-screen-element assertions.
- Desktop and mobile table-of-contents navigation verified. Mobile disclosure closes, focus moves to the requested heading, and the heading is visible below the sticky controls.
- Canonical URL, technical title, publication date, OpenGraph image and article tags verified in rendered production HTML. No application errors or failed local network requests during browser checks.
- Source links were checked against the corresponding local Git objects and paths. All Markdown image paths exist. External reference pages were read during research.
- Existing photos continue through the site's responsive Next.js image component. Diagrams are lazy-loaded SVG images with intrinsic dimensions. Route JavaScript size is unchanged; no dependency added.
- `git diff --check` passed. Existing unrelated user changes preserved. No commit, push or deployment performed.

Lighthouse used the existing script's pinned `lighthouse@13.4.1`, performance category, default mobile simulation and `--headless --no-sandbox --disable-dev-shm-usage`. Baseline and final `configSettings` objects match exactly. Audits were run sequentially against the local production server, with no Lighthouse warnings.

| Route / metric | Before | After |
| --- | ---: | ---: |
| Guido performance | 96 | 96 |
| Guido LCP | 2.71 s | 2.76 s |
| Guido CLS | 0 | 0 |
| Guido TBT | 14 ms | 36 ms |
| Guido transfer | 412 KB | 443 KB |
| Guido JavaScript transfer | 141 KB | 141 KB |
| Homepage performance | 99 | 99 |
| Homepage LCP | 2.18 s | 2.18 s |
| Homepage CLS | 0 | 0 |
| Homepage TBT | 14 ms | 14 ms |
| Homepage transfer | 188 KB | 190 KB |
| Homepage JavaScript transfer | 134 KB | 134 KB |

These are individual local runs, not statistically controlled performance measurements. The homepage satisfies every existing performance budget. The photo-heavy project route already exceeded the script's 250 KB transfer budget before this work; its added article content increases transfer by approximately 31 KB while its performance score and JavaScript transfer remain unchanged. The homepage's published performance data was not overwritten with project-route results.

Raw reports, browser checks and screenshots from this session are in `/tmp/guido-article-validation/` (temporary review artifacts, not required to build the site).
