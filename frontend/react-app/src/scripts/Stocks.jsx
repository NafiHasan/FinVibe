import '../styles/Stocks.css'
import NavigationBar from './NavigationBar'
import StockCard from './StockCard'
import {useLocation} from 'react-router-dom';
import TrendingTab from './TrendingTab';

function Stocks(){
    const location = useLocation();

    let username = location.state.username

    return(
        <div className='stocksMainBody'>
            <NavigationBar username = {username}/>
            <StocksBody username = {username}/>
        </div>
    )
}

function StocksBody(props){
    return(
        <div className='stocksBody'>
            <StocksLeftHalf {...props}/>
            <StocksRightHalf {...props}/>
        </div>
    )
}

function StocksLeftHalf(props){
    return(
        <div className='stocksLeftColumn'>
            <TrendingTab/>
        </div>
    )
}

function StocksRightHalf(props){
    return(
        <div className='stocksRightColumn'>
            <StockCard {...props}/>
            <StockCard {...props}/>
            <StockCard {...props}/>
            <StockCard {...props}/>
            <StockCard {...props}/>
        </div>
    )
}

export default Stocks

