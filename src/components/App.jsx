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
            arItms:[],
            arPrologue:[],
            arEpilogue:[]
        }
        this.setAppState=this.setAppState.bind(this);
        this.getChosenItemData=this.getChosenItemData.bind(this);
   }
    componentDidMount(){
        this.loadData("prologue","arPrologue","screenNum");
        this.loadData("epilogue","arEpilogue","screenNum");
        this.loadData("questions","arItms","questionNum","show");
    }
    loadData(itemsTypeToLoad,stateArrayName,orderBy,mode){
        database.ref(itemsTypeToLoad).orderByChild(orderBy).once("value",snapshot=>{
            let arItms = [];
            snapshot.forEach(function(child) {
                const oItm = new itm(child.key,child.val());
                arItms.push(oItm);
            });
            this.setState(prevState=>({
                [stateArrayName]:arItms,
                mode:mode ? mode : prevState.mode,
            }));
        })
        break;
    }
    render() {
        return (
            <div>
                {(this.state.mode==="add" || this.state.mode==="update" || this.state.mode==="del")  && <QuestionForm setAppState={this.setAppState} mode={this.state.mode} chosenItem={this.getChosenItemData()}/>}
                {this.state.mode==="show" && <QuestionsList data={this.state.arItms} setAppState={this.setAppState}/> }
            </div>
        )
    }
    setAppState(mode){
        this.loadData("prologue","arPrologue","screenNum","prologue");
        this.loadData("epilogue","arEpilogue","screenNum","epilogue");
        this.loadData("questions","arItms","questionNum","show");
        switch(mode){
            case "prologue":
                this.loadData("prologue","arPrologue","screenNum","prologue");
                break;
            case "epilogue":
                this.loadData("epilogue","arEpilogue","screenNum","epilogue");
                break;
            case "show":
                this.loadData("questions","arItms","questionNum","show");
                break;
            case "add":
            case "update":
            case "del":
                this.setState({mode});
                break;
        }
    }
    getChosenItemData(){
        var jItm={};
        if (document.querySelector(".marked")){
            jItm=this.getItmByKey(document.querySelector(".marked").getAttribute("data-key"));

        }
        return jItm;
    }
    getItmByKey(key){
        var jItm={};
        this.state.arItms.forEach((itm,ii)=>{
            if (itm.key===key){
                jItm=itm;
                return false;
            }
        });
        return jItm;
    }
}
