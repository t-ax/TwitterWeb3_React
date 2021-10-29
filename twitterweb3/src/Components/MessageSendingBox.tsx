import { useState } from "react";
import '../Styles/MessageSendingBox.scss'

export default function MessageSendingBox(props: any) {


  const [userMessageToSend, setUserMessageToSend] = useState("");
  const [userImageToSend, setUserImageToSend] = useState("");
  const [userImageLoading, setUserImageLoading] = useState(false);

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
                  
                  <input className="input" spellCheck="false" onChange={event => {setUserImageLoading(true);setUserImageToSend(event.target.value)}} placeholder="Add a GIF URL (Optional) from GIPHY, ..." />
                  {(userImageLoading) ? <><img src='https://media.giphy.com/media/sSgvbe1m3n93G/giphy.gif'/></> : <></>}
                  <div><img src={userImageToSend} onLoad={(e: any) => {setUserImageLoading(false); }} onError={(e: any) => {setUserImageLoading(false);e.target.src = ''}} /></div>
                  
                  
                  {/* <button className="media"></button>
                  <button className="media"></button>
                  <button className="media"></button>
                  <button className="media"></button> */}
                  <div className="text">Share your thoughts or give me a feedback</div>
                </div>
                <button className="button" onClick={()=>props.callback(userMessageToSend)}>Send</button>
              </div>
            </div>

          </div>
    )


}