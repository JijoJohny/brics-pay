import { LaunchProveModal, useAnonAadhaar } from '@anon-aadhaar/react';
import { useEffect, useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { useLogContext } from '../providers/LogContext.jsx';

const Anon = () => {
    const [anonAadhar] = useAnonAadhaar();

    
    
    const [showAlert, setShowAlert] = useState(false);
    const [estat,setEstat] = useState("")

    const { checklog } = useLogContext();
    const [log, setLog] = checklog
    console.log("log",log);
    
    const getemail = async() =>
        {
          try{
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/api/user/get-email',{
            headers:{
              'Authorization' : `Bearer ${token}`,
             }
             });
             //console.log(response.data.email + 'verified');
             
            setEstat(response.data.email + 'verified')
        
            }
          catch(error)
          {
            console.error("error:",error)
          }
        }
    getemail()    

    useEffect(()=>{
    
    //console.log("Anon Status: ", anonAadhar.status);
    if(anonAadhar.status === "logged-in" || estat === localStorage.getItem('stats') )
        {  setLog(true);
    console.log("inside log",log);
    const a = anonAadhar.anonAadhaarProofs;
    
    if (a) {
      //console.log(a);
      const parsedData = JSON.parse(a["0"].pcd);
      localStorage.setItem('proof',parsedData)
      localStorage.setItem('stats',estat)
      console.log("estat:",estat);
      
     // const gender = parsedData.claim.gender;
     // const above = parsedData.claim.ageAbove18;
    //   console.log("Gender:", gender);
    //   console.log("Above 18:", above);
    }
}
    },[anonAadhar.anonAadhaarProofs, anonAadhar.status, estat, log,setLog])

    useEffect(() => {
        if (log) {
          setShowAlert(true);
          const timer = setTimeout(() => {
            setShowAlert(false);
          }, 3000); // 3 seconds
    
          return () => clearTimeout(timer);
        }
      }, [log]);


    return (
        <div className='text-white absolute right-3 top-5'>
          {log !== true ? (
            <div >
              <LaunchProveModal
                buttonStyle={{ backgroundColor: '#9333ea', color: 'white' }}
                buttonTitle="Verify"
                nullifierSeed="113127483288210213123711461142312541791634"
                fieldsToReveal={["revealAgeAbove18", "revealGender"]}
                
              />
            </div>
          ) : (
            <div className='flex justify-end items-center hover:cursor-pointer'>
              <AccountCircleIcon fontSize='large' />
              <p className='text-lg'>✅</p>
            </div>
          )}
    
          {showAlert && (
            <Alert severity="success" variant='outlined' className='absolute right-1/2'>
              Login Successful
            </Alert>
          )}
        </div>
      );
    }
    
    export default Anon;
    