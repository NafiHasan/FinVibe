import '../styles/CryptoCommentSection.css'
import Comment from './Comment'

function CryptoCommentSection(){
    return(
        <div className='cryptoCommentSectionMainBody'>
           Crypto Comments

            <CryptoCommentsBody/>
        </div>
    )
}

function CryptoCommentsBody(){
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

export default CryptoCommentSection