import { createContext, useContext, useState } from "react";
import { getRobots, getVending, getFootfall, getInteractions } from "./api";

const DataContext = createContext(null);

export const DataProvider = ({children}) => {
  const [robots, setRobots] = useState(null);
  const [vending, setVending] = useState(null);
  const [footfall, setFootfall] = useState(null);
  const [interactions, setInteractions] = useState(null);

  const fetchData = async () => {
    const robot_res = await getRobots();
    setRobots(robot_res.data);

    const vending_res = await getVending();
    setVending(vending_res.data);

    const footfall_res = await getFootfall();
    setFootfall(footfall_res.data);

    const interactions_res = await getInteractions();
    setInteractions(interactions_res.data);
  };

  const contextValue = {
    robots,
    vending,
    footfall,
    interactions,
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