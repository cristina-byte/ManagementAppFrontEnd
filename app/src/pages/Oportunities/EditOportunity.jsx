
import { useForm} from "react-hook-form"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { useMutation } from 'react-query'
import axiosInstanceLocal from "../../utils/axiosLocal";
import MuiAlert from '@mui/material/Alert';
import {useState,forwardRef,useContext} from "react"
import Snackbar from '@mui/material/Snackbar';
import { useParams} from "react-router-dom";
import { useQuery } from "react-query";
import { useQueryClient } from "react-query"
import { toLocalDate } from "../../utils/dateUtils";
import {AuthUserContext} from "../../authentification/AuthenticationProvider"

//blob
import uploadFileToBlob from '../../utils/blobStorage';
const containerName = `oportunities`;


function EditOportunity(){

    const {watch,formState,register,handleSubmit,setValue}=useForm()
    const [showSuccess, setShowSuccess] = useState(false);
    const queryClient = useQueryClient();
    const parameter=useParams()

     //take from context
     const {authUser}=useContext(AuthUserContext)

    var imageName=watch('image')
    const deadline=watch('deadline')
    const startDate=watch('startDate')
    const endDate=watch('endDate')

    const fetchOportunity=async()=>{
        const response=await axiosInstanceLocal.get(`/oportunities/${parameter.id}`,
        { headers: {"Authorization" : `Bearer ${authUser.token}`} })
        return response.data
    }

    const {data}=useQuery(['oportunityQuery',parameter.id],fetchOportunity)

    const Alert =forwardRef(function Alert(props, ref) {
      return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const addOportunity=useMutation({
      mutationFn:async(oportunity)=>{
        const response=await axiosInstanceLocal.put(`https://localhost:7257/api/oportunities/${parameter.id}`,oportunity,
        { headers: {"Authorization" : `Bearer ${authUser.id}`} })
        queryClient.invalidateQueries(['oportunityQuery',parameter.id]);
        return response.data
      }
    })

    const handleSubmission=async (dt)=>{
  
        const blobsInContainer= await uploadFileToBlob(dt.image[0],containerName)
        
        const oportunity={
            id:parameter.id,
            title:dt.oportunityName,
            description:dt.description,
            positions:dt.coreTeamPositions?dt.coreTeamPositions:[],
            startDate:dt.startDate?new Date(dt.startDate).toISOString():toLocalDate(new Date(data.startDate)).toISOString(),
            endDate:dt.endDate?new Date(dt.endDate).toISOString():toLocalDate(new Date(data.endDate)).toISOString(),
            location:dt.location,
            imageLink:blobsInContainer?blobsInContainer.toString():data.imageLink,
            applicationDeadline:dt.deadline?new Date(dt.deadline).toISOString():toLocalDate(new Date(data.applicationDeadline)).toISOString()
        }

        console.log(oportunity) 

        addOportunity.mutate(oportunity,{
          onSuccess:()=>setShowSuccess(true)
        })
    }
    
    return (
        <div className="page">
            <h1 className="title-page">Edit oportunity</h1>
            {data && 

            <form onSubmit={handleSubmit(handleSubmission)}  style={{flexDirection:'column'}}>
            <TextField
            required
            id="outlined-required"
            label="Name"
            defaultValue={data.title}
            sx={{marginBottom:'20px' }}
            {...register('oportunityName',{
            required:{value:true,message:'This field is required'}
            })}
            />

            <TextField
            required
            id="outlined-required"
            label="Description"
            defaultValue={data.description}
            sx={{marginBottom:'20px'}}
            {...register('description',{
            required:{value:true,message:'This field is required'}
            })}
            />

            <TextField
            required
            id="outlined-required"
            label="Location"
            defaultValue={data.location}
            sx={{marginBottom:'20px' }}
            {...register('location',{
            required:{value:true,message:'This field is required'}
            })}
            />

            <DateTimePicker
            renderInput={(props) => <TextField sx={{marginBottom:'20px' }} {...register('deadline')}{...props} />}
            label="DeadlineApplication"
            value={deadline?deadline:toLocalDate(new Date(data.applicationDeadline))}
            onChange={(newValue) => {
            setValue('deadline',newValue)
            }}
            />

            <DateTimePicker
            renderInput={(props) => <TextField  sx={{marginBottom:'20px' }} {...register('startDate')}{...props} />}
            label="Start Date"
            value={startDate?startDate:toLocalDate(new Date(data.startDate))}
            onChange={(newValue) => {
            setValue('startDate',newValue)}}
            /> 

            <DateTimePicker
            renderInput={(props) => <TextField  sx={{marginBottom:'20px' }} {...register('endDate')}{...props} />}
            label="EndDate"
            value={endDate?endDate:toLocalDate(new Date(data.endDate))}
            onChange={(newValue) => {
            setValue('endDate',newValue)}}
            />

            <img style={{width:'200px'}} src={data.imageLink}></img>
            <Button variant="contained"  sx={{height:'50px',marginBottom:'20px',background:'#2E3789' }} component="label">
             {imageName && imageName.length>0?imageName[0].name:'Upload new image'}
            <input hidden accept="image/*" {...register('image')} multiple type="file" />
            </Button>
   
            <h1 className="title-page" style={ {marginBottom:'30px'} }>Add Core Team Positions </h1>

            <div className="coreteampositions">
            {
            data.positions.map((p,index)=>{

             return (
            <div className="pos" style={{display:'flex',alignItems:'center',marginBottom:'20px'}} key={p.id}>
            <TextField
            value={p.id}
            {...register(`coreTeamPositions.${index}.id`)} 
            sx={{display:'none'}}
           />

            <TextField
            required
            sx={{marginRight:'10px' }}
            label="Name"
            defaultValue={p.name}
            {...register(`coreTeamPositions.${index}.name`,{
                required:{value:true,message:'This field is required'}
             })} 
           />

           <TextField
           required
           sx={{marginRight:'10px' }}
           label="Total Sits"
           defaultValue={Number(p.leftSits)}
           type='number'
           {...register(`coreTeamPositions.${index}.leftSits`,{
            required:{value:true,message:'This field is required'}
         })} 
          />
    </div>
    )})}
           </div>
           <Button 
           sx={{width:'45%',background:'#2E3789'}}  
           variant="contained" 
           type={'submit'}>Edit Oportunity</Button>
           </form>
            }
            <Snackbar open={showSuccess} autoHideDuration={6000} onClose={(e,r)=>setShowSuccess(false)}>
              <Alert onClose={(e,r)=>setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
               Oportunity edited successfully
              </Alert>
            </Snackbar>
        </div>
    )
}

export default EditOportunity