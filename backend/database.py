import motor.motor_asyncio
from model import *
from werkzeug.security import generate_password_hash, check_password_hash

# Connect to MongoDB
client = motor.motor_asyncio.AsyncIOMotorClient('localhost:27017')

# Get the database
database = client.FinVibe


# Get the tables/collections
collection = database.User

# Database functions to read and write data
async def DatabaseFunction(inputData):
    dataDict = inputData.dict()
    result = await collection.insert_one(dataDict)
    return result


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