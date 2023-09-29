import React, { useState } from "react";
import DataForClass from "./DataForClass";
import SoloRecordModal from "./SoloRecordModal";

function ParentComponent() {
  const [liveData, setLiveData] = useState(null);

  const updateLiveData = (newData) => {
    setLiveData(newData);
  };

  return (
    <div>
      <SoloRecordModal updateLiveData={updateLiveData} />
      <DataForClass liveData={liveData} />
    </div>
  );
}

export default ParentComponent;
