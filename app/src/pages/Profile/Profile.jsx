import {useMutation, useQuery,useQueryClient} from "react-query"
import { useParams} from "react-router-dom"
import axiosInstanceLocal from "../../utils/axiosLocal.js";
import style from "./Profile.css"
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState,forwardRef,useContext } from "react";
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { TabPanel } from "../../components/TabPanel.jsx";
import {AuthUserContext} from "../../authentification/AuthenticationProvider"

import uploadFileToBlob from '../../utils/blobStorage';

const containerName = `users`;

function Profile(){

    const routeParams=useParams();
    const [showSuccess, setShowSuccess] = useState(false);
    const [image,setImage]=useState(null)

    //take from context
    const {authUser}=useContext(AuthUserContext)

    const queryClient = useQueryClient();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const fetchProfile=async()=>{
        const response=await axiosInstanceLocal.get(`/Users/${routeParams.id}`, 
        {headers: {"Authorization" : `Bearer ${authUser.token}`} })
        return response.data
    }

    const {data:queryData}=useQuery(['queryKey',routeParams.id],fetchProfile)
     
     const updatePhoto=useMutation({
        mutationFn:async (user)=>{
            const response=await axiosInstanceLocal.put(`users/${routeParams.id}`,user, 
            { headers: {"Authorization" : `Bearer ${authUser.token}`} })
            queryClient.invalidateQueries(['queryKey'])
            return response.data
        }
     })

     const handleSubmit=async (e)=>{
        e.preventDefault()

        // upload in blobStorage
        const blob=await uploadFileToBlob(image,containerName)

        if(blob!=null){
            var user={
                imageLink:blob
            }
            updatePhoto.mutate(user,{
                onSuccess:()=>setShowSuccess(true)
            })
        }  
     }

     const Alert =forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    return (
        <section className="profile">
            {queryData && <div>

                <div className="profile-header">
                <img className="profile-photo" src={queryData.imageLink} alt="" />

                <div>
                <h1>{queryData.name}</h1>
                <Button variant="contained" style={{marginTop:'15px'}}>Message</Button>
                </div>
                </div>

                <div className="profile-content">
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="About"  />
                    <Tab label="Teams"  />
                    {
                        authUser.id==routeParams.id &&
                        <Tab label="Edit"/>
                    }
                   
                </Tabs>
                <TabPanel value={value} index={0}>
                <div className="profile-info">
                <p>Volunteer</p>
                <p style={{fontSize:'13px',color:'#2E3789',fontWeight: '500',display:'flex',alignItems:'center',gap:'6px'}}><MailIcon></MailIcon>{queryData.email}</p>
                <p style={{fontSize:'13px',color:'#2E3789',fontWeight: '500',display:'flex',alignItems:'center',gap:'6px'}}><PhoneIcon></PhoneIcon>{queryData.phoneNumber}</p>
                </div>
                </TabPanel>

                <TabPanel value={value} index={1}>
                    Teams
                </TabPanel>

                <TabPanel value={value} index={2}>
                    <div className="edit-container">
                        <form style={{flexDirection:'column',justifyContent:'center'}} onSubmit={handleSubmit}>
                        <img className="profile-photo" src={queryData.imageLink}></img>
                        <Button variant="contained" sx={{height:'50px',marginBottom:'20px',background:'#2E3789',width:'200px' }} component="label">
                        {image?image.name:'Upload image'}
                        <input hidden accept="image/*" onChange={(e)=>setImage(e.target.files[0])} multiple type="file" />
                        </Button>
                        <Button variant="contained" type="submit" sx={{height:'50px',marginBottom:'20px',background:'#2E3789',width:'200px' }} >Save</Button>
                        </form>
                    </div>
                </TabPanel>
                </div>
            </div>}   
             <Snackbar open={showSuccess} autoHideDuration={6000} onClose={(e,r)=>setShowSuccess(false)}>
              <Alert onClose={(e,r)=>setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
               Photo added successfully
              </Alert>
            </Snackbar>      
     </section>
    )}

export default Profile