import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Login from "./pages/Login";
import { AnonAadhaarProvider } from "@anon-aadhaar/react";
import Anon from "./components/Anon";

function App() {
  

  return (
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
      
  )
}

export default App
