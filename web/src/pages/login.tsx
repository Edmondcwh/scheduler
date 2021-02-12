import { Box, Button } from '@chakra-ui/react'
import { Form, Formik } from 'formik'
import React from 'react'
import { InputField } from '../components/InputField'
import { Wrapper } from '../components/Wrapper'
import { useLoginMutation } from '../generated/graphql'
import { toErrorMap } from '../utils/toErrorMap'
import { useRouter} from "next/router";
import {withUrqlClient} from 'next-urql';
import { createUrqlClient } from '../utils/createUrqlClients'
import { NavBar } from '../components/NavBar'
interface LoginProps {

}
const Login: React.FC<LoginProps> = ({}) => {
    const [,login] = useLoginMutation();
    const router = useRouter();
    
    return (
        <>
        <NavBar/>
        <Wrapper>
            <Formik
                initialValues={{usernameOrEmail: '', password: ''}}
                onSubmit = {
                    async (values,{setErrors} ) => {
                        const response = await login(values)
                        if (response.data.login.errors) {
                            setErrors(toErrorMap(response.data.login.errors));
                            console.log('errer')
                        } else if (response.data?.login.user) {
                            console.log('success')
                            if (response.data.login.user.role === "admin") {
                                router.push('admin');
                            } else {
                                router.push('/');
                                console.log('success')
                            }
                            
                        }
                        console.log('success')
                        
                    }
                }
                >
                {({isSubmitting}) => (
                    <Form>
                        <InputField
                            name="usernameOrEmail"
                            placeholder="usernameOrEmail"
                            label="Username Or Email"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button my={4} type='submit' isLoading={isSubmitting} colorScheme="teal">Login</Button>

                    </Form>
                )}
            </Formik>
        </Wrapper>
        </>
    )
}

export default withUrqlClient(createUrqlClient) (Login);