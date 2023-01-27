
import { useMutation, useQuery } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import axiosInstanceLocal from "../../utils/axiosLocal"
import {format} from "date-fns";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import Member from "../../components/Member"
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import {useState,forwardRef,useContext} from "react"
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions } from "@mui/material";
import { toLocalDate,isInProcess } from "../../utils/dateUtils";
import {AuthUserContext} from "../../authentification/AuthenticationProvider"

function ViewMeeting(){

    const parameter=useParams()
    const [showSuccess,setShowSuccess]=useState(false)
    const [open,setOpen]=useState(false)
    const navigate=useNavigate()

    const Alert =forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    //take from context
    const {authUser}=useContext(AuthUserContext)

    const fetchMeeting=async ()=>{
        const response= await axiosInstanceLocal.get(`${authUser.id}/meetings/${parameter.id}`,
        { headers: {"Authorization" : `Bearer ${authUser.token}`} })
        return response.data
    }

    const {data}=useQuery(['meetingQueryKey'],fetchMeeting)

    const deleteMeeting=useMutation({
        mutationFn:async ()=>{
            const response=await axiosInstanceLocal.delete(`${authUser.id}/meetings/${parameter.id}`,
            { headers: {"Authorization" : `Bearer ${authUser.token}`} })
            return response.data
        }
    })

    const handleConfirm=()=>{
        setOpen(false)
        deleteMeeting.mutate({},{
            onSuccess:()=>{
                setShowSuccess(true)
                navigate("/calendar")
            }
        })
    }

    return (
        <div className="page">
             {data && 
             <div className="meeting-view">
               <h1>{data.title}</h1>

               <div style={{display:'flex',marginTop:'20px',marginBottom:'10px'}}>
                <CalendarMonthIcon  sx={{marginRight:'10px',color:'#2E3789'}} />
                {format(new Date(data.startDate),"EEEE, MMMM do yyyy")}
               </div>

               <div style={{display:'flex',marginBottom:'10px',position:'relative',width:'30%'}}>
                <QueryBuilderIcon  sx={{marginRight:'10px',color:'#2E3789'}} />
               {format( toLocalDate(new Date(data.startDate))  ,"HH:mm")} -  {format(toLocalDate(new Date(data.endDate)),"HH:mm" )}
               { isInProcess(toLocalDate(new Date(data.startDate)),toLocalDate(new Date(data.endDate))) && <div className="online" style={{top:'5px'}}></div>}
               </div>

               <div style={{display:'flex',marginBottom:'5px'}}>
                <FmdGoodOutlinedIcon sx={{marginRight:'10px',color:'#2E3789'}} />
                {data.address}
               </div>

               <h1 className="section-title">Organized by</h1>
               <Member
               
               imgUrl={data.organizator.imageLink}
               id={data.organizator.id}
               name={data.organizator.id==authUser.id?'me':data.organizator.name}
               isOnline={data.organizator.isOnline}
               />

               <h1 className="section-title">Inviteds</h1>
               {

                data.meetingInvited.map( (m)=>{
                    if(m.id!=data.organizator.id)
                    return (
                        <Member 
                        imgUrl={m.imageLink}
                        id={m.id}
                        key={m.id}
                        name={m.name}
                        isOnline={m.isOnline}/>
                    )
                    }
                )
                }
             
                {authUser.id==data.organizator.id && 
                <Button variant='contained'
                sx={{background:'#2E3789',position:'absolute',right:'40px',bottom:'40px'}} 
                onClick={()=>setOpen(true)}>Cancel meeting</Button>}

                <Snackbar open={showSuccess} autoHideDuration={6000} onClose={(e,r)=>setShowSuccess(false)}>
                  <Alert onClose={(e,r)=>setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
                  Meeting deleted
                  </Alert>
                </Snackbar>

                <Dialog open={open}>
                  <DialogTitle sx={{fontFamily:'Poppins',width:'400px',fontWeight:'400'}}>Are you sure you want to delete the meeting?</DialogTitle>
                  <DialogActions sx={{padding:'30px',display:'flex'}}>
                  <Button sx={{background:'#2E3789'}} variant="contained" onClick={ ()=>handleConfirm()}>Yes</Button>
                  <Button sx={{color:'#2E3789'}} onClick={()=>setOpen(false)}>No</Button>
                  </DialogActions>
                </Dialog>
            </div>
            }  
        </div>
    )
}

export default ViewMeeting