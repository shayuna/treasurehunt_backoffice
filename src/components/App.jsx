import React, { Component } from "react";
import styles from './App.module.scss';
import Header from "./Header.js";
import QuestionForm from "./QuestionForm.js";
export default class App extends Component {
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
                <Header caption="דף הוספת שאלה"/>
                <QuestionForm/>
            </div>
        )
    }
}
