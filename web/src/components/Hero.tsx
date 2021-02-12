import { Flex, Heading, Stack } from '@chakra-ui/react'
import React from 'react'

interface HeroProps {}

export const Hero: React.FC<HeroProps> = ({}) => {

    let title = 'Final Year Project presentation Scheduler';
    let subtitle = 'This scheduler aims at simplfying the process of scheduling the presentation of each projects. ';
    return (
        <Flex
            align="center"
            justify={{ base: "center", md: "space-around", xl: "space-between" }}
            direction={{ base: "column-reverse", md: "row" }}
            
            minH="50vh"
            ml={400}
            mb={16}
        >
        <Stack
            spacing={4}
            w="25%"
            align={"flex-start"}
        >
            <Heading
                as="h1"
                size="xl"
                fontWeight = "bold"
                color="#254E58"
                textAlign={"left"}
            >
                {title}
            </Heading>
            <Heading 
                as="h2"
                size="md"
                color="#254E58"
                opacity = "0.8"
                fontWeight = "normal"
                lineHeight={1.5}
                textAlign={"left"}
            >
                {subtitle}
            </Heading>


        </Stack>

        </Flex>
    )

}