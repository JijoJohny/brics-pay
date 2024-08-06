import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from "./pages/Login";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import Anon from "./components/Anon";
import { useEffect, useState } from "react";

function App() {
  
  const[ready,setReady] = useState(false)
  
  useEffect(()=>
  {
    setReady(true)
  },[]);

  return (
    <>
    {ready ?
      <AnonAadhaarProvider _useTestAadhaar={false}> 
   <div className="min-h-screen w-full flex flex-col bg-black font-source">
      <BrowserRouter>
   <Routes>
   <Route path="/" element={<Login/>}/>
     <Route path="/home" element={<Home/>}/>
     <Route path="/anon" element={<Anon/>}/>



   </Routes>
   
    
   </BrowserRouter>
    </div>
    </AnonAadhaarProvider> 
    :null}
   
    </>  
  )
}

export default App
