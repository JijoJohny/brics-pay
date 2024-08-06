import { AnonAadhaarProof, LogInWithAnonAadhaar, useAnonAadhaar } from '@anon-aadhaar/react'
import { useEffect } from 'react'

const Anon = () => {

    const [anonAadhar] = useAnonAadhaar();

    useEffect(()=>
    {
        console.log("Anon Status: ",anonAadhar.status);
        
    }, [anonAadhar]);


  return (
    <div className='text-blue-500'>
        <LogInWithAnonAadhaar 
        nullifierSeed="113127483288210213123711461142312541791634"
          fieldsToReveal={["revealAgeAbove18", "revealPinCode","revealGender","revealState"]} 
  />
            <p>status: {anonAadhar?.status}</p>
            <div >
      {/* Render the proof if generated and valid */}
      {anonAadhar?.status === "logged-in" && (
        <>
          <p className='text-white'>✅ Proof is valid</p>
          <AnonAadhaarProof code={JSON.stringify(anonAadhar.anonAadhaarProofs, null, 2)} className="text-white"/>
        </>
        )}
    </div>
    </div>
  );
}

export default Anon