import {useState,useContext,forwardRef} from "react"
import ReactPaginate from "react-paginate"
import axiosInstanceLocal from "../../utils/axiosLocal"
import Oportunity from "../../components/Oportunity"
import {Link} from "react-router-dom"
import { useQueryClient,useMutation,useQuery } from "react-query"
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogActions } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import { AuthUserContext } from "../../authentification/AuthenticationProvider"

function Oportunities(){

    const [open,setOpen]=useState(false)
    const [showSuccess, setShowSuccess] = useState(false);
    const [item, setItem]=useState(null)

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState(0)

    const queryClient = useQueryClient();

    //take from context
    const {authUser}=useContext(AuthUserContext)

    const Alert =forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
      });

    const handlePageClick=(data)=>{
        setCurrentPage(data.selected+1)
    }

    const fetchOportunities=async()=>{
        const response=await axiosInstanceLocal.get(`/Oportunities?page=${currentPage}`, 
        { headers: {"Authorization" : `Bearer ${authUser.token}`} })
        const totalItems=JSON.parse(response.headers.get('x-total')).Total
        const itemsPerPage=JSON.parse(response.headers.get('x-total')).ItemsPerPage
        const totalPages=Math.ceil(totalItems/itemsPerPage)
        setTotalPages(totalPages)
        return response.data
    }

    const{data}=useQuery(['oportunitiesQueryKey',currentPage],fetchOportunities)

    const {mutate}=useMutation({
        mutationFn:async(id)=>{
            const response=await axiosInstanceLocal.delete(`https://localhost:7257/api/oportunities/${id}`,
            { headers: {"Authorization" : `Bearer ${authUser.token}`} })
            return response
        },
        onSuccess:()=>{
        queryClient.invalidateQueries(['oportunitiesQueryKey']);
        }
    })

    const handleConfirm=()=>{
        setOpen(false)
        mutate(item,{
            onSuccess:()=>{
                setShowSuccess(true)}
        })    
    }
   
    return (
        <section className="oportunities page">
           <h1 className="title-page">Oportunities</h1>

            {authUser.roles.includes('admin') && 
            <Link to="add">
            <Button variant="contained" sx={{background:'#2E3789',marginBottom:'15px'}}>Add oportunity</Button>
            </Link>
            }
          
           {data &&  <div className="oportunities-container">
            {data.map(oportunity=><Oportunity key={oportunity.id} 
             name={oportunity.title} description={oportunity.description} posted={oportunity.createdAt} delete={ ()=>{setOpen(true);setItem(oportunity.id)} } imgUrl={oportunity.imageLink} id={oportunity.id}/>)}
           </div>}

           <div className="navigation-buttons">
           <ReactPaginate
           previousLabel='< Previous'
           nextLabel='>'
           breakLabel='...'
           pageCount={totalPages}
           onPageChange={handlePageClick}
           containerClassName="pagination"
           pageClassName="page-item"
           pageLinkClassName="page-link"
           previousClassName="page-item"
           nextClassName="page-item"
           activeLinkClassName="active-link"
           previousLinkClassName="page-link"
           nextLinkClassName="page-link"
           breakClassName='page-item'
           breakLinkClassName="page-link"
           />

           <Snackbar open={showSuccess} autoHideDuration={6000} onClose={(e,r)=>setShowSuccess(false)}>
              <Alert onClose={(e,r)=>setShowSuccess(false)} severity="success" sx={{ width: '100%' }}>
               Oportunity successfully deleted
              </Alert>
            </Snackbar>

            <Dialog open={open}>
                  <DialogTitle sx={{fontFamily:'Poppins',width:'400px',fontWeight:'400'}}>Are you sure you want to delete this oportunity?</DialogTitle>
                  <DialogActions sx={{padding:'30px',display:'flex'}}>
                    <Button sx={{background:'#2E3789'}} variant="contained" onClick={ ()=>handleConfirm()}>Yes</Button>
                    <Button sx={{color:'#2E3789'}} onClick={()=>setOpen(false)}>No</Button>
                  </DialogActions>
                </Dialog>

           </div>
        </section>
    )}

    export default Oportunities