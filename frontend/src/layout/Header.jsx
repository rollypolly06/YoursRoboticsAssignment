import { useEffect, useState } from "react";
import { Moon, Sun, Bot, Upload, Loader, RefreshCcw } from "lucide-react";
import { useDataContext } from "../context";

const Header = ({toggleShowUpload}) => {
  const [isLightMode, setIsLightMode] = useState(false);

  const { fetchData } = useDataContext();

  const toggleLightMode = () => {
    setIsLightMode((prev) => !prev);
    document.body.classList.toggle('light-mode');
  }

  return (
    <div className="app-header flex fixed left-0 top-0 w-full p-4 justify-between items-center z-50 max-h-16">
      <div className="w-full">
        <Bot className="w-16 h-16 hover:cursor-pointer"/>
      </div>
      <div className="w-full text-center">
        <h1>Fleet Ops Console</h1>
      </div>

      <div className="flex gap-4 justify-end items-center w-full">
        <button className="!rounded-[50%] !px-2 !py-2" title="Refresh"
          onClick={fetchData}
        >
          <RefreshCcw/>
        </button>
        <button className="!rounded-[50%] !px-2 !py-2" title="Upload data files"
          onClick={toggleShowUpload}
        >
          <Upload/>
        </button>
        <button className="!rounded-[50%] !px-2 !py-2" title="toggle light/dark mode" 
          onClick={toggleLightMode}
        >
          {isLightMode ? <Sun/> : <Moon/>}
        </button>
      </div>
    </div>
  )
}

export default Header;