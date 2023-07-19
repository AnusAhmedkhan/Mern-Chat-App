import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Landing from './Views/Landing/Landing';
import Signup from "./Views/Signup/Signup"
import Homepage from './Views/Homepage/Homepage';
import { UserContext } from './useContext';
import { useState,useEffect,useContext } from 'react';
import { UserContextProvider } from './useContext';


function App() {
  const {username, id} = useContext(UserContext);
  // console.log(username)
  const protectedroute=(comp)=>{
if(username){
  return comp
}else{
  return <Landing/>
}
  }
  return (
    
    <div className="App">
<UserContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={protectedroute(<Homepage/>)}/>
        <Route  path="/Homepage" element={<Homepage/>}/>
      </Routes>
      </BrowserRouter>
      </UserContextProvider>
    </div>
   
  );
}

export default App;
