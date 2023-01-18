import {useState,useEffect} from "react"
import {useQuery} from "react-query"
import ReactPaginate from "react-paginate"
import {Link} from "react-router-dom"
import axiosInstanceLocal from "../../axiosLocal"
import Event from "../../components/Event"
import style from "./Events.css"

export default function Events(){

    const fetchEvents=async ()=>{
        const response=await axiosInstanceLocal.get(`/Events?page=${currentPage}`)

        const totalItems=JSON.parse(response.headers.get('x-total')).Total
        const itemsPerPage=JSON.parse(response.headers.get('x-total')).ItemsPerPage

        const totalPages=Math.ceil(totalItems/itemsPerPage)
        console.log(totalPages)


        setTotalPages(totalPages)
        return response.data
    }

    const [currentPage,setCurrentPage]=useState(1)
    const [totalPages,setTotalPages]=useState(0)

    const handlePageClick=(data)=>{
        setCurrentPage(data.selected+1)
    }

    const {
        data:eventsData,
        isLoading:eventsLoading
    }=useQuery(['eventsQueryKey',currentPage],fetchEvents)

    return (
        <section className="events page">
             <h1 className="title-page">Events</h1>
             <button className="button" >Add Event</button>
             {eventsData && <div className="events-container">
                {eventsData.map( event=><Event key={event.id} name={event.name} imgUrl={event.imageLink} id={event.id} /> )}
             </div>
             }

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