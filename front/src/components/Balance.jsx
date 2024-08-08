import React, { useState } from 'react';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AddIcon from '@mui/icons-material/Add';
import LoopIcon from '@mui/icons-material/Loop';
import axios from 'axios'; // Ensure axios is imported
import { useLogContext } from '../providers/LogContext';

const Balance = () => {
  const [baldiam, setBaldiam] = useState(null);
  const [balbric, setBalbric] = useState(null);
  const [error, setError] = useState('');

  const { checklog } = useLogContext();
  const [log, setLog] = checklog;

  const bricbalancefn = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.get('http://localhost:3000/api/token/balance/bric', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log(response);
      const balance = response.data.bricbal;
      setBalbric(balance);
      console.log(balance);
    } catch (error) {
      console.error('Balance failed:', error);
      setError('Balance failed. Please try again later.');
    }
  };

  const diambalancefn = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      const response = await axios.get('http://localhost:3000/api/token/balance/diam', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      console.log(response);
      const balance = response.data.diambal;
      setBaldiam(balance);
      console.log(balance);
    } catch (error) {
      console.error('Balance failed:', error);
      setError('Balance failed. Please try again later.');
    }
  };

  const refreshbal = () =>
  {
    if(log)
    {
      diambalancefn(); 
      bricbalancefn();
    }
    else
    {
      alert("Please verify")
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center bg-gray-900 p-4 rounded-lg shadow-lg w-[450px] h-[950] border-2 border-white">
        <div className="w-full text-center text-white mb-4 flex flex-col">
          <h1 className="text-3xl font-bold tracking-widest uppercase">Balance</h1>
          <h2 className="text-sm text-gray-400 mb-3">Tokens</h2>
          <div className='flex items-center font-semibold hover:cursor-pointer hover:text-[#2e72d2] justify-center' onClick={refreshbal}>
            Refresh Balance <LoopIcon style={{ cursor: 'pointer' }} />
          </div>
        </div>
        <div className="w-full">
          <div className="bg-gray-800 p-4 rounded-lg mb-4 hover:border-2 border-[#2e72d2] hover:scale-105">
            <div className="flex justify-between items-center hover:text-[#2e72d2]">
              <div>
                <h3 className="text-lg font-bold">BRICS</h3>
                <p className="text-sm text-gray-400">BRICS Token</p>
              </div>
              <div>
                <p className="text-lg font-bold">{balbric !== null ? `${balbric} DIAM` : 'Fetching...'}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 p-4 rounded-lg mb-4 hover:border-2 border-[#2e72d2] hover:scale-105">
            <div className="flex justify-between items-center hover:text-[#2e72d2]">
              <div>
                <h3 className="text-lg font-bold">DIAM</h3>
                <p className="text-sm text-gray-400">DIAM Token</p>
              </div>
              <div>
                
                <p className="text-lg font-bold">{baldiam !== null ? `${baldiam} DIAM` : 'Fetching...'}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 w-full flex flex-col items-end space-y-2">
          <div className="text-[#2e72d2] hover:underline flex items-center">
            <AddIcon fontSize='small' className='mr-1' />
            Import tokens
          </div>
          <div className="text-[#2e72d2] hover:underline flex items-center">
            <QuestionMarkIcon fontSize='small' className='mr-1' />
            Brics support
          </div>
        </div>
      </div>
    </div>
  );
};

export default Balance;
