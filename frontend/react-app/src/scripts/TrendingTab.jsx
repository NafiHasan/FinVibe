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
            <TrendingItem/>
            <TrendingItem/>
            <TrendingItem/>
            <TrendingItem/>
            <TrendingItem/>
            <TrendingItem/>
            <TrendingItem/>
            <TrendingItem/>
        </div>
    )
}

function TrendingItem(){
    return(
        <div className='trendingItem'>
            <button className='trendingTabUserButton'>David Outunga</button>
        </div>
    )
}

export default TrendingTab