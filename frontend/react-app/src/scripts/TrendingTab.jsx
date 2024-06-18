import '../styles/TrendingTab.css'
import "@fontsource/montserrat"
import { FaSearchPlus } from "react-icons/fa";
import { IconContext } from "react-icons";

function TrendingTab(){
    return(
        <div className="trendingTabMainBody">
            <TrendingTabHeader/>
            <TrendingTabBody/>
        </div>
    )
}

function TrendingTabHeader(){
    return(
        <div className='trendingTabHeader'>
            Trending Now
        </div>
    )
}

function TrendingTabBody(){
    return(
        <div className='trendingTabBody'>
            <TrendingItem item = {"Bitcoin"}/>
            <TrendingItem item = {"Costco Wholesale"}/>
            <TrendingItem item = {"Ethereum"}/>
            <TrendingItem item = {"Microstrategy"}/>
            <TrendingItem item = {"McKesson Corporation"}/>
            <TrendingItem item = {"ZKSync"}/>
            <TrendingItem item = {"MercadoLibre"}/>
            <TrendingItem item = {"Brett"}/>
            <TrendingItem item = {"Synopsys "}/>
        </div>
    )
}

function TrendingItem(props){
    return(
        <div className='trendingItem'>
            <button className='trendingTabUserButton'>{props.item}</button>
        </div>
    )
}

export default TrendingTab