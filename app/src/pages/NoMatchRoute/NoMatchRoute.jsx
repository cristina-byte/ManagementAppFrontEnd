import { Link } from "react-router-dom";
import Button from '@mui/material/Button';

function NoMatchRoute(){
    return (
        <div className="error-page">
            <h1 className="status">404</h1>
            <h3 className="text-error">Page not found</h3>
            <p className="error-description">This happend because you searched for a page that doesn't exist</p>
            <Link to='/'><Button variant="contained" sx={{marginTop:'20px',background:'#2E3789'}}  >Back home</Button></Link>
        </div>
    )
}

export default NoMatchRoute