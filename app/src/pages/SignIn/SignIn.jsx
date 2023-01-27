import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import {useState} from 'react'
import {Link} from "react-router-dom" 
import axiosInstanceLocal from "../../utils/axiosLocal"
import style from "../../welcomePageStyle.css"
import Alert from '@mui/material/Alert';
import { useMutation } from 'react-query'
import { useNavigate } from "react-router-dom";


function SignIn(){

    const [formState, setFormState]=useState({
        email:"",
        password:"",
        keepLogged:false
    })

    const navigate = useNavigate();

    const handleUpdate=(e)=>{
        setFormState( prev=>({
            ...prev,
            [e.target.id]:e.target.id=='keepLogged'?e.target.checked:e.target.value
        }))
    }

    const loginUser=useMutation({
        mutationFn:async (userCredentials)=>{
            const response=await axiosInstanceLocal.post('https://localhost:7257/api/auth/sign-in',userCredentials)
            //save in local storage
            localStorage.setItem('access',JSON.stringify(response.data.token))
            console.log("This is from sign in"+response.data.token)
            return response.data
        }
    })

    const handleSubmit=(e)=>{
        e.preventDefault()
        const userCredentials={
            email:formState.email,
            password:formState.password
        }

    loginUser.mutate(userCredentials,{
        onError:()=>{
            console.log("Eroare autentificare")
        },
        onSuccess:()=>{
            console.log("Autentificare cu succes")
            navigate('/')
        }
    })
    }
   
    return (
     
        <div className="signIn-page">
            <div className="welcome-message">
                <h1>Organization Logo</h1>
                <p>Connect with your team now</p>
            </div>

            <div className="form-container">

                <h1 onClick={handleSubmit}>Sign In</h1>
                <p className="form-instruction">Enter your email to sign in!</p>
                
                { loginUser.status=='error' && <Alert  severity="error" sx={{ width: '80%',marginTop:'20px' }}>
               User name or password are wrong
              </Alert>}
                
                <form onSubmit={handleSubmit}>

                <TextField
                   sx={{height:"50px",width:'100%'}}
                   required
                   id="email"
                   label="Email"
                   value={formState.email}
                   onChange={handleUpdate}
                /><br/>
                <TextField
                
                sx={{height:"50px",width:'100%',marginBottom:'10px'}}
                   required
                   id={"password"}
                   label="Password" 
                   type="password"
                   value={formState.password}
                   onChange={handleUpdate}
                />
                 <Button sx={ {display:"block",width:"100%",height:"45px",marginBottom:'10px',marginTop:'10px',background:'#2E3789'}} type="submit" variant="contained">Sign in</Button>
                <div className="register-link">
                    <p style={ {display:'inline-block',marginRight:'10px'}  }>Not registered yet?</p>
                    <Link to="/register">Create an account</Link>
                </div>
                </form>
                </div>
        </div>
    )}

export default SignIn