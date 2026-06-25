import csv

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