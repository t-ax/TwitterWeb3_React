
import './App.css';
import * as ethService from './APIs/eth';
import {Message} from './APIs/eth';
import { useEffect, useState } from 'react';

function App() {
  const [userAccount, setUserAccount] = useState("");
  const [userMessageToSend, setUserMessageToSend] = useState("");
  const [totalNumberOfMessages, setTotalNumberOfMessages] = useState("");
  const [listOfMessages, setListOfMessages] = useState<Message[]>([]);

  useEffect(()=>{
    initUserWallet();
    updateTotalNumberOfMessages();
    getAllMessages();
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
      await ethService.sendAMessageAndWaitForItToBeMined(userMessageToSend);
      updateTotalNumberOfMessages();
      getAllMessages();
  }

  async function getAllMessages(){
      let messages = await ethService.getAllMessages();
      setListOfMessages(messages);
  }

  return (
    <div className="App">
      <button onClick={connectToUserWallet}>Connection to my wallet</button>
      {/* <h1>Account: {userAccount}</h1> */}
      <input onChange={event => setUserMessageToSend(event.target.value)} placeholder="Send a message..." />
      <button onClick={sendAMessage}>Send a message</button>

      <h1>Total: {totalNumberOfMessages}</h1>
      {console.log(listOfMessages[0])}
      <div>{listOfMessages
                    .map((message: Message, index: number) => {return ( 
                    
                    <div key={index}>
                      {/* {console.log(message.sender)} */}
                    <div>sender : {message.sender}</div>
                    <div>message : {message.message}</div>
                    <div>time : {message.timestamp.toString()}</div>
                    </div>
                )})
            }
      </div>
    </div>
  );
}

export default App;
