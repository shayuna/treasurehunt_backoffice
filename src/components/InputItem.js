import React from "react";
import "../styles/index.scss";

export default class InputItem extends React.Component {
    constructor(props){
        super(props);
        this.onValueChange=this.onValueChange.bind(this);
    }
    render(){
        var input = null;
        if (this.props.size==="big"){
            input=<textarea className="input big" type="text" onChange={this.onValueChange} value={this.props.value} data-index={this.props.index}></textarea>;
        }else{
            input=<input className="input" type="text" onChange={this.onValueChange} value={this.props.value} data-index={this.props.index}></input>;
        }
        return (
            <div className="inputItem">
                <label className="caption">{this.props.caption}</label>
                {input}
            </div>
        )
    }
    onValueChange(e){
        this.props.onValueChange(e,this.props.caption,e.target.value);
    }

}