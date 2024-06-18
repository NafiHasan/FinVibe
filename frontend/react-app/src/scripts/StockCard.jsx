import '../styles/StockCard.css'
import "@fontsource/montserrat"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LineChart } from '@mui/x-charts/LineChart';

function StockCard(props){
    const [displayText, setDisplayText] = useState(true)
    const [xAxisData, setXAxisData] = useState([1, 2, 3, 5, 8, 10])
    const [yAxisData, setYAxisData] = useState([4, 5.5, 2, 8.5, 1.5, 10])
    

    return(
        <div className='stockCardMainBody'>
            {displayText ? <StockCardBody {...props}/> : <GraphCard {...props} xAxisData = {xAxisData} yAxisData = {yAxisData} setXAxisData = {setXAxisData} setYAxisData = {setYAxisData} />}
            <StockCardButtons {...props} displayText = {displayText} setDisplayText = {setDisplayText} xAxisData = {xAxisData} yAxisData = {yAxisData} setXAxisData = {setXAxisData} setYAxisData = {setYAxisData} />
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
    function showGraph(){
        //fetch data and keep in xaxisdata and y axis data from props and store using setstate function
        props.setDisplayText(false)
    }
    
    return (
      <div className='stockCardButtons'>
        {/* Pass a function reference to onClick */}
        <button className='stockButton' onClick={() => props.setDisplayText(true)}>See Text</button>
        <button className='stockButton' onClick={showGraph}>See Graph</button>
        <button className='stockButton' onClick={() => navigate("/expandedstock", {state: {username: props.username}})}>Expand</button>
      </div>
    );
  }
 
function GraphCard(props){
   

    return(
        <div className='stockCardGraphBody'>
            <div className='graphBody'>
                <LineChart 
                xAxis={[{ data: props.xAxisData}]}
                series={[
                    {
                    data: props.yAxisData,
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