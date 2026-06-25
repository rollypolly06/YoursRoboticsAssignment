import { useState, useEffect } from "react";
import { useDataContext } from "../context";

const InteractionsView = () => {

  const { interactions } = useDataContext();

  const total = interactions?.total_count;
  const campaigns = interactions?.campaigns;
  const types = interactions?.types;
  const robot_interactions = interactions?.robot_interactions;

  const robotIds = robot_interactions ? Object.keys(robot_interactions).sort() : [];
  const interactionTypes = robotIds.length > 0 ? Object.keys(robot_interactions[robotIds[0]]) : [];

  const outcomes = types ? Object.keys(types[interactionTypes[0]]) : []

  const campaignColumns = ['converted', 'not_converted', 'conversion_rate'];

  return (
    <div className="card flex flex-col p-4 w-full h-full gap-1">
      {/* Takes up its natural height */}
      <h1>Interactions</h1> 
      
      { interactions && 
        <div className="flex-1 flex flex-col min-h-0 gap-2">
          
          <section className="flex flex-wrap gap-4 shrink-0">
            <p className="font-bold ">Total: {total.completed + total.abandoned + total.error}</p>
            <p className="font-bold text-green-500">Completed: {total.completed}</p>
            <p className="font-bold text-amber-500">Abandoned: {total.abandoned}</p>
            <p className="font-bold text-red-500">Error: {total.error}</p>
          </section>

          <div className="flex flex-row gap-2 min-h-0 w-full">
            {/* Robots Interactions */}
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
                    {interactionTypes.map((type) => (
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
                          interactionTypes.map((type) => {
                            return (
                              <div key={`${robotId}-${type}`} className="flex-1 p-1 text-center border flex flex-col justify-center">
                                <p className="text-center">{robot_interactions[robotId][type] || 0}</p>
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
            
            {/* Types of interactions */}
            <section className="flex flex-1 flex-col gap-2">
              {/* Standard container without scrolling */}
              <div className="flex flex-col w-full">
                
                {/* 1. THE HEADER ROW */}
                <div className="flex bg-dark"> 
                  {/* Top-left label cell */}
                  <div className="w-[100px] shrink-0 p-1 border font-bold text-center flex items-center justify-center">
                    Status
                  </div>
                  {/* Map through Interaction Types for column headers */}
                  {interactionTypes.map((type) => (
                    <div key={`header-${type}`} className="flex flex-1 min-w-0 p-1 border font-bold text-center items-center justify-center capitalize">
                      {type.replace('_', ' ')}
                    </div>
                  ))}
                </div>
                
                {/* 2. THE DATA ROWS */}
                { outcomes.map((outcome) => {
                  return (
                    <div key={outcome} className="flex">
                      
                      {/* Row Header */}
                      <div className="w-[100px] shrink-0 p-1 flex items-center border justify-center bg-dark">
                        <p className="font-bold">{outcome}</p>
                      </div>
                      
                      {/* Row Data: Values mapped by Interaction Type */}
                      {
                        interactionTypes.map((type) => {
                          return (
                            <div key={`${outcome}-${type}`} className="flex-1 min-w-0 p-1 text-center border flex flex-col justify-center">
                              <p className="text-center">{types[type][outcome]}</p>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }) }
              </div>
            </section>

            {/* Campaigns */}
            <section className="flex flex-1 flex-col gap-2">
              <div className="flex flex-col w-full">
                {/* 1. THE HEADER ROW */}
                <div className="flex bg-dark"> 
                  {/* Top-left label cell */}
                  <div className="w-[120px] shrink-0 p-1 border font-bold text-center flex items-center justify-center">
                    Campaigns
                  </div>
                  {/* Map through columns for headers */}
                  {campaignColumns.map((col) => (
                    <div key={`header-${col}`} className="flex flex-1 min-w-0 p-1 border font-bold text-center items-center justify-center capitalize">
                      {col.replace('_', ' ')}
                    </div>
                  ))}
                </div>
                
                {/* 2. THE DATA ROWS */}
                { Object.keys(campaigns).map((id) => {
                  return (
                    <div key={id} className="flex">
                      
                      {/* Row Header: Campaign ID */}
                      <div className="w-[120px] shrink-0 p-1 flex items-center border justify-center bg-dark">
                        <p className="font-bold">{id}</p>
                      </div>
                      
                      {/* Row Data: Values and dynamically calculated Conversion Rate */}
                      {
                        campaignColumns.map((col) => {
                          let displayValue;
                          
                          if (col === 'conversion_rate') {
                            // Calculate conversion rate: (converted / total) * 100
                            const converted = campaigns[id].converted || 0;
                            const notConverted = campaigns[id].not_converted || 0;
                            const total = converted + notConverted;
                            
                            displayValue = total > 0 ? ((converted / total) * 100).toFixed(1) + '%' : '0%';
                          } else {
                            // Display standard raw data
                            displayValue = campaigns[id][col] || 0;
                          }

                          return (
                            <div key={`${id}-${col}`} className="flex-1 min-w-0 p-1 text-center border flex flex-col justify-center">
                              <p className="text-center">{displayValue}</p>
                            </div>
                          )
                        })
                      }
                    </div>
                  )
                }) }
              </div>
            </section>
          </div>
        </div>
      }
    </div>
  )
}

export default InteractionsView;