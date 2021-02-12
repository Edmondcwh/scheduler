import { Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import React, { useState } from 'react';
import { CreateProfessorMutation, useCreateProfessorMutation } from '../generated/graphql';
import { InputField } from './InputField';

interface CreateprofessorProps {}

export const CreateProfessor : React.FC<CreateprofessorProps> = ({}) => {


    const [,createProfessor] = useCreateProfessorMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [value, setValue] = useState('');

    const cancelRef = React.useRef()


    const onClose = () => setIsOpen(false)

    const handleChange = (event) => setValue(event.target.value);


    return (

<>
            <Formik
                initialValues={{professorName: ''}}
                onSubmit = {
                    async (values,{setErrors} ) => {
                        const response = await createProfessor({professorName: value});
                        if (response.data.createProfessor.errors) {
                            const errorMap : Record<string, string> = {};
                            errorMap["professorName"] = response.data.createProfessor.errors;
                            setErrors(errorMap);
                        } else {
                            
                            setIsOpen(true);
                            setValue('');
                        }
                        
                    }
                }
                >
                {({isSubmitting}) => (
                    <Form>
                        <InputField
                            name="professorName"
                            placeholder="Professor Name"
                            label="Professor Name"
                            value={value}
                            onChange={handleChange}
                        />
                        <Button my={4} type='submit' isLoading={isSubmitting} colorScheme="teal">Create Professor</Button>

                    </Form>
                )}
            </Formik>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogBody>
                            professor created!
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Close
                            </Button>
                        </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
            </AlertDialog>

        </>

    )
}