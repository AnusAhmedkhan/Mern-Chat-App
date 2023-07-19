import React from 'react';
import {  Container } from '@chakra-ui/react'
import { Box ,Text} from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
const Landing = () => {
    return (
        <Container maxW='xl' centerContent>
        <Box display="flex" justifyContent="center"
    alignItems="center" bg='#ffe135' fontFamily="sans-serif"  m="40px 0 15px 0" p="3"  width="100%" borderRadius="lg" borderWidth="1px">
                <Text fontSize={"4xl"} fontWeight={"bold"}>
               Chat App
                </Text>
              
            </Box>
            <Box bg='white' fontFamily="sans-serif"  m="20px 0 15px 0" p="3"  width="100%" borderRadius="lg" borderWidth="1px">
            <Tabs variant='soft-rounded' colorScheme='yellow'>
  <TabList>
    <Tab width={"50%"}>Login</Tab>
    <Tab width={"50%"}>Signup</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login/>
    </TabPanel>
    <TabPanel>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>
</Box>
            
        </Container>
    );
}

export default Landing;
