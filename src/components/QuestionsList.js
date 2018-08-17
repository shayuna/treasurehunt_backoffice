import React from "react";
import Header from "./Header";
import "../styles/index.scss";

export default class QuestionsList extends React.Component {
    constructor(props){
        super(props);
        this.add=this.add.bind(this);
        this.update=this.update.bind(this);
        this.del=this.del.bind(this);
        this.markListItem=this.markListItem.bind(this);
    }
    render(){
        const questions=this.props.data.map((itm,ii)=>{
            return <div onClick={this.markListItem} className="listItem" data-key={itm.key} key={itm.key}><span className="item listItemIndex">{itm.val.questionNum}.</span><span className="item">{itm.val.question}</span></div>
        });
        return (
            <div>
                <Header caption="דף רשימת שאלות"/>
                {questions}
                <button className="btn" onClick={this.add}>הוספת שאלה</button>    
                <button className="btn" onClick={this.update}>עריכת שאלה</button>    
                <button className="btn" onClick={this.del}>מחיקת שאלה</button>    
            </div>
        );
    }
    add(){
        this.props.setAppState("add");
    }
    update(){
        alert (document.querySelector(".marked").getAttribute("data-key"));
        this.props.setAppState("update");
    }
    del(){
        this.props.setAppState("del");
    }
    markListItem(e){
        document.querySelectorAll(".marked").forEach((elm,ii)=>{
            if (elm.classList)elm.classList.remove("marked");
        })
        e.target.closest(".listItem").classList.add("marked");
    }
}