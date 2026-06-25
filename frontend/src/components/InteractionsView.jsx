import { useState, useEffect } from "react";
import { useDataContext } from "../context";

const InteractionsView = () => {

  const { interactions } = useDataContext();
  const [convertedCount, setconvertedCount] = useState();
  const [abandonedCount, setabandonedCount] = useState();
  const [errorCount, seterrorCount] = useState();
  const [successCount, setsuccessCount] = useState();
  const [sessions, setSessions] = useState(null);
  const [repeatedSessions, setRepeatedSessions] = useState(null);

  useEffect(() => {
    const loadData = () => {
      setconvertedCount(interactions.converted_count);
      setabandonedCount(interactions.abandoned_count);
      seterrorCount(interactions.error_count);
      setsuccessCount(interactions.success_count);
      setRepeatedSessions(Object.values(interactions.repeated_sessions));
      setSessions(interactions.sessions);
    }

    if (interactions)
      loadData();
  }, [interactions])

  return (
<div className="card flex flex-col p-4 w-full h-full gap-1">
  {/* Takes up its natural height */}
  <h1>Interactions</h1> 
  
  { interactions && 
    <div className="flex-1 flex flex-col min-h-0">
      
      <div className="flex flex-wrap gap-4 shrink-0">
        <h2 className="text-green-500">Converted: {convertedCount}</h2>
        <h2 className="text-green-500">Success: {successCount}</h2>
        <h2 className="text-amber-500">Abandoned: {abandonedCount}</h2>
        <h2 className="text-red-500">Error: {errorCount}</h2>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        <p className="font-bold">Repeated Sessions</p>
        {repeatedSessions && repeatedSessions.map((repeated, index) => {
          return (
            repeated.map((sess, sessIndex) => {
              return (
                <div key={`${index}-${sessIndex}`} className="grid grid-cols-8">
                  {Object.values(sess).map((v, vIndex) => {
                    return <div key={vIndex}>{v}</div>
                  })}
                </div>
              )
            })
          )
        })}
      </div>
    </div>
  }
</div>
  )
}

export default InteractionsView;