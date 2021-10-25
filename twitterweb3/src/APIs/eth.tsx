import { ethers } from "ethers";
import TwitterWeb3ContractArtifact from '../Utils/TwitterWeb3ContractArtifact.json' 

const CONTRACT_ADDRESS = "0x360cF79a86E7E67d9b9094823AF3FAaEF10E3980";

declare global {
    interface Window {
        ethereum:any;
    }
}

const checkWalletIsConnectedAndGetUserAccount = async (): Promise<string> => {
    try {
        const { ethereum } = window;
        
        if (!ethereum) {
          console.log("Make sure you have metamask!");
          return "";
        } else {
          console.log("We have the ethereum object", ethereum);
        }
        
        /*
        * Check if we're authorized to access the user's wallet
        */
        const accounts = await ethereum.request({ method: 'eth_accounts' });
        
        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorized account:", account);
          console.log(typeof(account));
          return account;
        } else {
          console.log("No authorized account found")
          return "";
        }
      } catch (error) {
        console.log(error);
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
      console.log("Connected", account);
      return account;
      
    } catch (error) {
      console.log(error)
      return "ERR"+error;
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
        console.log("Retrieved total wave count...", ""+count+"");
      } else {
        console.log("Ethereum object doesn't exist!");
        return "";
      }
    } catch (error) {
      console.log(error)
      return "ERR"+error;
    }
}

const sendAMessageAndWaitForItToBeMined = async (): Promise<boolean> => {
    try {
        const { ethereum } = window;
  
        if (ethereum) {
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(CONTRACT_ADDRESS, TwitterWeb3ContractArtifact.abi, signer);
  
          const messageTxn = await contract.message();
          console.log("Mining...", messageTxn.hash);
          await messageTxn.wait();
          console.log("Mined -- ", messageTxn.hash);
          
          return true;
        } else {
          console.log("Ethereum object doesn't exist!");
          return false;
        }
      } catch (error) {
        console.log(error)
        return false;
      }
}

export {
    checkWalletIsConnectedAndGetUserAccount,
    connectWallet,
    getTotalNumberOfMessages,
    sendAMessageAndWaitForItToBeMined
}