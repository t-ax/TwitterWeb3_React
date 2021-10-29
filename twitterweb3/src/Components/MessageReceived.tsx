import '../Styles/MessageReceived.scss'
export default function MessageReceived(props:any) {
    return(
        <div className="receivemessage" key={props.index}>
            <div className="picture"><img src={`https://avatars.dicebear.com/api/open-peeps/${props.message.sender.toLowerCase()}.svg`}/></div>
            <div className="message">
                <div className="information">
                <div className="sender">{props.message.sender}</div>
                <div className="timestamp">{props.message.timestamp.toString()}</div>
                </div>
                <div className="text">{props.message.message}</div>
            </div>
        </div>
    )

}