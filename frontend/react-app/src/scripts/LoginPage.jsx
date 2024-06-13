import '../styles/LoginPage.css'
import "@fontsource/montserrat"
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'


function LoginPage(){
    return(
        <div className="loginPageBody">
            <LeftHalf/>
            <RightHalf/>
        </div>
    )
}

function LeftHalf(){
    return(
        <div className='loginLeftHalfBody'>
            <InfoCard/>
        </div>
    )
}

function RightHalf(){
    return(
        <div className='loginRightHalfBody'>
            <LoginCard/>
        </div>
    )
}

function InfoCard(){
    return(
        <div className='loginInfoCard'>
            <text style={{fontSize: '10vh', fontFamily: 'Montserrat', paddingTop: '20vh',  fontWeight: 'bolder', color: 'whitesmoke'}}>FinVibe </text>
            <text style={{fontSize: '5vh', fontFamily: 'Montserrat', paddingTop: '5vh', color:'whitesmoke'}}>With You, Always</text>
        </div>
    )
}

function LoginCard(){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [wrongCred, setWrongCred] = useState(false)
    const [emptyCred, setEmptyCred] = useState(false)

    const navigate = useNavigate()

    function goToRegisterPage(){
        navigate("/register")
    }

    function performLogin(){
        if(username == "abcd" && password == "1234"){
            setWrongCred(false)
            setEmptyCred(false)
            navigate("/community", {state:{username: "CM Punk"}})
        }

        else {
            if(password == "" || username == ""){
                setEmptyCred(true)
            }
            else{
                setWrongCred(true)
                setEmptyCred(false)
            }
        }
    }

    return(
            <div className='loginCard'>
                {/* Login Input */}

                <div className='loginInput'>
                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height:'12vh'}}>
                        <text style={{fontSize:'3vh', fontFamily: 'Montserrat', fontWeight: 'bold'}}>Username</text>
                        <input type='text' className='inputBox' onChange={(e) => setUsername(e.target.value)}></input>
                    </div>

                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height:'12vh'}}>
                        <text style={{fontSize:'3vh', fontFamily: 'Montserrat', fontWeight:'bold'}}>Password</text>
                        <input type='password' className='loginInputBox' onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                </div>

                {/* Login Button */}

                <div className='loginInputButton'>
                    <button className='loginButton' onClick={performLogin}>Login</button>
                    <button className='loginButton' onClick={goToRegisterPage}>Register</button>
                </div>

                <div className='wrongCredTextBody'>
                    {wrongCred? <text className='wrongCredText'>The username or passcode does not match</text>:<div/>}
                </div>

                <div className='wrongCredTextBody'>
                    {emptyCred? <text className='wrongCredText'>The username or passcode can not be empty</text>:<div/>}
                </div>
        </div>
    )
}

export default LoginPage