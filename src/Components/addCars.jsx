import React,{Component} from "react";
import { Link } from "react-router-dom";
import { carMaster } from "./carData";
import http from "./httpCars";

class Addcar extends Component
{
    state={
       Car:{id:"",price:Number,kms:Number,year:Number,model:"",color:""},
       Model:[],
       carMaster:[],
       edit:false,
    };
  async componentDidMount()
    {
        let response=await http.get(`/cars`);
        let {data}=response;
     
      let Model= data.carMaster.reduce((acc,cur)=>(acc.find((cr)=>cr===cur.model)) ? acc : [...acc,cur.model],[]);
      this.setState({Model:Model,carMaster:data.carMaster});
      this.fetchData();
    }
  async fetchData()
    {
      let {id}=this.props.match.params;
      if(id)
      {
          console.log(id);
          let response=await http.get(`/cars/${id}`);
          let {data}=response;
          this.setState({Car:data ,edit:true});
      }
      else if(!id){
       let   car={id:"",price:Number,kms:Number,year:Number,model:"",color:""};
     
         this.setState({Car:car ,edit : false});
      }
     
    }

    async PostData(url,obj)
    {
        
        let response=await http.post(url,obj);
        console.log(response);
        this.props.history.push("/cars");
    }
    async PutData(url,obj)
    {
        console.log("In PUT");
        let response=await http.put(url,obj);
        console.log(response);
        this.props.history.push("/cars");
    }
   async componentDidUpdate(prevProps,prevState)
   {
       if(prevProps!==this.props)
       {
       this.fetchData();
       }
   }
   

    showDropDown=(label,arr,name,selValue,placeholder)=>
    {
        return(<React.Fragment>
            <div className="form-group">
                <label className="form-group-label">{label}</label>
               <select className="form-control" id={name} name={name}
               value={selValue} onChange={this.handleChange}>
                <option value="">{placeholder}</option>
                {arr.length>0 ? arr.map((el)=><option>{el}</option>) : ""}
               </select>
                </div>
        </React.Fragment>)
    }

       
makeTextField=(label,name,value,placeholder)=>{

    return (<React.Fragment>
       <div className="form-group">
           <label className="form-control-label">{label}</label>
           <input className="form-control" type={name==="price" ? "number" : "text"} name={name}
           onChange={this.handleChange} value={value} placeholder={placeholder}/>
       </div>
    </React.Fragment>)
    };
    handleChange=(e)=>
    {
      let {currentTarget : input}=e;
      let s1={...this.state};
      s1.Car[input.name]=input.value;
      this.setState(s1);
    }
    
    handleSubmit=(e)=>
  {
      e.preventDefault();
      let {Car,edit}=this.state;
      edit ?
      this.PutData(`/cars/${Car.id}`, Car)
      : this.PostData("/cars" ,  Car) ;
  }


getColor=(model)=>
{
    let {carMaster}=this.state;
    console.log(model);
  let index =model ? carMaster.findIndex((mo)=>mo.model===model) :-1;
  if(index>=0)
  {
      return carMaster[index].colors;
  }
  else return [];
}
    render()
    {
        let {Model ,edit}=this.state;
       
        let {id,price,kms,year,model,color}=this.state.Car;
        return(<React.Fragment>
               <div className="container border border-success">
                   <h3 className="text-center">{edit ? "Edit car" :"Add Car"}</h3>
                   {this.makeTextField("Car ID","id",id,"Enter ID")}
                   {this.makeTextField("Price","price",price,"Enter Price")}
                   {this.makeTextField("Mileage in kms","kms",kms,"Enter Mileage")}
                   {this.makeTextField("Year Of Manufacture","year",year,"Enter Year")}
                   <div className="d-flex justify-content-around">
                      
                           <div className="col-4">
                               {this.showDropDown("Model",Model,"model",model,"Select Model")}
                               </div>
                               <div className="col-4">
                                   </div>
                                   <div className="col-4">
                                       {this.showDropDown("Color",this.getColor(model),"color",color,"Select Color")}
                                   </div>
                     </div>
                     <div className="text-center">
                     <button className="btn btn-primary" onClick={this.handleSubmit}>{edit ? "Update" : "Submit"}</button>
                     </div>
               </div>
        </React.Fragment>);
    }
}
export default Addcar;
