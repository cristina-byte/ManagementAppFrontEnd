import { useState,useContext } from "react"
import { useMutation,useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {AuthUserContext} from "../authentification/AuthenticationProvider"


import Task from "./Task"
import axiosInstanceLocal from "../utils/axiosLocal";


function ToDoList({id,name,tasks,deleteToDoList}){

    const routeParams=useParams()

    const queryClient=useQueryClient()

    //take from context
    const {authUser}=useContext(AuthUserContext)

    const [value,setValue]=useState("")

    const [showDeleteButton,setShowDeleteButton]=useState(false)

    const handleChange=(newValue)=>{
        console.log(newValue.target.value)
        setValue(newValue.target.value)
    }

    const addTask=useMutation({
        mutationFn:async (task)=>{
            const response=await axiosInstanceLocal.post(`/teams/${routeParams.id}/ToDoLists/${id}/tasks`,task,{headers: {"Authorization" : `Bearer ${authUser.token}`}})
        }
    }   )

    const removeTask=useMutation( {
        mutationFn:async (taskId)=>{
            const response=await axiosInstanceLocal.delete(`/teams/${routeParams.id}/ToDoLists/${id}/tasks/${taskId}`,{ headers: {"Authorization" : `Bearer ${authUser.token}`}})
            return response;
        }
    }
    )

    const changeStatus=useMutation({
        mutationFn:async(task)=>{
            const response=await axiosInstanceLocal.put(`/teams/${routeParams.id}/ToDoLists/${id}/tasks/${task.id}`,{isDone:task.isDone},{ headers: {"Authorization" : `Bearer ${authUser.token}`}})
        }
    })

    const handleSubmit=(e)=>{
        e.preventDefault()

        const task={
            title:value
        }

        addTask.mutate(task,{
            onSuccess:()=>{queryClient.invalidateQueries({queryKey:routeParams.id});setValue("")}
        })
    }

    const handleDeleteTask=(taskId)=>{
        removeTask.mutate(taskId,{
            
            onSuccess:()=> queryClient.invalidateQueries({queryKey:routeParams.id})
        })
    }

    const handleDeleteBtnClick=()=>{
        deleteToDoList(id)
    }

    const handleChangeStatus=(taskId, isDone)=>{

        const task={
            id:taskId,
            isDone:isDone
        }

        changeStatus.mutate(task,{
            onSuccess:()=>queryClient.invalidateQueries({queryKey:routeParams.id})
        })

    }

    return (
        <div className="toDoList" onMouseEnter={()=>setShowDeleteButton(true)}  onMouseLeave={()=>setShowDeleteButton(false)} >
            
            <div className="toDo-header">
            <p className="toDoList-name">{name}</p>
           { showDeleteButton && <button style={{color:"white",fontSize:"14px"}} onClick={handleDeleteBtnClick} className="button" >DELETE</button>} 
            </div>
            
            <div className="tasks">

                { tasks.map(t=><Task key={t.id} id={t.id} title={t.title} deleteTask={handleDeleteTask} changeStatus={handleChangeStatus} isDone={t.isDone} />  )  }

                <div className="task">

                    <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"row",padding:"0px",flexWrap:"nowrap"}}>
                        <TextField
                        required
                        value={value}
                        onChange={handleChange}
                        variant="standard"
                        sx={{marginBottom:"7px",fontSize:"5"}}
                        />
                        <button className="button" type="submit" >ADD</button>
                    </form>
                </div>

                

                
                
            </div>
        </div>



    )
}

export default ToDoList