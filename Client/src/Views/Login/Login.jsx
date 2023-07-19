import React, { useState ,useContext} from 'react'
import { Stack, HStack, VStack, Input } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
  } from '@chakra-ui/react'
  import axios from "axios";
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../useContext';

const Login = () => {
   
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    
    const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);
    const navigate=useNavigate()
    const SubmitHandler=async()=>{
        try {
            const config={
                headers:{
        "Content-type":"application/json",
                },
                
                withCredentials:true,
                
            }
            const{ data}=await axios.post("http://localhost:5000/api/user/login",{email,password},config)
            if(data.message==="400"){
                alert("fill all the fields")
            }else if(data.message==="200"){
                alert("Login Successfull")
                setLoggedInUsername(email);
                setId(data.id);
                navigate("/Homepage")
            }else{
                alert("Invalid Credentials!")
                
            }
           
            
        } catch (error) {
            alert("Registeristtraion Unsucessfull")
        }
    }
    return (
        <VStack spacing={"5px"}  color={"black"}>
        <FormControl>
        <FormLabel color={"black"} >Email</FormLabel>
        <Input placeholder='Enter your Email' onChange={(e)=>{setEmail(e.target.value)}}/>
    </FormControl>
    <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" placeholder='Enter your Password' onChange={(e)=>{setPassword(e.target.value)}}/>
    </FormControl>
    <Button colorScheme={"yellow"} marginTop={"10px"} width={"100%"} onClick={SubmitHandler}>
Login
</Button>
   </VStack>
    );
}

export default Login;
