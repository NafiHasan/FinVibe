import "../styles/CommunityPage.css";
import NavigationBar from "./NavigationBar";
import Post from "./Post";
import TopContributorSidebar from "./TopContributorSidebar";
import TrendingTab from "./TrendingTab";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CommunityPage() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const username = location.state.username;
  const navigate = useNavigate();

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
      />
    </div>
  );
}

function CommunityBody({ username, posts, fetchPosts }) {
  return (
    <div className="communityBody">
      <LeftColumn />
      <MainColumn username={username} posts={posts} fetchPosts={fetchPosts} />
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

function MainColumn({ username, posts, fetchPosts }) {
  return (
    <div className="communityMainColumn">
      {posts.map((post, index) => (
        <Post
          key={index}
          {...post}
          fetchPosts={fetchPosts}
          current_user={username}
        />
      ))}
    </div>
  );
}

function RightColumn({ username }) {
  const navigate = useNavigate();

  const makePost = () => {
    navigate("/makepost", { state: { username } });
  };

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
