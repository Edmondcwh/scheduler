import React, { Dispatch, SetStateAction } from 'react'
import {createSelectable, TSelectableItemProps} from 'react-selectable-fast'


type Action = 
    |   {type:"add"; text: string}
    |   {type:"remove"; text: string}

type Props = {
    setunAvailableTime : React.Dispatch<Action>
    time: string
    chosenUnavailable : string[]
}

export const SelectableList = createSelectable((props: TSelectableItemProps & Props) => {
    var {selectableRef, isSelected, isSelecting, setunAvailableTime, time, chosenUnavailable} = props;

    if(isSelected === true && isSelecting === false) {
        setunAvailableTime({type: "add", text: time});
        
    } else if(isSelected === false && isSelecting === false){
        setunAvailableTime({type: "remove", text: time});
        
    }
    if(chosenUnavailable.includes(time)) {
        isSelected = true;
        console.log('isSelcted: ' + isSelected);
    }

    return(
        <div className={isSelected? "dateDiv" : "selectedDateDiv"}>
            <li ref={selectableRef} key={time} className="date"></li>
        </div>
    )
})