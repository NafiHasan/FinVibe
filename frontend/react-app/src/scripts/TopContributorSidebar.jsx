import '../styles/TopContributorSidebar.css'
import "@fontsource/montserrat"
import { FaSearchPlus } from "react-icons/fa";
import { IconContext } from "react-icons";
import usericon from '../images/usericon.png'

function TopContributorSidebar(){
    return(
        <div className="sidebarMainBody">
            <SidebarHeader/>
            <SidebarBody/>
        </div>
    )
}

function SidebarHeader(){
    return(
        <div className='sidebarHeader'>
            Top Contributor
        </div>
    )
}

function SidebarBody(){
    return(
        <div className='sidebarBody'>
            <ProfilePlus/>
            <ProfilePlus/>
            <ProfilePlus/>
            <ProfilePlus/>
            <ProfilePlus/>
            <ProfilePlus/>
            <ProfilePlus/>
            <ProfilePlus/>
        </div>
    )
}

function ProfilePlus(){
    return(
        <div className='profilePlus'>
            <img src={usericon} className='userIconBody'/>

            <button className='sidebarUserButton'>David Outunga</button>
        </div>
    )
}

export default TopContributorSidebar