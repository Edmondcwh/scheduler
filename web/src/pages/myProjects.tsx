import { withUrqlClient } from 'next-urql';
import React from 'react';
import { NavBar } from '../components/NavBar';
import { ProfessorProjectTable } from '../components/ProfessorProjectTable';
import { useMeQuery } from '../generated/graphql';
import { createUrqlClient } from '../utils/createUrqlClients';

interface MyProjectsProps {};

const MyProjects: React.FC<MyProjectsProps> = ({}) => {

    const [{data, fetching}] = useMeQuery();
    let name: string = '';

    if(fetching) {

    } else if(data.me) {
        name = data.me.username;
    }

    return (
        <>
            <NavBar></NavBar>
            <ProfessorProjectTable name={name}/>
        </>
    )

}

export default withUrqlClient(createUrqlClient) (MyProjects);