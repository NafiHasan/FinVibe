import '../styles/PostCommentSection.css'
import Comment from './Comment'

function PostCommentSection(){
    return(
        <div className='postCommentSectionMainBody'>
            Comments

            <PostCommentsBody/>
        </div>
    )
}

function PostCommentsBody(){
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

export default PostCommentSection