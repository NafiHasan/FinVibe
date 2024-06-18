import '../styles/ExpandedStock.css'
import NavigationBar from './NavigationBar'
import StockCommentSection from './StockCommentSection';
import { LineChart } from '@mui/x-charts/LineChart';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

function ExpandedStock(){
    const location = useLocation();

    const [xAxisData, setXAxisData] = useState([1, 2, 3, 5, 8, 10])
    const [yAxisData, setYAxisData] = useState([4, 5.5, 2, 8.5, 1.5, 10])

    const [xAxisData2, setXAxisData2] = useState([1, 2, 3, 5, 8, 10])
    const [yAxisData2, setYAxisData2] = useState([4, 5.5, 2, 8.5, 1.5, 10])

    const [time, setTime] = useState("7")
    const [comparePressed, isComparePressed]= useState(false)
    const [datafound, isDatafound] = useState(false)

    const [keyword, setKeyword] = useState("")

    const [item1Name, setItem1Name] = useState("Apple")
    const [item2Name, setItem2Name] = useState("Microsoft")

    const [item1Data, setItem1Data] = useState([2, 3, 1, 4, 5])
    const [item2Data, setItem2Data] = useState([3, 1, 4, 2, 1])
    

    let username = location.state.username

    return(
        <div className='expandedStockMainBody'>
            <NavigationBar username = {username}/>
            <ExpandedStockBody username = {username} 
            xAxisData = {xAxisData} 
            yAxisData = {yAxisData} 
            setXAxisData = {setXAxisData} 
            setYAxisData = {setYAxisData} 
            xAxisData2 = {xAxisData2} 
            yAxisData2 = {yAxisData2} 
            setXAxisData2 = {setXAxisData2} 
            setYAxisData2 = {setYAxisData2}
            time = {time}
            setTime = {setTime}
            datafound = {datafound}
            isDatafound = {isDatafound}
            comparePressed = {comparePressed}
            isComparePressed = {isComparePressed}
            keyword = {keyword}
            setKeyword = {setKeyword}
            item1Data = {item1Data}
            item2Data = {item2Data}
            setItem1Data = {setItem1Data}
            setItem2Data={setItem2Data}
            item1Name = {item1Name}
            item2Name = {item2Name}
            setItem1Name = {setItem1Name}
            setItem2Name = {setItem2Name}
            />
        </div>
    )
}

function ExpandedStockBody(props){
    return(
        <div className='expandedStockBody'>
            <LeftHalf {...props}/>
            <RightHalf {...props}/>
        </div>
    )
}

function LeftHalf(props){

    function handleCompare(){
        //find data and place them in normal array and xaxis and y axis 2 usng set state

        props.isComparePressed(true)

        //if data found

        props.isDatafound(true)
    }
    
    return(
        <div className='leftBody'>
            <div className='expGBody'>
                {/* graph */}

                {!props.comparePressed && <div className='stockCardGraphBody'>
                    <div className='egraphBody'>
                        <LineChart 
                        xAxis={[{ data: props.xAxisData}]}
                        series={[
                            {
                            data: props.yAxisData,
                            },
                        ]}
                        width={600}
                        height={300}
                        />
                    </div>
                </div>}
                
                { props.comparePressed && <div className='expGraph1'>
                    <LineChart
                        width={600}
                        height={300}
                        series={[
                            { data: props.item1Data, label: props.item1Name, stack: 'total' },
                            { data: props.item2Data, label: props.item2Name, stack: 'total' },
                        ]}
                    />
                </div>}

                {/* bottom buttons */}
                
                <div style={{display: "flex", flexDirection: "column", alignItems:"flex-end"}}>
                    <button className='expGButton'>Add to My list</button>
                    <button className='expGButton'>Add to a post</button>
                    
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-around", width: "100%", alignItems: "center"}}>
                        <input style = {{width: "70%", height: "5vh"}} type='text' placeholder='Enter A Name' onChange={(e) => props.setKeyword(e.target.value)}></input>
                        <button className='expGButton' onClick={handleCompare}>Compare</button>
                    </div>
                </div>
            
            </div>
        </div>
    )
}

function RightHalf(props){
    return(
        <div className='rightBody'>
            <StockCommentSection/>
        </div>
    )
}

export default ExpandedStock