import { useState } from "react";
import '../Styles/MessageSendingBox.scss'

export default function MessageSendingBox(props: any) {


    const [userMessageToSend, setUserMessageToSend] = useState("");

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
                  <button className="media"></button>
                  <button className="media"></button>
                  <button className="media"></button>
                  <button className="media"></button>
                </div>
                <button className="button" onClick={()=>props.callback(userMessageToSend)}>Send</button>
              </div>
            </div>

          </div>
    )


}