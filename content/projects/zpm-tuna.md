---
title: "ZPM-TUNA"
year: "2025"
order: 3
summary: "A robot evacuation prototype built around ROS2 coordination and grid pathfinding, and the hardware problems that pushed our hackathon demo into simulation."
tech: ["ROS2", "Python", "Arduino", "Gazebo", "Tkinter", "Flask", "Flutter", "Dart"]
highlights:
  - "Built Arduino sensor and motor code and worked on the ROS2 robot coordination system."
  - "Pivoted from blocked hardware networking to Gazebo and a lighter Python simulation during the hackathon."
  - "Our team connected evacuation pathfinding to a Flutter interface and won the Pheratech ROS2 Autonomy Challenge."
award: "Pheratech 1st @ Knight Hacks VIII"
aliases: ["zpmtuna"]
links:
  - label: "ROS2 source"
    href: "https://github.com/ZPM-TUNA/zpm-ros/tree/7591419dc83c49aba200f158dfb000023b004c35"
  - label: "App source"
    href: "https://github.com/ZPM-TUNA/zpm/tree/e3f5a19345492f44e489e41aa3575339587468b9"
  - label: "Devpost"
    href: "https://devpost.com/software/zero-panic-in-movement-zpm"
  - label: "hackathon story"
    href: "/articles/khviii-deepdive"
images:
  - src: "/projects/zpm-tuna/1.jpg"
    alt: "Two four-wheeled ZPM-TUNA robot prototypes with ultrasonic sensors and exposed control boards."
    width: 2880
    height: 2160
  - src: "/projects/zpm-tuna/2.jpg"
    alt: "Whiteboard sketch of a grid-based navigation test with a robot, obstacles, and an exit."
    width: 2880
    height: 2160
  - src: "/projects/zpm-tuna/3.jpg"
    alt: "Five ZPM-TUNA teammates posing at Knight Hacks, with three holding Nintendo Switch 2 prize boxes."
    width: 3840
    height: 2160
    caption: "The team after winning the Pheratech challenge at Knight Hacks VIII."
  - src: "/projects/zpm-tuna/4.png"
    alt: "Building evacuation simulation with a maze floor plan, four colored robots, occupants, and target and emergency exits."
    width: 447
    height: 486
published: true
featured: true
---

## Building ZPM-TUNA

