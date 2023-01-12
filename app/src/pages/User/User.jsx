
import { Routes, Route, Link, Outlet } from 'react-router-dom';
import Header from '../../components/Header';

function User(){
return (
    <div>
        <Header/>
        <main>
        <Outlet/>
        </main>
    </div>   
)}

export default User