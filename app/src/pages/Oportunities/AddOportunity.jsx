
import { useForm,useFieldArray } from "react-hook-form"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useMutation } from 'react-query'
import axiosInstanceLocal from "../../utils/axiosLocal";
import MuiAlert from '@mui/material/Alert';
import {useState,forwardRef,useEffect,useContext} from "react"
import Snackbar from '@mui/material/Snackbar';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import {AuthUserContext} from "../../authentification/AuthenticationProvider"

//blob
import uploadFileToBlob from '../../utils/blobStorage';
const containerName = `oportunities`;

function AddOportunity(){

    const {watch,register,handleSubmit,control,setValue}=useForm()

    const [showSuccess, setShowSuccess] = useState(false);

     //take from context
     const {authUser}=useContext(AuthUserContext)

    const {fields,append,remove}=useFieldArray({
        control,
        name:'coreTeamPositions'
    })

  var imageName=watch('image')
  const deadline=watch('deadline')
  const startDate=watch('startDate')
  const endDate=watch('endDate')

    useEffect( ()=>{
        append()
    },[] )

    const Alert =forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const addOportunity=useMutation({
      mutationFn:async(oportunity)=>{
          const response=await axiosInstanceLocal.post('https://localhost:7257/api/oportunities',oportunity,
          { headers: {"Authorization" : `Bearer ${authUser.token}`} })
          return response
      }
    })

    const handleSubmission=async (data)=>{
    
        const blobsInContainer= await uploadFileToBlob(data.image[0],containerName)
        
        const oportunity={
            title:data.oportunityName,
            description:data.description,
            positions:data.coreTeamPositions,
            startDate:data.startDate?data.startDate.toISOString():new Date().toISOString(),
            endDate:data.endDate?data.endDate.toISOString():new Date().toISOString(),
            location:data.location,
            imageLink:blobsInContainer?blobsInContainer.toString():'https://cdn11.bigcommerce.com/s-qhre0hjo/stencil/3cdbc8e0-d580-013a-0d18-564f4b2617b0/e/9a635610-5093-013b-7867-2e100c3ab823/icons/icon-no-image.svg',
            applicationDeadline:data.deadline?data.deadline.toISOString():new Date().toISOString()
        }
        addOportunity.mutate(oportunity,{
          onSuccess:()=>setShowSuccess(true)
        })
    }

    return (
        <div className="page">
            <h1 className="title-page">Add oportunity</h1>
            <form onSubmit={handleSubmit(handleSubmission)}  style={{flexDirection:'column'}}>

            <TextField
             required
             id="outlined-required"
             label="Name"
             sx={{marginBottom:'20px' }}
             {...register('oportunityName',{
                required:{value:true,message:'This field is required'}
             })}
             />

             <TextField
              required
              id="outlined-required"
              label="Description"
             
              sx={{marginBottom:'20px'}}
              {...register('description',{
                required:{value:true,message:'This field is required'}
             })}
             />

             <TextField
             required
             id="outlined-required"
             label="Location"
             sx={{marginBottom:'20px' }}
             {...register('location',{
                required:{value:true,message:'This field is required'}
             })}
            />

            <DateTimePicker
              renderInput={(props) => <TextField  sx={{marginBottom:'20px' }} {...register('deadline')}{...props} />}
              label="DeadlineApplication"
             
              value={deadline?deadline:new Date().toString()}
              onChange={(newValue) => {
                setValue('deadline',newValue)
              console.log("changed")
              }}
             />

             <DateTimePicker
              renderInput={(props) => <TextField  sx={{marginBottom:'20px' }} {...register('startDate')}{...props} />}
              label="Start Date"
              value={startDate?startDate:new Date().toString()}
              onChange={(newValue) => {
                setValue('startDate',newValue)
              console.log("changed")
              }}
             />

             <DateTimePicker
              renderInput={(props) => <TextField  sx={{marginBottom:'20px' }} {...register('endDate')}{...props} />}
              label="EndDate"
              value={endDate?endDate:new Date().toString()}
              onChange={(newValue) => {
                setValue('endDate',newValue)
              console.log("changed")
              }}
             />

              <Button variant="contained" sx={{height:'50px',marginBottom:'20px',background:'#2E3789' }} component="label">
              {imageName && imageName.length>0?imageName[0].name:'Upload image'}
               <input hidden accept="image/*" {...register('image')} multiple type="file" />
            </Button>

            <h1 className="title-page" style={ {marginBottom:'30px'} }>Add Core Team Positions </h1>

            <div className="coreteampositions">
            {
                fields.map(({id},index)=>{
                    return (
                        <div className="pos" style={{display:'flex',alignItems:'center',marginBottom:'20px'}} key={id}>

                        <TextField
                        required
                        sx={{marginRight:'10px' }}
                        label="Name"
                        {...register(`coreTeamPositions.${index}.name`,{
                            required:{value:true,message:'This field is required'}
                         })} 
                       />

                       <TextField
                       required
                       sx={{marginRight:'10px' }}
                       label="Total Sits"
                       defaultValue="0"
                       type='number'
                       {...register(`coreTeamPositions.${index}.leftSits`,{
                        required:{value:true,message:'This field is required'}
                     })} 
                       />

                    <IconButton aria-label="delete" color={'primary'} size="large" onClick={(e)=>{e.preventDefault();remove(index)}} >
                    <DeleteIcon fontSize="inherit" htmlColor="#2E3789"/>
                    </IconButton>
                </div>
                )})}
                 <Button color="primary" sx={{color:'#2E3789'}} onClick={(e)=>{e.preventDefault();append()}} >Add new position</Button>
            </div>
            <Button sx={{width:'45%',background:'#2E3789'}}  variant="contained" type={'submit'}>Add Oportunity</Button>
            </form>

            <Snackbar open={showSuccess} autoHideDuration={6000} onClose={(e,r)=>setShowSuccess(false)}>
              <Alert onClose={(e,r)=>setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
               Oportunity added successfully
              </Alert>
            </Snackbar>
        </div>
    )
}

export default AddOportunity