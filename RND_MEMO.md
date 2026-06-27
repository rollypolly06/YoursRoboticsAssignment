# R&D Memo

## Idea
Security Patrol Robot

- Since patrollers usually have a few standard routes. These standard routes can be installed into the robots.
- Human intervention still required, but that can be within their own security control room.
- Operator in the control room can receive live updates from patrol robots.
- Robot can detect for unaurhorized personnel within protected areas.
- With cameras that have 360 degree view of the surrounding, there will not be any blindspots.
- Include different types of sensors such as thermal and acoustic sensors to be able to better pick up humans or sudden noises.

## Target Audience
- Buildings that requires security personnel patrolling
-  For areas that requires security patrol, manpower can be reduced by deploying robots to be on the ground patrolling.

## Implementation
- Cameras take snapshots of surroundings and process them at set intervals. Detects movements to flag.
- Flagged activities will be sent to a backend server which will be displayed to operator in control room to be validated.