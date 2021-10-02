import React,{Component} from "react";
import { Link } from "react-router-dom";


class Navbar extends Component
{
    state={}
    render()
    {
        return(<React.Fragment>
             <nav className="nav navbar-expand  navbar-light" style={{backgroundColor:'#e3f2fd'}}>
           
           <div className="" id="navbarSupportedContent">
                
            <ul className=" navbar-nav ml-auto  ">
               
                    <li className="nav-item">
                   <Link to="/cars"  className="nav-link text-dark" >Home</Link>
                   
                 
                    </li>
                    <div class="float-end">
                    <li className="nav-item ">
                    <Link to="/cars/add"  className="nav-link ml-auto">Add Car</Link>
                 
                    </li>
                    </div>
                </ul>
            </div>
           
             </nav>
            
        </React.Fragment>);
    }
}
export default Navbar;
