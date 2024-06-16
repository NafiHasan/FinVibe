import '../styles/ProfilePage.css'
import { useLocation } from 'react-router-dom'
import NavigationBar from './NavigationBar';
import "@fontsource/montserrat"
import usericon from '../images/usericon.png'
import { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { useRef } from 'react';

function ProfilePage(){
    const location = useLocation();
    const [isRestricted, setIsRestricted] = useState(false);
    const [isCurrentUser, setIsCurrentUser] = useState(true)
    const [isEditing, setIsEditing] = useState(false)

    let username = location.state.username

    return(
        <div>
            <NavigationBar username = {username}/>
            <ProfileBody username = {username} isCurrentUser = {isCurrentUser} setIsCurrentUser = {setIsCurrentUser} isRestricted = {isRestricted} setIsRestricted = {setIsRestricted} isEditing = {isEditing} setIsEditing = {setIsEditing}/>
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
    const inputref = useRef()
    const [image, setimage] = useState("")
    const [fullname, setFullname] = useState("Full name")
    const [changedBio, setChangedBio] = useState(bioText)

    function handleImageClick(){
        inputref.current.click()
    }

    function handleImageChange(event){
        const files = event.target.files[0]
        setimage(event.target.files[0])
    }

    function handleEditSubmit(){
        props.setIsEditing(false)
    }

    return(
        <div className='profileLeftHalf'>
           <div style={{ margin: "2%", backgroundColor: "white", alignItems: "center", justifyContent: "space-around", display: "flex", flexDirection: "column" }}>
                {/* image */}
                {(props.isEditing && props.isCurrentUser) ? (
                    <div onClick={handleImageClick}>
                         {image ?  <img src={URL.createObjectURL(image)} className='profilePic' />:  <img src={usericon} className='profilePic' />}
                         <input type = "file" ref = {inputref} onChange={handleImageChange} hidden/>
                         
                    </div>
                ) : (
                    <img src={usericon} className='profilePic' />
                )}

                {/* Display image if not current user */}
                {!props.isCurrentUser && <img src={usericon} className='profilePic' />}

                {/* username */}
                {(props.isEditing && props.isCurrentUser) ? (
                    <div></div>
                ) : (
                    <p className='profileUsername'>{props.username}</p>
                )}

                {/* Display username if not current user */}
                {!props.isCurrentUser && <p className='profileUsername'>{props.username}</p>}

                {(props.isEditing && props.isCurrentUser) ? (
                    <div>
                        <input type = "text" placeholder='Full Name' onChange={(e) => setFullname(e.target.value)}/>
                    </div>
                ) : (
                    <p className='profileUsername'>Full Name</p>
                )}

                {/* Display full name if not current user */}
                {!props.isCurrentUser && <p className='profileUsername'>Full Name</p>}

                {/* profile buttons */}
                {props.isCurrentUser && (
                    <div style={{ display: "flex", flexDirection: "row", width: "80%", alignItems: "center", justifyContent: "center" }}>
                        {!props.isEditing && <button className='editProfileButton' onClick={() => props.setIsEditing(true)}>Edit Profile</button>}
                    </div>
                )}

                {!props.isCurrentUser && !props.isRestricted && (
                    <div style={{ display: "flex", flexDirection: "row", width: "80%", alignItems: "center", justifyContent: "center" }}>
                        <button className='editProfileButton'>Follow User</button>
                        <button className='editProfileButton'>Send A Text</button>
                    </div>
                )}

                {/* score */}
                {!props.isCurrentUser && <p className='profileScore'>Contributor Score: 1000</p>}
                {(props.isEditing && props.isCurrentUser) ? (
                    <div></div>
                ) : (
                    <p className='profileScore'>Contributor Score: 1000</p>
                )}

                {/* bio */}
                {!props.isCurrentUser && <p style={{ color: "black", fontFamily: "Montserrat", fontSize: "15px" }}>{props.bioText}</p>}
                {(props.isEditing && props.isCurrentUser) ? (
                    <div>
                        <textarea placeholder= {bioText} onChange={(e) => setChangedBio(e.target.value)}/>

                        <button className='editProfileButton' onClick={handleEditSubmit}>Submit</button>
                    </div>
                ) : (
                    <p style={{ color: "black", fontFamily: "Montserrat", fontSize: "15px" }}>{bioText}</p>
                )}
            </div>

        </div>
    )
}


function RightHalf(props){
    const [profileNavValue, setProfileNavValue] = useState("Post")

    function handlePrivacyToggle(){
        props.setIsRestricted(!props.isRestricted);
    }

    return(
        <div className='profileRightHalf'>
            {/* buttons */}
            {
                props.isCurrentUser && <div>
                    Do you want to keep your profile restricted? <label class="switch">
                        <input type="checkbox" checked={props.isRestricted} onChange={handlePrivacyToggle}/>
                        <span class="slider round"></span>
                        </label>
                </div>
            }

            {props.isCurrentUser && <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", margin:  "2%", height: "20vh", width: "50vh"}}>
                <button className='profileNavButton' onClick={() => setProfileNavValue("Post")}>Posts</button>
                <button className='profileNavButton'  onClick={() => setProfileNavValue("Bookmarks")}>Bookmarks</button>
                <button className='profileNavButton' onClick={() => setProfileNavValue("Stocks")}>Stocks</button>
                <button className='profileNavButton' onClick={() => setProfileNavValue("Crypto")}>CryptoCurrency</button>
            </div>}

            {!props.isCurrentUser && !props.isRestricted && <div style={{display: "flex", alignItems: "center", justifyContent: "flex-start", margin:  "2%", height: "20vh", width: "50vh"}}>
                <button className='profileNavButton' onClick={() => setProfileNavValue("Post")}>Posts</button>
                <button className='profileNavButton'  onClick={() => setProfileNavValue("Bookmarks")}>Bookmarks</button>
                <button className='profileNavButton' onClick={() => setProfileNavValue("Stocks")}>Stocks</button>
                <button className='profileNavButton' onClick={() => setProfileNavValue("Crypto")}>CryptoCurrency</button>
            </div>}
            
            {props.isCurrentUser && (
                <div>
                    {profileNavValue === "Post" && <div><Posts/></div>}
                    {profileNavValue === "Bookmarks" && <div><Bookmarks/></div>}
                    {profileNavValue === "Stocks" && <div><Stock/></div>}
                    {profileNavValue === "Crypto" && <div><Crypto/></div>}
                </div>
            )}


            {!props.isCurrentUser && !props.isRestricted && (
                <div>
                    {profileNavValue === "Post" && <div>Post</div>}
                    {profileNavValue === "Bookmarks" && <div>Bookmark</div>}
                    {profileNavValue === "Stocks" && <div>Stocks</div>}
                    {profileNavValue === "Crypto" && <div>Crypto</div>}
                </div>
            )}

            {!props.isCurrentUser && props.isRestricted && <div>
                This user has chosen to hide their contributions from everyone
            </div>}
        </div>
    )
}

function Posts(){
    // array of own posts to be shown by this
    
    return(
        <div>This is posts</div>
    )
}

function Bookmarks(){
    //array of bookmarked posts

    return(
        <div>this is bookmarked posts </div>
    )
}

function Stock(){
    //total stock investments
    const [stocks, setStocks] = useState(["AAPL", "Samsung"]);
    const stock = stocks;

    const removeStock = (stockToRemove) => {
        setStocks(stocks.filter((stock) => stock !== stockToRemove));
      };

    return(
        <div>
            <GraphCard/>

            <div className="tagsContainer">
              {stocks.map((stock, index) => (
                <div
                  key={index}
                  className="tag"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <button className="tagTextButton">{stock}</button>
                  <button
                    className="removeTagButton"
                    onClick={() => removeStock(stock)}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
        </div>
    )
}

function Crypto() {
    // total crypto investments
    const [cryptos, setCryptos] = useState(["Bitcoin", "Ethereum"]);
    const crypto = cryptos;

    const removeCrypto = (cryptoToRemove) => {
        setCryptos(cryptos.filter((crypto) => crypto !== cryptoToRemove));
    };

    return (
        <div>
            <GraphCard />

            <div className="tagsContainer">
                {cryptos.map((crypto, index) => (
                    <div
                        key={index}
                        className="tag"
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                        }}
                    >
                        <button className="tagTextButton">{crypto}</button>
                        <button
                            className="removeTagButton"
                            onClick={() => removeCrypto(crypto)}
                        >
                            x
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function GraphCard(props){
    return(
        <div className='stockCardGraphBody'>
            <div className='graphBody'>
                <LineChart 
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                    data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                ]}
                width={500}
                height={300}
                />
            </div>
        </div>
    )
}

export default ProfilePage