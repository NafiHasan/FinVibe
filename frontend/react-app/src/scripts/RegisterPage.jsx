import "../styles/RegisterPage.css";
import "@fontsource/montserrat";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function hasNoWhiteSpace(str) {
  return !str.includes(" ");
}

function hasSpecialCharacter(str) {
  const specialChars = /[!@#$%^&*(),.?":{}|<>]/;

  //   return str.length >= 4 && specialChars.test(str);
  return str.length >= 2;
}

function RegisterPage() {
  return (
    <div className="registerPageBody">
      <LeftHalf />
      <RightHalf />
    </div>
  );
}

function RightHalf() {
  return (
    <div className="leftHalfBody">
      <InfoCard />
    </div>
  );
}

function LeftHalf() {
  return (
    <div className="rightHalfBody">
      <RegisterCard />
    </div>
  );
}

function InfoCard() {
  return (
    <div className="infoCard">
      <text
        style={{
          fontSize: "10vh",
          fontFamily: "Montserrat",
          paddingTop: "20vh",
          fontWeight: "bolder",
          color: "whitesmoke",
        }}
      >
        Join Us{" "}
      </text>
      <text
        style={{
          fontSize: "5vh",
          fontFamily: "Montserrat",
          paddingTop: "5vh",
          color: "whitesmoke",
        }}
      >
        As We Change The World
      </text>
    </div>
  );
}

function RegisterCard() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nonUniqueCred, setNonUniqueCred] = useState(false);
  const [emptyCred, setEmptyCred] = useState(false);
  const [nullCred, setNullCred] = useState(false);
  const [noSpecial, setNoSpecial] = useState(false);

  async function registerUser() {
    if (username == "" || password == "") {
      setNoSpecial(false);
      setNullCred(false);
      setEmptyCred(true);
      setNonUniqueCred(false);
    } else {
      if (hasNoWhiteSpace(username) && hasNoWhiteSpace(password)) {
        if (hasSpecialCharacter(password)) {
          try {
            const response = await axios.post(
              "http://localhost:8000/register",
              {
                username,
                password,
              }
            );
            console.log("Registration Successful:", response.data);
            navigate("/"); // Navigate to login page after successful registration
          } catch (error) {
            console.error("Error:", error.response.data);
            setNonUniqueCred(true); // Handle non-unique username or other errors
          }
        } else {
          setNoSpecial(true); // Password does not meet requirements
          setNullCred(false);
          setEmptyCred(false);
          setNonUniqueCred(false);
        }
      } else {
        setNullCred(true); // Username or password has white space
        setEmptyCred(false);
        setNonUniqueCred(false);
        setNoSpecial(false);
      }
    }
  }

  return (
    <div className="registerCard">
      {/* Regsiter input */}
      <div className="registerInput">
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
            Pick A Unique Username
          </text>
          <input
            type="text"
            className="inputBox"
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
            Pick A Password
          </text>
          <input
            type="password"
            className="inputBox"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
        </div>
      </div>

      {/* register buttons */}
      <div className="inputButton">
        <button className="registerButton" onClick={registerUser}>
          Register
        </button>
      </div>

      <div className="wrongCredTextBody">
        {nonUniqueCred ? (
          <text className="wrongCredText">Please Select a Unique Username</text>
        ) : (
          <div />
        )}
      </div>

      <div className="wrongCredTextBody">
        {emptyCred ? (
          <text className="wrongCredText">
            The username or passcode can not be empty
          </text>
        ) : (
          <div />
        )}
      </div>

      <div className="wrongCredTextBody">
        {nullCred ? (
          <text className="wrongCredText">
            The username or passcode can not have white space
          </text>
        ) : (
          <div />
        )}
      </div>

      <div className="wrongCredTextBody">
        {noSpecial ? (
          <text className="wrongCredText">
            The passcode must have 4 characters
          </text>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default RegisterPage;
