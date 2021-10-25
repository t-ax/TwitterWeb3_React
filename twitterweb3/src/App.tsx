
import './App.css';
import * as ethService from './APIs/eth';
import { useEffect, useState } from 'react';

function App() {
  const [userAccount, setUserAccount] = useState("");
  const [totalNumberOfMessages, setTotalNumberOfMessages] = useState("");

  useEffect(()=>{
    initUserWallet();
    updateTotalNumberOfMessages();
  }, [])

  async function initUserWallet(){
      let account = await ethService.checkWalletIsConnectedAndGetUserAccount();
      setUserAccount(account);
  }

  async function connectToUserWallet(){
      let account = await ethService.connectWallet();
      setUserAccount(account);
  }

  async function updateTotalNumberOfMessages(){
      let total = await ethService.getTotalNumberOfMessages()
      setTotalNumberOfMessages(total);
  }

  async function sendAMessage(){
      await ethService.sendAMessageAndWaitForItToBeMined();
      updateTotalNumberOfMessages();
  }

  return (
    <div className="App">
      <button onClick={connectToUserWallet}>Connection to my wallet</button>
      {/* <h1>Account: {userAccount}</h1> */}
      <h1>Total: {totalNumberOfMessages}</h1>
      <button onClick={sendAMessage}>Send a message</button>
    </div>
  );
}

export default App;
