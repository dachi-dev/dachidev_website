export default function Message({message, isAI}){
    const aiImgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCCWTmhd-ZIcS741SXWT-df3lzajyQG57Ydw&s"
    return (
        <div className="message-container">
          {isAI && <img src={aiImgSrc} alt="AI Icon" className="message-icon" />}
          <div className="message">
            <p>{message}</p>
          </div>
        </div>
      );
    }