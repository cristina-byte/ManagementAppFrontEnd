import TextField from '@mui/material/TextField';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Button from '@mui/material/Button';
import Select from 'react-select'
import { useMutation, useQuery } from 'react-query';
import { useForm,Controller } from 'react-hook-form';
import axiosInstanceLocal from "../../utils/axiosLocal"
import MuiAlert from '@mui/material/Alert';
import {useState,forwardRef,useContext} from "react"
import Snackbar from '@mui/material/Snackbar';
import {AuthUserContext} from "../../authentification/AuthenticationProvider"

function AddMeeting(){

  const [showSuccess, setShowSuccess] = useState(false)
  const {register,handleSubmit,watch,setValue,control,formState}=useForm()

 //take from context
 const {authUser}=useContext(AuthUserContext)

  const startDate=watch('startDate')
  const endDate=watch('endDate')

  const fetchMembers=async()=>{
      const response=await axiosInstanceLocal.get("users",{headers: {"Authorization" : `Bearer ${authUser.token}`}})
      return response.data
  }

  const {data}=useQuery(['membersQueryKey'],fetchMembers)

  const addMeeting=useMutation({
    mutationFn:async(meeting)=>{
      const response= await axiosInstanceLocal.post(`${authUser}/meetings`,meeting,
      {headers: {"Authorization" : `Bearer ${authUser.token}`}})
      return response.data
    },
      onSuccess:()=>setShowSuccess(true)
   })

  const handleSubmission=(data)=>{
    const meeting={
      title:data.name,
      address:data.address,
      startDate:data.startDate?data.startDate.toISOString():new Date().toISOString(),
      endDate:data.endDate?data.endDate.toISOString():new Date().toISOString(),
      organizatorId:authUser.id,
      guestsId:data.inviteds?data.inviteds.map((m)=>m.value.id):[]
    }
    addMeeting.mutate(meeting)
  }

  const formatArray=(array)=>{
    const newArray=array.map((element)=>{
      return ({
          label:element.name,
          value:element
        })
    })
    return newArray
  }
  
  const removeCurrentUser=(id,array)=>{
    for(let i=0;i<array.length;i++){
      if(array[i].value.id==id){
        array.splice(i,1)
      }
    }
    return array
  }

  const Alert =forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

    return (
        <div className="page">  
        <h1 className="title-page">Add a new meeting</h1>

        <form action="" style={{flexDirection:'column'}} onSubmit={handleSubmit(handleSubmission)} >

        <TextField
          label="Name"
          sx={{marginBottom:'15px'}}
          error={formState.errors.name?true:false}
          helperText={formState.errors.name?.message}
          {...register('name',{
            required:{value:true,message:'This field is required'}})}
        />
        <TextField
          label="Address"
          sx={{marginBottom:'15px'}}
          error={formState.errors.address?true:false}
          helperText={formState.errors.address?.message}
          {...register('address',{
            required:{value:true,message:'This field is required'}})}
        />
             
             <DateTimePicker
              renderInput={(props) => <TextField {...register('startDate')} sx={{marginBottom:'15px'}}{...props} />}
              label="Start"
              disablePast={true}
              value={startDate?startDate:new Date()}
              onChange={(newValue)=>{setValue('startDate',newValue)}}
             />

             <DateTimePicker
              renderInput={(props) => <TextField  {...register('endDate')} sx={{marginBottom:'15px' }}{...props} />}
              label="Finish"
              disablePast={true}
              value={endDate?endDate:new Date()}
              onChange={(newValue)=>{setValue('endDate',newValue)}}
             />

             <h1 className='section-title'>Invite people</h1>
             {
              data && 
              <Controller
              control={control}
              name="inviteds"
              render={({
              field: { onChange, onBlur, value, name, ref },
               }) => (
              <Select
             options={removeCurrentUser(authUser.id,formatArray(data))}
             onChange={(items)=>{setValue('inviteds',items)}}
             isMulti={true}
             onBlur={onBlur}
             value={value}
             name={name}
             ref={ref}/>)}/>
             }

             <Button variant="contained" sx={ {background:'#2E3789'}} style={{marginTop:'15px'}} type="submit">Add meeting</Button>

             <Snackbar open={showSuccess} autoHideDuration={6000} onClose={(e,r)=>setShowSuccess(false)}>
              <Alert onClose={(e,r)=>setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
               Meeting added successfully
              </Alert>
            </Snackbar>
        </form>
        </div>
    )
}

export default AddMeeting