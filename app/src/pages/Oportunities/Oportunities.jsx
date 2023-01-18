import { useQuery} from "react-query"
import {useState} from "react"
import ReactPaginate from "react-paginate"
import axiosInstanceLocal from "../../axiosLocal"
import Oportunity from "../../components/Oportunity"
import style from "./Oportunities.css"

export default function Oportunities(){

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState(0)

    const handlePageClick=(data)=>{
        setCurrentPage(data.selected+1)
    }

    const fetchOportunities=async()=>{
        const response=await axiosInstanceLocal.get(`/Oportunities?page=${currentPage}`)
        const totalItems=JSON.parse(response.headers.get('x-total')).Total
        const itemsPerPage=JSON.parse(response.headers.get('x-total')).ItemsPerPage

        const totalPages=Math.ceil(totalItems/itemsPerPage)
        console.log(totalPages)


        setTotalPages(totalPages)
        return response.data
    }

    const{
        data,
        isLoading
    }=useQuery(['oportunitiesQueryKey'],fetchOportunities)

    return (
        <section className="oportunities page">
           <h1 className="title-page">Oportunities</h1>
           <button className="button">Add oportunity</button>
           {data &&  <div className="oportunities-container">
            {data.map(oportunity=><Oportunity key={oportunity.id} 
             name={oportunity.title} imgUrl={oportunity.imageLink} id={oportunity.id}/>)}
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
           </div>



        </section>
    )}