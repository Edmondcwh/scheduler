import React from 'react';
import {Box, Button, Flex, Link} from "@chakra-ui/react"

import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from '../generated/graphql';
import { isServer } from '../utils/isServer';
interface NavBarProps{}




const CreateAccount: React.FC = ({}) => {

    return (
        <Button
            size="md"
            paddingBottom="3px"
            rounded="md"
            bg="#254E58"
            color="#EFFAEA"
            _hover ={{
                bg: "red.300"
            }}

        >
            Create Account
        </Button>
    )
}



export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{data, fetching}] = useMeQuery({pause: isServer()});
    const [{fetching: logoutFetching}, logout] = useLogoutMutation();
    let body = null;

    if(fetching) {

    } else if (!data?.me) {
        body = (
            <>                  
                <NextLink href="/login">
                    <Link mr={8} fontSize="18px"> Login </Link>
                </NextLink>
                <NextLink href="/register">
                    <Link mr={4}> <CreateAccount/> </Link>
                </NextLink>
                
            </>
        )
    } else if (data.me.role === 'professor') {
        body = (
            <Flex>
                <NextLink href="/myProjects">
                    <Link mr={4}>Project List</Link>
                </NextLink>
                <NextLink href="/">
                    <Link><Box mr={4}>{data.me.username}</Box></Link>
                </NextLink>
                
                <NextLink href ="/">
                    <Button variant="link"
                        onClick = {async () => {
                            logout()
                        }}
                        isLoading={logoutFetching}            
                    >
                        logout
                    </Button>
                </NextLink>
                
            </Flex>
        )
    } else  if( data.me.role === 'admin'){
        body = (<Flex>              
            <NextLink href="/admin">
            <Link><Box mr={4}>{data.me.username}</Box></Link>
            </NextLink>  
            <NextLink href="/projects">
            <Link><Box mr={4}>Schedule Projects</Box></Link>
            </NextLink>
            <NextLink href ="/">
                <Button variant="link"
                    onClick = {async () => {
                        logout()
                    }}
                    isLoading={logoutFetching}            
                >
                    logout
                </Button>
            </NextLink>
        </Flex>)
    } else {
        body = (<Flex>                
            <Box mr={4}>{data.me.username}</Box>
            
            <NextLink href ="/">
                <Button variant="link"
                    onClick = {async () => {
                        logout()
                    }}
                    isLoading={logoutFetching}            
                >
                    logout
                </Button>
            </NextLink>
            
        </Flex>)
    }

    return (
        <Flex 
            bg={["#88BDBC"]}
            color={["#EFFAEA"]}
            p={6}
            wrap="wrap"
            align="cener"
            justify="space-between"
            w="100%"
            mb={8}

        >
            
            <Box ml={"auto"}>
                {body}
            </Box>
        </Flex>
    )
}