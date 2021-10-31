import { ethers } from "ethers";
import TwitterWeb3ContractArtifact from '../Utils/TwitterWeb3ContractArtifact.json' 

export const CONTRACT_ADDRESS = "0x79121464b32b80C9154538aA9e3EcA6A91797da8";

export const listOfMessagesFake = [
  {                                           
    sender:"f@keuser0xf39fd6e51aad88f6f4ce6ab8827279c",
    message:"Time to enjoy life !! #FridayIsTheDay #WeekendHereICome",
    image:"https://media.giphy.com/media/sTczweWUTxLqg/giphy.gif",
    timestamp: 'Mon Oct 31 2021'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"f@keuser0x70997970c51812dc3a010c7d01b50e0",
    message:"When you love cats, you want to share your passion with the world ! #MoreCatsLessProblems",
    image:"https://media.tenor.com/images/96163c159943a2b8960aa8322d12c6f5/tenor.gif",
    timestamp: '... Oct 28 2021'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"f@keuser0x3c44cdddb6a900fa2b585dd299e03d12",
    message:"",
    image:"https://media.giphy.com/media/QBd2kLB5qDmysEXre9/giphy.gif",
    timestamp: '... Oct 28 2021'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"f@keuser0x90f79bf6eb2c4f870365e785982e1f10",
    message:"Salud !!!",
    image:"https://media.giphy.com/media/Zhxd2OJm3bems/giphy.gif",
    timestamp: '... Oct 27 2021'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"f@keuser0x15d34aaf54267db7d7c367839aaf71a0",
    message:"test",
    image:"",
    timestamp: '... Oct 26 2021'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"f@keuser0x976ea74026e726554db657fa54763abd0",
    message:"test",
    image:"",
    timestamp: '... Oct 26 2021'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },
  {
    sender:"f@keuser0x14dc79964da2c08b23698b3d3cc7ca321",
    message:"test",
    image:"",
    timestamp: '... Oct 26 2021'//new Date(Date.UTC(2021, 10, 26)).valueOf()
  },

]

declare global {
    interface Window {
        ethereum:any;
    }
}

type Message = {
  sender: string,
  message: string,
  image: string,
  timestamp: Date
}
type ReceivedMessage = {
  sender: string,
  message: string,
  image: string,
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
        alert("No CryptoWallet found, get MetaMask");
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

const sendAMessageAndWaitForItToBeMined = async (message: string, image: string): Promise<boolean> => {
    try {
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, TwitterWeb3ContractArtifact.abi, signer);
  
          const messageTxn = await contract.sendMessage(message, image);
          // console.log("Mining...", messageTxn.hash);
          alert("Mining...")
          await messageTxn.wait();
          // console.log("Mined -- ", messageTxn.hash);
          alert("Message Mined...")
          
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
          image: message.image,
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