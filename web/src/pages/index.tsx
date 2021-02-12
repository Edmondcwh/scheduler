import { withUrqlClient } from "next-urql"
import { Hero } from "../components/Hero"
import { NavBar } from "../components/NavBar"
import { Scheduler } from "../components/selectableScheduler/Scheduler"
import { Wrapper } from "../components/Wrapper"
import { useMeQuery } from "../generated/graphql"
import { createUrqlClient } from "../utils/createUrqlClients"
import { isServer } from "../utils/isServer"




const Index = () => {


    const [{data, fetching}] = useMeQuery({pause: isServer()});
    let body = null;
    if(fetching) {}
    else if(!data?.me) {
        body = (
            <>
            <NavBar></NavBar>
            <Hero></Hero>
            </>
        )
    } else {
        body = (
            <>
                <NavBar></NavBar>
                <Scheduler role={data.me.role} name={data.me.username}/>
            </>
        )
    }


    return (
        <>
            {body}
        </>
    )
}

export default withUrqlClient(createUrqlClient, {ssr: true}) (Index);
