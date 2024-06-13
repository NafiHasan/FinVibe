from pydantic import BaseModel

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