import React from 'react'
import { useMyProjectQuery } from '../../generated/graphql'

interface UserInformationProps {
    groupname:string
}

export const UserInformation: React.FC<UserInformationProps> = ({groupname}) => {

    let studentInformation = null 
    const [{data, fetching}] = useMyProjectQuery({variables: {groupname: groupname}})
    if(fetching) {

    } else if (data !== undefined && data.myProject !== undefined) {
        let formatedTime: string = 'NA'
        if(data.myProject.project.schedule !== null) {
            formatedTime = data.myProject.project.schedule.substring(0,2) + '/' + data.myProject.project.schedule.substring(2,4)
            
            formatedTime += ': ' + data.myProject.project.schedule.substring(4,8) + '-' + data.myProject.project.schedule.substring(13,18);
        }
        studentInformation = (
            <>
            <div>Account No.: {data.myProject.project.fypgroup.name}</div>
            <div>Project Title: {data.myProject.project.title}</div>
            <div>Supervisor: {data.myProject.project.superviser.name}</div>
            <div>Second Examiner: {data.myProject.project.secondExaminer.name}</div>
            <div>First Presentation Schedule: {formatedTime}</div>
            </>
        )
        console.log(data.myProject.project)
    }

    return (
        <>
        {studentInformation}
        </>
    )

}