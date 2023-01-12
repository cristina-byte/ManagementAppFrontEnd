import { useQuery} from "react-query"
import axiosInstanceLocal from "../../axiosLocal"
import Oportunity from "../../components/Oportunity"
import style from "./Oportunities.css"

export default function Oportunities(){

    const fetchOportunities=async()=>{
        const response=await axiosInstanceLocal.get("/Oportunities?page=1")
        return response.data
    }

    const{
        data,
        isLoading
    }=useQuery(['oportunitiesQueryKey'],)

    return (
        <section className="oportunities">
           <h1 className="title-page">Oportunities</h1>
           {data &&  <div className="oportunities-container">
            {data.map(oportunity=><Oportunity key={oportunity.id} 
             name={oportunity.title} imgUrl={oportunity.imageLink} id={oportunity.id}/>)}
           </div>}
        </section>
    )}