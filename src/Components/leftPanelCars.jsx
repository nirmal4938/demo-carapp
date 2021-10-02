import React,{Component} from "react";
import { Link } from "react-router-dom";

class LeftPanelCars extends Component
{
    state={
        fuels:["Petrol","Diesel"],
        Types:["Hatchback","Sedan"],
        Sort:["kms","price","year"],
    }

    handleChange=(e)=>
    {
        let {currentTarget : input}=e;
        let option=this.props.option;
        option[input.name]=input.value;
        this.props.onOptionChange(option);
    }
    showRadio=(label,arr,name,value)=>
    {
        return(<React.Fragment>
            <label className="form-check-label font-weight-bold text-dark">{label}</label>
            <hr className="border-dark"/>
           
            {arr.map((el,index)=>(
              
                  <div className="form-check border-primary bg-light">

                <input className="from-check-input " type="radio" name={name} value={el}
                onChange={this.handleChange}  checked={el===value}></input>
                <label className="from-check-label">{el}</label>
               
                </div>
              
            ))}
           
        </React.Fragment>)
    }
    render()
    {
        let {fuels,Types,Sort}=this.state;
        let {fuel="",type="",sort=""}=this.props.option;
        return(<React.Fragment>

         
            <div className="container border border-light bg-light " style={{marginTop:'26%', height:'100%' }}>
                <h5 className="text-center"></h5>
            <div className="conatiner  border border-dark font-weight" style={{marginTop:'5%'}}>
              {this.showRadio("Fuel",fuels,"fuel",fuel)}
              </div><br/><br/><br/><br/><br/>
              <div className="conatiner  border border-dark font-weight">
              {this.showRadio("Type",Types,"type",type)}
              </div><br/><br/><br/><br/><br/>
              <div className="conatiner  border border-dark font-weight">
              {this.showRadio("Sort By",Sort,"sort",sort)}
              </div>
             </div>
          
        </React.Fragment>);
    }
}
export default LeftPanelCars;
