import Message from './Message.jsx';

export default function Thread({ title, messages }) {
  return (
    <div className="thread-container">
      <h2>{title}</h2>
      {messages.map((message) => (
        <Message
          message={message.text}
          key={message.id}
          isAI={message.isAI} // If necessary, you can change this condition
        />
      ))}
    </div>
  );
}
