from pydantic import BaseModel
from typing import Optional
from typing import List


# Define Database models
class Todo(BaseModel):
    title: str
    description: str

class Data(BaseModel):
    data: str



class User(BaseModel):
    username: str  # will be unique
    # email: str
    # Full name and bio are optional
    full_name: Optional[str] = None
    bio: Optional[str] = None
    password: str
    profile_pic: Optional[str] = None
    # following: List[str] = []
    # contributor score
    user_score: int = 0


class LoginRequest(BaseModel):
    username: str
    password: str


# Post model
class UserPost(BaseModel):
    post_id: int
    username: str
    image: Optional[str] = None
    comment_count: int = 0
    upvote_count: int = 0
    downvote_count: int = 0
    content: str
    tags: List[str] = []
    upvoted_by: List[str] = []
    downvoted_by: List[str] = []

# Reply model
# class Reply(BaseModel):
#     reply_id: int
#     comment_id: int
#     username: str
#     content: str
#     upvote_count: int = 0
#     downvote_count: int = 0
#     upvoted_by: List[str] = []
#     downvoted_by: List[str] = []

# Comment model
class Comment(BaseModel):
    comment_id: int
    post_id: int
    username: str
    content: str
    upvote_count: int = 0
    downvote_count: int = 0
    upvoted_by: List[str] = []
    downvoted_by: List[str] = []
    # replies: List[Reply] = []


