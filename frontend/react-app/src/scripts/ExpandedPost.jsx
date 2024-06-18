import "../styles/ExpandedPost.css";
import NavigationBar from "./NavigationBar";
import PostCommentSection from "./PostCommentSection";
import { LineChart } from "@mui/x-charts/LineChart";
import Post from "./Post";
import { useLocation } from "react-router-dom";

const seriesA = {
  data: [2, 3, 1, 4, 5],
  label: "AAPL",
};

const seriesB = {
  data: [3, 1, 4, 2, 1],
  label: "Series B",
};

function ExpandedPost() {
  const location = useLocation();
  const { post, current_user } = location.state;
  //   console.log("post in comment", post, current_user);

  //   let username = location.state.username;

  return (
    <div className="expandedPostMainBody">
      <NavigationBar username={current_user} />
      <ExpandedPostBody current_user={current_user} post={post} />
    </div>
  );
}

function ExpandedPostBody(props) {
  return (
    <div className="expandedPostBody">
      <LeftHalf {...props} />
      <RightHalf {...props} />
    </div>
  );
}

function LeftHalf(props) {
  //   console.log("post in left half", props.post, props.current_user);
  return (
    <div className="leftBody">
      <Post {...props.post} current_user={props.current_user} />
    </div>
  );
}

function RightHalf(props) {
  return (
    <div className="rightBody">
      <PostCommentSection {...props.post} current_user={props.current_user} />
    </div>
  );
}

export default ExpandedPost;
