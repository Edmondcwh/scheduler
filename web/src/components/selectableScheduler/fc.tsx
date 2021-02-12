import { Button, useToast } from '@chakra-ui/react';
import React, { Component, useState } from 'react'
import { useUpdateGroupUnavailabilityMutation } from '../../generated/graphql';


export class Counters extends Component {
    
    state = {
      selectedItems: [],     
      convertedTime: []
      
    }
    
    handleSelectionFinish = (selectedItems:any[]) => {
      let convertedTime = [];
      
      
      selectedItems.sort().forEach((child : string) => {
        let date = child.substring(0,4);
        if(convertedTime === undefined || convertedTime[date] === undefined) {
          convertedTime[date] = [child]
        } else {
          if ( convertedTime[date][convertedTime[date].length - 1].substring(9,17) === child.substring(0,8)) {
            let newTime = convertedTime[date][convertedTime[date].length - 1].substring(0,8) + '-' + child.substring(9,17)
            convertedTime[date].splice(convertedTime[date].length - 1, 1 , newTime)
          } else {
            convertedTime[date].push(child)
          }
        }
      })

      this.setState({
        selectedItems,
        convertedTime
      })
      console.log(`Finished selection ${selectedItems.length}`)
    }  
    
    

    convertFunction = (tobeconverted: []) => {
      let adjustedTime = [];
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

    

    render() {
      const { selectedItems,convertedTime } = this.state
      const elements = []
      if (convertedTime !== undefined) {
        
        
        if ( convertedTime['2612'] !== undefined) {
          let adjustedTime = this.convertFunction(convertedTime['2612'])

          elements.push(<span>{convertedTime['2612']!== undefined ? 
          "26/12 : " + adjustedTime.toString()
           : null}  <br/></span>)
        }

        if ( convertedTime['2712'] !== undefined) {
          let adjustedTime = this.convertFunction(convertedTime['2712'])

          elements.push(<span>{convertedTime['2712']!== undefined ? 
          "27/12 : " + adjustedTime.toString()
           : null}  <br/></span>)
        }
        if ( convertedTime['2812'] !== undefined) {
          let adjustedTime = this.convertFunction(convertedTime['2812'])

          elements.push( <span>{convertedTime['2812']!== undefined ? 
          "28/12 : " + adjustedTime.toString()
           : null}  <br/></span>)
        }
        if ( convertedTime['2912'] !== undefined) {
          let adjustedTime = this.convertFunction(convertedTime['2912'])

          elements.push(<span>{convertedTime['2912']!== undefined ? 
          "29/12 : " + adjustedTime.toString()
           : null}  <br/></span>)
        }
        if ( convertedTime['3012'] !== undefined) {
          let adjustedTime = this.convertFunction(convertedTime['3012'])

          elements.push( <span>{convertedTime['3012']!== undefined ? 
          "30/12 : " + adjustedTime.toString()
           : null}  <br/></span>)
        }

      }

     
      const toast = useToast();
      const [,updateGroupUnavailability] = useUpdateGroupUnavailabilityMutation();
      
      return (
        <div className ="unavailable-time-slot-container">
            <p>          
            Unavailable Time Slot: 
            </p>
            <div>{elements}</div>
            <br/>
            <br/>
            <br/>
            
            

            <Button onSubmit = {
              async () => {
                const response = await updateGroupUnavailability({unavailability: selectedItems})
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
            }> Submit your unAvailability</Button>

            
        </div>
      )
    }
  }