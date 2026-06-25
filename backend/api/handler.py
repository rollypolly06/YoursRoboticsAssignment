import csv
from datetime import datetime
from collections import defaultdict


async def parse_robots():
  with open("uploads/robots.csv") as csv_file:
    csv_reader = csv.DictReader(csv_file)
    data = []

    for row in csv_reader:
      data.append(row)

    return data
  
async def parse_vending():
  with open("uploads/vending.csv") as csv_file:
    csv_reader = csv.DictReader(csv_file)

    failed_count = 0
    refunded_count = 0
    success_count = 0
    total_profits = 0
    refunded_amount = 0
    failed_amount = 0
    transactions = {}
    repeated = {}

    sales = {
      "DRINK-COLA": 0,
      "DRINK-WATER": 0,
      "MERCH-PIN": 0,
      "SNACK-CHIPS": 0,
      "SNACK-CHOC": 0
    }

    for row in csv_reader:
      id = row["txn_id"]
      
      if id in transactions:
        if id in repeated:
          repeated[id].append(row)
        else:
          repeated[id] = [transactions[id], row]
        continue
      
      transactions[id] = row

      amount = float(row["amount"])

      if row["payment_status"] == "paid":
        success_count += 1
        sales[row["sku"]] += int(row["qty"])
        total_profits += amount
      elif row["payment_status"] == "failed":
        failed_count += 1
        failed_amount += amount
      elif row["payment_status"] == "refunded":
        refunded_count += 1
        refunded_amount += amount

  return {
    "failed_count": failed_count,
    "refunded_count": refunded_count,
    "success_count": success_count,
    "total_profits": total_profits,
    "refunded_amount": refunded_amount,
    "failed_amount": failed_amount,
    "transactions": transactions,
    "repeated": repeated,
    "sales": sales
  }

async def parse_footfall():
  def normalize_zone(raw_zone):
    if not raw_zone:
        return raw_zone
    
    # Strip spaces, make uppercase, and replace dashes with underscores
    return raw_zone.strip().upper().replace("_", "-")
  
  with open("uploads/footfall.csv") as csv_file:
    csv_reader = csv.DictReader(csv_file)

    time_format = "%Y-%m-%d %H:%M:%S"

    daily_entries = defaultdict(lambda: defaultdict(int))
    hourly_entries = defaultdict(lambda: defaultdict(lambda: defaultdict(int)))

    for row in csv_reader:
        timestamp = row["timestamp"]
        ts = datetime.strptime(timestamp, time_format)
        
        zone = normalize_zone(row["zone"])
        count = int(row["count"])
        
        date_key = ts.date()
        time_key = ts.time()

        daily_entries[date_key][zone] += count
        hourly_entries[date_key][time_key][zone] += count
        
    return {
      "daily_entries": daily_entries,
      "hourly_entries": hourly_entries
    }

async def parse_interactions():
  with open("uploads/interactions.csv") as csv_file:
    csv_reader = csv.DictReader(csv_file)

    success_count = 0
    error_count = 0
    abandoned_count = 0
    converted_count = 0
    sessions = {}
    repeated_sessions = {}

    for row in csv_reader:
      # handle repeated session_id
      session_id = row["session_id"]
      if session_id in sessions:
        if session_id in repeated_sessions:
          repeated_sessions[session_id].append(row)
        else:
          repeated_sessions[session_id] = [sessions[session_id], row]
        continue
      
      sessions[session_id] = row

      if row["type"] == 'qr_scan':
        if row["outcome"] == 'completed':
          success_count += 1
          if row["converted"]:
            converted_count += 1
        elif row["outcome"] == 'error':
          error_count += 1
        elif row["outcome"] == 'abandoned':
          abandoned_count += 1

  return {
    "sessions": list(sessions.values()),
    "repeated_sessions": repeated_sessions,
    "success_count": success_count,
    "error_count": error_count,
    "abandoned_count": abandoned_count,
    "converted_count": converted_count
  }

  
async def parse_telemetry(robot_id):
  def normalize_row(row):
      row["state"] = row["state"].lower()      
      row["zone"] = row["zone"].strip().upper().replace("_", "-")
      return row
      
  with open("uploads/telemetry.csv") as csv_file:
      csv_reader = csv.DictReader(csv_file)

      robots_data = {}

      for row in csv_reader:
        normalized_row = normalize_row(row)
        curr_id = normalized_row["robot_id"]
            
        # Initialize the data structure for a new robot if it doesn't exist yet
        if curr_id not in robots_data:
            robots_data[curr_id] = {
                "entries": []
            }
        robots_data[curr_id]["entries"].append(normalized_row)
      
      # Sort the entries by timestamp for each robot we tracked
      for r_id, data in robots_data.items():
          data["entries"] = sorted(data["entries"], key=lambda x: x['timestamp'], reverse=True)

      # Return the nested dictionary if "all" was requested
      if robot_id == "all":
          return robots_data
      
      return robots_data.get(robot_id, {
          "entries": []
      })
    
async def parse_navEvents(robot_id):
  with open("uploads/nav_events.csv") as csv_file:
      csv_reader = csv.DictReader(csv_file)

      robots_data = {}

      for row in csv_reader:
        curr_id = row["robot_id"]
        
        # Initialize the data structure for a new robot if it doesn't exist yet
        if curr_id not in robots_data:
            robots_data[curr_id] = {
                "events": [],
                "event_count": {
                    "path_blocked": 0, "replan": 0, "estop": 0, 
                    "manual_takeover": 0, "dock": 0, "undock": 0, "fault": 0
                },
                "severity_count": {
                    "info": 0, "warn": 0, "error": 0, "": 0
                }
            }
        
        # Append the event and increment the specific robot's counters
        robots_data[curr_id]["events"].append(row)
        robots_data[curr_id]["event_count"][row["event_type"]] += 1
        robots_data[curr_id]["severity_count"][row["severity"]] += 1

      # Sort the filtered events by timestamp for each robot we tracked
      for r_id, data in robots_data.items():
          data["events"] = sorted(data["events"], key=lambda x: x['timestamp'], reverse=True)

      # Return the nested dictionary if "all" was requested
      if robot_id == "all":
          return robots_data
      
      return robots_data.get(robot_id, {
          "events": [],
          "event_count": {
              "path_blocked": 0, "replan": 0, "estop": 0, 
              "manual_takeover": 0, "dock": 0, "undock": 0, "fault": 0
          },
          "severity_count": {"info": 0, "warn": 0, "error": 0, "": 0}
      })
