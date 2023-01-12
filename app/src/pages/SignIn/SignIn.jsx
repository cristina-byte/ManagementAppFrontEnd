import TextField from '@mui/material/TextField'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import Button from '@mui/material/Button'
import {useState} from 'react'
import {Link} from "react-router-dom" 
import style from "./SignIn.css"

function SignIn(){

    const [formState, setFormState]=useState({
        email:"",
        password:"",
        keepLogged:false
    })

    const handleUpdate=(e)=>{
        setFormState( prev=>({
            ...prev,
            [e.target.id]:e.target.id=='keepLogged'?e.target.checked:e.target.value
        }))
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("The form submitted")
        console.log(`Data to be sent email:${formState.email} and password:${formState.password} keepLogged:${formState.keepLogged}`)
    }
   
    return (
        <div className="signIn">
            <div className="welcome-message">
                <h1>Organization Logo</h1>
                <p>Connect with your team now</p>

            </div>
            <div className="form-container">
                <h1>Sign In</h1>
                <p style={{color:'#A3AED0'} }>Enter your email to sign in!</p>
                <form onSubmit={handleSubmit}>
                <TextField
                   sx={{marginTop:'30px',height:"50px"}}
                   required
                   id="email"
                   label="Email"
                   value={formState.email}
                   onChange={handleUpdate}
                /><br/>
                <TextField
                sx={{marginTop:'30px',height:"50px"}}
                   required
                   id={"password"}
                   label="Password" 
                   type="password"
                   value={formState.password}
                   onChange={handleUpdate}
                /><br/>

                 <FormGroup>
                     <FormControlLabel control={<Switch id="keepLogged" checked={formState.keepLogged} onChange={handleUpdate}/>} label="Kepp me logged in" />
                 </FormGroup>

                 <Link style={   {marginTop:'7px'} } to="/resetPassword">Forgot password?</Link>
                 <Button sx={ {display:"block",width:"100%",height:"45px",marginBottom:'20px'}} type="submit" variant="contained">Sign in</Button>
                 <p style={ {display:'inline-block',marginRight:'10px'}  }>Not registered yet?</p>
                 <Link to="/register">Create an account</Link>
                </form>

            </div>
        </div>
    )
}

export default SignIn