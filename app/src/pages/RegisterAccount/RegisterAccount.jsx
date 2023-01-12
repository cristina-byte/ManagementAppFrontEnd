import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button'
import {useForm} from 'react-hook-form'
import {Link} from "react-router-dom" 
import {useState} from "react"
import dayjs, { Dayjs } from 'dayjs';
import style from "../SignIn/SignIn.css"

function RegisterAccount(){

   
    const {register,handleSubmit,formState:{errors}}=useForm()

    const handleSubmission=(data)=>{
        console.log(data)
    }

        const [value, setValue] = useState(
          dayjs('2014-08-18T21:11:54'),
        )
      
        const handleChange = (newValue) => {
          setValue(newValue)
        }

        console.log("render")
      
    return (
        <div className="register">
        <div className="welcome-message">
            <h1>Organization Logo</h1>
            <p>Connect with your team now</p>
        </div>

        <div className="form-container">
            <h1>Register</h1>
            <p style={{color:'#A3AED0'} }>Complete fields to create a new account!</p>
            <form  onSubmit={handleSubmit(handleSubmission)}>
            <TextField
               sx={{marginBottom:'20px',marginTop:'20px',height:"40px"}}
               required
               id="fname"
               label="First Name"
               {...register('fname',{required:true})} 
            />

            <TextField
               sx={{marginBottom:'20px',marginTop:'20px',height:"40px"}}
               required
               id="lname"
               label="Last Name"
               {...register('lname',{required:true})}
            />

            <TextField
               sx={{marginBottom:'20px',marginTop:'20px',height:"40px"}}
               required
               id="phone"
               label="Phone"
               type="tel"
               {...register('phone',{required:true})} 
            />
             
            <DesktopDatePicker
                label="BirthDay"
                inputFormat="MM/DD/YYYY"
                id="birthDay"
                {...register('birthDay',{required:true})}
                renderInput={(params) => <TextField sx={{marginTop:'20px',height:"40px"}} {...params} />}
                onChange={handleChange}
            />
           
            <TextField
               sx={{marginBottom:'20px',marginTop:'20px',height:"40px"}}
               required
               id="email"
               label="Email"
               {...register('email',{required:true})}
            />
           
            <TextField
               sx={{marginBottom:'20px',marginTop:'20px',height:"40px"}}
               required
               id="password"
               label="Password" 
               type="password"
               {...register('password',{required:true,minLength:8})}
            /> 

             <Button sx={ {display:"block",width:"100%",height:"45px",marginTop:'20px',marginBottom:'20px'}} type="submit" variant="contained">Sign up</Button>
             <p style={ {display:'inline-block',marginRight:'5px'}  }>Have already an account?</p>
             <Link to="/">Log in</Link>
            </form>

        </div>
    </div>

    )}

export default RegisterAccount