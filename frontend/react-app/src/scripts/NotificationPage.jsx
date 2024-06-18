import '../styles/NotificationPage.css'
import NavigationBar from './NavigationBar'
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function NotificationPage(){
    const location = useLocation()

    const username = location.state.username;

    const [key, setKey] = useState("post")



    return(
        <div>
            <NavigationBar username = {username}/>

            <div className='mainBody'>

                <div className='nleftHalf'>
                    <button className = "npageButton" onClick={() => setKey("post")}>Post Notifications</button>
                    <button className = "npageButton" onClick={() => setKey("comment")}>Comment Notifications</button>
                    <button className = "npageButton" onClick={() => setKey("chat")}>Chat Notifications</button>
                </div>

                <div className='nrightHalf'>
                    {!(key == "chat") && <text>There are no {key} notifications pending.</text>}
                    {(key == "chat") && <text>There is one notification pending from James Allison</text>}  
                </div>
            </div>
        </div>
    )
}

export default NotificationPage