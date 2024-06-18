import "../styles/Chat.css";

import { IconContext } from "react-icons";
import usericon from "../images/usericon.png";
import "@fontsource/montserrat";

import { useState } from "react";

function Chat() {
  const [user, setUser] = useState("1");
  const [chatText, setChatText] = useState(false);

  const [selectChat, setSelectChat] = useState("1");

  return (
    <div className="chatMainBody">
      <div className="cleft">
        <text style={{ fontFamily: "Montserrat", fontSize: "25px" }}>
          Chats
        </text>
        <ProfilePlus
          username={"James Allison"}
          selectChat={selectChat}
          setSelectChat={setSelectChat}
        />
        <ProfilePlus
          username={"Maddison Kate"}
          selectChat={selectChat}
          setSelectChat={setSelectChat}
        />
      </div>

      <div className="cright">
        {selectChat == "1" && (
          <Chat1 chatText={chatText} setChatText={setChatText} />
        )}
        {selectChat == "2" && <Chat2 />}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            margin: "3%",
          }}
        >
          <input
            type="text"
            placeholder="Type A Message"
            className="chatTextBox"
          />
          <button className="csend" onClick={() => setChatText(true)}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

function ProfilePlus(props) {
  function handleClick() {
    if (props.username === "Maddison Kate") {
      props.setSelectChat("2");
    } else {
      props.setSelectChat("1");
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "1%",
        backgroundColor: "#283350",
        alignItems: "center",
        height: "10vh",
        borderRadius: "10px",
      }}
    >
      {props.username == "James Allison" && (
        <img src={usericon} className="userIconBody" alt="User Icon" />
      )}
      {props.username == "Maddison Kate" && (
        <img src={usericon} className="userIconBody" alt="User Icon" />
      )}

      <button className="cuserButton" onClick={handleClick}>
        {props.username}
      </button>
    </div>
  );
}

function Receiver(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <text
        style={{
          fontFamily: "Montserrat",
          fontSize: "12px",
          margin: "1%",
          fontWeight: "bold",
          paddingLeft: "5%",
        }}
      >
        {props.username}
      </text>

      <div
        style={{
          backgroundColor: "#283350",
          fontFamily: "Montserrat",
          fontSize: "12px",
          margin: "3%",
          padding: "3%",
          borderRadius: "10px",
          color: "white",
          minWidth: "20%",
        }}
      >
        {props.text}
      </div>
    </div>
  );
}

function Sender(props) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <text
        style={{
          fontFamily: "Montserrat",
          fontSize: "12px",
          margin: "1%",
          fontWeight: "bold",
          paddingLeft: "5%",
        }}
      >
        {props.username}
      </text>

      <div
        style={{
          backgroundColor: "white",
          border: "1px solid black",
          fontFamily: "Montserrat",
          fontSize: "12px",
          margin: "3%",
          padding: "3%",
          borderRadius: "10px",
          minWidth: "20%",
        }}
      >
        {props.text}
      </div>
    </div>
  );
}

function Chat1(props) {
  return (
    <div>
      <div>
        <Receiver
          username={"James Allison"}
          text={
            "Your post on Bitcoin, which was incredibly detailed and insightful, helped me tremendously. The way you broke down complex concepts made it much easier to understand the intricacies involved in Bitcoin trading. I cannot thank you enough for the effort you put into creating such a valuable resource. It truly clarified so many aspects that I was struggling with before. Your dedication to providing high-quality information is evident, and it has made a significant difference for me. Thank you so much for your hard work and the time you invested in this post."
          }
        />
      </div>

      <div>
        {props.chatText && <Sender username={"You"} text={"You are welcome"} />}
      </div>
    </div>
  );
}

function Chat2() {
  return (
    <div>
      <div>
        <Receiver
          username={"Maddison Kate"}
          text="Do you post content regularly? I wanna make sure before I follow you."
        />
      </div>

      <div>
        <Sender username={"You"} text={"Yes, I do"} />
      </div>
    </div>
  );
}

export default Chat;
