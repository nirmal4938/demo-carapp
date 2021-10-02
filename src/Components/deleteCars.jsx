import React,{Component} from "react";
import { Link } from "react-router-dom";
import http from "./httpCars";

class DeleteCar extends Component
{
    state={};



    
    async componentDidMount()
    {
        let {id}=this.props.match.params;
        let response=await http.deleteApi(`/cars/${id}`);
      
        this.props.history.push("/cars");
    }
    render()
    {
        return(<React.Fragment>

        </React.Fragment>);
    }
}
export default DeleteCar;
