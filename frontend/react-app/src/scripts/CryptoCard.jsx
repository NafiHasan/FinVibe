import '../styles/CryptoCard.css'
import "@fontsource/montserrat"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LineChart } from '@mui/x-charts/LineChart';

function CryptoCard(props){
    const [displayText, setDisplayText] = useState(true)
    const [xAxisData, setXAxisData] = useState([1, 2, 3, 5, 8, 10])
    const [yAxisData, setYAxisData] = useState([4, 5.5, 2, 8.5, 1.5, 10])

    return(
        <div className='cryptoCardMainBody'>
            {displayText ? <CryptoCardBody {...props}/> : <GraphCard {...props} xAxisData = {xAxisData} yAxisData = {yAxisData} setXAxisData = {setXAxisData} setYAxisData = {setYAxisData}/>}
            <CryptoCardButtons {...props} displayText = {displayText} setDisplayText = {setDisplayText} xAxisData = {xAxisData} yAxisData = {yAxisData} setXAxisData = {setXAxisData} setYAxisData = {setYAxisData}/>
        </div>
    )
}  

function CryptoCardBody(props){
    return(
        <div className='cryptoCardBody'>
            <CryptoCardLeft {...props}/>
            <CryptoCardRight {...props}/>
        </div>
    )
}

function CryptoCardLeft(props){
    return(
        <div className='cryptoCardLeft'>
            <text className='cryptoNameCard'>Bitcoin</text>
        </div>
    )
}

function CryptoCardRight(props){
    return(
        <div className='cryptoCardRight'>
            <text className='cryptoPriceText'>Today's price:</text>

            <text className='cryptoPriceValue'>60000 USD</text>

            <text className='cryptoPriceText'>Average price this week:</text>

            <text className='cryptoPriceValue'>55000 USD</text>
        </div>
    )
}

function CryptoCardButtons(props) {
    const navigate = useNavigate()

    console.log(props.username + " at cryptocard\n")

    function showGraph(){
        //fetch data and keep in xaxisdata and y axis data from props and store using setstate function
        props.setDisplayText(false)
    }



    return (
      <div className='cryptoCardButtons'>
        {/* Pass a function reference to onClick */}
        <button className='cryptoButton' onClick={() => props.setDisplayText(true)}>See Text</button>
        <button className='cryptoButton' onClick={showGraph}>See Graph</button>
        <button className='cryptoButton' onClick={() => navigate("/expandedcrypto", {state: {username: props.username}})}>Expand</button>
      </div>
    );
  }
 
function GraphCard(props){
    

    return(
        <div className='cryptoCardGraphBody'>
            <div className='graphBody'>
                <LineChart 
                xAxis={[{ data: props.xAxisData }]}
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

export default CryptoCard