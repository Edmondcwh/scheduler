import { Button, useToast } from "@chakra-ui/react"
import { withUrqlClient } from "next-urql"
import React, { useState } from "react"
import { NavBar } from "../components/NavBar"
import { ProjectTable } from "../components/ProjectTable"
import { useAllProjectsQuery, useUpdateScheduleMutation } from "../generated/graphql"

import { createUrqlClient } from "../utils/createUrqlClients"
import { Time } from "../utils/TimeUtil"


interface ProjectInfo {
    groupName: string,
    supervisor: string,
    secondExaminer: string,
    schedule: string,
}

interface groupInfo {
    groupName: string,
    unavailability: string[]
}

interface professorInfo {
    professor: string,
    unavailability: string[]
}

function checkIfProfessorExist(allProfessors: professorInfo[], name: string) {
    let status : Boolean = true
    allProfessors.forEach((child) => {
        
        if (child.professor === name) {
            status = false;
            return status;
        }
    })

    return status
}

const Projects = () => {

    const [{data, fetching}] = useAllProjectsQuery();
    const [schedule, setSchedule] = useState([]);
    const scheduleTime = () => {
        let projects : ProjectInfo[] = [];
        let group: groupInfo[] = [];
        let professor: {[key:string] : professorInfo} = {};

        if (data !== undefined) {
            data.allProjects.forEach((child) => {
                let newProject : ProjectInfo = {groupName: '', supervisor: '', secondExaminer: '', schedule:''};
                let newGroup: groupInfo = {groupName:'', unavailability:[]};
                let newProfessor: professorInfo = {professor: '', unavailability: []};
                let newSecondExaminer : professorInfo= {professor: '', unavailability: []};
        
                newProject.groupName = child.fypgroup.name;
                newProject.supervisor = child.superviser.name;
                newProject.secondExaminer = child.secondExaminer.name;
                newProject.schedule = '';
        
                newGroup.groupName = child.fypgroup.name;
                newGroup.unavailability = child.fypgroup.unavailability;

                
        
                if(professor[child.superviser.name] === undefined) {
                    newProfessor.professor = child.superviser.name;
                    newProfessor.unavailability = child.superviser.unavailability;
                    professor[child.superviser.name] = newProfessor;
                }

                if(professor[child.secondExaminer.name] === undefined) {
                    newSecondExaminer.professor = child.secondExaminer.name;
                    newSecondExaminer.unavailability = child.secondExaminer.unavailability;
                    professor[child.secondExaminer.name] = newSecondExaminer;
                }
        
                
        
                projects.push(newProject);
                group[child.fypgroup.name] = newGroup;
                
        
            })
        }

        const time = Time();
        const firstTime = time.firstTime;
        const secondTime = time.secondTime;
        const thirdTime = time.thirdTime;
        const forthTime = time.forthTime;
        const fifthTime = time.fifthTime;        
        

        let allAvailableTime :string[] = [];
        allAvailableTime = firstTime.concat(secondTime,thirdTime, forthTime, fifthTime);
        
        let scheduledTime : string[] = [];
        
        projects.forEach((child) => {
            let totalUnavailability: string[] = [];
            if (professor[child.supervisor].unavailability === null) {
                if (professor[child.secondExaminer].unavailability !== null) {
                    totalUnavailability = professor[child.secondExaminer].unavailability;
                } 
            } else {
                if(professor[child.secondExaminer].unavailability !== null) {
                    //console.log(child.supervisor +'-----------'+ professor[child.supervisor].unavailability)
                    totalUnavailability = professor[child.supervisor].unavailability.concat(professor[child.secondExaminer].unavailability)
                } else {
                    totalUnavailability = professor[child.supervisor].unavailability;
                }
            }
            let uniqueUnavailability: string[] = totalUnavailability.filter(function(elem, index, self) {
                return index === self.indexOf(elem);
            });
            let profAndSsAvailability : string[] = allAvailableTime.filter(function(elem) {
                return uniqueUnavailability.indexOf(elem) < 0;
            });

            let studentAvailability : string[] = [];
            if(group[child.groupName].unavailability === null) {
                studentAvailability = allAvailableTime;
            } else {
                studentAvailability = allAvailableTime.filter(function(elem) {
                    return group[child.groupName].unavailability.indexOf(elem) < 0;
                });
            }

            let scheduleTime: string = '';
            for (let i : number = 0; i < profAndSsAvailability.length; i++) {
                if(studentAvailability.includes(profAndSsAvailability[i])) {
                    scheduleTime = profAndSsAvailability[i];
                    break;
                }
            }

            child.schedule = scheduleTime;

            if(professor[child.supervisor].unavailability === null) {
                let setArray : string[] = [];
                setArray.push(scheduleTime);
                professor[child.supervisor].unavailability = setArray;
            } else {
                professor[child.supervisor].unavailability.push(scheduleTime);
            }
            if(professor[child.secondExaminer].unavailability === null) {
                let setArray : string[] = [];
                setArray.push(scheduleTime);
                professor[child.secondExaminer].unavailability = setArray;
            } else {
                professor[child.secondExaminer].unavailability.push(scheduleTime);
            }

            child.schedule = scheduleTime;
            
            scheduledTime.push(scheduleTime);
            console.log(scheduleTime)
        })
        setSchedule(scheduledTime);
    }

    const [, updateSchedule] = useUpdateScheduleMutation();
    const toast = useToast();

    const updateScheudle = async () => {
        
        const message = await updateSchedule({schedule:schedule})
        if(message?.data.updateSchedule.message === 'Successfully update schedule') {
            toast({
                title: "Updated Schedule",
                description: "All presentations have been scheduled and updated",
                status: "success",
                duration:9000,
                isClosable: true
            })
        } else {
            toast({
                title: "Update Unsuccessful",
                description: "Error happened when update schedule",
                status: "error",
                duration:9000,
                isClosable:true,
            })
        }
    }
    

    return (
        <>
            <NavBar></NavBar>
            <ProjectTable data={data} schedule={schedule}/>
            <Button onClick={scheduleTime}>Schedule Presentation</Button>
            <Button onClick={updateScheudle}>Update Schedule</Button>
        </>
    )
}

export default withUrqlClient(createUrqlClient, {ssr: true}) (Projects);
