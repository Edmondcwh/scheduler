import React from 'react';
import {Formik, Form} from 'formik';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { Box, Button, Text } from '@chakra-ui/react';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClients';
import { NavBar } from '../components/NavBar';

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
    const[,register] = useRegisterMutation();
    const route = useRouter();
    return (
        <>
            <NavBar/>
            <Wrapper>
                <Text fontSize="40px" color={"#4F4A41"} mb={8}>Registration</Text>
                <Formik
                    initialValues={{username:"", password: "", email:""}}
                    onSubmit={async (values, {setErrors}) => {
                        const response = await register(values);
                        if(response.data.register.errors) {
                            setErrors(toErrorMap(response.data.register.errors));
                        } else if (response.data?.register.user) {
                            route.push('/');
                        }

                    }}
                >
                    {({isSubmitting}) => (
                        <Form>
                            <InputField
                                name="username"
                                
                                label="Username (If you are a professor, type your name. If you are a student, type your group name)"
                                
                            />
                            <Box mt={4}>
                                <InputField
                                    name="email"
                                    
                                    label="Email"
                                />
                            </Box>
                            <Box mt={4}>
                                <InputField
                                    name="password"
                                    
                                    label="Password"
                                    type="password"
                                />
                            </Box>
                            <Button my={4} type='submit' isLoading={isSubmitting} colorScheme="teal">Register</Button>

                        </Form>
                    )}
                </Formik>
            </Wrapper>
        </>
    )
}

export default withUrqlClient(createUrqlClient) (Register);