import React, { useContext } from 'react'
import GlobalContext from '../context/GlobalContex'

function Labels() {
    const { labels, updateLabel } = useContext(GlobalContext); 
  return (
    <React.Fragment>
        <p className='text-white font-bold mt-10 '>Labels</p>
        {labels.map(({label: lbl,checked}, idx)=> (
            <label key={idx} className=' items-center mt-3 block cursor-pointer'>
                <input type="checkbox" checked={checked} onChange={() => updateLabel({label: lbl, checked : !checked})} className={`h-5 w-5 accent-${lbl}-200 rounded focus:ring-0 cursor-pointer `} />
                <span className='  ml-2 text-white '>{lbl}</span>
            </label>
        ))}
    </React.Fragment>
  )
}

export default Labels
