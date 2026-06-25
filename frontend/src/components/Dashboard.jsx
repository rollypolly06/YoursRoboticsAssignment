import FileUploader from "./FileUpload";
import { useState, useEffect } from "react";
import RobotsView from "./RobotsView";
import VendingView from "./VendingView";
import FootfallView from "./FootfallView"
import InteractionsView from "./InteractionsView"

const Dashboard = () => {

  const [showUpload, setShowUpload] = useState(false);
  
  return (
    <section className="flex flex-row w-full h-full overflow-hidden justify-center gap-1">

      { showUpload && <FileUploader/> }

      <div className="flex flex-col gap-1 w-[40%] h-full">
        <div className="flex-1 min-h-0">
          <RobotsView/>
        </div>

        <div className="flex-1 min-h-0">
          <VendingView/>
        </div>
      </div>

      <div className="flex flex-col w-[60%] h-full gap-1">

        <div className="flex-1 min-h-0">
          <FootfallView/>
        </div>

        <div className="flex-1 min-h-0">
          <InteractionsView/>
        </div>
      </div>

    </section>
  )
}

export default Dashboard;