ZPM started with a simple question: if a route out of a building becomes blocked, could small robots share what they find and help people choose another exit? We built the prototype at Knight Hacks VIII and won the Pheratech Systems ROS2 Autonomy Challenge. The [Devpost](https://devpost.com/software/zero-panic-in-movement-zpm) describes the team project and the evacuation scenario behind it.

I worked on the Arduino hardware, ROS2 nodes, and coordination between robots. The rest of the team worked on the app, backend, and guidance experience. We had physical robot kits, but getting them onto a usable control network took much longer than I expected. The demo became a simulation project after that connection blocked the hardware plan.

I wrote the more personal version in my [Knight Hacks story](/articles/khviii-deepdive). Here I want to explain the technical shape of the project, the pivot, and which parts of the idea made it into the code.

This write-up uses the original team repositories: [ROS2 revision `7591419`](https://github.com/ZPM-TUNA/zpm-ros/tree/7591419dc83c49aba200f158dfb000023b004c35) and [app revision `e3f5a19`](https://github.com/ZPM-TUNA/zpm/tree/e3f5a19345492f44e489e41aa3575339587468b9). My later personal repository calls itself version 2, so it would tell a different story.

## The hardware plan

We started with two ELEGOO wheeled robot kits. The plan was to keep sensor readings and motor control on the Arduino and run the navigation and coordination logic through ROS2. Each robot would have its own state, with a controller helping the group respond when one robot couldn't make progress.

The [Arduino firmware](https://github.com/ZPM-TUNA/zpm-ros/blob/7591419dc83c49aba200f158dfb000023b004c35/main/main.ino) shows the intended boundary. It reads ultrasonic distance and MPU6050 acceleration and angular-rate data, then sends a comma-separated sensor line over serial at 115200 baud. In the other direction, it parses two signed motor values and applies direction and PWM to the motor channels.

```text
Arduino → distance, ax, ay, az, gx, gy, gz → host
host    → motor A, motor B               → Arduino
```

That interface is small enough to inspect directly. Before worrying about a group of robots, I needed one command to reach one chassis and one sensor reading to make it back.

The kit's Wi-Fi module became the problem. I could connect to its network, but I couldn't establish the control path I needed for ROS2. I suspected the preinstalled firmware was tied to the vendor app; I never confirmed that diagnosis. After hours of trying to understand the traffic, continuing to debug the network would have consumed the remaining hackathon.

## Moving the demo into simulation

I moved the robotics work to Gazebo and then to a lighter Tkinter simulation. My laptop struggled with the heavier setup, and the team still needed a way to demonstrate robot positions, obstacles, and escape routes. The [hackathon account](/articles/khviii-deepdive) records that sequence and why I made the switch.

There are several simulation paths in the repository. They shouldn't be read as one large program that always runs together.

| Part | Responsibility |
| --- | --- |
| ROS2 simulation | Robot poses, simulated scans, goals, and motion |
| Coordination service | Track robots and respond to requests for help |
| Flask simulation backend | Grid state, people, obstacles, and evacuation paths |
| Flutter app | Display the state and expose simulation controls |

The [ROS2 MVP simulation](https://github.com/ZPM-TUNA/zpm-ros/blob/7591419dc83c49aba200f158dfb000023b004c35/src/building_simulation/python_sim/ros2_multi_robot_mvp4.py) publishes `/map`, per-robot poses, and simulated laser scans. It subscribes to per-robot goals and velocity commands. That preserved useful ROS message boundaries while replacing the physical sensors and chassis with a controllable environment.

It also contains a very concrete demo compromise: the normal navigation loop uses predefined waypoints for the known maze. A* and path-sharing helpers exist in the file, but their presence doesn't mean every movement in that version was planned from new observations. The simulation let us demonstrate the structure of the system while leaving physical autonomy unfinished.

## What sharing a route meant

The coordination design was hierarchical. Robots had their own state, but a central service tracked their positions and helped choose a peer when one requested assistance.

The [coordination service](https://github.com/ZPM-TUNA/zpm-ros/blob/7591419dc83c49aba200f158dfb000023b004c35/src/building_simulation/python_sim/robot_coordination_service.py) listens to poses for `robot1`, `robot2`, and `robot3`. A request carries the caller's position, shared goal, and any path it has to offer. The service compares robot positions to the goal and selects the closest robot by straight-line distance.

If the selected peer has a stored path, the response includes its coordinates. If there is no stored path, the service can send the shared goal to that peer instead. If the requesting robot is already closest, it tells that robot to try another approach.

That's a concrete starting point for cooperation, but straight-line distance ignores walls. A nearby robot can still be on the wrong side of a corridor. A stronger version would compare reachable routes and check whether another robot's path is usable from the caller's position before adopting it.

The service also needs a caller. Defining a request handler doesn't establish that every simulation variant invokes it during navigation. The known-maze MVP includes the client helpers, while its normal loop follows those predefined routes.

## Finding an exit on the grid

The app backend has a separate pathfinding implementation. Its [`MazeGrid`](https://github.com/ZPM-TUNA/zpm/blob/e3f5a19345492f44e489e41aa3575339587468b9/backend/pathfinding.py) stores obstacles, robot positions, people, exits, and dynamically blocked cells. The default grid is 8 by 8, with movement in four directions.

A* ranks candidate cells using the distance already traveled plus an estimate of the distance remaining. This implementation uses Euclidean distance for the estimate. To choose an exit, it searches each configured exit and keeps the shortest returned path.

The obstacle-update method marks a cell blocked and recalculates routes for the people in the grid. For example, if a route uses `(3, 2)` and that cell becomes blocked, the next search excludes it. Depending on the remaining connections, the result can be a detour, another exit, or no available path. That's a description of the code's behavior, not a measured evacuation result.

This model makes the problem manageable for a demo: a cell is traversable or blocked. It doesn't represent smoke exposure, changing fire conditions, crowd congestion, or a person's mobility needs. The path is short according to the grid model; that alone doesn't establish that it is a safe evacuation route in a real building.

## Getting the state onto a phone

The [Flask server](https://github.com/ZPM-TUNA/zpm/blob/e3f5a19345492f44e489e41aa3575339587468b9/backend/main_server.py) creates the demo simulation and runs its update loop in a background thread. Its `/api/flutter-update` endpoint packages the maze, robots, people, evacuation paths, and statistics into one response.

That response gives the app a common snapshot to draw. A person's entry includes a position, path, target exit, and distance field, while robot entries carry their own positions and exploration information. The interface can show those relationships without implementing the planner in Dart.

The [Flutter API service](https://github.com/ZPM-TUNA/zpm/blob/e3f5a19345492f44e489e41aa3575339587468b9/frontend/lib/src/services/api_service.dart) fetches this state from Flask and exposes start, stop, and reset requests. It also contains calls for other backend variants. Those routes don't all appear in `main_server.py`, so the files describe several integration attempts rather than a single verified end-to-end deployment.

## Guidance and the prototype boundary

The Devpost describes a broader flow with YOLOv8 detection, Gemini-generated directions, and ElevenLabs voice output. Those were parts of the team's submitted project description. The particular backend revision above uses a simpler guidance implementation.

Its [AI coordinator](https://github.com/ZPM-TUNA/zpm/blob/e3f5a19345492f44e489e41aa3575339587468b9/backend/ai_coordinator.py) builds a templated text summary, prioritizes people without paths, and returns `voice_file: None`. I wouldn't describe that execution path as making a live model call or generating audio. The submitted feature list and a specific checked-in server aren't interchangeable evidence.

The same distinction applies to the robots. We built hardware code and a multi-robot simulation, and we presented an evacuation concept through an app. We didn't finish a physical fleet that could enter an unfamiliar building and guide people out.

## What I would carry into the next build

The hardware failure changed the order in which I would tackle this again. I'd start with one robot, a documented transport, and a repeatable test that sends a motor command and receives a sensor packet. Only then would I add navigation and a second robot.

For the simulation, I'd replace the predefined routes with a planner that consumes the same map and observations the controller uses. Then I'd test the coordination request with a deliberately blocked corridor and verify that the returned path can actually be followed. On the app side, I'd choose one server contract and make every visible control use it.

ZPM was my first ROS2 project, and a lot of the weekend went into learning where the pieces stopped connecting. Getting a simulation working after the hardware plan failed gave the team something concrete to demonstrate. It also left a much clearer list of what the physical version needed next.
