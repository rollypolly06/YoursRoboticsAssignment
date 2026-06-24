import { useState, useEffect } from "react";
import { getRobots } from "../api";

const RobotsView = () => {
  const [loading, setLoading] = useState(true);
  const [robots, setRobots] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const res = await getRobots();
      setRobots(res.data);
    }

    loadData();
    setLoading(false);
  }, [])

  return (
    <div className="card flex flex-col p-4 w-full h-full gap-4">
      <h1>Robots</h1>

      { !loading && 
        <div className="flex flex flex-col min-h-0 overflow-x-auto">
          <div 
            className="grid grid-cols-5 font-bold"
          >
            {robots[0] && Object.keys(robots[0]).map(k => {
              return <div key={k}>{k}</div>
            })}
          </div>
          <div className="flex flex-col gap-1 overflow-y-auto min-h-0">
            {
              robots.map((robot) => {
                return (
                  <div 
                    className="grid grid-cols-5 hover:bg-dark hover:cursor-pointer"
                    key={robot.robot_id}
                  >
                      {Object.values(robot).map(v => {
                        return <div>{v}</div>
                      })}
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

export default RobotsView;