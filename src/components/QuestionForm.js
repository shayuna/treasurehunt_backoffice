import React from "react";
import InputItem from "./InputItem";
import "../styles/index.scss";

export default class QuestionForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            question:"",
            answer:"",
            hint:"",
        }
        this.setValue=this.setValue.bind(this);
        this.submitForm=this.submitForm.bind(this);
    }    
    render(){
        return (
            <form className="questionSegmentWrapper">
                <fieldset className="questionSegment">
                    <legend>שדות למילוי</legend>
                    <InputItem caption="שאלה" value={this.state.question} onValueChange={this.setValue}/> 
                    <InputItem caption="תשובה" value={this.state.answer} onValueChange={this.setValue}/> 
                    <InputItem caption="רמז" value={this.state.hint} onValueChange={this.setValue}/> 
                    <button className="btn" onClick={this.submitForm}>הוסף שאלה</button>
                </fieldset>
            </form>
        );
    }
    setValue(caption,vl){
        switch (caption){
            case "שאלה":
                this.setState({
                    question:vl
                })
                break;
            case "תשובה":
                this.setState({
                    answer:vl
                })
                break;
            case "רמז":
            this.setState({
                hint:vl
            });
            break;
        }
    }
    submitForm(e){
        e.preventDefault();
        alert (this.state.question+
        " *** "+
    this.state.answer+
" *** "+
this.state.hint);
    }

}