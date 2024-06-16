from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from werkzeug.security import generate_password_hash, check_password_hash


from typing import List

from model import *
from database import *

app = FastAPI()


# To connect frontend with backend
origins = ['https://localhost:3000', 'http://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

# Endpoints 
@app.get("/")
def read_root():
    return "Hello world"



# To handle register
@app.post("/register")
async def register_user(user: User):
    user.password = generate_password_hash(user.password)
    # print("Received user data:", user.model_dump())

    result = await save_user(user.model_dump())
    return {"message": "User registered successfully"}


# For login
@app.post("/login")
async def login_user(user: LoginRequest):
    # print(user.password , " ")
    # user.password = generate_password_hash(user.password)

    # print(user.password , " ")
    # print("Received data:", user.model_dump(), " f")

    verified = await verify_user(user)
    # print("ver", verified)
    if verified:
        return {"message": "Login successful", "username": user.username}
    else:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    


# To handle post
@app.post("/create_post")
async def create_post(post: UserPost):
    # print("Received post data:", post.model_dump())
    post_data = post.model_dump()
    result = await save_post(post_data)
    return {"message": "Post created successfully"}


# To get all posts
@app.get("/posts", response_model=List[UserPost])
async def get_posts():
    posts = await get_all_posts()
    return posts

# To delete post
@app.delete("/delete_post/{post_id}")
async def delete_post_route(post_id: str):
    # print("Here ", post_id)
    return await delete_post(post_id)



# To upvote post
@app.post("/upvote/{post_id}/{username}")
async def upvote_post(post_id: int, username: str):
    posts = await get_all_posts()
    # print("Posts ", posts)

    # print("username", username)
    # Get the post with the given post_id
    post = next((p for p in posts if p["post_id"] == post_id), None)
    # print("before", post)
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if username in post["upvoted_by"]:
        post["upvoted_by"].remove(username)
        post["upvote_count"] -= 1
    else:
        if username in post["downvoted_by"]:
            post["downvoted_by"].remove(username)
            post["downvote_count"] -= 1
       
        post["upvoted_by"].append(username)
        post["upvote_count"] += 1

    # Save update post info in the database
    await update_post(post_id, post)

    # Remove post[_id] key from the post object
    post.pop("_id")
    # print("after", post)

    return post


# To downvote post
@app.post("/downvote/{post_id}/{username}")
async def downvote_post(post_id: int, username: str):
    posts = await get_all_posts()
    # print("Posts ", posts)
    # print(username)

    
    # Get the post with the given post_id
    post = next((p for p in posts if p["post_id"] == post_id), None)
    # print("before", post)
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if username in post["downvoted_by"]:
        post["downvoted_by"].remove(username)
        post["downvote_count"] -= 1
    else:
        if username in post["upvoted_by"]:
            post["upvoted_by"].remove(username)
            post["upvote_count"] -= 1
       
        post["downvoted_by"].append(username)
        post["downvote_count"] += 1

    # Save update post info in the database
    await update_post(post_id, post)

    # Remove post[_id] key from the post object
    post.pop("_id")
    # print("after", post)

    return post


# To upvote comment
@app.post("/upvote_comment/{comment_id}/{username}")
async def upvote_comment(comment_id: int, username: str):
    comment = await get_comment(comment_id)
    
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    if username in comment["upvoted_by"]:
        comment["upvoted_by"].remove(username)
        comment["upvote_count"] -= 1
    else:
        if username in comment["downvoted_by"]:
            comment["downvoted_by"].remove(username)
            comment["downvote_count"] -= 1
       
        comment["upvoted_by"].append(username)
        comment["upvote_count"] += 1

    # Save update post info in the database
    await update_comment(comment_id, comment)

    # Remove post[_id] key from the post object
    comment.pop("_id")
    # print("after", comment)

    return comment


# To downvote comment
@app.post("/downvote_comment/{comment_id}/{username}")
async def downvote_comment(comment_id: int, username: str):
    comment = await get_comment(comment_id)
    
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    if username in comment["downvoted_by"]:
        comment["downvoted_by"].remove(username)
        comment["downvote_count"] -= 1
    else:
        if username in comment["upvoted_by"]:
            comment["upvoted_by"].remove(username)
            comment["upvote_count"] -= 1
       
        comment["downvoted_by"].append(username)
        comment["downvote_count"] += 1

    # Save update post info in the database
    await update_comment(comment_id, comment)

    # Remove post[_id] key from the post object
    comment.pop("_id")
    # print("after", comment)

    return comment


# Create comment for a post by a user
@app.post("/comments/{post_id}")
async def create_comment(post_id: int, comment: Comment):
    # print("Received comment data:", comment.model_dump())
    comment_data = comment.model_dump()
    result = await save_comment(comment_data)
    return {"message": "Comment created successfully"}


# Get all comments for a post
@app.get("/comments/{post_id}", response_model=List[Comment])
async def get_comments(post_id: int):
    # print("Post id for comments:", post_id)

    comments = await get_all_comments(post_id)
    return comments


# Delete comment
@app.delete("/delete_comment/{comment_id}")
async def delete_comment(comment_id: str):
    # print("delete comment ", comment_id)
    return await delete_comment_from_db(comment_id)