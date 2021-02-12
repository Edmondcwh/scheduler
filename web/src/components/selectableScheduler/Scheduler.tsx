import { StatHelpText } from '@chakra-ui/core';
import { Button } from '@chakra-ui/react';
import { group } from 'console';
import React, { createRef, useReducer, useRef, useState } from 'react';

import {SelectableGroup} from 'react-selectable-fast'
import { useMeQuery, useMyProjectQuery, useStudentUnQuery } from '../../generated/graphql';
import { Time } from '../../utils/TimeUtil';
import { Counters } from './Counters';
import { TimeList } from './TimeList';
import { UserInformation } from './UserInformation';

type Action = 
    |   {type:"add"; text: string}
    |   {type:"remove"; text: string}

interface RefObject {
    handleSelection: (selectedItems: any[]) => void,
}
interface Todo {
    unavailableTimeList: string[]
}
type State = Todo

const initState = {
    unavailableTimeList : [] 
}

interface SchedulerProps {
    role: string;
    name: string;

}

const TodoReducer = (state: State, action: Action) => {
    switch(action.type) {
        case "add" :
            if (state.unavailableTimeList.indexOf(action.text) < 0){
                state.unavailableTimeList.push(action.text)
            }
            return state
        case "remove" :
            if (state.unavailableTimeList.indexOf(action.text) >= 0) {
                state.unavailableTimeList.splice(state.unavailableTimeList.indexOf(action.text),1);
            }
            return state;
        default:
            return state;
    }
}
export const Scheduler: React.FC<SchedulerProps> = ({role,name})  => {

    function getGroupName() {
        let username: string = '';
        const [{data,fetching}] = useMeQuery()
        if(fetching) {

        } else if (data !== null && data.me !== null) {
            if(data.me.role === 'student') {
                username = data.me.username;
            }
        }
        return username;
    }

    function handleSelectionFinish(selectedItems: any[]) {
        if(childRef.current !== undefined) {
            console.log('bbb   '+ unAvailableTime.unavailableTimeList)
            childRef.current.handleSelection(unAvailableTime.unavailableTimeList);
        }        
    };


    const time = Time();
    const timeList = time.indexTime;
    const firstTime = time.firstTime;
    const secondTime = time.secondTime;
    const thirdTime = time.thirdTime;
    const forthTime = time.forthTime;
    const fifthTime = time.fifthTime;
    const groupName = getGroupName();
  
    
    const childRef = useRef<RefObject>();
    const [{fetching, data}] = useStudentUnQuery();
    var [unAvailableTime, dispatch] = useReducer(TodoReducer,initState);
    
    let chosenUnavailable = [];

    if(data !== undefined) {
        if(data.studentInfo.groupname === null) {

        }
        else if(data.studentInfo.groupname.unavailability !== null) {
            chosenUnavailable = data.studentInfo.groupname.unavailability;
            
            childRef.current.handleSelection(data.studentInfo.groupname.unavailability)
            chosenUnavailable.forEach((child) => {
                initState.unavailableTimeList.push(child);
            })
        }
    }    


    let studentInformation = null ;
    if (groupName !== '') {
        studentInformation = <UserInformation groupname={groupName}/>
    }
    
    return (
        <>
            
            
            <div className="calender-information-container">
                <div className="calender">
                    <ol className="timeIndex">
                        <li className="date"></li>
                        {timeList}
                    </ol>
                    <SelectableGroup                    
                        className="selectable-container"
                        allowClickWithoutSelected={true}
                        enableDeselect
                        onSelectionFinish={handleSelectionFinish}
                    >
                        <TimeList day='26/12' times={firstTime} setUnavailableTime={dispatch} chosenUnavailable = {chosenUnavailable}/>
                    </SelectableGroup>
                    <SelectableGroup                    
                        className="selectable-container"
                        allowClickWithoutSelected={true}
                        enableDeselect
                        onSelectionFinish={handleSelectionFinish}
                    >
                        <TimeList day='27/12' times={secondTime} setUnavailableTime={dispatch}chosenUnavailable = {chosenUnavailable}/>
                    </SelectableGroup>
                    <SelectableGroup                    
                        className="selectable-container"
                        allowClickWithoutSelected={true}
                        enableDeselect
                        onSelectionFinish={handleSelectionFinish}
                    >
                        <TimeList day='28/12' times={thirdTime} setUnavailableTime={dispatch}chosenUnavailable = {chosenUnavailable}/>
                    </SelectableGroup>
                    <SelectableGroup                    
                        className="selectable-container"
                        allowClickWithoutSelected={true}
                        enableDeselect
                        onSelectionFinish={handleSelectionFinish}
                    >
                        <TimeList day='29/12' times={forthTime} setUnavailableTime={dispatch}chosenUnavailable = {chosenUnavailable}/>
                    </SelectableGroup>
                    <SelectableGroup                    
                        className="selectable-container"
                        allowClickWithoutSelected={true}
                        enableDeselect
                        onSelectionFinish={handleSelectionFinish}
                    >
                        <TimeList day='30/12' times={fifthTime} setUnavailableTime={dispatch}chosenUnavailable = {chosenUnavailable}/>
                    </SelectableGroup>

                </div>
                <div className="information" >
                    <Counters ref={childRef}/>
                    
                    <div className="information-spacer">
                    </div>
                    
                    {studentInformation}
                </div>
            </div>
        </>
    );
}