import "../styles/ProfilePage.css";
import { useLocation } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import "@fontsource/montserrat";
import usericon from "../images/usericon.png";
import { useState, useEffect, useRef } from "react";
import { LineChart } from "@mui/x-charts/LineChart";

function ProfilePage() {
  const location = useLocation();
  const [isRestricted, setIsRestricted] = useState(false);
  const [isCurrentUser, setIsCurrentUser] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const [xAxisData, setXAxisData] = useState([1, 2, 3, 5, 8, 10]);
  const [yAxisData, setYAxisData] = useState([4, 5.5, 2, 8.5, 1.5, 10]);

  let username = location.state.username;

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await fetch(`http://localhost:8000/user/${username}`);
        const data = await response.json();
        // console.log(data);
        setUserInfo(data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    fetchUserInfo();
  }, [username]);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavigationBar username={username} />
      <ProfileBody
        username={username}
        isCurrentUser={isCurrentUser}
        setIsCurrentUser={setIsCurrentUser}
        isRestricted={isRestricted}
        setIsRestricted={setIsRestricted}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
        xAxisData={xAxisData}
        yAxisData={yAxisData}
        setXAxisData={setXAxisData}
        setYAxisData={setYAxisData}
      />
    </div>
  );
}

function ProfileBody(props) {
  // console.log("profile body", props);
  const username = props.userInfo.username;
  const bio = props.userInfo.bio;
  const fullname = props.userInfo.fullname;
  const image = props.userInfo.image;
  const posts = props.userInfo.posts;
  const bookmarks = props.userInfo.bookmarks;
  const stocks = props.userInfo.stocks;
  const cryptos = props.userInfo.cryptos;
  const score = props.userInfo.user_score;
  // console.log("profile body", fullname);

  return (
    <div className="profileBody">
      <LeftHalf
        {...props}
        username={username}
        bio={bio}
        fullname={fullname}
        image={image}
        score={score}
      />
      <RightHalf
        {...props}
        posts={posts}
        bookmarks={bookmarks}
        stocks={stocks}
        cryptos={cryptos}
        xAxisData={props.xAxisData}
        yAxisData={props.yAxisData}
        setXAxisData={props.setXAxisData}
        setYAxisData={props.setYAxisData}
      />
    </div>
  );
}

