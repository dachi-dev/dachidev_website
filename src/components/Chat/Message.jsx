export default function Message({message, isAI}){
    const aiImgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCCWTmhd-ZIcS741SXWT-df3lzajyQG57Ydw&s"
    return (
        <div className="message-container">
            <img src={aiImgSrc}/>
            <div className="message">
                <p>{message}</p>
            </div>
        </div>
    )

}