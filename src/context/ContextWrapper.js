import React, { useEffect, useMemo, useReducer, useState } from 'react'
import GlobalContext from './GlobalContex'
import dayjs from 'dayjs'

function savedEventsReducer(state, {type, payload}){
  switch (type){
    case 'push':
      return [...state, payload]; 
    case "update":
      return state.map((evt)=> evt.id === payload.id ? payload : evt )
    case 'delete':
      return state.filter((evt) => evt.id !== payload.id );
      default:
        throw new Error();
  }
}
function initEvents() {
  const storageEvents = localStorage.getItem('savedEvents');
  if (storageEvents) {
    const parsedEvents = JSON.parse(storageEvents);
    return parsedEvents;
  } else {
    return [];
  }
}

function ContextWrapper(props) {
  const [monthIndex,setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth,setSmallCalendarMonth] = useState(null);
  const [daySelected,setDaySelected] = useState(dayjs());
  const [showEventModel,setShowEventModel] = useState(false);
  const [selectedEvent,setSelectedEvent] = useState(null);
  const [labels,setLabels] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(savedEventsReducer, [], initEvents )

  const filteredEvents = useMemo(() =>{
    return  savedEvents.filter((event) => labels.filter(lbl => lbl.checked).map(lbl => lbl.label).includes(event.label))
  } , [savedEvents, labels])
  useEffect(()=>{
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents])

  useEffect(()=>{
    if(smallCalendarMonth !== null){
      setMonthIndex(smallCalendarMonth)
    }
  },[smallCalendarMonth])

  useEffect(()=> {
    if(!showEventModel){
      setSelectedEvent(null)
    }
  },[showEventModel])

  useEffect( ()=>{
   setLabels((prevLabels) => {
    return [...new Set(savedEvents.map(evt => evt.label))].map(label => {
      const currentLabel = prevLabels.find(lbl => lbl.label === label)
      return{
        label,
        checked: currentLabel ? currentLabel.checked : true,
      };
    })
   })
  },[savedEvents])

  function updateLabel(label) {
    setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl))
  }

  return (
    <div>
    <GlobalContext.Provider value={{monthIndex,setMonthIndex, smallCalendarMonth,setSmallCalendarMonth,setDaySelected,daySelected,showEventModel,setShowEventModel,dispatchCalEvent,selectedEvent, setSelectedEvent, savedEvents, setLabels, labels , updateLabel, filteredEvents}}>
        {props.children}
      </GlobalContext.Provider>
    </div>
  )
}

export default ContextWrapper
