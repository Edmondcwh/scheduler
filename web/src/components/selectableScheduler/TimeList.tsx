import React from 'react'
import { SelectableList } from './selectableList'



type Action = 
    |   {type:"add"; text: string}
    |   {type:"remove"; text: string}


interface Props {
    times : Array<string>
    setUnavailableTime: React.Dispatch<Action>
    day: string
    chosenUnavailable : string[]
}

export const TimeList : React.FC<Props> = ({day,times,setUnavailableTime, chosenUnavailable}) => {
    return (
        <div className="list-container">
            <ol id = "dayList">
                <li className = "date"> <p>{day}</p></li>
                {times.map(time=>(
                    <SelectableList key={time} time={time} setunAvailableTime={setUnavailableTime} chosenUnavailable={chosenUnavailable}/>
                ))}
            </ol>
        </div>
    )
}