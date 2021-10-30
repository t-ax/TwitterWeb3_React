
import './Styles/App.scss';
import logo from './Assets/Images/logo.png';
import faucet from './Assets/Images/faucet.jpg';
import metamask from './Assets/Images/metamask.svg';
import github from './Assets/Images/github.png';
import etherscan from './Assets/Images/etherscan.jpeg';

import * as ethService from './APIs/eth';
import {Message} from './APIs/eth';
import { useEffect, useState } from 'react';
import MessageSendingBox from './Components/MessageSendingBox';
import MessageReceived from './Components/MessageReceived';

const listOfMessagesFake = [
  {
    sender:"0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    message:"Time to enjoy life !! #FridayIsTheDay #WeekendHereICome",
    image:"https://media.giphy.com/media/sTczweWUTxLqg/giphy.gif",
    timestamp: '1h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    message:"When you love cats, you want to share your passion with the world ! #MoreCatsLessProblems",
    image:"https://media.tenor.com/images/96163c159943a2b8960aa8322d12c6f5/tenor.gif",
    timestamp: '2h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
    message:"test",
    image:"",
    timestamp: '3h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0x90f79bf6eb2c4f870365e785982e1f101e93b906",
    message:"test",
    image:"",
    timestamp: '5h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
    message:"test",
    image:"",
    timestamp: '8h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0x976ea74026e726554db657fa54763abd0c3a0aa9",
    message:"test",
    image:"",
    timestamp: '15h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"0x14dc79964da2c08b23698b3d3cc7ca32193d9955",
    message:"test",
    image:"",
    timestamp: '19h'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },

]

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
      <div className="leftpanel">
        <div className="img logo"> <img src={logo}/></div>
        <div className="img wallet" onClick={connectToUserWallet}> <img alt="Wallet Connect" src={metamask}/></div>{/* Wallet Connect */}
        <a className="img faucet" target="_blank" href="https://faucet.rinkeby.io/"> <img src={faucet}/></a>{/* Ethereum Faucet */}
        <a className="img etherscan" target="_blank" href="https://rinkeby.etherscan.io/address/0xa172d9772309E453Ed660f23247D446558Df813B"> <img src={etherscan}/></a>{/* Github Code */}
        <a className="img github" target="_blank" href="https://faucet.rinkeby.io/"> <img src={github}/></a>{/* Github Code */}
        
        {/* etherscan */}
        {/* Account */}
        {/* CodeGithub */}
        {/* <div className="Total">Total: {totalNumberOfMessages}</div>
        <div className="etherscan"><a href="https://rinkeby.etherscan.io/address/0xd6a5B3390B8DdD0593A12E9C86d631D9033C9747">Contract on Etherscan</a></div>
        <button className="button connect" onClick={connectToUserWallet} >Connection to my wallet</button> */}
      </div>

      {totalNumberOfMessages==="NOWALLET"?
        <div className="centralpanel">
          <MessageSendingBox callback={sendAMessage} userAccount="johnnnnny" />
          
          {listOfMessagesFake.map((message: any, index: number) => {return ( 
              <MessageReceived key={index} message={message} index={index}/>
            )})
          }
        </div>
        : 
        <div className="centralpanel">
          <MessageSendingBox callback={sendAMessage} userAccount={userAccount}/>
          {listOfMessages.map((message: any, index: number) => {return ( 
              <MessageReceived key={index} message={message} index={index}/>
            )})
          }
        </div>
      }

        <div className="rightpanel">
          <div  className="instructions">
            <div className="title">Instructions</div>
            <ul className="list">
              <li>
                  <div className="subtitle">#BuildSpaceProject</div>
                  <div className="text">I'm Tariq Axel, and this is my version of the Web3 project following the course taught within <a href="https://buildspace.so">BuildSpace</a> </div>
              </li>
              <li>
                  <div className="subtitle">#TweetOnTheBlockchain</div>
                  <div className="text">This is a blockchain version of Twitter using the Ethereum Rinkeby Test Network</div>
              </li>
              <li>
                  <div className="subtitle">#MetamaskMyData</div>
                  <div className="text important">The currently displayed messages are fake, connect your wallet (metamask button on the left panel) to read real messages left by other users</div>
              </li>
              <li>
                  <div className="subtitle">#NoLimits</div>
                  <div className="text">You can send unlimited messages too that will be written on the blockchain for other users to read</div>
              </li>
              <li>
                  <div className="subtitle">#MoneyFaucet</div>
                  <div className="text">Reading is free but to write you need to use ethereum (it's free because it's a test Network) : <a target="_blank" href="https://faucet.rinkeby.io/">Get Free Test ETH #OfficialLink</a></div>
              </li>
              <li>
                  <div className="subtitle">#GeneratedDicebearAvatar</div>
                  <div className="text">An avatar is automatically & randomly generated based on your public address, you'll always have the same and it will always be different than others </div>
              </li>
              <li>
                  <div className="subtitle">#AccessibleCode&Contract</div>
                  <div className="text">On the left panel, you may click on the Etherscan icon to get information about the smart contract used in this website and you may click on the github icon to check the Solidity & React source code </div>
              </li>
            </ul>
          </div>
          
        </div>

      {/* <h1>Account: {userAccount}</h1> */}

    </div>
  );
}

export default App;
