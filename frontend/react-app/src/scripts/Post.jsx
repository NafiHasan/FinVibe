import "../styles/Post.css";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { IconContext } from "react-icons";
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { FaComment, FaBookmark } from "react-icons/fa";
import stockimage from "../images/stockimage.jpg";
import stockcard1 from "../images/stockcard1.jpg"
import usericon from "../images/usericon.png"
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";

function Post(props) {
  const navigate = useNavigate();
  const [showOptions, setShowOptions] = useState(false);
  const [thisUserPost,setThisUserPost] = useState(true)

  const handleDeletePost = async () => {
    try {
      console.log("post id " + props.post_id);
      // Assuming postId is passed as a prop to PostHeader
      const response = await axios.delete(
        `http://localhost:8000/delete_post/${props.post_id}`
      );
      console.log("Post deleted successfully", response.data);
      props.fetchPosts();
      // Optionally, you can update the UI to reflect the post deletion
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle error or display a notification to the user
    }
  };


  return (
      <div style={{display: "flex", flexDirection: "row"}}>
        <div className="postMainBody">
        <PostHeader {...props} showOptions={showOptions} setShowOptions={setShowOptions} thisUserPost= {thisUserPost} setThisUserPost = {setThisUserPost}/>

          <PostBody {...props} />
          <PostFooter {...props} />
        </div>

        { showOptions && (
    thisUserPost ? (
        <div style={{backgroundColor: "red", height: "5vh", marginTop: "2vh"}}>
            <div className="postOptionItem">
                Edit Post
            </div>
            <div className="postOptionItem" onClick={handleDeletePost}>
                Delete Post
            </div>
        </div>
    ) : (
        <div style={{backgroundColor: "red", height: "5vh", marginTop: "2vh"}}>
            <div className="postOptionItem">
                Mute Post
            </div>
            <div className="postOptionItem">
                Follow User
            </div>
        </div>
    )
)}

        

      </div>
  );
}

function PostHeader(props) {
  console.log("props", props);

  function doesPostBelongToCurrentUser(){
    props.setShowOptions(!props.showOptions)
  }

  return (
    <div className="postHeader">
      <img src={props.image || stockimage} className="postUserIcon" />
      <button className="postUsernameButton">{props.username}</button>

      <div className="postOptions">
        

        <button
          className="postOptionsButton"
          onClick={doesPostBelongToCurrentUser}
        >
          <IconContext.Provider
            value={{
              color: "white",
              className: "global-class-name",
              size: "4vh",
            }}
          >
            <HiOutlineDotsCircleHorizontal />
          </IconContext.Provider>
        </button>
      </div>
    </div>
  );
}

function PostBody(props) {
  return (
    <div className="postBody">
      <PostImage {...props} />
      <PostTag {...props} />
      <PostText {...props} />
    </div>
  );
}

function PostImage(props) {
  const images = [
    { src: stockimage, alt: "Stock Image" },
    { src: stockcard1, alt: "Stock Card 1" },
    { src: usericon, alt: "User Icon" }
  ];

  const [imgIndex, setImgIndex] = useState(0)

  const handleLeftClick = () => {
    if(imgIndex > 0){
      setImgIndex(imgIndex-1)
    }
  };

  const handleRightClick = () => {
    if(imgIndex < images.length - 1){
      setImgIndex(imgIndex+1)
    }
  };

  return (
    <div>
      {/* <img src={props.image || stockimage} className="postImage" alt="Post" /> */}
      <img src={images[imgIndex].src} className="postImage" alt="Post" />
      <button onClick={handleLeftClick}>Left</button>
      <button onClick={handleRightClick}>Right</button>
    </div>
  );
}

function PostTag(props) {
  return (
    <div>
      <button className="postTag">{props.tag}</button>
    </div>
  );
}

