import React from "react";

export default class Clock extends React.Component{
    constructor(props){
        super(props);
        this.tickTock=this.tickTock.bind(this);
        this.state = {
            dt:new Date(),
            clockState:"עצור"
        }
    }
    componentDidMount(){
        this.intervalID=setInterval(this.tickTock,1000)

    }
    componentWillUnmount(){
        clearInterval(this.intervalID);
    }
    tickTock(){
        if (this.state.clockState==="עצור"){
            this.setState({
                dt:new Date()
            })
        }
     }
    setClockState(){
        this.setState(prevState => ({
                clockState:prevState.clockState==="עצור" ? "המשך" : "עצור"
            })
        )

    }
    render(){
        let btn;
    const numbers=[1,3,6,8].map((itm,ii)=><div key={ii}>{itm}</div>);
        if (1===1){
btn=<h3 onClick={()=>{this.setClockState()}}>{this.state.clockState}</h3> 
        }else{
btn=<h3>who are we bluffing baby</h3>
        }
        return (
            <div>
                <h2>the time is {this.state.dt.toLocaleTimeString()}</h2>
                {btn}
                {
                    numbers
                }
            </div>
        )
    }
}