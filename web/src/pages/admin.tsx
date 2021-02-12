import { Box, Flex } from '@chakra-ui/react';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import React from 'react';
import { CreateGroup } from '../components/CreateGroup';
import { CreateProfessor} from '../components/createProfessor';
import { CreateProject } from '../components/createProjectComponent/createProject';
import { NavBar } from '../components/NavBar';
import { useMeQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClients';

interface adminProps {}

const Admin: React.FC<adminProps> = ({}) => {
    const [{data, fetching}] = useMeQuery();
    const route = useRouter();

    let body = null;
    
    if(fetching) {

    } else if( !data?.me) {
        route.push('/');
    } else if (data.me.role === 'admin'){
        
        
    } else {
        route.push('/');
    }


    return (
        <>
            
            <NavBar></NavBar>
            <Flex direction="row">
            <Box ml="20px" mt="20px" w="20%" h="25%" borderWidth="1px" borderRadius="lg" >
                <CreateGroup/>
            </Box>

            <Box ml="20px" mt="20px" w="20%" h="25%" borderWidth="1px" borderRadius="lg" >
                <CreateProfessor/>
            </Box>
            <Box ml="20px" mt="20px" w="20%" h="25%" borderWidth="1px" borderRadius="lg" >
                <CreateProject/>
            </Box>
            </Flex>

            <div>{body}</div>
        </>
    )
}

export default withUrqlClient(createUrqlClient) (Admin);