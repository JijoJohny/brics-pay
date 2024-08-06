import { AnonAadhaarProof, LaunchProveModal, LogInWithAnonAadhaar, useAnonAadhaar } from '@anon-aadhaar/react'
import { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Anon = () => {

    const [anonAadhar] = useAnonAadhaar();
    const [title , setTitle] = useState("")
    const [log,setLog] = useState(false)
    const setFunc = () =>
    {
      setTitle("Logout");
      setLog(true)
    }
    useEffect(()=>
    {
        console.log("Anon Status: ",anonAadhar.status);
        anonAadhar.status == "logged-out" || anonAadhar.status == "logging-in" ? setTitle("Login") : setFunc()
        console.log(log)
        const a = anonAadhar.anonAadhaarProofs;
        if(a){
          console.log(a);
          
          const parsedData = JSON.parse(a["0"].pcd);
        const gender = parsedData.claim.gender;
        const pincode = parsedData.claim.pincode;
        console.log("Gender:", gender);
        console.log("Pincode:", pincode);
        }
           
    }, [anonAadhar,log]);


  return (
    <div className='text-white absolute right-0'>
        {/* <LogInWithAnonAadhaar 
        nullifierSeed="113127483288210213123711461142312541791634"
          fieldsToReveal={["revealAgeAbove18", "revealPinCode","revealGender","revealState"]} 
  /> */}
  <div className='mr-4'>
      {!log &&(
        
        <LaunchProveModal
        
        buttonStyle={{ backgroundColor: '#9333ea', color: 'white' }}
        buttonTitle={title}
        nullifierSeed = "113127483288210213123711461142312541791634"
        fieldsToReveal={["revealAgeAbove18", "revealPinCode","revealGender","revealState"]}
        
      />)
      
      }
      {
        log &&(
          <div className='flex justify-end items-center hover:cursor-pointer'>
          
          <AccountCircleIcon fontSize='large'/>
          <p className='text-lg'>✅</p>
          </div>
        )
      }
    </div>
            {/* <p>status: {anonAadhar?.status}</p> */}
            <div >
      {/* Render the proof if generated and valid */}
      
    </div>
    </div>
  );
}

export default Anon


