import { ethers } from "ethers";
import TwitterWeb3ContractArtifact from '../Utils/TwitterWeb3ContractArtifact.json' 

const CONTRACT_ADDRESS = "0xd6a5B3390B8DdD0593A12E9C86d631D9033C9747";

declare global {
    interface Window {
        ethereum:any;
    }
}

type Message = {
  sender: string,
  message: string,
  timestamp: Date
}
type ReceivedMessage = {
  sender: string,
  message: string,
  timestamp: number
}

const checkWalletIsConnectedAndGetUserAccount = async (): Promise<string> => {
    try {
        const { ethereum } = window;
        
        if (!ethereum) {
          // console.log("Make sure you have metamask!");
          return "";
        } else {
          // console.log("We have the ethereum object", ethereum);
        }
        
        /*
        * Check if we're authorized to access the user's wallet
        */
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        
        if (accounts.length !== 0) {
          const account = accounts[0];
          // console.log("Found an authorized account:", account);
          // console.log(typeof(account));
          return account;
        } else {
          // console.log("No authorized account found")
          return "";
        }
      } catch (error) {
        // console.log(error);
        return "ERR"+error;
      }
}

const connectWallet = async (): Promise<string> => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return "";
      }
      
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      const account = accounts[0];
      // console.log("Connected", account);
      return account;   
      
    } catch (error :any) {
      // console.log("test"+error.code)
      return error.code;
    } 
}

const getTotalNumberOfMessages = async (): Promise<string> => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(CONTRACT_ADDRESS, TwitterWeb3ContractArtifact.abi, signer);

        let count = await contract.getTotalMessagesCount();
        return ""+count+"";
        // console.log("Retrieved total wave count...", ""+count+"");
      } else {
        // console.log("Ethereum object doesn't exist!");
        return "NOWALLET";
      }
    } catch (error) {
      // console.log(error)
      return "NOWALLET";
    }
}

const sendAMessageAndWaitForItToBeMined = async (message: string): Promise<boolean> => {
    try {
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, TwitterWeb3ContractArtifact.abi, signer);
  
          const messageTxn = await contract.sendMessage(message);
          // console.log("Mining...", messageTxn.hash);
          await messageTxn.wait();
          // console.log("Mined -- ", messageTxn.hash);
          
          return true;
        } else {
          // console.log("Ethereum object doesn't exist!");
          return false;
        }
      } catch (error) {
        // console.log(error)
        return false;
      }
}

const getAllMessages = async (): Promise<Message[]>  => {
  try {
    const { ethereum } = window;
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const wavePortalContract = new ethers.Contract(CONTRACT_ADDRESS, TwitterWeb3ContractArtifact.abi, signer);

      /*
       * Call the getAllWaves method from your Smart Contract
       */
      const receivedMessages = await wavePortalContract.getAllMessages();
      

      /*
       * We only need address, timestamp, and message in our UI so let's
       * pick those out
       */
      let listOfMessages: Message[] = [];
      receivedMessages.forEach((message: ReceivedMessage) => {
        listOfMessages.unshift({
          sender: message.sender,
          message: message.message,
          timestamp: new Date(message.timestamp * 1000)
        });
      });

      return listOfMessages;
    } else {
      // console.log("Ethereum object doesn't exist!")
      throw Error;
    }
  } catch (error) {
    // console.log(error);
    throw Error;
  }
}

export {
    checkWalletIsConnectedAndGetUserAccount,
    connectWallet,
    getTotalNumberOfMessages,
    sendAMessageAndWaitForItToBeMined,
    getAllMessages
}
export type {
  Message
}