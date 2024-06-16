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
    print("Received user data:", user.model_dump())

    result = await save_user(user.model_dump())
    return {"message": "User registered successfully"}


# For login
@app.post("/login")
async def login_user(user: LoginRequest):
    print(user.password , " ")
    # user.password = generate_password_hash(user.password)

    # print(user.password , " ")
    print("Received data:", user.model_dump(), " f")

    verified = await verify_user(user)
    # print("ver", verified)
    if verified:
        return {"message": "Login successful", "username": user.username}
    else:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    


# To handle post
@app.post("/create_post")
async def create_post(post: UserPost):
    print("Received post data:", post.model_dump())
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
    print("Here ", post_id)
    return await delete_post(post_id)




# To handle upvote
@app.post("/upvote/{post_id}")
async def upvote(post_id: str):
    print("Received post id:", post_id)
    return await upvote_post(post_id)