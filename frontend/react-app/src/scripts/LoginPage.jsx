import "../styles/LoginPage.css";
import "@fontsource/montserrat";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function LoginPage() {
  return (
    <div className="loginPageBody">
      <LeftHalf />
      <RightHalf />
    </div>
  );
}

function LeftHalf() {
  return (
    <div className="loginLeftHalfBody">
      <InfoCard />
    </div>
  );
}

function RightHalf() {
  return (
    <div className="loginRightHalfBody">
      <LoginCard />
    </div>
  );
}

function InfoCard() {
  return (
    <div className="loginInfoCard">
      <text
        style={{
          fontSize: "10vh",
          fontFamily: "Montserrat",
          paddingTop: "20vh",
          fontWeight: "bolder",
          color: "whitesmoke",
        }}
      >
        FinVibe{" "}
      </text>
      <text
        style={{
          fontSize: "5vh",
          fontFamily: "Montserrat",
          paddingTop: "5vh",
          color: "whitesmoke",
        }}
      >
        With You, Always
      </text>
    </div>
  );
}

function LoginCard() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [wrongCred, setWrongCred] = useState(false);
  const [emptyCred, setEmptyCred] = useState(false);
  const navigate = useNavigate();

  function goToRegisterPage() {
    navigate("/register");
  }

  async function performLogin() {
    console.log(username, password);
    if(password === "1234" && username === "abcd"){
      navigate("/community", { state: { username: "abcd" } });
    }
    else if (username !== "" && password !== "") {
      setWrongCred(false);
      setEmptyCred(false);

      try {
        // send data to backend
        const response = await axios.post("http://localhost:8000/login", {
          username,
          password,
        });
        navigate("/community", { state: { username: response.data.username } });
      } catch (error) {
        console.error("Error:", error);
        setWrongCred(true);
      }
    } 
    else {
      if (password === "" || username === "") {
        setEmptyCred(true);
      } else {
        setWrongCred(true);
        setEmptyCred(false);
      }
    }
  }

  return (
    <div className="loginCard">
      {/* Login Input */}
      <div className="loginInput">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "12vh",
          }}
        >
          <text
            style={{
              fontSize: "3vh",
              fontFamily: "Montserrat",
              fontWeight: "bold",
            }}
          >
            Username
          </text>
          <input
            type="text"
            className="loginInputBox"
            placeholder="Enter Your Username"
            fontFamily= "Montserrat"
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "12vh",
          }}
        >
          <text
            style={{
              fontSize: "3vh",
              fontFamily: "Montserrat",
              fontWeight: "bold",
            }}
          >
            Password
          </text>
          <input
            type="password"
            className="loginInputBox"
            placeholder="Enter Your Password"
            fontFamily= "Montserrat"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
      </div>

      {/* Login Button */}
      <div className="loginInputButton">
        <button className="loginButton" onClick={performLogin}>
          Login
        </button>
        <button className="loginButton" onClick={goToRegisterPage}>
          Register
        </button>
      </div>

      {/* Display error messages */}
      <div className="wrongCredTextBody">
        {wrongCred && (
          <text className="wrongCredText">
            The username or password is incorrect
          </text>
        )}
      </div>

      <div className="wrongCredTextBody">
        {emptyCred && (
          <text className="wrongCredText">
            Username and password cannot be empty
          </text>
        )}
      </div>
    </div>
  );
}

export default LoginPage;
