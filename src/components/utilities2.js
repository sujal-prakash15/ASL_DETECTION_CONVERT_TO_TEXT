const labelMap = {
    0:{name:'A', color:'red'},
    1:{name:'B', color:'red'},
    2:{name:'C', color:'red'},
    3:{name:'D', color:'red'},
    4:{name:'E', color:'red'},
    5:{name:'F', color:'red'},
    6:{name:'G', color:'red'},
    7:{name:'H', color:'red'},
    8:{name:'I', color:'red'},
    9:{name:'K', color:'red'},
    10:{name:'L', color:'red'},
    11:{name:'M', color:'red'},
    12:{name:'N', color:'red'},
    13:{name:'O', color:'red'},
    14:{name:'P', color:'red'},
    15:{name:'Q', color:'red'},
    16:{name:'R', color:'red'},
    17:{name:'S', color:'red'},
    18:{name:'T', color:'red'},
    19:{name:'U', color:'red'},
    20:{name:'V', color:'red'},
    21:{name:'W', color:'red'},
    22:{name:'X', color:'red'},
    23:{name:'Y', color:'red'},
}

export const drawRect = (classes, ctx) =>{
    // Loop through each prediction
    let i=0;
    for (i=0;i<24;i++){  
  
      // Extract boxes and classes
    //   const [x, y, width, height] = prediction['bbox']; 
    if(classes[i]>=0.1){
      const text =labelMap[i] ; 
      console.log(text);
  
      // Set styling
      const color = Math.floor(Math.random()*16777215).toString(16);
      ctx.strokeStyle = '#' + color
      ctx.font = '18px Arial';
  
      // Draw rectangles and text
    //   ctx.beginPath();   
    //   ctx.fillStyle = '#' + color
    //   ctx.fillText(text, x, y);
    //   ctx.rect(x, y, width, height); 
    //   ctx.stroke();
}}};
  