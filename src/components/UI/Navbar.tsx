import React from 'react';
import {Link, NavLink} from "react-router-dom";
import cl from './navbar.module.css'
const Navbar = () => {
    return (
        <div>
            <nav className={cl.navbar}>
               <ul>
                <li>
                    <NavLink className={cl.navbar__link} to="/Penguin">Penguins</NavLink>
                </li>
                   <li>
                       <NavLink className={cl.navbar__link} to={"/To_Do"}>To-Do</NavLink>
                   </li>

               </ul>
            </nav>
        </div>
    );
};

export default Navbar;