import React, {useContext, useState } from 'react';
import axios from "axios"
import { Stack, HStack, VStack, Input } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
  
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../useContext';
const Signup = () => {
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const [pic,setPic]=useState()
    const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);
    const navigate=useNavigate()
    const SubmitHandler=async()=>{
try {
    const config={
        headers:{
"Content-type":"application/json",
        },
        withCredentials:true
    }
    const{ data}=await axios.post("http://localhost:5000/api/user/signup",{name,email,password},config)
    if(data.message==="400"){
        alert("fill all the fields")
    }else if(data.message==="403"){
        alert("User Already Exists")
    }else{
        alert("Registeration Successfull")
        setLoggedInUsername(name);
        setId(data.id);
        navigate("/Homepage")
    }
   
    
} catch (error) {
    alert("Registeristtraion Unsucessfull")
}
    }
    return (
       <VStack spacing={"5px"}  color={"black"}>
        <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder='Enter your Name' onChange={(e)=>{setName(e.target.value)}}/>
        </FormControl>
        <FormControl>
            <FormLabel>Email</FormLabel>
            <Input placeholder='Enter your Email' onChange={(e)=>{setEmail(e.target.value)}}/>
        </FormControl>
        <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" placeholder='Enter your Password' onChange={(e)=>{setPassword(e.target.value)}}/>
        </FormControl>
       

<Button colorScheme={"yellow"} marginTop={"10px"} width={"100%"}  onClick={SubmitHandler}>
Signup
</Button>
       </VStack>
    );
}

export default Signup;
