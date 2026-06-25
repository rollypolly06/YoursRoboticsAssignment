import { useState, useEffect } from "react";
import { useDataContext } from "../context";

const VendingView = () => {

  const { vending } = useDataContext();

  const convertToDollars = (value) => {
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  };

  return (
    <div className="card flex flex-col p-4 w-full h-full gap-2">
      <h1>Vending</h1> 

      { vending &&
        <div className="flex-1 flex flex-col min-h-0 gap-4">

          <div className="flex flex-wrap justify-between shrink-0">
            <div className="grid grid-cols-2 gap-x-2">
              <h2 className="text-green-500">Successful Txns:</h2>
              <h2>{vending.success_count}</h2>
              <h2>Sales amount:</h2>
              <h2>${convertToDollars(vending.total_profits)}</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <h2 className="text-amber-500">Refunded Txns:</h2>
              <h2>{vending.refunded_count}</h2>
              <h2>Refunded amount:</h2>
              <h2>${convertToDollars(vending.refunded_amount)}</h2>
            </div>
            <div className="grid grid-cols-2 gap-x-2">
              <h2 className="text-red-500">Failed Txns:</h2>
              <h2>{vending.failed_count}</h2>
              <h2>Failed amount:</h2>
              <h2>${convertToDollars(vending.failed_amount)}</h2>
            </div>
          </div>

          <div className="grid grid-flow-col overflow-x-auto">
            {
              Object.entries(vending.sales).map(([k, v]) => {
                return (
                  <div key={k}>
                    <p className="border px-2">{k}</p>
                    <p className="border px-2">{v}</p>
                  </div>
                )
              })
            }
          </div>
          
        </div>
      }
    </div>
  )
}

export default VendingView;