import '../styles/CommunityPage.css'
import NavigationBar from './NavigationBar'
import Post from './Post'
import TopContributorSidebar from './TopContributorSidebar'
import {useLocation} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import TrendingTab from './TrendingTab';

function CommunityPage(){
    const location = useLocation();

    let username = location.state.username

    return(
        <div>
            <NavigationBar username = {username}/>
            <CommunityBody username = {username}/>
        </div>
    )
}

function CommunityBody(props){
    return(
        <div className='communityBody'>
            <LeftColumn {...props}/>
            <MainColumn {...props}/>
            <RightColumn {...props}/>
        </div>
    )
}

function LeftColumn(props){
    return(
        <div className='communityLeftColumn'>
            <TopContributorSidebar/>
        </div>
    )
}

function MainColumn(props){
    return(
        <div className='communityMainColumn'>
            <Post username = {props.username}/>
            <Post username = {props.username}/>
        </div>
    )
}

function RightColumn(props){
    const navigate = useNavigate()

    function makePost(){
        navigate("/makepost", { state: { username: props.username } });
    }

    return(
        <div className='communityRightColumn'>
            <TrendingTab/>

            <div>
                <button className='makePostButton' onClick={makePost}>Make Post</button>
            </div>
        </div>
    )
}

export default CommunityPage