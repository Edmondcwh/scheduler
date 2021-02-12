import React from 'react'
import { useAllGroupsQuery, useAllProfessorsQuery } from '../../generated/graphql'

interface ProfessorsSelectionOptionProps {}

export const ProfessorsSelectionOption : React.FC<ProfessorsSelectionOptionProps> = ({}) => {

    const [{data, fetching}] = useAllProfessorsQuery()
    let selection = [];

    if(fetching) {} 
    else if (data) {
        data.allProfessors.forEach((group) => {
            selection.push(<option value={group.name}>{group.name}</option>)
        })
    }

    return (
        <>
        {selection} 
        </>
    )
}