import '../styles/Comment.css'
import Reply from './Reply'
import usericon from '../images/usericon.png'
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { useState } from 'react';
import { IconContext } from "react-icons";

function Comment(){
    return(
        <div className='commentMainBody'>
            <CommentBody/>
            <Reply/>
        </div>
    )
}

function CommentBody(){
    const [isUpvotePressed, setIsUpvotePressed] = useState(false)
    const [isDownvotePressed, setIsDownvotePressed] = useState(false)
    const [score, setScore] = useState(0)

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

    return(
        <div className='commentBody'>
            <ProfilePlus/>
            
            <div className='commentText'>
                This is the comment text
            </div>

            <div className='commentInputBox'>
                <textarea type = "text" placeholder='Reply' style={{width: "60%"}}></textarea>
                <text style={{marginLeft: "1%", marginRight: "1%"}}>{score}</text>
                <button className='replyButton'>Reply</button>

                

                <button className="postCommentButton" onClick={doUpvote}>
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
            </div>
        </div>
    )
}

function ProfilePlus(){
    return(
        <div className='profilePlusComment'>
            <img src={usericon} className='userIconBodyComment'/>

            <button className='sidebarUserButtonComment'>David Outunga</button>
        </div>
    )
}

export default Comment