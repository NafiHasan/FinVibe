import '../styles/StockCommentSection.css'
import Comment from './Comment'

function StockCommentSection(){
    return(
        <div className='stockCommentSectionMainBody'>
            Comments

            <StockCommentsBody/>
        </div>
    )
}

function StockCommentsBody(){
    return(
        <div>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
        </div>
    )
}

export default StockCommentSection