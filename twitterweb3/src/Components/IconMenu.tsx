
import logo from '../Assets/Images/logo.png';
import faucet from '../Assets/Images/faucet.jpg';
import metamask from '../Assets/Images/metamask.svg';
import github from '../Assets/Images/github.png';
import giphy from '../Assets/Images/giphy.png';
import etherscan from '../Assets/Images/etherscan.jpeg';
import userconnected from '../Assets/Images/user-connected.svg';
import userdisconnected from '../Assets/Images/user-disconnected.svg';

import '../Styles/IconMenu.scss'

export default function IconMenu(props: any) {
    return( 
    <div className="IconMenu">
        <div className="img logo"> <img src={logo}/></div>
        <div className="img wallet" title="Metamask - Connect your Wallet to send & read messages" onClick={props.connectToUserWallet}> <img alt="Wallet Connect" src={metamask}/></div>{/* Wallet Connect */}
        <a className="img giphy" title="GIF URLs - Add gifs to your messages" target="_blank" rel="noreferrer" href="https://giphy.com/search/"> <img src={giphy}/></a>{/* Giphy  */}
        <a className="img faucet" title="Get ETHs - Rinkeby Test Network Faucet" target="_blank" rel="noreferrer" href="https://faucet.rinkeby.io/"> <img src={faucet}/></a>{/* Ethereum Faucet */}
        <a className="img etherscan" title="Smart Contract - Consult the properties and transaction history" target="_blank" rel="noreferrer" href="https://rinkeby.etherscan.io/address/0xa172d9772309E453Ed660f23247D446558Df813B"> <img src={etherscan}/></a>{/* Contract */}
        <a className="img github" title="Source Code - Solidity & React Repositories" target="_blank" rel="noreferrer" href="https://faucet.rinkeby.io/"> <img src={github}/></a>{/* Github Code */}
        
        {props.totalNumberOfMessages==="NOWALLET"? 
        <div className="account" style={{background:"#DB4325"}} onClick={props.connectToUserWallet}><img src={userdisconnected} /></div> : 
        <div className="account" style={{background:"#87C4AD"}} onClick={props.connectToUserWallet}><img src={userconnected} /></div>}
         
      </div>
    )
}