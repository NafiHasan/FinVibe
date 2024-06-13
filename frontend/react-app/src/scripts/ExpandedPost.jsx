import '../styles/ExpandedPost.css'
import NavigationBar from './NavigationBar'
import PostCommentSection from './PostCommentSection';
import { LineChart } from '@mui/x-charts/LineChart';
import Post from './Post'
import { useLocation } from 'react-router-dom';

const seriesA = {
    data: [2, 3, 1, 4, 5],
    label: 'AAPL',
  };

  const seriesB = {
    data: [3, 1, 4, 2, 1],
    label: 'Series B',
  };

function ExpandedPost(){
    const location = useLocation();

    let username = location.state.username

    return(
        <div className='expandedPostMainBody'>
            <NavigationBar username = {username}/>
            <ExpandedPostBody username = {username}/>
        </div>
    )
}

function ExpandedPostBody(props){
    return(
        <div className='expandedPostBody'>
            <LeftHalf {...props}/>
            <RightHalf {...props}/>
        </div>
    )
}

function LeftHalf(props){
    return(
        <div className='leftBody'>
            <Post/>
        </div>
    )
}

function RightHalf(props){
    return(
        <div className='rightBody'>
            <PostCommentSection/>
        </div>
    )
}

export default ExpandedPost