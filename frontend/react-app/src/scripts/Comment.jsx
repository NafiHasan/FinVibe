import '../styles/Comment.css'
import Reply from './Reply'
import usericon from '../images/usericon.png'

function Comment(){
    return(
        <div className='commentMainBody'>
            <CommentBody/>
            <Reply/>
        </div>
    )
}

function CommentBody(){
    return(
        <div className='commentBody'>
            <ProfilePlus/>
            
            <div className='commentText'>
                This is the comment text
            </div>

            <div className='commentInputBox'>
                <input></input>
                <button>Reply</button>
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