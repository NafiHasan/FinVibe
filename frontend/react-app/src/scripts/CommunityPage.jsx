import "../styles/CommunityPage.css";
import NavigationBar from "./NavigationBar";
import Post from "./Post";
import TopContributorSidebar from "./TopContributorSidebar";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import TrendingTab from "./TrendingTab";
import { useEffect, useState } from "react";
import axios from "axios";

function CommunityPage() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  let username = location.state.username;

  // Show posts
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
      />
    </div>
  );
}

function CommunityBody(props) {
  return (
    <div className="communityBody">
      <LeftColumn {...props} />
      <MainColumn {...props} />
      <RightColumn {...props} />
    </div>
  );
}

function LeftColumn(props) {
  return (
    <div className="communityLeftColumn">
      <TopContributorSidebar />
    </div>
  );
}

function MainColumn({ username, posts, fetchPosts }) {
  return (
    <div className="communityMainColumn">
      {posts.map((post) => (
        <Post key={post._id} {...post} fetchPosts={fetchPosts} />
      ))}
    </div>
  );
}

function RightColumn(props) {
  const navigate = useNavigate();

  function makePost() {
    navigate("/makepost", { state: { username: props.username } });
  }

  return (
    <div className="communityRightColumn">
      <TrendingTab />

      <div>
        <button className="makePostButton" onClick={makePost}>
          Make Post
        </button>
      </div>
    </div>
  );
}

export default CommunityPage;
