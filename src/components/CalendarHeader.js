import React, { useContext } from 'react'
import logo from '../assets/calendar.png'
import GlobalContext from '../context/GlobalContex'
import dayjs from 'dayjs';


function CalendarHeader() {
  const {monthIndex,setMonthIndex} = useContext(GlobalContext);
  function handlePrevMonth(e) {
    setMonthIndex(monthIndex -1 )
  }
  function handleNextMonth(e){
    setMonthIndex(monthIndex + 1)
  }
  function handletoday(){
    setMonthIndex(dayjs().month())
  }
  return (
    <header className="px-4 py-2 flex items-center">
      <img src={logo} alt="Calendar" className='mr-2 w-12 h-12' />
      <h1 className="mr-10 text-xl text-gray-500 font-bold">
        Calendar

      </h1>
      <button className="border rounded text-white py-2 px-4 mr-5" onClick={handletoday}> 
        Today
      </button>
      <button onClick={handlePrevMonth}>
        <span className="material-symbols-outlined cursor-pointer text-4xl text-amber-100 mx-2">
          arrow_circle_left
        </span>
      </button>
      <button onClick={handleNextMonth}>
        <span className="material-symbols-outlined cursor-pointer text-4xl text-amber-100 mx-2">
        arrow_circle_right
        </span>
      </button>
      <h2 className='ml-4 text-xl text-gray-300'> {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")} </h2>
    </header>
  )
}

export default CalendarHeader
