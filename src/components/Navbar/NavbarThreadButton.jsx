export default function NavbarThreadButton(props) {

  const default_thread_svj = (
    <svg
    stroke="currentColor"
    fill="none"
    strokeWidth="2"
    viewBox="0 0 24 24"
    className="chat-icon"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
  );


  return (
    <button className="chat-item" onClick={() =>{
      props.onClick(props.id);
    }}>
      {default_thread_svj}
      <span>{props.title}</span>
    </button>
  );
}