function PostText(props) {
  const navigate = useNavigate();

  function trimTo500Chars(str) {
    if (str.length > 500) {
        return str.slice(0, 500);
    }
    return str;
  }

  function hasMoreThan500Chars(str) {
    return str.length > 500;
  }

  let posttxt = "Bitcoin, introduced in 2009 by an anonymous entity known as Satoshi Nakamoto, is a decentralized digital currency that operates on a peer-to-peer network, independent of central authorities or banks. Utilizing blockchain technology, Bitcoin ensures secure, transparent, and immutable transactions through a distributed ledger maintained by a network of nodes. Its finite supply, capped at 21 million coins, imbues it with a deflationary nature, distinguishing it from traditional fiat currencies. Over the years, Bitcoin has garnered attention as both a revolutionary financial innovation and a speculative investment asset, experiencing significant price volatility. Advocates laud its potential to democratize finance, offering a hedge against inflation and enabling financial inclusion for unbanked populations. Critics, however, raise concerns about its environmental impact due to the energy-intensive mining process, regulatory challenges, and its association with illicit activities. Despite these controversies, Bitcoin's influence continues to grow, inspiring a myriad of cryptocurrencies and blockchain applications, while prompting ongoing debates about the future of money and the global financial system. As it evolves, Bitcoin remains a focal point in discussions about the intersection of technology, economics, and societal change."

  if(props.username == "abcd") {
    if (hasMoreThan500Chars(posttxt)){
      posttxt = trimTo500Chars(posttxt)

      return  <div className="postText">{posttxt} ... <button style={{border: "none", backgroundColor: "aliceblue"}} onClick={() =>
        navigate("/expandedpost", { state: { username: props.username } })
      }>See More</button></div>;
    }
  }
  return <div className="postText">{props.content}</div>;
}

function PostFooter(props) {
  const navigate = useNavigate();
  const [score, setScore] = useState(0)

  const [isUpvotePressed, setIsUpvotePressed] = useState(false)
  const [isDownvotePressed, setIsDownvotePressed] = useState(false)

  function doUpvote(){
    if(isUpvotePressed){
      setIsUpvotePressed(false)
      setScore(score-1)
    }

    else if(isDownvotePressed){
      setIsDownvotePressed(false)
      setScore(score+2)
      setIsUpvotePressed(true)
    }

    else{
      setIsUpvotePressed(true)
      setScore(score+1)
    }
  }

  function doDownvote(){
    if(isDownvotePressed){
      setIsDownvotePressed(false)
      setScore(score+1)
    }

    else if(isUpvotePressed){
      setIsUpvotePressed(false)
      setScore(score-2)
      setIsDownvotePressed(true)
    }

    else{
      setIsDownvotePressed(true)
      setScore(score-1)
    }
  }

  function doBookMark(){

  }

  return (
    <div className="postFooter">
      <text>{score}</text>

      <button className="postCommentButton" onClick={doUpvote}>
        <IconContext.Provider
          value={{
            color: "white",
            className: "global-class-name",
            size: "3vh",
          }}
        >
          <BiSolidUpvote />
        </IconContext.Provider>
      </button>

      <button className="postCommentButton" onClick={doDownvote}>
        <IconContext.Provider
          value={{
            color: "white",
            className: "global-class-name",
            size: "3vh",
          }}
        >
          <BiSolidDownvote />
        </IconContext.Provider>
      </button>

      <button
        className="postCommentButton"
        onClick={() =>
          navigate("/expandedpost", { state: { username: props.username } })
        }
      >
        <IconContext.Provider
          value={{
            color: "white",
            className: "global-class-name",
            size: "3vh",
          }}
        >
          <FaComment />
        </IconContext.Provider>
      </button>

      <button className="postCommentButton" onClick={doBookMark}>
        <IconContext.Provider
          value={{
            color: "white",
            className: "global-class-name",
            size: "3vh",
          }}
        >
          <FaBookmark />
        </IconContext.Provider>
      </button>
    </div>
  );
}

export default Post;
