import TextField from '@mui/material/TextField'
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Button from '@mui/material/Button'
import {useForm} from 'react-hook-form'
import {Link} from "react-router-dom" 
import axiosInstanceLocal from "../../utils/axiosLocal"
import style from "../../welcomePageStyle.css"
import Moment from 'moment'
import {useState,forwardRef} from "react"
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useMutation } from 'react-query'
import { hasSpecialCharacter, hasCapitalLetter,hasNumericCharacter } from '../../utils/regex';

function RegisterAccount(){

    const {register,handleSubmit,formState,setValue,watch}=useForm()

    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);

    const Alert =forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    var dateValue=watch('date')
    const dateChange=(e)=>{
        setValue('date',e.toString())
     }

     const registerUser=useMutation({
        mutationFn:async (user)=>{
            const response=await axiosInstanceLocal.post('https://localhost:7257/api/auth/signup',user)
            return response
        }
     })

    const handleSubmission=async (data)=>{
        const user={
            userName:data.email,
            name:data.fname+" "+data.lname,
            email:data.email,
            phoneNumber:data.phone,
            password:data.password,
            birthDay:data.date?Moment(data.date).format('YYYY-MM-DDTHH:mm:ss.sssZ'):
            Moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.sssZ')
        }
        registerUser.mutate(user,{
            onError:()=>setShowFailure(true),
            onSuccess:()=>setShowSuccess(true)
        })
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
               validate:{
                capitalLetter:hasCapitalLetter,
                numericCharacter:hasNumericCharacter,
                specialCharacter:hasSpecialCharacter,
                }}
                )}
            /> 

             <Button sx={ {display:"block",width:"100%",height:"45px",marginTop:'20px',marginBottom:'20px',background:'#2E3789'}} type="submit" variant="contained">Sign up</Button>
             <p style={ {display:'inline-block',marginRight:'5px'}  }>Have already an account?</p>
             <Link to="/sign-in">Log in</Link>
            </form>

            <Snackbar open={showSuccess} autoHideDuration={6000} onClose={(e,r)=>setShowSuccess(false)}>
              <Alert onClose={(e,r)=>setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
               User successfully registered
              </Alert>
            </Snackbar>

            <Snackbar open={showFailure} autoHideDuration={6000} onClose={(e,r)=>setShowFailure(false)}>
              <Alert onClose={(e,r)=>setShowFailure(false)} severity="error" sx={{ width: '100%' }}>
               Registration failed
              </Alert>
            </Snackbar>

        </div>
    </div>

    )}

export default RegisterAccount