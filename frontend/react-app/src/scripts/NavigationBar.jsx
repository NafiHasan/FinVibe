import "../styles/NavigationBar.css";
import "@fontsource/montserrat";
import { FaSearchPlus } from "react-icons/fa";
import { IconContext } from "react-icons";
import usericon from "../images/usericon.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { FaRocketchat } from "react-icons/fa";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { useState } from "react";

function NavigationBar(props) {
  return (
    <div className="navBarBody">
      <MainBar {...props} />
      <SearchBar {...props} />
      <ProfilePlus {...props} />
    </div>
  );
}

function MainBar(props) {
  const navigate = useNavigate();

  return (
    <div className="mainBarBody">
      <button
        className="mainBarButton"
        onClick={() =>
          navigate("/community", { state: { username: props.username } })
        }
      >
        Community
      </button>
      <button
        className="mainBarButton"
        onClick={() =>
          navigate("/stocks", { state: { username: props.username } })
        }
      >
        Stocks
      </button>
      <button
        className="mainBarButton"
        onClick={() =>
          navigate("/crypto", { state: { username: props.username } })
        }
      >
        CryptoCurrency
      </button>
    </div>
  );
}

function SearchBar(props) {
  const navigate = useNavigate()
  const [keyword, setKeyword] = useState("")

  return (
    <div className="searchBarBody">
      <input className="searchBarInput" placeholder="Enter a Keyword" onChange={(e) => setKeyword(e.target.value)}></input>
      <button className="searchButton" onClick={() => navigate("/search", { state: { username: props.username, keyword : keyword } })}>
        <IconContext.Provider
          value={{ color: "white", className: "global-class-name" }}
        >
          <FaSearchPlus />
        </IconContext.Provider>
        ;
      </button>
    </div>
  );
}

function ProfilePlus(props) {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate("/profile", { state: { username: props.username } });
  };

  const handleLogout = () => {
    navigate("/", { state: { username: "" } });
  };

  return (
    <div className="profilePlusBody">
      <img src={usericon} className="userIconBody" alt="User Icon" />

      <button className="userButton" onClick={handleProfileClick}>
        {props.username}
      </button>

      <button className="logoutButton" onClick={handleLogout}>
        <IconContext.Provider
          value={{ color: "white", className: "global-class-name", size: 25 }}
        >
          <IoIosLogOut />
        </IconContext.Provider>
      </button>

      <button className="logoutButton" onClick={handleLogout}>
        <IconContext.Provider
          value={{ color: "white", className: "global-class-name", size: 25 }}
        >
          <IoChatbubbleEllipsesOutline />
        </IconContext.Provider>
      </button>
    </div>
  );
}

export default NavigationBar;
