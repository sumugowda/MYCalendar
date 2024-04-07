import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import { getMonth } from "../util";
import GlobalContext from "../context/GlobalContex";

function SmallCalendar() {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);
  const {monthIndex,setSmallCalendarMonth, setDaySelected, daySelected} = useContext(GlobalContext);



  function handleprevMonth(){
    setCurrentMonthIdx(currentMonthIdx -1);
  }
  function handlenextMonth(){
    setCurrentMonthIdx(currentMonthIdx +1);
  } 
  useEffect(()=>{
    setCurrentMonthIdx(monthIndex)
  },[monthIndex]) 
  function getDayClass(day){
    const format = "DD-MM-YY"
    const nowDay = dayjs().format(format)
    const currDay = day.format(format)
    const selcday = daySelected && daySelected.format(format)
    if(nowDay === currDay){
        return 'text-amber-100 font-bold rounded-full w-14 underline underline-offset-4'
    }else if(currDay === selcday){
      return  'text-amber-300 font-bold rounded-full w-14 underline underline-offset-4'
    }else {
        return "";
    }
  }
  
  
  
  return (
    <div className="mt-9">
      <header className="flex justify-between ">
      <p className="text-gray-400 font-bold">
          {dayjs(new Date(dayjs().year(), currentMonthIdx)).format("MMMM YYYY")}
        </p>
        <div>
        <button onClick={handleprevMonth}>
          <span className="material-symbols-outlined cursor-pointer text-2xl text-amber-100 mx-2">
            chevron_left
          </span>
        </button>
        <button onClick={handlenextMonth}>
          <span className="material-symbols-outlined cursor-pointer text-2xl text-amber-100 mx-2">
            chevron_right
          </span>
        </button> 
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6 text-white">
        {currentMonth[0].map((day, i)=>(
            <span key={i} className="text-sm py-1 text-center">
                {day.format('dd').charAt(0)}
            </span>
        ))}
        {currentMonth.map((row, i)=>(
            <React.Fragment key={i}>
                {row.map((day, idx)=>(
                    <button key={idx} onClick={()=>{setSmallCalendarMonth(currentMonthIdx) ;setDaySelected(day);}} className={`py-1 w-full ${getDayClass(day)}`}>
                        <span className="text-sm">{day.format('D')}</span>
                    </button>
                ))}
            </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default SmallCalendar;
