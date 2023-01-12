import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useState} from "react"
import style from "../SignIn/SignIn.css"

function ForgotPassword(){
    
    const [formState,setFormState]=useState("")

    const handleUpdate=(e)=>{
        setFormState(e.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log("The form submitted")
        console.log("Data to be submitted, email:"+formState)
    }

    return (
        <div className="register">
        <div className="welcome-message">
            <h1>Organization Logo</h1>
            <p>Connect with your team now</p>
        </div>

        <div className="form-container">
            <h1>Reset password</h1>
            <p style={{color:'#A3AED0'} }>Enter the email to reset your password</p>

            <form onSubmit={handleSubmit}>
            <TextField
               sx={{marginBottom:'20px',marginTop:'20px',height:"40px"}}
               required
               id="fname"
               label="Email"
               value={formState}
               onChange={handleUpdate}
            />

             <Button sx={ {display:"block",width:"100%",height:"45px",marginTop:'20px',marginBottom:'20px'}} type="submit" variant="contained">Submit</Button>
            </form>

        </div>
    </div>
    )


}

export default ForgotPassword