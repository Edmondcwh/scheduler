import { Button, Flex, forwardRef, useToast } from '@chakra-ui/react'
import React, { Ref, useImperativeHandle, useState } from 'react'
import { MutableRefObject } from 'react'
import { Component } from 'react'
import { useMeQuery, useStudentUnQuery, useUpdateGroupUnavailabilityMutation,useUpdateProfessorUnavailabilityMutation  } from '../../generated/graphql'



interface RefObject {
  handleSelection: (selectedItems: any[]) => void,
}
interface CounterProps {
}

export const Counters  = forwardRef ((props,ref: Ref<RefObject>) => {

    const [unavailableTime, setUnavailableTime] = useState([]) 
    const [displayTime, setDisplayTime] = useState([])
    

    

    const handleSelectionFinish = (selectedItems: any[]) => {
        let convertedTime = []
        console.log('---------' + selectedItems);
         selectedItems.sort().forEach((child: string) => {
             let date = child.substring(0,4);
             if(convertedTime[date] === undefined) {
                 convertedTime[date] = [child]
             } else {
                 if(convertedTime[date][convertedTime[date].length - 1].substring(9,17) === child.substring(0,8)) {
                    let newTime = convertedTime[date][convertedTime[date].length - 1].substring(0,8) + '-' + child.substring(9,17);
                    convertedTime[date].splice(convertedTime[date].length - 1, 1 , newTime);
                } else {
                    convertedTime[date].push(child);
                }
             }
         })

         setUnavailableTime(selectedItems);
         setDisplayTime(convertedTime);
         console.log(`Finished selection ${selectedItems.length}`)

    }

    useImperativeHandle(ref, () => ({handleSelection: handleSelectionFinish}));

    const convertTimeFunction = (tobeconverted: []) => {
        let adjustedTime = []
        tobeconverted.sort().forEach((element:string) => {
            let split = [];
            split = element.split('-');
            split[0] = split[0].slice(4);
            split[1] = split[1].slice(4);
            element = split[0] + '-' + split[1]
            adjustedTime.push(element)
          })
          return adjustedTime;
    }

    const convertTime = ( convertedTime: any[]) => {
        let elements = []
        let date = ['2612','2712','2812','2912','3012']
        if (convertedTime !== undefined) {
        
            date.forEach((child) => {
              if(convertedTime[child]!== undefined) {
                let adjustedTime = convertTimeFunction(convertedTime[child])
                elements.push(<span>{convertedTime[child] !== undefined ? child.slice(0,2) + '/' + child.slice(2,4) + ' : ' + adjustedTime.toString() : null} <br/></span>)
              }
            })                   
    
          }
        return elements;
    }

    let displaytag = []
    displaytag = convertTime(displayTime)

    const [,updateGroupUnavailability] = useUpdateGroupUnavailabilityMutation();
    const [, updateProfessorUnavailability] = useUpdateProfessorUnavailabilityMutation();
    const [{data, fetching}] = useMeQuery();
    const toast = useToast();

    

    return(
        <div className ="unavailable-time-slot-container">
        <p>          
        Unavailable Time Slot: 
        </p>
        <div className ="unavailable-time">{displaytag}</div>
        <br/>
        <br/>
        <br/>
        
        
        <Flex float="right">
        <Button onClick = {
          async () => {
            let response = null;
            if(fetching) {}
            else if (data.me.role === 'professor') {
              response = await updateProfessorUnavailability({unavailability: unavailableTime});
              if(response.data === undefined) {
                toast({
                  position: "bottom-left",
                  title: "Upload unavailbility unsuccessful",
                  description: "404 error",
                  status: "warning",
                  duration: 5000,
                  isClosable: true,
              })
              } else if(response.data.updateProfessorUnavailability.errors){
                toast({
                  position: "bottom-left",
                  title: "Upload unavailbility unsuccessful",
                  description: response.data.updateGroupUnavailability.errors,
                  status: "warning",
                  duration: 5000,
                  isClosable: true,
              })
              } else {
                toast({
                  position: "bottom-left",
                  title: "Upload unavailbility success",
                  description: "Success",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
              })
              }
            } else {              
             response = await updateGroupUnavailability({unavailability: unavailableTime});
             if(response.data === undefined) {
              toast({
                position: "bottom-left",
                title: "Upload unavailbility unsuccessful",
                description: "404 error",
                status: "warning",
                duration: 5000,
                isClosable: true,
            })
            } else if(response.data.updateGroupUnavailability.errors){
              toast({
                position: "bottom-left",
                title: "Upload unavailbility unsuccessful",
                description: response.data.updateGroupUnavailability.errors,
                status: "warning",
                duration: 5000,
                isClosable: true,
            })
            } else {
              toast({
                position: "bottom-left",
                title: "Upload unavailbility success",
                description: "Success",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
            }
            }
            
          }
        }> Submit your unavailability</Button>
        </Flex>

        
    </div>
    )
})