function LeftHalf(props) {
  // console.log("left half", props);
  const inputRef = useRef();
  const [image, setImage] = useState(props.image);
  const [fullname, setFullname] = useState(props.fullname);
  const [bio, setBio] = useState(props.bio);

  // console.log("left half", fullname, bio);

  function handleImageClick() {
    inputRef.current.click();
  }

  function handleImageChange(event) {
    const file = event.target.files[0];
    setImage(file);
  }

  function handleEditSubmit() {
    async function updateUser() {
      try {
        // console.log("fullname ", fullname);
        // console.log("bio ", bio);
        const formData = new FormData();
        formData.append("fullname", fullname);
        formData.append("bio", bio);
        if (image) {
          formData.append("image", image);
        }
        // console.log(props.username);
        // Print the form data
        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        const response = await fetch(
          `http://localhost:8000/user/${props.username}`,
          {
            method: "PUT",
            body: formData,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update user information");
        }

        const data = await response.json();
        console.log("data", data);
        props.setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          fullname: data.fullname,
          bio: data.bio,
          image: data.image,
        }));
      } catch (error) {
        console.error("Error updating user information:", error);
      }
    }

    updateUser();
    props.setIsEditing(false);
  }

  return (
    <div className="profileLeftHalf">
      <div
        style={{
          margin: "2%",
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "space-around",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {props.isEditing && props.isCurrentUser ? (
          <div onClick={handleImageClick}>
            {image ? (
              <img src={URL.createObjectURL(image)} className="profilePic" />
            ) : (
              <img src={usericon} className="profilePic" />
            )}
            <input
              type="file"
              ref={inputRef}
              onChange={handleImageChange}
              hidden
            />
          </div>
        ) : (
          <img src={image || usericon} className="profilePic" />
        )}

        {props.isEditing && props.isCurrentUser ? (
          <div>
            <input
              type="text"
              placeholder="Enter Your Full Name"
              value={fullname}
              className="profileInputBox"
              onChange={(e) => setFullname(e.target.value)}
            />
          </div>
        ) : (
          <p className="profileUsername">{fullname}</p>
        )}

        {props.isCurrentUser && !props.isEditing && (
          <button
            className="editProfileButton"
            onClick={() => props.setIsEditing(true)}
          >
            Edit Profile
          </button>
        )}

        {props.isEditing && props.isCurrentUser ? (
          <div>
            <textarea
              placeholder="Enter your bio"
              value={bio}
              className="bioEditArea"
              onChange={(e) => setBio(e.target.value)}
            />

            <div style={{ display: "flex", flexDirection: "row" }}>
              <button className="editProfileButton" onClick={handleEditSubmit}>
                Submit
              </button>
            </div>
          </div>
        ) : (
          <p
            style={{
              color: "black",
              fontFamily: "Montserrat",
              fontSize: "15px",
            }}
          >
            {props.bio}
          </p>
        )}

        {props.isCurrentUser && !props.isEditing && (
          <p className="profileScore">Contributor Score: {props.score}</p>
        )}
      </div>
    </div>
  );
}

function RightHalf(props) {
  const [profileNavValue, setProfileNavValue] = useState("Post");

  function handlePrivacyToggle() {
    props.setIsRestricted(!props.isRestricted);
  }

  function handlePostClick() {
    setProfileNavValue("Post");
  }

  function handleStockClick() {
    setProfileNavValue("Stocks");
  }

  function handleCryptoClick() {
    setProfileNavValue("Crypto");
  }

  return (
    <div className="profileRightHalf">
      {props.isCurrentUser && (
        <div>
          Do you want to keep your profile restricted?{" "}
          <label className="switch">
            <input
              type="checkbox"
              checked={props.isRestricted}
              onChange={handlePrivacyToggle}
            />
            <span className="slider round"></span>
          </label>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          margin: "2%",
          height: "20vh",
          width: "50vh",
        }}
      >
        <button
          className="profileNavButton"
          onClick={handlePostClick}
          style={{
            backgroundColor: profileNavValue === "Post" ? "#283350" : "#ffffff",
            color: profileNavValue === "Post" ? "#ffffff" : "#283350",
          }}
        >
          Posts
        </button>
        <button
          className="profileNavButton"
          onClick={() => setProfileNavValue("Bookmarks")}
          style={{
            backgroundColor:
              profileNavValue === "Bookmarks" ? "#283350" : "#ffffff",
            color: profileNavValue === "Bookmarks" ? "#ffffff" : "#283350",
          }}
        >
          Bookmarks
        </button>
        <button
          className="profileNavButton"
          onClick={handleStockClick}
          style={{
            backgroundColor:
              profileNavValue === "Stocks" ? "#283350" : "#ffffff",
            color: profileNavValue === "Stocks" ? "#ffffff" : "#283350",
          }}
        >
          Stocks
        </button>
        <button
          className="profileNavButton"
          onClick={handleCryptoClick}
          style={{
            backgroundColor:
              profileNavValue === "Crypto" ? "#283350" : "#ffffff",
            color: profileNavValue === "Crypto" ? "#ffffff" : "#283350",
          }}
        >
          CryptoCurrency
        </button>
      </div>

      {props.isCurrentUser && (
        <div>
          {profileNavValue === "Post" && <Posts posts={props.posts} />}
          {profileNavValue === "Bookmarks" && (
            <Bookmarks bookmarks={props.bookmarks} />
          )}
          {profileNavValue === "Stocks" && (
            <Stock
              stocks={props.stocks}
              xAxisData={props.xAxisData}
              yAxisData={props.yAxisData}
              setXAxisData={props.setXAxisData}
              setYAxisData={props.setYAxisData}
            />
          )}
          {profileNavValue === "Crypto" && (
            <Crypto
              cryptos={props.cryptos}
              xAxisData={props.xAxisData}
              yAxisData={props.yAxisData}
              setXAxisData={props.setXAxisData}
              setYAxisData={props.setYAxisData}
            />
          )}
        </div>
      )}

      {!props.isCurrentUser && !props.isRestricted && (
        <div>
          {profileNavValue === "Post" && <Posts posts={props.posts} />}
          {profileNavValue === "Bookmarks" && (
            <Bookmarks bookmarks={props.bookmarks} />
          )}
          {profileNavValue === "Stocks" && <Stock stocks={props.stocks} />}
          {profileNavValue === "Crypto" && <Crypto cryptos={props.cryptos} />}
        </div>
      )}

      {!props.isCurrentUser && props.isRestricted && (
        <div>
          This user has chosen to hide their contributions from everyone.
        </div>
      )}
    </div>
  );
}

function Posts({ posts }) {
  return (
    <div>
      {posts
        ? posts.map((post) => <div key={post.id}>{post.content}</div>)
        : "No posts"}
    </div>
  );
}

function Bookmarks({ bookmarks }) {
  return (
    <div>
      {bookmarks
        ? bookmarks.map((bookmark) => (
            <div key={bookmark.id}>{bookmark.content}</div>
          ))
        : "No bookmarks"}
    </div>
  );
}

function Stock({ stocks, xAxisData, setXAxisData, yAxisData, setYAxisData }) {
  const [stockList, setStockList] = useState(stocks);

  const removeStock = (stockToRemove) => {
    setStockList(stockList.filter((stock) => stock !== stockToRemove));
  };

  return (
    <div>
      <GraphCard
        xAxisData={xAxisData}
        yAxisData={yAxisData}
        setXAxisData={setXAxisData}
        setYAxisData={setYAxisData}
      />

      <div className="tagsContainer">
        {stockList.map((stock, index) => (
          <div
            key={index}
            className="tag"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <button className="tagTextButton">{stock}</button>
            <button
              className="removeTagButton"
              onClick={() => removeStock(stock)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Crypto({ cryptos, xAxisData, setXAxisData, yAxisData, setYAxisData }) {
  const [cryptoList, setCryptoList] = useState(cryptos);

  const removeCrypto = (cryptoToRemove) => {
    setCryptoList(cryptoList.filter((crypto) => crypto !== cryptoToRemove));
  };

  return (
    <div>
      <GraphCard
        xAxisData={xAxisData}
        yAxisData={yAxisData}
        setXAxisData={setXAxisData}
        setYAxisData={setYAxisData}
      />

      <div className="tagsContainer">
        {cryptoList.map((crypto, index) => (
          <div
            key={index}
            className="tag"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <button className="tagTextButton">{crypto}</button>
            <button
              className="removeTagButton"
              onClick={() => removeCrypto(crypto)}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function GraphCard(props) {
  return (
    <div className="stockCardGraphBody">
      <div className="graphBody">
        <LineChart
          xAxis={[{ data: props.xAxisData }]}
          series={[
            {
              data: props.yAxisData,
            },
          ]}
          width={500}
          height={300}
        />
      </div>
    </div>
  );
}

export default ProfilePage;
