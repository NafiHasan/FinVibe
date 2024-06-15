import '../styles/ProfilePage.css'
import { useLocation } from 'react-router-dom'
import NavigationBar from './NavigationBar';
import "@fontsource/montserrat"
import usericon from '../images/usericon.png'

function ProfilePage(){
    const location = useLocation();

    let username = location.state.username

    return(
        <div>
            <NavigationBar username = {username}/>
            <ProfileBody username = {username}/>
        </div>
    )
}

function ProfileBody(props){
    return(
        <div className='profileBody'>
            <LeftHalf {...props}/>
            <RightHalf {...props}/>
        </div>
    )
}

function LeftHalf(props){
    const bioText = "Welcome to the ring of trading, where every move counts and every decision packs a punch. I'm CM Punk, stepping into the world of stocks and crypto with the same intensity I bring to the squared circle. Armed with determination and a keen eye for opportunity, I'm ready to grapple with market fluctuations and come out on top. In this arena, strategy is my best ally, and I'm here to show that discipline and resilience aren't just for the ring—they're the keys to success in any arena. So let's lace up our boots and make some profitable trades"
    
    return(
        <div className='profileLeftHalf'>
           <div style={{margin: "2%", backgroundColor: "aliceblue", alignItems: "center", justifyContent: "space-around", display: "flex", flexDirection: "column"}}>
                {/* image */}

                <img src={usericon} className='profilePic'/>

                {/* username */}


                <p className='profileUsername'>{props.username}</p>

                {/* profile buttons */}
                <div style={{display: "flex", flexDirection: "row", width: "80%", alignItems: "center", justifyContent: "center"}}>
                    <button className='editProfileButton'>Edit Profile</button>
                </div>

                {/* score */}

                <p className='profileScore'>Contributor Score: 1000</p>

                {/* bio */}

                <p style={{color: "black", fontFamily: "Montserrat",  fontSize: "15px"}}>{bioText}</p>
           </div>
        </div>
    )
}


function RightHalf(props){
    return(
        <div className='profileRightHalf'>
            {/* buttons */}
            <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", margin:  "2%", height: "20vh", width: "50vh", backgroundColor: "red"}}>
                <button>Posts</button>
                <button>Comments</button>
                <button>Stocks</button>
                <button>CryptoCurrency</button>
            </div>
            
            <div>
                This will be the result
            </div>
        </div>
    )
}


export default ProfilePage