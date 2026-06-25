import { createContext, useContext, useState } from "react";
import { getRobots, getVending, getFootfall, getInteractions, getNavEvents, getTelemetry } from "./api";

const DataContext = createContext(null);

export const DataProvider = ({children}) => {
  const [robots, setRobots] = useState(null);
  const [vending, setVending] = useState(null);
  const [footfall, setFootfall] = useState(null);
  const [interactions, setInteractions] = useState(null);
  const [allTelemetry, setAllTelemetry] = useState(null);
  const [allNavEvents, setAllNavEvents] = useState(null);

  const fetchData = async () => {
    const robot_res = await getRobots();
    setRobots(robot_res.data);

    const vending_res = await getVending();
    setVending(vending_res.data);

    const footfall_res = await getFootfall();
    setFootfall(footfall_res.data);

    const interactions_res = await getInteractions();
    setInteractions(interactions_res.data);

    const telemetry_res = await getTelemetry();
    setAllTelemetry(telemetry_res.data);

    const nav_res = await getNavEvents();
    setAllNavEvents(nav_res.data);
  };

  const getRobotTelemetry = (robot_id) => {
    if (allTelemetry)
      return allTelemetry[robot_id]
  };
  
  const getRobotNavEvents = (robot_id) => {
    if (allNavEvents)
      return allNavEvents[robot_id]
  };

  const contextValue = {
    robots,
    vending,
    footfall,
    interactions,
    allTelemetry,
    allNavEvents,
    getRobotTelemetry,
    getRobotNavEvents,
    fetchData
  }

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  )
};

export const useDataContext = () => {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider')
  }
  return context
};