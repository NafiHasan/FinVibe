
import NavigationBar from './NavigationBar'
import {useLocation} from 'react-router-dom';
import '../styles/MakePost.css'

function MakePost(){
    const location = useLocation();

    let username = location.state.username

    return(
        <div>
            <NavigationBar username = {username}/>

            <MakePostBody username = {username}/>
        </div>
    )
}

function MakePostBody(props) {
    function createPost(){

    }
    return (
        <div className='makePostBody'>
            <div className='left'>
                <input type='text' className='postTextBox'></input>
            </div>


            <div className='right'>
                <button onClick={createPost}>Post</button>
            </div>
        </div>
    )
}

export default MakePost