import { useParams } from "react-router-dom"
import { useQuery,useMutation, useQueryClient } from "react-query"
import { useContext,useState } from "react"
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axiosInstanceLocal from "../../utils/axiosLocal"
import {AuthUserContext} from "../../authentification/AuthenticationProvider"
import ToDoList from "../../components/ToDoList"


function ToDoLists(){

    const routeParams=useParams()

    const queryClient=useQueryClient()

    const [value,setValue]=useState("")

     //take from context
     const {authUser}=useContext(AuthUserContext)

    const fetchToDoLists=async ()=>{
        const response=await axiosInstanceLocal.get(`/teams/${routeParams.id}/toDoLists`,{headers: {"Authorization" : `Bearer ${authUser.token}`}})
        return response.data
    }

    const {data}=useQuery([routeParams.id],fetchToDoLists)

    const addToDoList=useMutation({
        mutationFn:async(toDoList)=>{
            const response=await axiosInstanceLocal.post(`/teams/${routeParams.id}/toDoLists`,toDoList,{headers: {"Authorization" : `Bearer ${authUser.token}`}})
            return response
        }
    })

    const removeToDoList=useMutation({
        mutationFn:async(toDoListId)=>{
            const response=await axiosInstanceLocal.delete(`/teams/${routeParams.id}/toDoLists/${toDoListId}`,{headers: {"Authorization" : `Bearer ${authUser.token}`}})
            return response
        }
    })

    const handleToDoListDelete=(toDoListId)=>{
        removeToDoList.mutate(toDoListId,{
            onSuccess:()=>queryClient.invalidateQueries({queryKey:routeParams.id})
        })
    }

    const handleChange=(event)=>{
        setValue(event.target.value)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()

        var toDoList={
            name:value
        }

        addToDoList.mutate(toDoList,{
            onSuccess:()=>{queryClient.invalidateQueries({queryKey:routeParams.id}); setValue("")}
        })
    }

    return (
        <div className="toDoLists">
            <p>Tasks management</p>
            {
                data && <div className="tasks-panel">
                    {
                        data.map(tD=><ToDoList id={tD.id} key={tD.id} name={tD.name} deleteToDoList={handleToDoListDelete} tasks={tD.tasks} /> )
                    }

                    <div className="toDoList">
                    <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column",padding:"0px",width:"100%"}}>
                        <TextField
                        required
                        value={value}
                        onChange={handleChange}
                        variant="standard"
                        />
                        <button  type="submit" className="button button2">+ ADD TODOLIST</button>
                    </form>
                    </div>

                </div>
            }
        </div>
    )
}

export default ToDoLists