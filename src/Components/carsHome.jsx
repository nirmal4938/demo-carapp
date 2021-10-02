import React,{Component} from "react";
import { Link } from "react-router-dom";
import LeftPanelCars from "./leftPanelCars";
import http from "./httpCars";
import queryString from "query-string";
class CarHome extends Component
{
    state={
        cars:[],
        carMaster:[],
        prices:{
        minprice:Number,
        maxprice:Number,
        },
    };




    makeSerchstring(queryParams)
    {
        
      let {fuel,type,sort,minprice,maxprice}=queryParams;
      let searchString="";
     
      searchString=this.addToQueryString(searchString,"fuel",fuel);
      searchString=this.addToQueryString(searchString,"type",type);
      searchString=this.addToQueryString(searchString,"sort",sort);
      searchString=this.addToQueryString(searchString,"minprice",minprice);
      searchString=this.addToQueryString(searchString,"maxprice",maxprice);
     return searchString;
    
    }
    
    
    addToQueryString=(str,name,value)=>
      value ? str ? `${str}&${name}=${value}`:
       `${name}=${value}` : str ;

       

   onOptionChangeHandler=(option)=>
       {
            this.callURL("/cars",option);
       }

       callURL=(url,option)=>
       {
          let searchString=this.makeSerchstring(option);
          this.props.history.push({
              pathname:url,
              search:searchString,
          });
       }
 async fetchData()
    {
        let queryParams=queryString.parse(this.props.location.search);
       let searchString=this.makeSerchstring(queryParams);
         let response=await http.get(`/cars?${searchString}`);  
         let {data}=response;
        
         this.setState({cars:data.cars, carMaster:data.carMaster});     
    }
    componentDidMount()
    {
        this.fetchData();
    }
    componentDidUpdate(prevProps,prevstate)
    {
         if(prevProps!==this.props)
         this.fetchData();
    }



    makefilter=()=>
    {
       let  queryParams=queryString.parse(this.props.location.search);
          let {carMaster}=this.state;
          return(<div className="container">
                <div className="row">
                    <div className="col-3">
                    <h5 className="text-dark">Select Price Range :</h5>
                        </div>
                        <div className="col-3">
                   <input className="form-control" type="number" name="minprice" value={queryParams.minprice} onChange={this.handleChange}
                   placeholder="Enter MinPrice"/>
                        </div>
                        <div className="col-3">
                        <input className="form-control" type="number" name="maxprice" value={queryParams.maxprice} onChange={this.handleChange}
                        placeholder="Enter MaxPrice"/>
                        </div>
                    </div>
                    
          </div>);
    }
    handleChange=(e)=>
    {
         let {currentTarget : input}=e;
         let queryParams=queryString.parse(this.props.location.search);
     
     
         queryParams[input.name]=input.value;
         this.callURL("/cars",queryParams);
       
       

    }
    ArrangeByQueryParams(arr,queryParams)
    {
        let {fuel="",type="",sort="",minprice,maxprice}=queryParams;
        
        arr=this.filterqueryParam(arr,"fuel",fuel);
        arr=this.filterqueryParam(arr,"type",type);
        arr=this.filterqueryParampricemin(arr,"price",minprice);
        arr=this.filterqueryParampricemax(arr,"price",+maxprice);
        arr=this.sortqueryParam(arr,"sort",sort);
     
        return arr;
        
    }
    filterqueryParampricemin=(arry,paramName,paramValue)=>
    {
      
        if(!paramValue)
        return arry;
        else{
          let arr=  arry.filter((ar)=>ar.price>paramValue);
       
          return arr;

        }
      
    }
    filterqueryParampricemax=(arry,paramName,paramValue)=>
    {
        if(!paramValue)
        return arry;
        else{
          let arr=  arry.filter((ar)=>ar.price<paramValue);
          return arr;

        }
    }
    filterqueryParam=(arry,paramName,paramvalue)=>
    {
       
       if(!paramvalue)
       return arry;
       else
       {
         let arr= this.getAllDifferentValues(paramName,paramvalue);
         let arr1=arry.filter((cr)=>arr.find((ar)=>ar===cr.model));
         return arr1;
       }
    }
    sortqueryParam=(arry,paramName,paramValue)=>
    {
        if(!paramValue)
        return  arry;
        else{
            let arr1=arry.sort((n1,n2)=>n1[paramValue]-n2[paramValue]);
            return arr1;
        }
    }
    getAllDifferentValues=(name,value)=>
    {
       
     let {cars,carMaster}=this.state;
        let PRArr=carMaster.reduce((acc,cur)=>cur[name]===value ?
         acc : [...acc,cur["model"]],[]);
       
        return PRArr;
    }
    render()
   
    {
        let  queryParams=queryString.parse(this.props.location.search);
        let {cars,carMaster}=this.state;
       let mArr=this.ArrangeByQueryParams(cars,queryParams);
     
        return(<React.Fragment>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                     <LeftPanelCars  option={queryParams} onOptionChange={this.onOptionChangeHandler}
                     carMaster={carMaster}/>
                        </div>
                        <div className="col-9">
                      
                        <h3 className="mx-auto text-center text-dark"> All cars</h3>
                        {this.makefilter()}
                            <div className="row">
                         {mArr.map((cr)=>(
                        <div className="col-3 border border-primary bg-warning text-dark">
                            <div className="container text-center">
                                <h4>{cr.model}</h4>
                                <h6>Price:{cr.price}</h6>
                                <h6>Color:{cr.color}</h6>
                                <h6>Mileage:{cr.kms}</h6>
                                <h6>Manufactured in:{cr.year}</h6>
                                </div> 
                                <div className="d-flex justify-content-around">
                                <Link to={`/cars/${cr.id}/delete`}><i className="far fa-trash-alt"></i></Link>
                                <Link to={`/cars/${cr.id}/edit`}><i className="fas fa-edit"></i></Link>
                                </div>
                         </div>       
                         ))}
                         </div>
                        </div>
                    </div>
                </div>
        </React.Fragment>);
    }
}
export default CarHome;
