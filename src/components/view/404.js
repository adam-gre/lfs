import React from 'react';
import { Box, Container, Text } from 'bumbag';

document.title ="Error | Legacy Freight Services";
const Error404 = () => (
    <Container isFluid>
        <Box alignY="center" alignX="center" border="none" height="100vh">
            <Text fontWeight="bold" fontSize="8vw" use="samp">404&nbsp;
                <Text fontWeight="normal" fontSize="5vw">Not Found</Text>
            </Text>
        </Box>
    </Container>
);

export default Error404;
