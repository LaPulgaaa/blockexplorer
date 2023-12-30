import { Alchemy, Network } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";


// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
  apiKey: "qe2XblYytv6J3djTSz8VnkSgFtFzh5LH",
  network: Network.ETH_MAINNET,
};


// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings);

function App() {
  
  const [hash,setHash]=useState();
  const [comp,setComp]=useState();
  const [gasprice,setGasprice]=useState();
  useEffect(() => {
    async function gasPrice() {
      const gas=await alchemy.core.getGasPrice();
      const gasprice=parseInt(gas,16)/1000000000;
      setGasprice(gasprice)
      
    }
    gasPrice()
    
  });

  async function getBlock(){
    const data=await alchemy.core.getBlockWithTransactions(hash);

    const page=<div className='p-6 m-24'>
        <h1 className=' text-2xl m-12 font-bold'>Block #{data.number}</h1>
        <div className='shadow-lg p-4'>
        <div className='p-4 m-4 '><span className='mx-6 text-slate-400'>Block Number: </span>{data.number}</div>
        <div className='p-4 m-4 '><span className='mx-6 text-slate-400'>TimeStamp: </span>{data.timestamp}</div>
        <div className='p-4 m-4 '><span className='mx-6 text-slate-400'>Transactions: </span>{data.transactions.length} transactions</div>
        <br/>
        <div className='p-4 m-4 '><span className='mx-6 text-slate-400'>Mined By: </span>{data.miner}</div>
        <div className='p-4 m-4 '><span className='mx-6 text-slate-400'>Difficulty: </span>{data.difficulty}</div>
        <div className='p-4 m-4'><span className='mx-6 text-slate-400'>Nonce: </span>{parseInt(data.nonce,16)}</div>
        <br/>
        <div className='p-4 m-4 '><span className='mx-6 text-slate-400'>Gas Limit: </span> {parseInt(data.gasLimit._hex,16)}</div>
        <div className='p-4 m-4 '><span className='mx-6 text-slate-400'>Gas Used:</span>{parseInt(data.gasUsed._hex,16)}</div>
        </div>

        </div>
        

    setComp(page)
        
  }

  return <div className='m-4'>
    <div className='m-4'>
      <span className='text-slate-400 '>Gas Price:</span>
      {gasprice}
    </div>
    <div className='m-4 flex justify-between cursor-pointer'>
      <h3 className='m-4'>BlockExplorer</h3>
      <div className='flex justify-between'>
      <h3 className='m-4'>Home</h3>
      <h3 className='m-4'>Blockchain</h3>
      </div>
      
      
    </div>
    <div className='flex m-4'>
        <div className='flex  w-full border-2 border-black rounded-md p-2'>
          <input className='p-2 rounded-md  w-full'
          onChange={(e)=>setHash(e.target.value)}
           value={hash} placeholder='Search by Address/ Block/Txn Hash' type='text' />
           <CiSearch size={36} onClick={getBlock} className='m-2  cursor-pointer  bg-black text-white rounded-md ' />
        </div>
      </div>
     {comp ? comp: <h1>Loading..</h1>}
    </div>;
}

export default App;
