import React, { useContext, useState } from "react";
import GlobalContext from "../context/GlobalContex";
const labelClases = ["indigo", "gray", "red", "green", "blue", "purple"];

function EventModal() {
  const { setShowEventModel, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);

  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedlabel, setSelectedlabel] = useState(
    selectedEvent
      ? labelClases.find((lbl) => lbl === selectedEvent.label)
      : labelClases[0]
  );
  function handleSubmit(e) {
    e.preventDefault();
    const calendarEvent = {
      title,
      description,
      label: selectedlabel,
      day: daySelected.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: "update", payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: "push", payload: calendarEvent });
    }
    setShowEventModel(false);
  }

  return (
    <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
      <form className="bg-white rounded-lg shadow-2xl w-1/4">
        <header className="bg-amber-100 px-4 py-2 flex justify-between items-center rounded-lg">
          <span className="material-symbols-outlined text-gray-700 text-5xl font-bold">
            drag_handle
          </span>
          <div>
            {selectedEvent && (
                <span onClick={()=> {
                    dispatchCalEvent({type:"delete", payload:selectedEvent })
                    setShowEventModel(false)
                    }} className="material-symbols-outlined text-gray-700 text-5xl font-bold cursor-pointer">
                delete
              </span>
            )}
          <button onClick={() => {
              setShowEventModel(false);
               }}>
            <span className="material-symbols-outlined text-gray-700 text-5xl font-bold">
              Close
            </span>
          </button>
          </div>
        </header>
        <div className="p-3">
          <div className="grid grid-cols-1/5 items-end gap-y-7">
            <div></div>
            <input
              type="text"
              name="Title"
              placeholder="Add title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="pt-3  text-gray-700 text-xl font-semibold pb-2 w-full border-gray-400 ease-out duration-100 hover:border-b-2 focus:outline-none "
            />
            <span className="material-symbols-outlined text-4xl">schedule</span>
            <p> {daySelected.format("dddd, MMMM DD")} </p>
            <span className="material-symbols-outlined text-4xl">segment</span>
            <input
              type="text"
              name="description"
              placeholder="Add a description "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="pt-3  text-gray-700 pb-2 w-full ease-out duration-100 hover:border-b-2 focus:outline-none focus:border-b-slate-950 "
            />
            <span className="material-symbols-outlined text-4xl">
              bookmark_border
            </span>
            <div className="flex gap-x-2">
              {labelClases.map((lablClases, i) => (
                <span
                  key={i}
                  className={`bg-${lablClases}-400 w-8 h-8 rounded-full flex item-center justify-center cursor-pointer `}
                  onClick={() => {
                    setSelectedlabel(lablClases);
                  }}
                >
                  {selectedlabel === lablClases && (
                    <span className="material-symbols-outlined text-white  font-bold text-xl">
                      check
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
        <footer className="flex justify-end border-t p-3 mt-5">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-amber-500 hover:bg-amber-600 focus:translate-y-2 px-6 py-2 rounded text-white font-semibold"
          >
            Save
          </button>
        </footer>
      </form>
    </div>
  );
}

export default EventModal;
