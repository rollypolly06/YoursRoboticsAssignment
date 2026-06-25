import { createContext, useContext, useState } from "react";
import { getRobots, getVending } from "./api";

const DataContext = createContext(null);

export const DataProvider = ({children}) => {
  const [robots, setRobots] = useState(null);
  const [vending, setVending] = useState(null);

  const fetchData = async () => {
    const robot_res = await getRobots();
    setRobots(robot_res.data);

    const vending_res = await getVending();
    setVending(vending_res.data);
  };

  const contextValue = {
    robots,
    vending,
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