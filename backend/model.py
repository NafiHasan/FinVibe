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
    username: str
    # email: str
    password: str


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
    tag: str
    upvoted_by: List[str] = []
    downvoted_by: List[str] = []