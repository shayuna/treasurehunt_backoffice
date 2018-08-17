import React, { Component } from "react";
import styles from './App.module.scss';
import Header from "./Header.js";
import QuestionForm from "./QuestionForm.js";
import QuestionsList from "./QuestionsList.js";
import fire from "../fire.js";
const database=fire.database();

class itm {
    constructor(key,val){
        this.key=key;
        this.val=val;
    }
}

export default class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            mode:"show",
            arItms:[]
        }
        this.setAppState=this.setAppState.bind(this);
    }
    componentDidMount(){
        this.loadData("show");
    }
    loadData(mode){
        database.ref("questions").orderByChild("questionNum").once("value",snapshot=>{
            let arItms = [];
            snapshot.forEach(function(child) {
                const oItm = new itm(child.key,child.val());
                arItms.push(oItm);
            });
            this.setState({
                arItms:arItms,
                mode:mode,
            });
        })
    }
    render() {
/*
        return (
            <div className={styles.app}>
                <div className="page-content">
                    <h1>What are you waiting for?</h1>
                </div>
  
            </div>
        );
*/
        return (
            <div>
                {this.state.mode!="show"  && <QuestionForm setAppState={this.setAppState} mode={this.state.mode}/>}
                {this.state.mode==="show" && <QuestionsList data={this.state.arItms} setAppState={this.setAppState}/> }
            </div>
        )
    }
    setAppState(mode){
        if (mode==="show"){
            this.loadData("show");
        }
        else{
            this.setState({mode});
        }
    }
}
