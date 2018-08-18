import React from "react";
import InputItem from "./InputItem";
import Header from "./Header";
import "../styles/index.scss";
import fire from "../fire"

const database=fire.database();

export default class DataCollectionInput extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputs:this.props.inputs
        }
        this.setValue=this.setValue.bind(this);
        this.add=this.add.bind(this);
        this.save=this.save.bind(this);
        this.home=this.home.bind(this);
    }
    render(){
        const inputs=this.state.inputs.map((itm,ii)=>{
            return (
                <InputItem key={ii} className="inputItem" size="big" caption={"מסך "+parseFloat(ii+1)} value={this.state.inputs[ii].val} onValueChange={this.setValue} index={ii}/>
            )
        })
        return (
            <div>
                <Header className="hdr" caption={"מסכי "+this.props.caption}/>
                {inputs}
                <button className="btn" onClick={this.add}>הוספת מסך</button>
                <button className="btn" onClick={this.save}>שמירה</button>
                <button className="btn" onClick={this.home}>חזרה למסך הראשי</button>
            </div>
        )
    }
    setValue(e,caption,vl){
        const inputs=this.state.inputs.slice();/* don't use the state array, use a copy of the array */
        inputs[e.target.getAttribute("data-index")].val=vl;
        this.setState({
            inputs:inputs,
        })
    }
    home(){
        this.props.setAppState("initial");
    }
    add(){
        let inputs=this.state.inputs.slice();
        inputs.push({key:"",val:""});
        this.setState({
                inputs:inputs,
            })
    }
    save(){
        database.ref(this.props.inputType).remove();
        const inputs =this.state.inputs.filter((itm,ii)=>{
            if (itm.val.trim()!="")database.ref(this.props.inputType).push(itm.val);
        })
        alert ("המסך נשמר בהצלחה");
        this.props.setAppState(this.props.inputType);
    }
}