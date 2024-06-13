import '../styles/Post.css'
import usericon from '../images/usericon.png'
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import { IconContext } from "react-icons";
import "@fontsource/montserrat"
import { IoMdSend } from "react-icons/io";
import { BiSolidUpvote } from "react-icons/bi";
import { BiSolidDownvote } from "react-icons/bi";
import { FaComment } from "react-icons/fa";
import stockimage from '../images/stockimage.jpg'
import { FaBookmark } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function Post(props){
    return(
        <div className="postMainBody">
            <PostHeader {...props}/>
            <PostBody {...props}/>
            <PostFooter {...props}/>
        </div>
    )
}

function PostHeader(props){
    return(
        <div className='postHeader'>
            <img src={usericon} className='postUserIcon'/>
            <button className='postUsernameButton'>David Outunga</button>
            
            <button className='postOptionsButton'>
                <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "3vh"}}>
                    <HiOutlineDotsCircleHorizontal />
                </IconContext.Provider>;
            </button>
        </div>
    )
}

function PostBody(props){
    return(
        <div className='postBody'>
            <PostImage {...props}/>
            <PostTag {...props}/>
            <PostText {...props}/>
        </div>
    )
}

function PostImage(props){
    return(
        <div>
            <img src={stockimage} className='postImage'/>
        </div>
    )
}

function Tag(props){
    return(
        <div>
            <button className='postTag'>{props.tagText}</button>
        </div>
    )
}

function PostTag(props){
    return(
        <div>
            <Tag tagText = {"Bitcoin"}/>
        </div>
    )
}

function PostText(props){
    const postText = "Bitcoin, introduced in 2009 by an anonymous person or group using the pseudonym Satoshi Nakamoto, revolutionized the concept of currency and finance. It operates on a decentralized peer-to-peer network, utilizing blockchain technology to enable secure, transparent, and immutable transactions without the need for intermediaries like banks or governments.\n      At its core, Bitcoin is a digital or cryptocurrency, meaning it exists purely in electronic form and lacks a physical presence like traditional currencies such as dollars or euros. What sets Bitcoin apart is its decentralized nature; it's not controlled by any single entity but instead relies on a network of nodes (computers) spread across the globe to verify and record transactions on the blockchain.\n"
    
    return(
        <div>
            <div className='postText'>
               {postText}
            </div>
        </div>
    )
}

function PostFooter(props){
    const navigate = useNavigate()

    return(
        <div className='postFooter'>

            <button className='postCommentButton'>
                <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "3vh"}}>
                    <BiSolidUpvote />
                </IconContext.Provider>;
            </button>

            <button className='postCommentButton'>
                <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "3vh"}}>
                    <BiSolidDownvote />
                </IconContext.Provider>;
            </button>


            <button className='postCommentButton' onClick={() => navigate("/expandedpost", {state: {username: props.username}})}>
                <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "3vh"}}>
                    <FaComment />
                </IconContext.Provider>
            </button>

            <button className='postCommentButton'>
                <IconContext.Provider value={{ color: "white", className: "global-class-name", size: "3vh"}}>
                    <FaBookmark />
                </IconContext.Provider>;
            </button>
        </div>
    )
}

export default Post