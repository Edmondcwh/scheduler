import React from 'react'

import { Table, Thead, Tbody, Tr, Th, Td, TableCaption } from "@chakra-ui/react"
import { AllProjectsQuery, useAllProjectsQuery } from '../generated/graphql';
import { UseQueryResponse } from 'urql';

interface ProjectTableProps {
    data: AllProjectsQuery ,
    schedule: string[]
}

export const ProjectTable : React.FC<ProjectTableProps> = ({data, schedule}) => {
    
    
    
    let tableConent = [];
    if(data !== undefined ) {
        if(data.allProjects !== undefined) {
            let i :number = 0;
            data.allProjects.forEach((child) => {
                
                let tableRow = null;
                tableRow = (
                    <Tr key={child.fypgroup.name}>
                        <Td key={child.fypgroup.name}>{child.fypgroup.name}</Td>
                        <Td key={child.title}>{child.title}</Td>
                        <Td key={child.fypgroup.name + '-' + child.superviser.name}>{child.superviser?.name? child.superviser.name : ''}</Td>
                        <Td key={child.fypgroup.name + '-' + child.secondExaminer.name}>{child.secondExaminer.name}</Td>
                        <Td key={child.fypgroup.name + '-schedule'}>{schedule === undefined ? '' : schedule[i]}</Td>
                    </Tr>
                )
                tableConent.push(tableRow);
                i++
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