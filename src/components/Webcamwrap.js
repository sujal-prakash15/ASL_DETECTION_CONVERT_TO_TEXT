import Webcam from "react-webcam";
import React from "react";
import { Fragment, useState, useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { loadGraphModel } from "@tensorflow/tfjs-converter";
// 2. TODO - Import drawing utility here
// e.g. import { drawRect } from "./utilities";
import { drawRect } from "./utilities";
import Speech from "speak-tts";
import textfile from '../file.txt'
const axios=require('axios').default

const modelParams = {
  flipHorizontal: true,   // flip e.g for video 
  imageScaleFactor: 0.7,  // reduce input image size .
  maxNumBoxes: 20,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.79,    // confidence threshold for predictions.
}

const Webwrap = (props) => {
  const webcamRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [model, setModel] = useState();
  const [predic,setPredic]=useState();
  const[text,loadText]=useState("");
  const canvasRef = useRef(null);
  const speakButton = document.getElementById("play");
  const mediaHandler = () => {
    setTimeout(() => setIsLoading(false), 1_000);
  };
  let content = `Text\ Prediction\ here...`;
  if (isLoading) {
    content = `Webcam\ Is\ Loading...`;
  }
  const fetchData=async()=>{
    let resp= await fetch(textfile)
    let final=await resp.text();
    setPredic(final);

  }
  useEffect(()=>{
    fetchData();
  },[])
  
  //---------------------------
 
  //---------------------------------------------
  //-----------------------------------------------------
  // Main function
  const runCoco = async () => {
    // 3. TODO - Load network
    const net = await tf.loadGraphModel("https://signbucket2.s3.ap-south-1.amazonaws.com/model.json");
    console.log("model loaded"); //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 500);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
        // detect objects in the image.
        
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      
      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(video);
      const resized = tf.image.resizeBilinear(img, [224, 224]);
      const casted = resized.cast("float32");
      const expanded = casted.expandDims(0);
      const obj = await net.predict(expanded);
      const classes = await obj.arraySync();

			// obj.print(); // To view the tensor
      
      // const boxes = await obj[1].arraySync();
      // const classes = await obj[2].arraySync();
     
      // console.log(classes)

      // // Draw mesh
      const ctx = canvasRef.current.getContext("2d");
      // ctx.drawImage(video, predictions[0].bbox[0], predictions[0].bbox[1], predictions[0].bbox[2], predictions[0].bbox[3]);
//------------------------------
      // drawRect(classes , ctx);
//----------------------
      // 5. TODO - Update drawing utility
      // drawSomething(obj, ctx)
      // requestAnimationFrame(() => {
        let char=drawRect(classes[0],0.8,videoWidth,videoHeight,ctx);
      // });
        console.log(char)
        if(char){loadText((prevstate)=>{return prevstate+char;})}

      tf.dispose(img);
      tf.dispose(resized);
      tf.dispose(casted);
      tf.dispose(expanded);
      tf.dispose(obj);
      }
  };

  useEffect(() => {
    runCoco();
  }, []);

  const spk=()=>{
    const speech=new Speech();
    speech.init({
      'volume': 1,
         'lang': 'en-GB',
         'rate': 1,
         'pitch': 1,
         'voice':'Google UK English Male',
         'splitSentences': true,
         'listeners': {
             'onvoiceschanged': (voices) => {
                 console.log("Event voiceschanged", voices)
             }
         }
 })
    
    speech.speak({
      text: predic,
  })
  }
  return (
    <Fragment>
      <span className="content">
        {/* {content} */}
         <textarea type="textarea" className="txtar" value={(isLoading)?content:predic}></textarea>
         <button id='play' onClick={spk} className='btn'>Play</button><nobr/>
        <a onClick={props.Change}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="sv"
            viewBox="0 0 60 50"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </a>
      </span>
      <span>
        <Webcam
          ref={webcamRef}
          muted={true}
          className="wbcam"
          onUserMedia={mediaHandler}
          style={{
            position: "relative",
            float: "right",
            zindex: 9,
            left: 0,
            right: 0,
            textAlign: "center",
            width: 1000,
            height: 720,
          }}
        />
        <canvas
          ref={canvasRef}
          id="myCanvas"
          style={{
            position: "relative",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 10,
            width: 1200,
            height: 720,
          }}
        />
      </span>
    </Fragment>
  );
};
export default Webwrap;
