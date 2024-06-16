import "../styles/SearchPage.css";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import Post from "./Post";
import NavigationBar from "./NavigationBar";
import { IconContext } from "react-icons";
import usericon from "../images/usericon.png";

function SearchPage(){
    const location = useLocation()
    let keyword = location.state.keyword
    let username = location.state.username

    return(
        <div>
            <NavigationBar username={username}/>

            <div style={{display:"flex", flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: "2%", fontSize: "20px", marginBottom: "2%"}}>
                Showing results for "{keyword}"
            </div>
            <SearchBody keyword = {keyword} username = {username}/>
        </div>
    )
}

function SearchBody(props){
    return(
        <div style={{display: "flex", flexDirection: "row"}}>
            
           <div style={{display: "flex", flexDirection: "column", flex: "1"}}>
                <Posts {...props}/>
           </div>

           <div style={{display: "flex", flexDirection: "column", flex: "1"}}>
                <Users {...props}/>
           </div>
        </div>
    )
}

function Posts(props){
    //show all posts that correspond to keyword

    return(
        <div>
            <Post current_user={props.username} />
        </div>
    )
}

function Users(props){
    //show all  the users that correspond to keyword

    return(
        <div>
            <Usercard {...props}/>
        </div>
    )
}

function Usercard(props){
    function handleProfileClick(){

    }


    return(
        <div>
            <div className="usercardBody">
                <img src={usericon} className="userIconBody" alt="User Icon" />

                <button className="userButton" onClick={handleProfileClick}>
                    {props.username}
                </button>
            </div>
        </div>
    )
}



export default SearchPage