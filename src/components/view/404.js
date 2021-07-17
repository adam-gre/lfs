import React from 'react';
import { Box, Container, Text } from 'bumbag';
import um from '../../assets/um.png';

document.title ="Error | Legacy Freight Services";
const Error404 = () => (
    <Container isFluid>
        <Box alignY="center" alignX="center" border="none" height="100vh">
            <Text fontWeight="bold" fontSize="8vw" use="samp">404?
            </Text>

            <Text fontWeight="normal" fontSize="3vw" use="samp">More like 'no, oh no' am I right? </Text>
            <img src={um} width='5%' />
        </Box>
    </Container>
);

export default Error404;
