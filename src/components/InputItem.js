import React from "react";
import "../styles/index.scss";

export default class InputItem extends React.Component {
    constructor(props){
        super(props);
        this.onValueChange=this.onValueChange.bind(this);
    }
    render(){
        return (
            <div className="inputItem">
                <label className="caption">{this.props.caption}</label>
                <textarea className="input" type="text" onChange={this.onValueChange} value={this.props.value} data-index={this.props.index}></textarea>
            </div>
        )
    }
    onValueChange(e){
        this.props.onValueChange(e,this.props.caption,e.target.value);
    }

}