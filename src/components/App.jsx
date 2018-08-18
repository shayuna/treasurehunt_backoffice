import React, { Component } from "react";
import Header from "./Header.js";
import QuestionForm from "./QuestionForm";
import QuestionsList from "./QuestionsList";
import DataCollectionInput from "./DataCollectionInput";
import fire from "../fire.js";
import styles from './App.module.scss';
import "../styles/index.scss";

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
            mode:"initial",
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
        this.loadData("questions","arItms","questionNum","initial");
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
    }
    render() {
        return (
            <div>
                {this.state.mode==="initial" && 
                    <div>
                        <button className="btn" onClick={()=>{this.setAppState("prologue")}}>מסכי פרולוג</button>
                        <button className="btn" onClick={()=>{this.setAppState("show")}}>מסכי שאלות</button>
                        <button className="btn" onClick={()=>{this.setAppState("epilogue")}}>מסכי אפילוג</button>
                    </div>
                }
                {(this.state.mode==="add" || this.state.mode==="update" || this.state.mode==="del")  && <QuestionForm setAppState={this.setAppState} mode={this.state.mode} chosenItem={this.getChosenItemData()}/>}
                {this.state.mode==="show" && <QuestionsList data={this.state.arItms} setAppState={this.setAppState}/> }
                {this.state.mode==="prologue" && <DataCollectionInput inputs={this.state.arPrologue} caption="פרולוג" inputType="prologue" setAppState={this.setAppState}/> }
                {this.state.mode==="epilogue" && <DataCollectionInput inputs={this.state.arEpilogue} caption="אפילוג" inputType="epilogue" setAppState={this.setAppState}/> }
            </div>
        )
    }
    setAppState(mode){
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
            default:
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
