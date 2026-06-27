import { useState, useEffect } from "react";
import { useDataContext } from "../context";

const VendingView = () => {

  const { vending } = useDataContext();

  const robot_vending = vending?.robots;

  const convertToDollars = (value) => {
    if (!value)
      return "";
    return value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  };

  const robotIds = robot_vending ? Object.keys(robot_vending).sort() : [];
  const secondary = robotIds.length > 0 ? Object.keys(robot_vending[robotIds[0]]) : [];

  return (
    <div className="card flex flex-col p-4 w-full h-full gap-2">
      <div className="flex flex-row w-full justify-between gap-4">
        <h1>Vending</h1> 
        {/* Vending sales metrics */}
        <div className="flex flex-wrap shrink-0 gap-4">
          <div className="grid grid-cols-2 gap-x-2">
            <h2 className="text-green-500">Successful:</h2>
            <h2>{vending?.success_count}</h2>
            <h2>Sales amt:</h2>
            <h2>${convertToDollars(vending?.total_profits)}</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <h2 className="text-amber-500">Refunded:</h2>
            <h2>{vending?.refunded_count}</h2>
            <h2>Refunded amt:</h2>
            <h2>${convertToDollars(vending?.refunded_amount)}</h2>
          </div>
          <div className="grid grid-cols-2 gap-x-2">
            <h2 className="text-red-500">Failed:</h2>
            <h2>{vending?.failed_count}</h2>
            <h2>Failed amt:</h2>
            <h2>${convertToDollars(vending?.failed_amount)}</h2>
          </div>
        </div>
      </div>

      { vending &&
        <div className="flex-1 flex flex-col min-h-0 gap-4">


          {/* Total merchandise table */}
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
          
          {/* Per robot table */}
          <section className="flex flex-1 gap-2 min-h-0">

            <div className="flex flex-col gap-2 flex-1 min-h-0">
              {/* COMBINED CONTAINER: Scrollable div for vertical scrolling */}
              <div className="flex flex-col overflow-y-auto flex-1 min-h-0 relative">
                
                {/* 1. THE STICKY HEADER ROW (Interaction Types) */}
                <div className="flex sticky top-0 z-10 bg-dark"> 
                  {/* Top-left label cell */}
                  <div className="min-w-[70px] border font-bold text-center flex items-center justify-center">
                    Robot
                  </div>
                  {/* Map through Interaction Types for column headers */}
                  {secondary.map((type) => (
                    <div key={`header-${type}`} className="flex flex-1 p-1 border font-bold text-center items-center justify-center capitalize">
                      {type.replace('_', ' ')}
                    </div>
                  ))}
                </div>
                
                {/* 2. THE DATA ROWS (Robot IDs) */}
                { robotIds.map((robotId) => {
                  return (
                    <div key={robotId} className="flex">
                      
                      {/* Row Header: Robot ID (e.g., R-01) */}
                      <div className="flex items-center border min-w-[70px] justify-center bg-dark">
                        <p className="font-bold">{robotId}</p>
                      </div>
                      
                      {/* Row Data: Values mapped by Interaction Type */}
                      {
                        secondary.map((type) => {
                          return (
                            <div key={`${robotId}-${type}`} className="flex-1 p-1 text-center border flex flex-col justify-center">
                              <p className="text-center">{robot_vending[robotId][type] || 0}</p>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }) }
              </div>
            </div>
          </section>
        </div>
      }
    </div>
  )
}

export default VendingView;