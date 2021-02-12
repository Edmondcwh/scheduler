import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { withUrqlClient } from 'next-urql';
import router from 'next/dist/next-server/lib/router/router';
import React, { FC } from 'react';
import { useState } from 'react';
import { useCreateFypGroupMutation } from '../generated/graphql';
import login from '../pages/login';
import { createUrqlClient } from '../utils/createUrqlClients';
import { toErrorMap } from '../utils/toErrorMap';
import { InputField } from './InputField';

interface CreateGroupProps {}

export const CreateGroup : FC<CreateGroupProps> = ({}) => {
    const [,createGroup] = useCreateFypGroupMutation();
    const [isOpen, setIsOpen] = useState(false)
    const onClose = () => setIsOpen(false)
    const cancelRef = React.useRef()

    const [value, setValue] = useState('');
    const handleChange = (event) => setValue(event.target.value)


    return (
        <>
            <Formik
                initialValues={{fypgroupname: ''}}
                onSubmit = {
                    async (values,{setErrors} ) => {
                        const response = await createGroup({fypgroupname: value});
                        if (response.data.createFypGroup.errors) {
                            const errorMap : Record<string, string> = {};
                            errorMap["fypgroupname"] = response.data.createFypGroup.errors;
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
                            name="fypgroupname"
                            placeholder="Group name"
                            label="Group name"
                            value={value}
                            onChange={handleChange}
                        />
                        <Button my={4} type='submit' isLoading={isSubmitting} colorScheme="teal">Create Group</Button>

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
                            Group created!
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
