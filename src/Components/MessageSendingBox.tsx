import { useState } from "react";
import '../Styles/MessageSendingBox.scss'
import imgloading from '../Assets/Images/loading.webp'
import { buildQueries } from "@testing-library/dom";

export default function MessageSendingBox(props: any) {


  const [userMessageToSend, setUserMessageToSend] = useState("");
  const [userImageToSend, setUserImageToSend] = useState("");
  const [userImageLoading, setUserImageLoading] = useState(false);
  const [userImageError, setUserImageError] = useState(false);

    function autoResizeTextArea(e:any){
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight+25}px`; 
    }

    function handleCallback(){
      if(userMessageToSend===""){alert("The message is empty, if you don't know what to write give us a feedback 1 -> 5")}
      else{
        props.callback(userMessageToSend, userImageToSend)
        setUserMessageToSend("");
        setUserImageToSend("")
      }
      
    }

    return (
        <div className="sendmessage">

            <div className="picture"><img src={props.avatar}/></div>
            <div>
              <div className="top">
                {(props.test=="false") ? <textarea className="input" spellCheck="false" onKeyDown={autoResizeTextArea} onChange={event => setUserMessageToSend(event.target.value)} placeholder="What's happening?" /> : <textarea className="input" spellCheck="false" onKeyDown={autoResizeTextArea} onChange={event => setUserMessageToSend(event.target.value)} placeholder="Connect to your Metamask wallet to read and send messages. &#10;Fake messages are currently displayed" />}
              </div>
              <div className="bottom">
                <div className="addingmedia">
                  
                  <input className="input" spellCheck="false" onChange={event => {setUserImageLoading(true); setUserImageError(false); setUserImageToSend(event.target.value)}} placeholder="...Optional: GIF URL (icon panel-black icon)" />
                  {(userImageLoading) ? <><img src={imgloading}/></> : <></>}
                  {(!userImageError) ? <div><img src={userImageToSend} onLoad={(event: any) => {setUserImageLoading(false); setUserImageError(false);}} onError={(e: any) => {setUserImageLoading(false); setUserImageError(true); setUserImageToSend(''); e.target.src = ''}} /></div> : <></>}
                  
                  {/* <button className="media"></button>
                  <button className="media"></button>
                  <button className="media"></button>
                  <button className="media"></button> */}
                  <div className="text">Share your thoughts or give me a feedback</div>
                </div>
                <button className="button" onClick={handleCallback}>Send</button>
              </div>
            </div>

          </div>
    )


}