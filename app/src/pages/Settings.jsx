import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useState,useContext,forwardRef} from 'react';
import { TabPanel } from '../components/TabPanel';
import axiosInstanceLocal from '../utils/axiosLocal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient,useQuery } from 'react-query';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { AuthUserContext } from '../authentification/AuthenticationProvider';

export const Settings=()=>{

    const queryClient = useQueryClient();

    const [showSuccess, setShowSuccess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);

    //take from context
    const {authUser}=useContext(AuthUserContext)

    const assignRole=useMutation({
        mutationFn:async (userRole)=>{
            const response =await axiosInstanceLocal.post("auth/assign-role",userRole,
            { headers: {"Authorization" : `Bearer ${authUser.token}`} })
            return response
        }
    })

    const deleteRole=useMutation({
        mutationFn:async(userRole)=>{
            console.log(userRole)
            const response = await axiosInstanceLocal.delete("auth/delete-role",{data:userRole},
            { headers: {"Authorization" : `Bearer ${authUser.token}`} })
            return response
        }
    })

    const Alert =forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

   
    const handleAssignRole=(role,user)=>{
        const userRole={
            userName:user,
            role:role
        }
        assignRole.mutate(userRole,{
            onSuccess:()=>{
                setShowSuccess(true)
                queryClient.invalidateQueries(['rolesQueryKey'])
            },
            onError:()=>setShowFailure(true)
        })
    }

    const handleDeleteRole=(role,user)=>{
        const userRole={
            userName:user,
            role:role
        }
        deleteRole.mutate(userRole,{
            onSuccess:()=>{
                setShowSuccess(true)
                queryClient.invalidateQueries(['rolesQueryKey'])
            },
            onError:()=>setShowFailure(true)
        })
    }

const [tabIndex,setTabIndex]=useState(0)

const handleTabChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  const fetchUserRoles=async ()=>{
    const response=await axiosInstanceLocal.get('/auth',
    {headers: {"Authorization" : `Bearer ${authUser.token}`} })
    return response.data
  }

const {data}=useQuery(['rolesQueryKey'],fetchUserRoles)

    return (
        <section className="page">
            <h1 className="title-page">Settings Admin</h1>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
                <Tab label="Manage users"/>
            </Tabs>

            <TabPanel value={tabIndex} index={0}>
                {data && 
                <TableContainer>
                <Table sx={{width:'60%'}}>
                 <TableHead>
                    <TableRow>
                        <TableCell sx={{background:'#2E3789',fontWeight:'bold',color:'white'}}>Name</TableCell>
                        <TableCell sx={{background:'#2E3789',fontWeight:'bold',color:'white'}}>Email</TableCell>
                        <TableCell sx={{background:'#2E3789',fontWeight:'bold',color:'white'}}>Roles</TableCell>
                        <TableCell sx={{background:'#2E3789',fontWeight:'bold',color:'white'}}>Actions</TableCell>
                    </TableRow>
                 </TableHead>
                 <TableBody>
                    {
                        data.map(user=>{
                            return (
                                <TableRow key={user.userName}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.userName}</TableCell>
                                    <TableCell>{user.roles.map((r,index)=>index==0?r:", "+r)}</TableCell>
                                    <TableCell>{user.roles.includes('admin')?<Button onClick={()=>handleDeleteRole("admin",user.userName)} sx={{background:'#2E3789',width:'80%'}}variant="contained" size='small'>Delete admin</Button>:
                                    <Button onClick={()=>handleAssignRole("admin",user.userName) } variant="contained" sx={{background:'#2E3789',width:'80%'}} size='small'>Add admin</Button> }</TableCell>
                                </TableRow>
                            )
                        })
                    }
                 </TableBody>
                </Table>
            </TableContainer>
            }

            <Snackbar open={showSuccess} autoHideDuration={6000} onClose={(e,r)=>setShowSuccess(false)}>
              <Alert onClose={(e,r)=>setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
               Success!
              </Alert>
            </Snackbar>
            <Snackbar open={showFailure} autoHideDuration={6000} onClose={(e,r)=>setShowFailure(false)}>
              <Alert onClose={(e,r)=>setShowFailure(false)} severity="error" sx={{ width: '100%' }}>
              Action Failed
              </Alert>
            </Snackbar>
            </TabPanel>
        </section>
    )
}

