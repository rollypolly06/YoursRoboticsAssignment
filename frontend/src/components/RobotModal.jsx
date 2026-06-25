import { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import { useDataContext } from "../context";

const RobotModal = ({robotId, onClose}) => {

  const { getRobotTelemetry, getRobotNavEvents } = useDataContext();

  const [telemetry, setTelemetry] = useState(null);
  const [navEvents, setNavEvents] = useState(null);

  useEffect(() => {
    const filterData = () => {
      setTelemetry(getRobotTelemetry(robotId));
      setNavEvents(getRobotNavEvents(robotId));
    }

    filterData();
  }, [])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const getStyling = (state) => {
    if (state == "idle")
      return "";
    else if (state == "interacting")
      return "bg-green-400";
    else if (state == "navigating")
      return "bg-blue-400";
    else if (state == "charging" || state == "warn")
      return "bg-amber-500";
    else if (state == "error")
      return "bg-red-500";
  }

  const telemetryHeaders = telemetry?.entries?.length > 0 ? Object.keys(telemetry.entries[0]) : [];
  const navEventHeaders = navEvents?.events?.length > 0 ? Object.keys(navEvents.events[0]) : [];

  return (
    <section className="app-modal-section">
      
      <div className="app-modal p-4">
        <XCircle onClick={onClose} className="self-end font-bold cursor-pointer"/>
        <div className="flex !flex-row gap-2 max-h-[90vh]">

        <div className="flex flex-row gap-8">

          {/* Telemetry Table */}
          { telemetry && telemetry.entries && (
          <div className="flex flex-col justify-between mb-2 shrink-0 gap-4">
            <h1 className="text-center">Telemetry</h1>

            <div className="flex-1 min-h-0 overflow-y-auto relative">
              {/* 1. Changed to border-separate and border-spacing-0 */}
              <table className="w-full border-separate border-spacing-0">
                
                {/* STICKY HEADER */}
                <thead className="sticky top-0 z-10 shadow-sm">
                  <tr>
                    {telemetryHeaders.map((key) => (
                      <th 
                        key={`header-${key}`} 
                        // 2. Moved bg-dark to the <th> itself. Added border-y, border-r, and first:border-l
                        className="p-2 bg-dark font-bold text-center capitalize whitespace-nowrap"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                
                {/* DATA ROWS */}
                <tbody>
                  {telemetry.entries.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`} className="hover:bg-light transition-colors">
                      {telemetryHeaders.map((key) => (
                        <td 
                          key={`cell-${rowIndex}-${key}`} 
                          className={`p-2 text-center ${key == "state" ? getStyling(row[key]) : ""}`}
                        >
                          {row[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
          )}

          {/* Nav Events Table */}
          { navEvents && (
          <div className="flex flex-col justify-between mb-2 shrink-0 gap-4">
            <h1 className="text-center">Nav Events</h1>

            {/* Nav Event Stats */}
            <div>
              <div className="self-start flex flex-wrap gap-4">
                {
                  Object.entries(navEvents.event_count).map(([k, v]) => {
                    return (
                      <div className="flex">
                        <p className="font-bold mr-2">{k}:</p>
                        <p>{v}</p>
                      </div>
                    )
                  })
                }
              </div>
              <div className="self-start flex flex-wrap gap-4">
                {
                  Object.entries(navEvents.severity_count).map(([k, v]) => {
                    return (
                      <div className="flex">
                        <p className="font-bold mr-2">{k == "" ? "Blank" : k}:</p>
                        <p>{v}</p>
                      </div>
                    )
                  })
                }
              </div>
            </div>

            <div className="flex-1 min-h-0 overflow-y-auto relative">
              {/* 1. Changed to border-separate and border-spacing-0 */}
              <table className="w-full border-separate border-spacing-0">
                
                {/* STICKY HEADER */}
                <thead className="sticky top-0 z-10 shadow-sm">
                  <tr>
                    {navEventHeaders.map((key) => (
                      <th 
                        key={`header-${key}`} 
                        // 2. Moved bg-dark to the <th> itself. Added border-y, border-r, and first:border-l
                        className="p-2 bg-dark font-bold text-center capitalize whitespace-nowrap"
                      >
                        {key}
                      </th>
                    ))}
                  </tr>
                </thead>
                
                {/* DATA ROWS */}
                <tbody>
                  {navEvents.events.map((row, rowIndex) => (
                    <tr key={`row-${rowIndex}`} className="hover:bg-light transition-colors">
                      {navEventHeaders.map((key) => (
                        <td 
                          key={`cell-${rowIndex}-${key}`} 
                          className={`p-2 text-center ${key == "severity" ? getStyling(row[key]) : ""}`}
                        >
                          {row[key]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          )}
        </div>
        </div>
      </div>
    </section>
  )
}

export default RobotModal;