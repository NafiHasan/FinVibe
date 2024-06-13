import '../styles/Crypto.css'
import NavigationBar from './NavigationBar'
import CryptoCard from './CryptoCard'
import {useLocation} from 'react-router-dom';
import TrendingTab from './TrendingTab'

function Crypto(){
    const location = useLocation();

    let username = location.state.username

    return(
        <div className='cryptoMainBody'>
            <NavigationBar username = {username}/>
            <CryptoBody username = {username}/>
        </div>
    )
}

function CryptoBody(props){
    return(
        <div className='cryptoBody'>
            <CryptoLeftHalf {...props}/>
            <CryptoRightHalf {...props}/>
        </div>
    )
}

function CryptoLeftHalf(props){
    return(
        <div className='cryptoLeftColumn'>
            <TrendingTab/>
        </div>
    )
}

function CryptoRightHalf(props){
    return(
        <div className='cryptoRightColumn'>
            <CryptoCard {...props}/>
            <CryptoCard {...props}/>
            <CryptoCard {...props}/>
            <CryptoCard {...props}/>
        </div>
    )
}

export default Crypto

