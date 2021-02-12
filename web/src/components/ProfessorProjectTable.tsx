import React from 'react'

import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react"
import { AllProjectsQuery, useAllProjectsQuery, useProfessorProjectsQuery } from '../generated/graphql';
import { UseQueryResponse } from 'urql';

interface ProfessorProjectTableProps {
   name: string
}

export const ProfessorProjectTable : React.FC<ProfessorProjectTableProps> = ({name}) => {

    
    const [{data, fetching}] = useProfessorProjectsQuery({variables: {professor: name}});
    console.log(data);
    
    let tableConent = [];
    if(data !== undefined ) {
        if(data.professorProjects !== undefined) {
            data.professorProjects.forEach((child) => {
                
                let tableRow = null;
                tableRow = (
                    <Tr key={child.fypgroup.name}>
                        <Td key={child.fypgroup.name}>{child.fypgroup.name}</Td>
                        <Td key={child.title}>{child.title}</Td>
                        <Td key={child.fypgroup.name + '-' + child.superviser.name}>{child.superviser?.name? child.superviser.name : ''}</Td>
                        <Td key={child.fypgroup.name + '-' + child.secondExaminer.name}>{child.secondExaminer.name}</Td>
                        <Td key={child.fypgroup.name + '-schedule'}>{child.schedule}</Td>
                    </Tr>
                )
                tableConent.push(tableRow);
            });
        }
    }

    return (
        <Table variant="simple">
            <TableCaption>Project List</TableCaption>
            <Thead>
                <Tr>
                    <Th>Group name</Th>
                    <Th>Title</Th>
                    <Th>Supervisor</Th>
                    <Th>Second examiner</Th>
                    <Th>Scheduled Presentation time</Th>
                </Tr>
            </Thead>
            <Tbody>
                {tableConent}
            </Tbody>
        </Table>
    )

}