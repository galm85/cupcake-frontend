import React from 'react';

type Props = {
    text:string;
    space:number;
    image:string;
    radius:number;
    fontSize:number;
    name:string;
}

const RotateText:React.FC<Props> = ({text,space,image,radius,fontSize,name})=>{

    const circleStyle:any = {
        position: 'relative',
        width:`${radius}px`,
        height:`${radius}px`,
        borderRadius:'50%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
    }

    const imageStyle:any = {
        position:'absolute',
        width:`${radius*0.75}px`,
        height:`${radius*0.75}px`,
        borderRadius:'50%',
    }


    // const textStyle:any = {
    //     position: 'absolute',
    //     width:'100%',
    //     height: '100%',


    // }


    const circle = (letterSpace:number):void=>{
        const text:any = document.querySelector(`.rotate-text-text-${name} p`);
        if(text){
            text.innerHTML = text.innerText.split("").map((char:string,i:number)=>
                    `<span 
                        style="transform:rotate(${i*letterSpace}deg);
                               transform-origin: 0 ${radius/2}px;
                               font-size:${fontSize}em;
                               ">
                        ${char}</span>`
                        ).join("") 
            
        }
    }

    React.useEffect(()=>{
        circle(space);
    },[space,text,image,radius,fontSize])

    return(
        <div style={circleStyle} >
                    <div className="rotate-text-image" style={imageStyle}>
                        <img src={`./images/${image}`} alt="" />
                    </div>
                    <div className={`rotate-text-text-${name} rotate-text-text`}>
                        <p>{text}</p>
                    </div>
                </div>
    )
}

export default React.memo(RotateText);