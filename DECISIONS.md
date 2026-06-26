# DECISIONS

> Replace each prompt below with your own reasoning. This document is one of the most
> important parts of your submission — it is where we see how you think.

## Metric definitions
- **Availability / uptime:** If a robot is 'interacting' or 'navigating', it is considered available and accumulates uptime. For robots that are charging or idling, it is not currently performing any tasks, hence not considered up and running. 
- **Active robot:** Based on the most recent telemetry event, a robot is 'active' if it is in the state of 'navigating' or 'interacting'.
- _Any other term you had to pin down..._

## Assumptions I made
- Assume robot to be up and running only when it is interacting or navigating. charging and idle state is assumed to be inactive. Should this assumption be wrong, adjust uptime calculation logic.

## Data quality — what I found and how I handled it
- _One line per issue. (This should align with your `summary.json` anomalies.)_

## What I prioritised, and what I deliberately left out
- _What did you build first and why? What did you cut given the time budget?_

## Known issues / what I'd do with another day
- _Be honest. Self-awareness scores well._
