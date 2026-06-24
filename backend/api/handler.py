import csv

async def parse_robots():
  with open("uploads/robots.csv") as csv_file:
    csv_reader = csv.DictReader(csv_file)
    data = []

    for row in csv_reader:
      data.append(row)

    return data