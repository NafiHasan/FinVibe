import '../styles/Reply.css'
import usericon from '../images/usericon.png'

function Reply(){
    return(
        <div className='replyMainBody'>
            <ReplyBody/>
            {/* <Reply/> */}
        </div>
    )
}

function ReplyBody(){
    return(
        <div className='replyBody'>
            <ProfilePlus/>
            
            <div className='replyText'>
                This is the reply text
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