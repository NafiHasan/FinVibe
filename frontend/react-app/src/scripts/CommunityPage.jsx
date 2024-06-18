import "../styles/CommunityPage.css";
import NavigationBar from "./NavigationBar";
import Post from "./Post";
import TopContributorSidebar from "./TopContributorSidebar";
import TrendingTab from "./TrendingTab";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { TfiWrite } from "react-icons/tfi";
import { IconContext } from "react-icons";
import { CiFilter } from "react-icons/ci";
import Comment from "./Comment";
import Reply from "./Reply";

function CommunityPage() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const username = location.state.username;
  const navigate = useNavigate();
  const [isFilterButtonPressed, setFilterButtonPressed] = useState(false);

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch posts when component mounts
  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <NavigationBar username={username} />
      <CommunityBody
        username={username}
        posts={posts}
        fetchPosts={fetchPosts}
        isFilterButtonPressed={isFilterButtonPressed}
        setFilterButtonPressed={setFilterButtonPressed}
      />

      {/* <Comment/> */}
      {/* <Reply/> */}
    </div>
  );
}

function CommunityBody({
  username,
  posts,
  fetchPosts,
  isFilterButtonPressed,
  setFilterButtonPressed,
}) {
  return (
    <div className="communityBody">
      <LeftColumn />
      <MainColumn
        username={username}
        posts={posts}
        fetchPosts={fetchPosts}
        isFilterButtonPressed={isFilterButtonPressed}
        setFilterButtonPressed={setFilterButtonPressed}
      />
      <RightColumn username={username} />
    </div>
  );
}

function LeftColumn() {
  return (
    <div className="communityLeftColumn">
      <TopContributorSidebar />
    </div>
  );
}

function MainColumn({
  username,
  posts,
  fetchPosts,
  isFilterButtonPressed,
  setFilterButtonPressed,
}) {
  return (
    <div className="communityMainColumn">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "82%",
        }}
      >
        <button
          className="filterButton"
          onClick={() => setFilterButtonPressed(!isFilterButtonPressed)}
        >
          {" "}
          <CiFilter /> Filter
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {posts.map((post, index) => (
          <Post
            key={index}
            {...post}
            fetchPosts={fetchPosts}
            current_user={username}
          />
        ))}
      </div>

      {/* Debugging */}
      {username === "abcd" && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Post username={username} />
          <Post username={username} />
          <Post username={username} />
        </div>
      )}

      {isFilterButtonPressed && (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <button className="filterItem">Newest First</button>
          <button className="filterItem">Highest Score First</button>
          <button className="filterItem">Recommended</button>
        </div>
      )}
    </div>
  );
}

function RightColumn({ username }) {
  const navigate = useNavigate();

  const makePost = () => {
    console.log("make post", username);
    navigate("/makepost", { state: { username } });
  };

  return (
    <div className="communityRightColumn">
      <TrendingTab />
      <div>
        <button className="mpbutton" onClick={makePost}>
          <IconContext.Provider
            value={{
              color: "white",
              className: "global-class-name",
              size: "3vh",
            }}
          >
            <TfiWrite />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}

export default CommunityPage;
