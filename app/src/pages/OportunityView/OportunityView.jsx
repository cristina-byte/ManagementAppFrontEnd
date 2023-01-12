import { useParams } from "react-router-dom"
import {useQuery} from "react-query"
import axiosInstanceLocal from "../../axiosLocal"


function OportunityView(){

    const parameter=useParams()

    const fetchOportunity=async()=>{
        const response=await axiosInstanceLocal.get(`/Oportunities/${parameter.id}`)
        return response.data
    }

    const{
        data,
        isLoading
    }=useQuery(['oportunityQueryKey'],fetchOportunity)

    return (
        <section className="oportunity-section">
            {data && 
            <div>
                <img src={data.imageLink} alt="" />
                <h1>{data.name}</h1>
                <p>{data.startDate} - {data.endDate}</p>
                <p>{data.address}</p>
                <h1>Description</h1>
                <p>{data.description}</p>
                <h1>Core team positions</h1></div>}
        </section>
    ) 
}

export default OportunityView