import '../styles/Reply.css'
import usericon from '../images/usericon.png'
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { useState } from 'react';
import { IconContext } from "react-icons";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";

function Reply(){
    return(
        <div className='replyMainBody'>
            <ReplyBody/>
            {/* <Reply/> */}
        </div>
    )
}

function ReplyBody(){
    const [isUpvotePressed, setIsUpvotePressed] = useState(false)
    const [isDownvotePressed, setIsDownvotePressed] = useState(false)
    const [score, setScore] = useState(0)

    const [showOptions, setShowOptions] = useState(false);
    const [thisUserReply,setThisUserReply] = useState(true)

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
    function handleDeleteReply(){

    }

    return(
        <div style={{display: "flex", flexDirection: "row"}}>
        <div className='replyBody'>
            <ProfilePlus showOptions = {showOptions} setShowOptions = {setShowOptions} thisUserReply = {thisUserReply} setThisUserReply = {setThisUserReply}/>
            
            <div className='replyButtonBody'>
                <div className='replyText'>
                    This is the reply text
                </div>
            </div>

            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <text style={{marginLeft: "1%", marginRight: "1%", border: "1px solid #242124"}}>{score}</text>

                    <div style ={{display: "flex", margin: "1%"}}>
                    <button className="replyCommentButton" onClick={doUpvote}>
                        <IconContext.Provider
                        value={{
                            color: "white",
                            className: "global-class-name",
                            size: "3vh",
                            marginLeft: "3vh",
                        }}
                        >
                        <BiSolidUpvote />
                        </IconContext.Provider>
                    </button>

                    <button className="replyCommentButton" onClick={doDownvote}>
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
                    </div>
            </div>
        </div>
        <div style= {{display: "flex", flexDirection: "column",  flex: "1"}}>
        { showOptions && (
                thisUserReply ? (
                    <div style={{backgroundColor: "white", height: "5vh", marginTop: "2vh"}}>
                        <div className="postOptionItem">
                            Edit Reply
                        </div>
                        <div className="postOptionItem" onClick={handleDeleteReply}>
                            Delete Reply
                        </div>
                    </div>
                ) : (
                    <div style={{backgroundColor: "white", height: "5vh", marginTop: "2vh"}}>
                        <div className="postOptionItem">
                            Hide Reply
                        </div>
                        <div className="postOptionItem">
                            Follow User
                        </div>
                    </div>
                )
            )}
            </div>
            </div>
    )
}

function ProfilePlus(props){
    

    function doesReplyBelongToCurrentUser(){
        props.setShowOptions(!props.showOptions)
    }

    return(
        <div className='profilePlusreply'>
            <img src={usericon} className='userIconBodyreply'/>

            <button className='sidebarUserButtonreply'>David Outunga</button>

            <div className="replyOptions">
                    

                    <button
                    className="replyOptionsButton"
                    onClick={doesReplyBelongToCurrentUser}
                    >
                    <IconContext.Provider
                        value={{
                        color: "black",
                        className: "global-class-name",
                        size: "4vh",
                        }}
                    >
                        <HiOutlineDotsCircleHorizontal />
                    </IconContext.Provider>
                    </button>
                </div>
        </div>
    )
}

export default Reply