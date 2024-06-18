from fastapi import FastAPI, HTTPException, Form, File, UploadFile, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache
import redis


from werkzeug.security import generate_password_hash, check_password_hash
from crypto_data import *
from stock_data import *

from typing import List

from model import *
from database import *

app = FastAPI()


# Configure Redis for caching
@app.on_event("startup")
async def startup():
    redis_client = redis.Redis(host="localhost", port=6379, db=0)
    FastAPICache.init(RedisBackend(redis_client), prefix="fastapi-cache")

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
    print("Received post data:", post.model_dump())
    post_data = post.model_dump()
    result = await save_post(post_data)
    return {"message": "Post created successfully"}


# To get all posts
@app.get("/posts", response_model=List[UserPost])
async def get_posts():
    # Get and sort the posts in descending order of post_id
    posts = await get_all_posts()
    posts = sorted(posts, key=lambda x: x['post_id'], reverse=True)
    
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

    user_score = 0
    # print("username", username)
    # Get the post with the given post_id
    post = next((p for p in posts if p["post_id"] == post_id), None)
    # print("before", post)
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if username in post["upvoted_by"]:
        post["upvoted_by"].remove(username)
        post["upvote_count"] -= 1
        user_score -= 1
    else:
        if username in post["downvoted_by"]:
            post["downvoted_by"].remove(username)
            post["downvote_count"] -= 1
            user_score += 1
       
        post["upvoted_by"].append(username)
        post["upvote_count"] += 1
        user_score += 1

    # Save update post info in the database
    await update_post(post_id, post)

    # Also update the user score
    await update_user_score(username, user_score)

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

    user_score = 0
    
    # Get the post with the given post_id
    post = next((p for p in posts if p["post_id"] == post_id), None)
    # print("before", post)
    
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    
    if username in post["downvoted_by"]:
        post["downvoted_by"].remove(username)
        post["downvote_count"] -= 1
        user_score += 1
    else:
        if username in post["upvoted_by"]:
            post["upvoted_by"].remove(username)
            post["upvote_count"] -= 1
            user_score -= 1
       
        post["downvoted_by"].append(username)
        post["downvote_count"] += 1
        user_score -= 1

    # Save update post info in the database
    await update_post(post_id, post)

    # Also update the user score
    await update_user_score(username, user_score)

    # Remove post[_id] key from the post object
    post.pop("_id")
    # print("after", post)

    return post


# To upvote comment
@app.post("/upvote_comment/{comment_id}/{username}")
async def upvote_comment(comment_id: int, username: str):
    comment = await get_comment(comment_id)
    
    user_score = 0

    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    
    if username in comment["upvoted_by"]:
        comment["upvoted_by"].remove(username)
        comment["upvote_count"] -= 1
        user_score -= 1
    else:
        if username in comment["downvoted_by"]:
            comment["downvoted_by"].remove(username)
            comment["downvote_count"] -= 1
            user_score += 1
       
        comment["upvoted_by"].append(username)
        comment["upvote_count"] += 1
        user_score += 1

    # Save update post info in the database
    await update_comment(comment_id, comment)

    # Also update the user score
    await update_user_score(username, user_score)

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
    
    user_score = 0

    if username in comment["downvoted_by"]:
        comment["downvoted_by"].remove(username)
        comment["downvote_count"] -= 1
        user_score += 1
    else:
        if username in comment["upvoted_by"]:
            comment["upvoted_by"].remove(username)
            comment["upvote_count"] -= 1
            user_score -= 1
       
        comment["downvoted_by"].append(username)
        comment["downvote_count"] += 1
        user_score -= 1

    # Save update post info in the database
    await update_comment(comment_id, comment)

    # Also update the user score
    await update_user_score(username, user_score)

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


# Get user info by username
@app.get("/user/{username}")
async def get_user(username: str):

    user = await get_user_by_username(username)
    print("User", user)
    # Remove _id key from the user object
    user.pop("_id")
    user.pop("password")
    return user


# Update user info by username
@app.put("/user/{username}")
async def update_user(
    username: str,
    fullname: str = Form(None),
    bio: str = Form(None),
    image: Optional[UploadFile] = File(None)
):
    print("came here")
    user_data = {}
    user_data["username"] = username
    if fullname:
        user_data["fullname"] = fullname
    if bio:
        user_data["bio"] = bio
    if image:
        user_data["profile_pic"] = image.filename
    print("User data", user_data)


    result = await update_user_info(username, user_data)
    print("also came here")
    return {"message": "User info updated successfully"}


# Get top 10 contributors by user_score
@app.get("/top_contributors", response_model=List[dict])
@cache(expire=60*60)  # Cache for 1 hour
async def get_top_contributors():
    top_contributors = await get_top_users()
    print(top_contributors)
    return top_contributors



# get historical data for a given coin
@app.get("/historical_data/{coin_id}")
@cache(expire=60*60)  # Cache for 1 hour
async def get_historical_data(coin_id: str, days: int = Query(30, ge=1, le=365)):
    print("data for ", coin_id)
    data = get_data(coin_id, 'usd', days)
    
    return data.to_dict(orient='records')

# Get historical data for a given stock
# @app.get("/historical_stock_data/{ticker}")
# async def get_historical_stock_data(ticker: str):
#     data = get_stock_data(ticker, 7)
#     print("data for ", ticker)
#     return data.to_dict(orient='records')

@app.get("/historical_stock_data/{ticker}")
@cache(expire=60*60)  # Cache for 1 hour
async def get_historical_stock_data(ticker: str, days: int = Query(30, ge=1, le=365)):
    df = get_stock_data_for_graph(ticker, days)
    print("data for ", ticker)
    historical_json = df.reset_index().to_dict(orient='records')

    # only keep the date and close pric
    historical_json = [{ "timestamp": data["timestamp"], "price": data["current_price"] } for data in historical_json]
    print(historical_json)
    return historical_json


# Get list of all cryptocurrencies
@app.get("/cryptocurrencies") 
@cache(expire=60*60)  # Cache for 1 hour
async def get_cryptocurrencies():
    # print("called")
    coins = cg.get_coins_markets(vs_currency = 'usd', per_page = 50, page = 1)
    # Sort the coins by market cap in descending order
    coins = sorted(coins, key=lambda x: x['market_cap'], reverse=True)
    coins = coins[:30]
    # Print each coin info in separated lines
    return coins


# Get list of all stocks
@app.get("/stocks")
@cache(expire=60*60)  # Cache for 1 hour
async def get_stocks():
    stocks = ["AAPL", "GOOGL", "AMZN", "TSLA", "MSFT", "META", "JPM", "BAC", "WFC", "C", "GS", "V", "MA", "PYPL", "ADBE", "CRM", "ORCL", "IBM", "INTC", "AMD", "NVDA", "QCOM", "TSM", "MU", "NFLX", "DIS", "CMCSA", "EA", "TTWO", "T", "VZ", "TMUS", "S", "TM", "F", "GM", "HMC", "NSANY"]


    historical_data = []
    summary_data = []

    for stock in stocks:
        df, summary_df = get_stock_data(stock, 7)
        historical_data.append(df)
        summary_data.append(summary_df)

    # Merge all the summary data into a single dataframe
    merged_stocks_df = pd.concat(summary_data)

    # Convert the dataframe to a dictionary for returning it as JSON
    stocks_json = merged_stocks_df.reset_index().to_dict(orient='records')

    # print(stocks_json)
    
    return stocks_json



