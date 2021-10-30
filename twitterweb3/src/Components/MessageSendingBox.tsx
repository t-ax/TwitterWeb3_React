import { useState } from "react";
import '../Styles/MessageSendingBox.scss'
import imgloading from '../Assets/Images/loading.webp'

export default function MessageSendingBox(props: any) {


  const [userMessageToSend, setUserMessageToSend] = useState("");
  const [userImageToSend, setUserImageToSend] = useState("");
  const [userImageLoading, setUserImageLoading] = useState(false);
  const [userImageError, setUserImageError] = useState(false);

    function autoResizeTextArea(e:any){
        e.target.style.height = 'inherit';
        e.target.style.height = `${e.target.scrollHeight+25}px`; 
    }

    return (
        <div className="sendmessage">

            <div className="picture"><img src={`https://avatars.dicebear.com/api/open-peeps/${props.userAccount}.svg`}/></div>
            <div>
              <div className="top">
                <textarea className="input" spellCheck="false" onKeyDown={autoResizeTextArea} onChange={event => setUserMessageToSend(event.target.value)} placeholder="What's happening?" />
              </div>
              <div className="bottom">
                <div className="addingmedia">
                  
                  <input className="input" spellCheck="false" onChange={event => {setUserImageLoading(true); setUserImageError(false); setUserImageToSend(event.target.value)}} placeholder="Add a GIF URL (Optional) from GIPHY, ..." />
                  {(userImageLoading) ? <><img src={imgloading}/></> : <></>}
                  {(!userImageError) ? <><img src={userImageToSend} onLoad={(event: any) => {setUserImageLoading(false); setUserImageError(false);}} onError={(e: any) => {setUserImageLoading(false); setUserImageError(true); setUserImageToSend(''); e.target.src = ''}} /></> : <></>}
                  
                  {/* <button className="media"></button>
                  <button className="media"></button>
                  <button className="media"></button>
                  <button className="media"></button> */}
                  <div className="text">Share your thoughts or give me a feedback</div>
                </div>
                <button className="button" onClick={()=>props.callback(userMessageToSend, userImageToSend)}>Send</button>
              </div>
            </div>

          </div>
    )


}