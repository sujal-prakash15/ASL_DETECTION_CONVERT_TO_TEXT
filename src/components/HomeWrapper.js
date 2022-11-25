import "./HomeWrapper.css"
import {Fragment, useState,useRef} from 'react';
import React from "react";
import Webcamwrap from "./Webcamwrap";
import Defaultwrap from "./Defaultwrap";

const HomeWrap=()=>{
    const[isValid,setIsValid]=useState(true);
    
    const change=()=>{
        setIsValid(!isValid);
    }
    
    if(isValid){
        return(<Defaultwrap Change={change} />)
    } else{
        return(<Webcamwrap Change={change} />)
    }
    
}
export default HomeWrap;