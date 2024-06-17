import motor.motor_asyncio
from model import *
from werkzeug.security import generate_password_hash, check_password_hash
from bson import ObjectId
from fastapi import HTTPException
import datetime


# Connect to MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient('mongodb+srv://admin:admin@cluster0.ohcalzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')

# Get the database
database = client.FinVibe

# Counter for post_id
cur_post_id = 0

# Get the tables/collections
collection = database.User
posts_collection = database.Posts
comments_collection = database.Comments


# Database functions to read and write data
# async def DatabaseFunction(inputData):
#     dataDict = inputData.dict()
#     result = await collection.insert_one(dataDict)
#     return result


async def save_user(user_data):
    result = await collection.insert_one(user_data)
    return result.inserted_id


async def get_users():
    all = []
    async for document in collection.find({}):
        all.append(User(**document))
    return all

async def verify_user(user_data):
    result = await collection.find_one({"username": user_data.username})
    # print("res" , result["password"], "\n", user_data.password)
    if result and check_password_hash(result["password"], user_data.password):
        return True
    else:
        return False



# Get all posts
async def get_all_posts():
    all = []

    async for document in posts_collection.find({}):
        # all.append(UserPost(**document))
        all.append(document)

    return all


# Save post
async def save_post(post_data):
    # Give unique post_id to each post
    # Generate a random post_id based on current time and date
    current_time = datetime.datetime.now()
    post_id = int(current_time.timestamp())
    print("Post id", post_id)

    # Assign the new post_id to the post objectt
    post_data['post_id'] = post_id


    result = await posts_collection.insert_one(post_data)
    return result


# Update post info by post_id
async def update_post(post_id, post_data):
    result = await posts_collection.update_one({"post_id": int(post_id)}, {"$set": post_data})
    print("Updated ", result.modified_count)

    # Print the info of the post after updating
    # post = await posts_collection.find_one({"post_id": int(post_id)})
    # print("Post after update", post)

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Post not found")
    return result.modified_count


# Delete post
async def delete_post(post_id):
    print(type(post_id))
    print("Deleting post with id", post_id)
    result = await posts_collection.delete_one({'post_id': int(post_id)})
    print(result.deleted_count)

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"Post with id {post_id} not found")
    return {"message": f"Post with id {post_id} deleted successfully"}



# Upvote post
# async def upvote_post(post_id):
#     result = await posts_collection.update_one({"post_id": int(post_id)}, {"$inc": {"upvote_count": 1}})
#     print("Updated ", result.modified_count)

#     # Print the info of the post after updating
#     post = await posts_collection.find_one({"post_id": int(post_id)})
#     print("Post after update", post)

#     if result.modified_count == 0:
#         raise HTTPException(status_code=404, detail="Post not found")
#     return result.modified_count


# save comment
async def save_comment(comment_data):
    result = await comments_collection.insert_one(comment_data)
    return result


# get comment by comment_id
async def get_comment(comment_id):
    comment = await comments_collection.find_one({"comment_id": int(comment_id)})
    return comment


# Delete comment
async def delete_comment_from_db(comment_id):
    result = await comments_collection.delete_one({'comment_id': int(comment_id)})
    print(result.deleted_count)

    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail=f"Comment with id {comment_id} not found")
    return {"message": f"Comment with id {comment_id} deleted successfully"}


# Get all comments by post_id
async def get_all_comments(post_id):
    print("Post id", post_id)
    all = []
    async for document in comments_collection.find({"post_id": int(post_id)}):
        all.append(document)

    print("All comments", all)

    return all


# Update comment info by comment_id
async def update_comment(comment_id, comment_data):
    result = await comments_collection.update_one({"comment_id": int(comment_id)}, {"$set": comment_data})
    print("Updated ", result.modified_count)

    # Print the info of the comment after updating
    # comment = await comments_collection.find_one({"comment_id": int(comment_id)})
    # print("Comment after update", comment)

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Comment not found")
    return result.modified_count



# Get user info by username
async def get_user_by_username(username):
    user = await collection.find_one({"username": username})
    return user


# Update user info by username
async def update_user_info(username, user_data):
    # Set user_score to 0 if it is not present in the user_data
    if "user_score" not in user_data:
        user_data["user_score"] = 0
    # Update the user info of only provided fields
    user_data["username"] = username
    result = await collection.update_one({"username": username}, {"$set": user_data})
    print("Updated ", result.modified_count)

    # Print the info of the user after updating
    user = await collection.find_one({"username": username})
    print("User after update", user)

    # if result.modified_count == 0:
    #     raise HTTPException(status_code=404, detail="User not found")
    return result.modified_count



# Update user score by username
async def update_user_score(username, user_score):
    result = await collection.update_one({"username": username}, {"$inc": {"user_score": user_score}})
    print("Updated ", result.modified_count)

    # Print the info of the user after updating
    # user = await collection.find_one({"username": username})
    # print("User after update", user)

    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
    return result.modified_count


# Get top 10 users based on user_score
async def get_top_users():
    all = []
    async for document in collection.find({}).sort("user_score", -1).limit(10):
        # exclude id and password from the response
        document.pop("_id")
        document.pop("password")
        all.append(document)
    return all