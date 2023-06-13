import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from 'react-select'
import { useForm } from 'react-hook-form';
import {AuthUserContext} from "../../authentification/AuthenticationProvider"
import axiosInstanceLocal from "../../utils/axiosLocal"
import {useMutation} from 'react-query';
import {useContext} from "react"



function AddTeam(){

    const {register, handleSubmit,formState}=useForm()

     //take from context
     const {authUser}=useContext(AuthUserContext)

    const addTeam=useMutation( {
        mutationFn:async(team)=>{
            const response=axiosInstanceLocal.post(`/teams`,team,
            {headers: {"Authorization" : `Bearer ${authUser.token}`}})
            return response.data
        },
        onSuccess:()=>console.log("Team was added successfully!")
    })

    const handleSubmission=(data)=>{
        
        const team={
            name:data.name,
            adminId:authUser.id
        }

        addTeam.mutate(team)
    }

    return (
      <section className="page">
         <h1 className="title-page">Add team</h1>

         <form style={{flexDirection:'column',width:"30%"}} onSubmit={handleSubmit(handleSubmission)}>

            <TextField
            
             id="outlined-required"
             label="Name"
             error={formState.errors.name?true:false}
             helperText={formState.errors.name?.message}
             sx={{marginBottom:'20px' }}
             {...register('name',{required:{value:true,message:"This field is required"}})}
            />

            <Button 
            sx={{width:'45%',background:'#2E3789'}}  
            variant="contained" 
            type={'submit'}>Add Team</Button>

         </form>

      </section>
    )
}

export default AddTeam