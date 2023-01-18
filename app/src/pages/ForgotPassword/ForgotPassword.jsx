import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import {useForm} from "react-hook-form"
import style from "../../welcomePageStyle.css"

function ForgotPassword(){
    
    const {register,handleSubmit,formState}=useForm()

    const handleSubmission=(data)=>{
        console.log("The form submitted")
        console.log("Data to be submitted, email:"+data.email)
    }

    return (
        <div className="resetPassword-page">
        <div className="welcome-message">
            <h1>Organization Logo</h1>
            <p>Connect with your team now</p>
        </div>

        <div className="form-container">
            <h1>Reset password</h1>
            <p className="form-instruction">Enter the email to reset your password</p>

            <form onSubmit={handleSubmit(handleSubmission)}>
            <TextField
               sx={{marginBottom:'20px',height:"40px",width:'100%'}}
               required
               id="email"
               label="Email"
               error={formState.errors.email?true:false}
               helperText={formState.errors.email?.message}
               {...register('email',{required:true,pattern:{value:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,message:'The email is invalid'}})}
            />

             <Button 
             sx={ {display:"block",width:"100%",height:"45px",marginTop:'20px',marginBottom:'20px'}} 
             type="submit" 
             variant="contained">Submit</Button>

            </form>
        </div>
    </div>
    )}

export default ForgotPassword