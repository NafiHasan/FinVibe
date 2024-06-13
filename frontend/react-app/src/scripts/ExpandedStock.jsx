import '../styles/ExpandedStock.css'
import NavigationBar from './NavigationBar'
import StockCommentSection from './StockCommentSection';
import { LineChart } from '@mui/x-charts/LineChart';
import { useLocation } from 'react-router-dom';

const seriesA = {
    data: [2, 3, 1, 4, 5],
    label: 'AAPL',
  };

  const seriesB = {
    data: [3, 1, 4, 2, 1],
    label: 'Microsoft',
  };

function ExpandedStock(){
    const location = useLocation();

    let username = location.state.username

    return(
        <div className='expandedStockMainBody'>
            <NavigationBar username = {username}/>
            <ExpandedStockBody username = {username}/>
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
    return(
        <div className='leftBody'>
            <div className='expGBody'>
                {/* graph */}
                
                <div className='expGraph'>
                    <LineChart
                        width={600}
                        height={300}
                        series={[
                            { ...seriesA, stack: 'total' },
                            { ...seriesB, stack: 'total' },
                        ]}
                    />
                </div>

                {/* bottom buttons */}
                
                <div className='expGraphButtons'>
                    <button className='expGButton'>Add to My list</button>
                    <button className='expGButton'>Add to a post</button>
                    <button className='expGButton'>Compare</button>

                    <select>
                        <option>None</option>
                        <option>Tesla</option>
                        <option>Microsoft</option>
                    </select>
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