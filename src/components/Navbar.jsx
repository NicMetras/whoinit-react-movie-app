import { Flex, Box, Heading, Text, Button, Spacer, HStack } from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';

export default function Navbar() {
    return (
        <Flex as="nav" paddingLeft="50px" paddingRight="50px" alignItems="center">
            <Heading as="h1" color="white">Whoinit Movie App</Heading>
            <Spacer />

            <HStack spacing="20px">
                <NavLink to="/" style={{ color: 'white' }}>
                    About
                </NavLink>
            </HStack>
        </Flex>
    );
}
