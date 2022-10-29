import React ,{useState} from 'react'
import './CalculatorBox.css'

function CalculatorBox (props){
    props={
    numbers:[
    {keyName:"1",id:'one'},
    {keyName:"2",id:'two'},
    {keyName:"3",id:'three'},
    {keyName:"4",id:'four'},
    {keyName:"5",id:'five'},
    {keyName:"6",id:'six'},
    {keyName:"7",id:'seven'},
    {keyName:"8",id:'eight'},
    {keyName:"9",id:'nine'},
    {keyName:"0",id:'zero'},
    {keyName:".",id:'decimal'}],

    operators:[
    {keyName:"+",id:'add'},
    {keyName:"-",id:'subtract'},
    {keyName:"x",id:'multiply'},
    {keyName:"/",id:'divide'},
    {keyName:"=",id:'equals'},
    ]   
    }

    const [displayInput,setdisplayInput] =useState("")
    const [displayOutput,setdisplayOutput] =useState("0")
    const [curVal,setCurVal]= useState('')
    const endsWithActions =/[x+-/]$/,
          endsWithActionsButNeg=/[x/]$/,
          endsWithNum  = /\d+$/,
          endsWithDec = /\.\d+$/,
          justNumWithDecimal =/^-?\d+$|^-?\d+\.\d+$/
          

          
    
    const handleDigits = (evt) => {
        if(displayInput.endsWith("0") && evt.target.value==="0"){
            if(displayInput.length<2){
                setdisplayInput(evt.target.value)
            }else{
                setdisplayInput(displayInput)
            }


        }
            
        
        else{
            setCurVal(curVal+evt.target.value)
            setdisplayInput(displayInput+evt.target.value)
            setdisplayOutput(curVal+evt.target.value)
        }
        
        
        
        if(displayInput.includes("=")){
            setdisplayInput(evt.target.value)
            setdisplayOutput(evt.target.value)
        }
        
        if(evt.target.value === "."){
          if(displayInput.endsWith(".") || endsWithDec.test(displayInput) ){
            setdisplayInput(displayInput)
            setdisplayOutput(displayOutput)
            setCurVal(curVal)
            }

            if(evt.target.value ==="0"){
                if(displayInput==="0"){
                    setdisplayInput("0")
                    setdisplayOutput("0")
                    setCurVal(curVal)
                }
            }
         
       }
   }


    const handleActions = (evt) =>{
        setCurVal('')

            if(displayInput.includes('=') && justNumWithDecimal.test(displayOutput) && displayInput.length>2 && evt.target.value !=="="){
                setdisplayInput(displayOutput+evt.target.value)
                setdisplayOutput(evt.target.value)
            }
           
            
                
                
             if(endsWithActions.test(displayInput)){
                
                if(endsWithActionsButNeg.test(displayInput) && evt.target.value ==="-"){
                    setdisplayInput(displayInput+"-")
                    setdisplayOutput("-")


                    
                


                }
                else{
                    setdisplayInput(displayInput.replace(displayInput[displayInput.length-1],evt.target.value))
                    setdisplayOutput(evt.target.value)
                }
                    
                
                
               

                }
                
                if(displayInput.endsWith("x-") && evt.target.value !=="-" ){
                    setdisplayInput(displayInput.replace("x-",evt.target.value))
                     setdisplayOutput(evt.target.value)
                }

                if(displayInput.endsWith("/-") && evt.target.value !=="-"){
                    setdisplayInput(displayInput.replace("/-",evt.target.value))
                    setdisplayOutput(evt.target.value)
                }
                
                
             
             

            

             if(justNumWithDecimal.test(displayInput)){
                if(!endsWithActions.test(displayInput)){
                    setdisplayInput(displayInput+evt.target.value)
                }
                setdisplayOutput(evt.target.value)
             }
             if(endsWithNum.test(displayInput) && !displayInput.includes("=")){
                setdisplayOutput(evt.target.value)
                setdisplayInput(displayInput+evt.target.value)
                
             }

             
        if(evt.target.value ==="="){
                let answer= eval(displayInput.replace(/x/,"*"))
                setdisplayInput(displayInput+"="+Math.round((answer*100000))/100000)
                setdisplayOutput(Math.round((answer*100000))/100000)
        }

      
    }

    const handleReset = ()=>{
            setdisplayInput("")
            setdisplayOutput("0")
            setCurVal('')
            
    }

    const handleDEL = ()=>{
        setdisplayInput(displayInput.slice(0,-1))
        setdisplayOutput("")
        
}

    return(
        <div className='CalculatorBox-main'>
            <h1>Simple Calculator</h1>
         <div className='CalculatorBox-DisplayResult'>
            <div className='screen' >{displayInput}</div>
            <div className='screen' id='display' >{displayOutput}</div>
            
         </div>
         <div className='CalculatorBox-Keies'>
            <div className='CalculatorBox-numbers'>
            {props.numbers.map((ltr,i) => (<button id={props.numbers[i].id} onClick={handleDigits} value={props.numbers[i].keyName}  >{props.numbers[i].keyName}</button>))}
            </div>
            <div className='CalculatorBox-operators'>
            {props.operators.map((ltr,i) => (<button id={props.operators[i].id} onClick={handleActions} value={props.operators[i].keyName} >{props.operators[i].keyName}</button>))}
            <button id='clear' onClick={handleReset}>AC</button>
            <button id='DEL' onClick={handleDEL}>DEL</button>
            
            </div>
          
         </div>

        </div>
        
    )
}

export default CalculatorBox;