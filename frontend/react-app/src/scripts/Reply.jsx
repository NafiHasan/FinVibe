import '../styles/Reply.css'
import usericon from '../images/usericon.png'
import { BiSolidUpvote, BiSolidDownvote } from "react-icons/bi";
import { useState } from 'react';
import { IconContext } from "react-icons";

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
        <div className='replyBody'>
            <ProfilePlus/>
            
            <div className='replyButtonBody'>
                <div className='replyText'>
                    This is the reply text
                </div>

                <text style={{marginLeft: "1%", marginRight: "1%"}}>{score}</text>
                    

                    

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
        <div className='profilePlusreply'>
            <img src={usericon} className='userIconBodyreply'/>

            <button className='sidebarUserButtonreply'>David Outunga</button>
        </div>
    )
}

export default Reply