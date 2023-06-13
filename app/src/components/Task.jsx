import { useState } from "react"
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';

function Task({id,title,isDone,deleteTask,changeStatus}){

    const [showremoveButton,setShowRemoveButton]=useState(false)

    const handleClick=()=>{
        deleteTask(id)
    }

    const handleChange=()=>{
        changeStatus(id,!isDone)
    }

    console.log("render")

    return (
        <div className="task" onMouseLeave={ ()=>setShowRemoveButton(false)} onMouseEnter={ ()=>setShowRemoveButton( true )}>
            <Checkbox
             checked={isDone}
             onChange={handleChange}
             sx={{position:"absolute",left:"10px"}}
             inputProps={{ 'aria-label': 'controlled' }}
            />
           
            {title}

            {showremoveButton && <button onClick={handleClick} className="button" style={{marginLeft:"10px",display:"flex",alignItems:"center",position:"absolute",right:"10px"}}><DeleteIcon fontSize="small"/></button>}
          

        </div>
    )
}

export default Task