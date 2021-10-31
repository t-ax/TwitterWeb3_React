
import '../Styles/InformationPanel.scss'

export default function InformationPanel(){
    return(
        <div className="InformationPanel">
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
                  <div className="text important">The currently displayed messages are fake, connect your wallet (metamask button on the icon panel) to read real messages left by other users</div>
              </li>
              <li>
                  <div className="subtitle">#NoLimits</div>
                  <div className="text">You can send unlimited messages too that will be written on the blockchain for other users to read</div>
              </li>
              <li>
                  <div className="subtitle">#MoneyFaucet</div>
                  <div className="text">Reading is free but to write you need to use ethereum (it's free because it's a test Network) : <a target="_blank" rel="noreferrer" href="https://faucet.rinkeby.io/">Get Free Test ETH #OfficialLink</a></div>
              </li>
              <li>
                  <div className="subtitle">#GeneratedDicebearAvatar</div>
                  <div className="text">An avatar is automatically & randomly generated based on your public address, you'll always have the same and it will always be different than others </div>
              </li>
              <li>
                  <div className="subtitle">#AccessibleCode&Contract</div>
                  <div className="text">On the icon panel, you may click on the Etherscan icon to get information about the smart contract used in this website and you may click on the github icon to check the Solidity & React source code </div>
              </li>
            </ul>
          </div>
          
        </div>
    )
}