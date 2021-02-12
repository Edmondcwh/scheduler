import React from 'react'
import { useAllGroupsQuery } from '../../generated/graphql'

interface GroupSelectionOptionProps {}

export const GroupSelectionOpion : React.FC<GroupSelectionOptionProps> = ({}) => {

    const [{data, fetching}] = useAllGroupsQuery()
    let selection = [];

    if(fetching) {} 
    else if (data) {
        data.allGroups.forEach((group) => {
            selection.push(<option value={group.name}>{group.name}</option>)
        })
    }

    return (
        <>
        {selection} 
        </>
    )
}