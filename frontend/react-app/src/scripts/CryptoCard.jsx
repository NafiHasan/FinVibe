import '../styles/CryptoCard.css'
import "@fontsource/montserrat"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LineChart } from '@mui/x-charts/LineChart';

function CryptoCard(props){
    const [displayText, setDisplayText] = useState(true)

    return(
        <div className='cryptoCardMainBody'>
            {displayText ? <CryptoCardBody {...props}/> : <GraphCard {...props}/>}
            <CryptoCardButtons {...props} displayText = {displayText} setDisplayText = {setDisplayText}/>
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

    return (
      <div className='cryptoCardButtons'>
        {/* Pass a function reference to onClick */}
        <button className='cryptoButton' onClick={() => props.setDisplayText(true)}>See Text</button>
        <button className='cryptoButton' onClick={() => props.setDisplayText(false)}>See Graph</button>
        <button className='cryptoButton' onClick={() => navigate("/expandedcrypto", {state: {username: props.username}})}>Expand</button>
      </div>
    );
  }
 
function GraphCard(){
    return(
        <div className='cryptoCardGraphBody'>
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

export default CryptoCard