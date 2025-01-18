import Message from './Message.jsx'
export default function Thread({messages}){
    return (   
        <div className="thread-container">
            {messages.map((message) => (
                <Message
                message={message.text}
                key={message.id}
                text={message.text}
                isAI={true}
                />
            ))}
        </div>
    )
}