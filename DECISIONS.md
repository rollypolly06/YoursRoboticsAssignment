# DECISIONS
## Metric definitions
- **Availability / uptime:** If a robot is 'interacting' or 'navigating', it is considered available and accumulates uptime. For robots that are charging or idling, it is not currently performing any tasks, hence not considered up and running. 
- **Active robot:** Based on the most recent telemetry event, a robot is 'active' if it is in the state of 'navigating' or 'interacting'.

## Assumptions I made
- Assume robot to be up and running only when it is interacting or navigating. charging and idle state is assumed to be inactive. Should this assumption be wrong, adjust uptime calculation logic.

## Data quality — what I found and how I handled it
- Duplicated txn_id found within vending.csv. Leads to erroneous calculation. Sorted data by recent timestamp first, processed only most recent data.
- Duplicated session_id found within interactions.csv. Sorted data by recent timestamp first, processed only most recent data
- robot_id of R-99 was detected in interactions.csv and vending.csv, no such robot exists. Data not processed. When robots were parsed, tracked the all the robots that are valid. 
- There was a mix of PDD-A and PDD_A zone_id. Normalized data before processing, replacing '_' with '-'.
- In some cases, when robot is charging, battery percentage drops while status is charging.
- Some instances of state being 'CHARGING' instead of 'charging'. Normalized the data by changing casing all to lower case.
- Robot has a state of navigating but the speed is at 0.0. Indicates that robot have an error or is blocked. Highlight the entries visually for user's attention

## What I prioritised, and what I deliberately left out
- For starters, I prioritized being able to parse all 6 csv files. That is the core requirement of the application, to be able to ingest the 6 csv files given, via a /data api endpoint
- Went with displaying the 4 main data which are Robots, vending, interactions and footfall. At the very least the aggregated data should be displayed.
- Adjusted the parsing logic to calculate and output more useful data to be displayed on the frontend such as per robot and per zone data.
- Finally for each robot's detailed nav events and telemtry entries. 

## Known issues / what I'd do with another day
- For frontend, components does not conform to the change in browser sizes, overlapping and cutting off of objects will happen when browser changes width and height.
- Very naive approach of displaying telemetry or nav events. Currently displaying all entries without merging them into one entry for consecutive events that are the same. 