import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button'
import {useForm} from 'react-hook-form'
import {Link} from "react-router-dom" 
import axiosInstanceLocal from "../../axiosLocal"
import style from "../../welcomePageStyle.css"
import Moment from 'moment'

function RegisterAccount(){

    const {register,handleSubmit,formState,setValue,watch}=useForm()

    var dateValue=watch('date')


    const handleSubmission=async (data)=>{
        console.log("data to be sent to api")
        console.log(data.date) 
        const user={
            userName:data.email,
            name:data.fname,
            email:data.email,
            phoneNumber:data.phone,
            password:data.password,
            birthDay:data.date
        }
        const response= await axiosInstanceLocal.post('https://localhost:7257/api/auth/signup',user)
        console.log(response)   
    }

     const dateChange=(e)=>{
        setValue('date',e.toString())
     }

    return (
        <div className="register-page">
        <div className="welcome-message">
            <h1>Organization Logo</h1>
            <p>Connect with your team now</p>
        </div>

        <div className="form-container">
            <h1>Register</h1>
            <p className="form-instruction">Complete fields to create a new account!</p>
            <form  onSubmit={handleSubmit(handleSubmission)}>
            <TextField
               sx={{marginBottom:'40px',height:"40px"}}
               required
               id="fname"
               label="First Name"
               {...register('fname',{required:true})} 
            />

            <TextField
               sx={{marginBottom:'40px',height:"40px"}}
               required
               id="lname"
               label="Last Name"
               {...register('lname',{required:true})}
            />

            <TextField
               sx={{marginBottom:'40px',height:"40px"}}
               required
               id="phone"
               label="Phone"
               error={formState.errors.phone?true:false}
               helperText={formState.errors.phone?.message}
               defaultValue="+40"
               {...register('phone',{required:true,pattern:{value:/^(\+4|)?(07[0-8]{1}[0-9]{1}|02[0-9]{2}|03[0-9]{2}){1}?(\s|\.|\-)?([0-9]{3}(\s|\.|\-|)){2}$/,message:'The phone number is invalid'}})} 
            />
             
            <DesktopDatePicker
                label="BirthDay"
                id="date"
                onChange={dateChange}
                renderInput={(params) => <TextField  {...register('date')} sx={{height:"40px",width:'222px',marginBottom:'30px'}} {...params} />}
                value={ dateValue?dateValue:'Fri, 01 Jan 2023 06:58:41 GMT' }
                 
            />

           <TextField
               sx={{marginBottom:'40px',height:"40px"}}
               required
               error={formState.errors.email?true:false}
               helperText={formState.errors.email?.message}
               id="email"
               label="Email"
               {...register('email',{required:true,pattern:{value:/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,message:'The email is invalid'}})}
            />
           
           <TextField
               sx={{marginBottom:'40px',height:"40px"}}
               required
               error={formState.errors.password?true:false}
               helperText={formState.errors.password?.message}
               id="password"
               label="Password" 
               type="password"
               {...register('password',
               {required:true,minLength:{value:8,message:'The min length is 8'},
               pattern:{value:/[A-Z]/,message:'It must contain at least one capital letter'}})}
            /> 

             <Button sx={ {display:"block",width:"100%",height:"45px",marginTop:'20px',marginBottom:'20px'}} type="submit" variant="contained">Sign up</Button>
             <p style={ {display:'inline-block',marginRight:'5px'}  }>Have already an account?</p>
             <Link to="/sign-in">Log in</Link>
            </form>

        </div>
    </div>

    )}

export default RegisterAccount