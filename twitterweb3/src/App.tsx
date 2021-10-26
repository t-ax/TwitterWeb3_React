
import './App.scss';
import * as ethService from './APIs/eth';
import {Message} from './APIs/eth';
import { useEffect, useState } from 'react';

const listOfMessagesFake = [
  {
    sender:"0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    message:"test",
    timestamp: new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    message:"test",
    timestamp: new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
    message:"test",
    timestamp: new Date(Date.UTC(2021, 10, 25)).valueOf()
  },
  {
    sender:"0x90f79bf6eb2c4f870365e785982e1f101e93b906",
    message:"test",
    timestamp: new Date(Date.UTC(2021, 10, 14)).valueOf()
  },
  {
    sender:"0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
    message:"test",
    timestamp: new Date(Date.UTC(2021, 10, 14)).valueOf()
  },
  {
    sender:"0x976ea74026e726554db657fa54763abd0c3a0aa9",
    message:"test",
    timestamp: new Date(Date.UTC(2021, 10, 14)).valueOf()
  },
  {
    sender:"0x14dc79964da2c08b23698b3d3cc7ca32193d9955",
    message:"test",
    timestamp: new Date(Date.UTC(2021, 10, 14)).valueOf()
  },

]

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
      updateTotalNumberOfMessages();
      getAllMessages();
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
      <div className="Total">Total: {totalNumberOfMessages}</div>
      <div className="etherscan"><a href="https://rinkeby.etherscan.io/address/0xd6a5B3390B8DdD0593A12E9C86d631D9033C9747">Contract on Etherscan</a></div>
      <button className="button connect" onClick={connectToUserWallet} >Connection to my wallet</button>
      {/* <h1>Account: {userAccount}</h1> */}
      <div className="message">
        <input className="input" onChange={event => setUserMessageToSend(event.target.value)} placeholder="Send a message..." />
        <button className="button" onClick={sendAMessage}>Send a message</button>
      </div>
      {totalNumberOfMessages==="NOWALLET"?
        <div className="panel">
          <div>Please connect your account for real messages</div>
          {listOfMessagesFake
                  .map((message: any, index: number) => {return ( 
                  <div className="message" key={index}>
                    <div className="sender">sender : {message.sender}</div>
                    <div className="message">message : {message.message}</div>
                    <div className="timestamp">time : {message.timestamp.toString()}</div>
                  </div>
              )})
          }
        </div>


        : 

        
        <div className="panel">{listOfMessages
                      .map((message: Message, index: number) => {return ( 
                      <div className="message" key={index}>
                        <div className="sender">sender : {message.sender}</div>
                        <div className="message">message : {message.message}</div>
                        <div className="timestamp">time : {message.timestamp.toString()}</div>
                      </div>
                  )})
              }
        </div>
      }
    </div>
  );
}

export default App;
