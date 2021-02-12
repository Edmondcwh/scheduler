import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter, Select, FormControl, useToast } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useState } from 'react'
import { useAllGroupsQuery, useAllProfessorsQuery, useCreateProjectMutation } from '../../generated/graphql'
import { InputField } from '../InputField';
import { GroupSelectionOpion } from './groupSelectionOption';
import { ProfessorsSelectionOption } from './superviserSelectionOption';

interface CreateProjectProps {}

export const CreateProject : React.FC<CreateProjectProps> = ({}) => {

    
    const [title, setTitle] = useState('');    
    const handleChange = (event) => setTitle(event.target.value);
    const [groupValue, setGroupValue] = useState('');
    const handleGroupChange = (event) => setGroupValue(event.target.value)
    const [supervisorValue, setSupervisor] = useState('');
    const handleSupervisorChange = (event) => setSupervisor(event.target.value)
    const [secondExaminer, setSecondExaminer] = useState('');
    const handleSecondExaminerChange = (event) => setSecondExaminer(event.target.value)
    const toast = useToast()
    const [, createProject] = useCreateProjectMutation();
    return(
        <>
            <Formik
                initialValues={{groupname: '', supervisor: '', secondExaminer: '', title: ''}}
                onSubmit = {
                    async (values,{setErrors} ) => {                       
                        values.title = title;
                        values.groupname = groupValue;
                        values.supervisor = supervisorValue;
                        values.secondExaminer = secondExaminer;
                        const errorMap : Record<string, string> = {};
                        if (values.supervisor === values.secondExaminer) {
                            
                            toast({
                                position: "bottom-left",
                                title: "Project create unsuccessful",
                                description: "Supervisor and second examiner cannot be the same person",
                                status: "warning",
                                duration: 5000,
                                isClosable: true,
                            })
                        } else if (values.title === '') {
                            errorMap["title"] = "Please insert a title"
                            setErrors(errorMap);
                        }  else {
                            const response = await createProject(values)
                            if(response.data === undefined) {
                                toast({
                                    position: "bottom-left",
                                    title: "Project create unsuccessful",
                                    description: "insert error",
                                    status: "error",
                                    duration: 5000,
                                    isClosable: true,
                                })
                            }else if(response.data.createProjects.errors) {
                                toast({
                                    position: "bottom-left",
                                    title: "Project create unsuccessful",
                                    description: response.data.createProjects.errors[0].message,
                                    status: "error",
                                    duration: 5000,
                                    isClosable: true,
                                })
                            } else {
                                toast({
                                    position: "bottom-left",
                                    title: "Project create success",
                                    description: "Created Project",
                                    status: "success",
                                    duration: 5000,
                                    isClosable: true,
                                })
                                setTitle('')
                                setGroupValue('')
                                setSupervisor('')
                                setSecondExaminer('')

                            }
                        } 


                    }
                }
                >
                {({isSubmitting}) => (
                    <Form>
                        <label>Choose a group</label>
                        <FormControl id="groupname" isRequired>
                            <Select placeholder="Select group" name="groupname" onChange={handleGroupChange}>
                                <option value='jdaslkdsa'>dhsjad</option>
                                <GroupSelectionOpion/>
                            </Select>
                        </FormControl>

                        <FormControl id="title" isRequired>
                            <InputField
                                name="title"
                                placeholder="Title"
                                label="Title"
                                value={title}
                                onChange={handleChange}
                                
                            />
                        </FormControl>

                        <FormControl id="supervisor" isRequired>
                            <label>Supervisor: </label>
                            <Select placeholder ="Supervisor" name="supervisor" onChange={handleSupervisorChange}>
                                <ProfessorsSelectionOption/>
                            </Select>
                        </FormControl>

                        <FormControl id="secondExaminer" isRequired>
                            <label>Second Examiner: </label>
                            <Select placeholder = "Second examiner" name="secondExaminer" onChange={handleSecondExaminerChange}>
                                <ProfessorsSelectionOption/>
                            </Select>
                            <Button my={4} type='submit' isLoading={isSubmitting} colorScheme="teal">Create Project</Button>
                        </FormControl>

                    </Form>
                )}
            </Formik>

            

        </>
    )

}