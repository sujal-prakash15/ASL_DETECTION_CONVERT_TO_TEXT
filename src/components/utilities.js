// Define our labelmap
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
    // 14:{name:'P', color:'red'},
    // 15:{name:'Q', color:'red'},
    // 16:{name:'R', color:'red'},
    // 17:{name:'S', color:'red'},
    // 18:{name:'T', color:'red'},
    // 19:{name:'U', color:'red'},
    // 20:{name:'V', color:'red'},
    // 21:{name:'W', color:'red'},
    // 22:{name:'X', color:'red'},
    // 23:{name:'Y', color:'red'},
}

// Define a drawing function
export const drawRect = ( scores, threshold, imgWidth, imgHeight, ctx)=>{
    for(let i=0; i<=scores.length; i++){
        if(scores[i]>threshold){
            // Extract variables
            // const [y,x,height,width] = boxes[i]
            const text = labelMap[i]['name'];
            return text;
            // Set styling
            ctx.strokeStyle = labelMap[text]['color']
            ctx.lineWidth = 10
            ctx.fillStyle = 'white'
            ctx.font = '30px Arial'         
            
            // // DRAW!!
            ctx.beginPath()
            ctx.fillText(labelMap[text]['name']);
            // // ctx.rect(x*imgWidth, y*imgHeight, width*imgWidth/2, height*imgHeight/1.5);
            ctx.stroke()
        }
        
    }
}