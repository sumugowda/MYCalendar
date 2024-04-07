import React, { useContext, useEffect, useState } from 'react' 
import dayjs from "dayjs"
import GlobalContext from '../context/GlobalContex'


function Day({day, rowIdx}) {
  const {setDaySelected, setShowEventModel, filteredEvents, setSelectedEvent} = useContext(GlobalContext)

  const [dayEvents,setDayEvents] = useState([])
  useEffect(() => {
    const events = filteredEvents.filter(evt => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"));
    setDayEvents(events)
  },[filteredEvents, day])


  function getCurretDayClass(){
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'bg-amber-100 text-black font-bold rounded-full w-14 underline underline-offset-8':''
  }
  return (
    <div className="border-none flex flex-col">
      <header className="flex flex-col items-center">
        {rowIdx === 0 && <p className="text-sm mt-1">{day.format('ddd').toUpperCase()}</p>}
        <p className={`text-base p-1 my-1 text-center ${getCurretDayClass()}`}>{day.format('DD')}</p> 
       
      </header>
      <div className="flex-1 cursor-pointer" onClick={()=>{
        setDaySelected(day);
        setShowEventModel(true);
      }}>
         {dayEvents.map((evt, idx) => (
          <div key={idx} onClick={() => setSelectedEvent(evt)} className={`bg-${evt.label}-200 p-1   text-zinc-800 text-base font-normal rounded mb-1 truncate ease-in-out hover:bg-${evt.label}-300 `}>
            {evt.title}
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default Day
