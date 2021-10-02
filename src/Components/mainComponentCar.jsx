import react,{Component} from "react";
import Navbar from "./navbarCars";
import Addcar from "./addCars";
import CarHome from "./carsHome";
import DeleteCar from "./deleteCars";
import {Route,Redirect,Switch } from "react-router-dom";
import React from "react";
class CarMain extends Component
{
state={};

render()
{
    return(<React.Fragment>
        <Navbar/>
        <Switch>
            <Route path="/cars/add" component={Addcar}/>
           <Route path="/cars/:id/delete" component={DeleteCar}/>
            <Route path="/cars/:id/edit" component={Addcar}/>
           
            <Route path="/cars" component={CarHome}/>
           
        </Switch>
    </React.Fragment>)
}
}

export default CarMain;