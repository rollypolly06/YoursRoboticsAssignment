import FileUploader from "./FileUpload";
import { useState, useEffect } from "react";

const Dashboard = () => {

  const [showUpload, setShowUpload] = useState(false);
  
  return (
    <section className="flex flex-row w-full h-full overflow-hidden justify-center gap-1">

      { showUpload && <FileUploader/> }

      <div className="flex flex-col gap-1 w-[30%] h-full">
        <div className="flex-1 min-h-0 border">
          Robots
        </div>

        <div className="flex-1 min-h-0 border">
          Vending
        </div>
      </div>

      <div className="flex flex-col w-[70%] h-full gap-1">

        <div className="flex-1 min-h-0 border">
          Footfall
        </div>

        <div className="flex-1 min-h-0 border">
          QR
        </div>
      </div>

    </section>
  )
}

export default Dashboard;