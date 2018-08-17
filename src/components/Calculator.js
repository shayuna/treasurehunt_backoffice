import React from "react";

const BoilingVerdict = (props)=>{
    if (props.celsius>100){
        return <h2>really hot in here</h2>
    }
    else{
        return <h2>children's game</h2>
    }
};

export default class Calculator extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            celsius:""
        }
        this.handleChange=this.handleChange.bind(this);

    }
    render(){
        return(
            <div>
                <input type="text" onChange={this.handleChange} value={this.state.celsius}/>
                <BoilingVerdict celsius={this.state.celsius}/>
            </div>
        );
    }
    handleChange(e){
        this.setState({
            celsius:e.target.value
        })
    }
}