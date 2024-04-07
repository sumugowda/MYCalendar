import React from 'react'

const GlobalContext = React.createContext({ 
    monthIndex:0,
    setMonthIndex:(index =>{}),
    smallCalendarMonth: 0,
    setSmallCalendarMonth: (index) =>{}, 
    daySelected: null,
    setDaySelected:()=>{},
    showEventModel:false,
    setShowEventModel:() =>{},
    dispatchCalEvent: (type, payload) => {},
    savedEvents: [],
    selectedEvent: null,
    setselectedEvent: () => {},
    setLabels: () => {},
    label:[] ,
    updateLabel: () => {},
    filteredEvent: []
})

export default GlobalContext;