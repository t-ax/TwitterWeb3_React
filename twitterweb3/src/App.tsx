
import './App.scss';
import * as ethService from './APIs/eth';
import {Message} from './APIs/eth';
import { useEffect, useState } from 'react';
import MessageSendingBox from './Components/MessageSendingBox';
import MessageReceived from './Components/MessageReceived';

const listOfMessagesFake = [
  {
    sender:"0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    message:"Climbing on the window. \n Happy Halloween Cool Cats fam! Jack-o-lantern",
    timestamp: '1h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    message:"Had a few hours today to render my #Spooktacular #Halloween art/carving submission. \n Happy Halloween Cool Cats fam! Jack-o-lantern",
    timestamp: '1h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    message:"test",
    timestamp: '1h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
    message:"test",
    timestamp: '1h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0x90f79bf6eb2c4f870365e785982e1f101e93b906",
    message:"test",
    timestamp: '1h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
    message:"test",
    timestamp: '1h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0x976ea74026e726554db657fa54763abd0c3a0aa9",
    message:"test",
    timestamp: '1h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0x14dc79964da2c08b23698b3d3cc7ca32193d9955",
    message:"test",
    timestamp: '1h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
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

  function autoResizeTextArea(e:any){
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight+25}px`; 
  }

  return (
    <div className="App">
      <div className="header">
        <div className="Total">Total: {totalNumberOfMessages}</div>
        <div className="etherscan"><a href="https://rinkeby.etherscan.io/address/0xd6a5B3390B8DdD0593A12E9C86d631D9033C9747">Contract on Etherscan</a></div>
        <button className="button connect" onClick={connectToUserWallet} >Connection to my wallet</button>
      </div>
      <h1>Account: {userAccount}</h1>
      {totalNumberOfMessages==="NOWALLET"?
        <div className="panel">
          <div className="sendmessage">

            <div className="picture"><img src={`https://avatars.dicebear.com/api/open-peeps/johnnnnny.svg`}/></div>
            <div>
              <div className="top">
                <textarea className="input" spellCheck="false" onKeyDown={autoResizeTextArea} onChange={event => setUserMessageToSend(event.target.value)} placeholder="What's happening?" />
              </div>
              <div className="bottom">
                <div className="addingmedia">
                  <button className="media"></button>
                  <button className="media"></button>
                  <button className="media"></button>
                  <button className="media"></button>
                </div>
                <button className="button" onClick={sendAMessage}>Send</button>
              </div>
            </div>

          </div>
          {/* <div>Please connect your account for real messages</div> */}
          {listOfMessagesFake
                  .map((message: any, index: number) => {return ( 
                  <div className="receivemessage" key={index}>
                    <div className="picture"><img src={`https://avatars.dicebear.com/api/open-peeps/${message.sender.toLowerCase()}.svg`}/></div>
                    <div className="message">
                      <div className="information">
                        <div className="sender">{message.sender}</div>
                        <div className="timestamp">{message.timestamp.toString()}</div>
                      </div>
                      <div className="text">{message.message}</div>
                    </div>
                  </div>
              )})
          }
        </div>


        : 

        
        <div className="panel">
          
          
          <div className="sendmessage">

            <div className="picture"><img src={`https://avatars.dicebear.com/api/open-peeps/${userAccount}.svg`}/></div>
            <div>
              <div className="top">
                <textarea className="input" spellCheck="false" onKeyDown={autoResizeTextArea} onChange={event => setUserMessageToSend(event.target.value)} placeholder="What's happening?" />
              </div>
              <div className="bottom">
                <div className="addingmedia">
                  <button className="media"></button>
                  <button className="media"></button>
                  <button className="media"></button>
                  <button className="media"></button>
                </div>
                <button className="button" onClick={sendAMessage}>Send</button>
              </div>
            </div>


{/* msg.sender : 0x4117455319eE6a8Bd98C80c0f5eab7830EC7A559
    getmetamask: 0x4117455319ee6a8bd98c80c0f5eab7830ec7a559 */}


          </div>
          {listOfMessages
                      .map((message: any, index: number) => {return ( 
                        <div className="receivemessage" key={index}>
                          <div className="picture"><img src={`https://avatars.dicebear.com/api/open-peeps/${message.sender.toLowerCase()}.svg`}/></div>
                          <div className="message">
                            <div className="information">
                              <div className="sender">{message.sender.toLowerCase()}</div>
                              <div className="timestamp">{Math.trunc(((new Date().getTime()-message.timestamp)/3600000))}hr</div>
                            </div>
                            <div className="text">{message.message}</div>
                          </div>
                        </div>
                    )})
                }
        </div>
      }
    </div>
  );
}

export default App;
