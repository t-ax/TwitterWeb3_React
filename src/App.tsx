
import './Styles/App.scss';
import * as ethService from './APIs/eth';
import {Message} from './APIs/eth';
import { listOfMessagesFake } from './APIs/eth';
import {randomAvatar} from './APIs/dicebears';
import { useEffect, useState } from 'react';
import MessageSendingBox from './Components/MessageSendingBox';
import MessageReceived from './Components/MessageReceived';
import IconMenu from './Components/IconMenu';
import InformationPanel from './Components/InformationPanel';



function App() {
  const [userAccount, setUserAccount] = useState("");
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
    if(userAccount==""){
      let account = await ethService.connectWallet();
      if(account=="-32002"){
        alert("Connection request already pending on Metamask, please open your wallet and approve the request")
      }
      else{
        setUserAccount(account);
        updateTotalNumberOfMessages();
        getAllMessages();
      }
    }
    else{alert("You can disconnect through your metamask wallet by clicking on the three dots next to your account name. Then select 'Connected sites' and click on the trash icon next to our website. ")}
  }

  async function updateTotalNumberOfMessages(){
      let total = await ethService.getTotalNumberOfMessages()
      setTotalNumberOfMessages(total);
  }

  async function sendAMessage(msg: string, img: string){
        await ethService.sendAMessageAndWaitForItToBeMined(msg, img);
        updateTotalNumberOfMessages();
        getAllMessages();
  }

  async function getAllMessages(){
    try{
      let messages = await ethService.getAllMessages();
      setListOfMessages(messages);
    }catch(error){}
  }

  

  return (
    <div className="App">
      
      {/* Left Panel [Mobile: Bottom Panel] */}
      <IconMenu totalNumberOfMessages={totalNumberOfMessages} connectToUserWallet={connectToUserWallet}/>
      
      {/* Central Panel [Mobile: Central Panel] */}
      {totalNumberOfMessages==="NOWALLET"?
        <div className="centralpanel">
          <MessageSendingBox callback={()=>{alert("Connect your wallet with the Metamask button on the icon panel to interact with the Blockchain")}} avatar={randomAvatar("johnnnnny")} test="true"/>

          {listOfMessagesFake.map((message: any, index: number) => {return ( 
              <MessageReceived key={index} message={message} index={index} avatar={randomAvatar(message.sender.toLowerCase())}/>
            )})
          }
        </div>
        : 
        <div className="centralpanel">
          <MessageSendingBox callback={sendAMessage} avatar={randomAvatar(userAccount)} test="false"/>
          {listOfMessages.map((message: any, index: number) => {return ( 
              <MessageReceived key={index} message={message} index={index} avatar={randomAvatar(message.sender.toLowerCase())}/>
            )})
          }
        </div>
      }

      {/* Right Panel [Mobile: Display none] */}
      <InformationPanel />

    </div>
  );
}

export default App;
