import {useQuery} from "react-query"
import { useState } from "react"
import ReactPaginate from "react-paginate"
import axiosInstanceLocal from "../../axiosLocal"
import Member from "../../components/Member"
import style from "./Members.css"

export default function Members(){


    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState(0)

    const fetchMembers=async()=>{
        console.log("refetching")
        const response=await axiosInstanceLocal.get(`/Users?page=${currentPage}`)
         const totalItems=JSON.parse(response.headers.get("x-total")).Total
         const itemsPerPage=JSON.parse(response.headers.get("x-total")).ItemsPerPage
         setTotalPages(Math.ceil(totalItems/itemsPerPage))
        return response.data
    }

    const {
        data,
        isLoading
    }=useQuery(['queryPage',currentPage],fetchMembers)

    function getMembers(){
        return data.map(member=><Member key={member.id} 
            name={member.name} role={member.role} 
            isOnline={member.isOnline} imgUrl={member.imageLink} id={member.id} /> )
    }

    const handlePageClick=(data)=>{
        setCurrentPage(data.selected+1)
    }

    return (
        <section className="members page">
           <h1 className="title-page">Members {data && data.length}</h1>
           <div className="members-container">
            {data && getMembers()}
           </div>

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
    )
}