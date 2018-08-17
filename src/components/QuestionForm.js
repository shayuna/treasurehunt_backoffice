import React from "react";
import InputItem from "./InputItem";
import "../styles/index.scss";
import fire from "../fire.js";
import Header from "./Header";
const database=fire.database();

export default class QuestionForm extends React.Component {
    constructor(props){
        super(props);
        this.state={
            questionNum:(this.props.mode=="del" || this.props.mode=="update") && this.props.chosenItem.val ? this.props.chosenItem.val.questionNum : "0",
            question:(this.props.mode=="del" || this.props.mode=="update") && this.props.chosenItem.val ? this.props.chosenItem.val.question : "",
            answer:(this.props.mode=="del" || this.props.mode=="update") && this.props.chosenItem.val ? this.props.chosenItem.val.answer : "",
            arHints:(this.props.mode=="del" || this.props.mode=="update") && this.props.chosenItem.val  && this.props.chosenItem.val.hints ? this.props.chosenItem.val.hints : [],
        }
        this.setValue=this.setValue.bind(this);
        this.submitForm=this.submitForm.bind(this);
        this.addHint=this.addHint.bind(this);
        this.cancel=this.cancel.bind(this);
    }    
    render(){
        const hints = this.state.arHints.map((itm,ii)=>{
            return (
                <InputItem className="inputItem" size="big" caption="רמז" value={this.state.arHints[ii]} onValueChange={this.setValue} index={ii}/>
            )
        });
        let hdr;
        switch (this.props.mode){
            case "add":
                hdr=<Header caption="דף הוספת שאלה"/>;
                break;
            case "update":
                hdr=<Header caption="דף עריכת שאלה"/>;
                break;
            case "del":
                hdr=<Header caption="דף מחיקת שאלה"/>;
                break;
        }
        return (
            <div>
                {hdr}
                <form className="questionSegmentWrapper">
                    <fieldset className="questionSegment">
                        <legend>שדות למילוי</legend>
                        <InputItem className="inputItem" caption="מספר שאלה" value={this.state.questionNum} onValueChange={this.setValue}/> 
                        <InputItem className="inputItem" size="big" caption="שאלה" value={this.state.question} onValueChange={this.setValue}/> 
                        <InputItem className="inputItem" size="big" caption="תשובה" value={this.state.answer} onValueChange={this.setValue}/> 
                        {hints}
                        <button className="btn" onClick={this.submitForm}>{this.props.mode==="del" ? "מחיקת שאלה" : "שמירת שאלה"}</button>
                        {this.props.mode!="del" && <button className="btn" onClick={this.addHint}>הוסף רמז</button>}
                        <button className="btn" onClick={this.cancel}>ביטול</button>
                    </fieldset>
                </form>
            </div>
        );
    }
    setValue(e,caption,vl){
        switch (caption){
            case "מספר שאלה":
                this.setState({
                    questionNum:vl
                })
                break;
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
                const arHints=this.state.arHints.slice();/* don't use the state array, use a copy of the array */
                arHints[e.target.getAttribute("data-index")]=vl;
                this.setState({
                    arHints:arHints
                })
                break;
        }
    }
    submitForm(e){
        e.preventDefault();
        switch (this.props.mode){
            case "add":
                database.ref("questions").push({questionNum:this.state.questionNum,question:this.state.question,answer:this.state.answer,hints:this.state.arHints});
                alert ("השאלה התווספה בהצלחה");
                break;
            case "update":
                database.ref("questions/"+this.props.chosenItem.key).update({questionNum:this.state.questionNum,question:this.state.question,answer:this.state.answer,hints:this.state.arHints});
                alert ("השאלה נערכה בהצלחה");
                break;
            case "del":
                database.ref("questions/"+this.props.chosenItem.key).remove();
                alert ("השאלה נמחקה בהצלחה");
                break;
        }
        this.props.setAppState("show");
    }
    addHint(e){
        e.preventDefault();
        this.setState(prevState=>({
            arHints:[...prevState.arHints,""]
        }));
    }
    cancel(e){
        e.preventDefault();
        this.props.setAppState("show");
    }

}