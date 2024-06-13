import '../styles/StockCard.css'
import "@fontsource/montserrat"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LineChart } from '@mui/x-charts/LineChart';

function StockCard(props){
    const [displayText, setDisplayText] = useState(true)

    return(
        <div className='stockCardMainBody'>
            {displayText ? <StockCardBody {...props}/> : <GraphCard {...props}/>}
            <StockCardButtons {...props} displayText = {displayText} setDisplayText = {setDisplayText}/>
        </div>
    )
}  

function StockCardBody(props){
    return(
        <div className='stockCardBody'>
            <StockCardLeft {...props}/>
            <StockCardRight {...props}/>
        </div>
    )
}

function StockCardLeft(props){
    return(
        <div className='stockCardLeft'>
            <text className='stockNameCard'>AAPL</text>
        </div>
    )
}

function StockCardRight(props){
    return(
        <div className='stockCardRight'>
            <text className='stockPriceText'>Today's price:</text>

            <text className='stockPriceValue'>300 USD</text>

            <text className='stockPriceText'>Average price this week:</text>

            <text className='stockPriceValue'>275 USD</text>
        </div>
    )
}

function StockCardButtons(props) {
    const navigate = useNavigate()
    
    return (
      <div className='stockCardButtons'>
        {/* Pass a function reference to onClick */}
        <button className='stockButton' onClick={() => props.setDisplayText(true)}>See Text</button>
        <button className='stockButton' onClick={() => props.setDisplayText(false)}>See Graph</button>
        <button className='stockButton' onClick={() => navigate("/expandedstock", {state: {username: props.username}})}>Expand</button>
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
                width={400}
                height={150}
                />
            </div>
        </div>
    )
}

export default StockCard