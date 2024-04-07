
import { getMonth } from "./util"
import './App.css';
import React, { useState, useContext, useEffect } from 'react' 
import CalendarHeader from "./components/CalendarHeader";
import Month from "./components/Month";
import Sidebar from "./components/Sidebar";
import GlobalContext from "./context/GlobalContex";
import EventModal from "./components/EventModal";

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth())
  const { monthIndex, showEventModel } = useContext(GlobalContext)
  useEffect(()=>{
    setCurrentMonth(getMonth(monthIndex))
  },[monthIndex]);
  return (
    <React.Fragment>
      {showEventModel && <EventModal />}
      <div className="h-screen overflow-hidden flex flex-col bg-zinc-800">
        <CalendarHeader />
        <div className="flex flex-1">
          <Sidebar />
          <Month month={currentMonth} />
        </div>
      </div>
    </React.Fragment>
  )
}

export default App
