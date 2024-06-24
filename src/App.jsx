import { useRef, useState,useEffect} from 'react'
import './App.css'

function App() {
  const inputRef =useRef({})
  const [otp,setOtp]=useState({
    digitOne:"",
    digitTwo:"",
    digitThree:"",
    digitFour:"",
    digitFive:"",
    digitSix:"",
  })


  useEffect(()=>{
    inputRef.current[0].focus()

    inputRef.current[0].addEventListener("paste",pasteText)

    return ()=> inputRef.current[0].removeEventListener("paste",pasteText)
  },[])

  

  const handleChange=(event,index)=>{
    const {name,value} = event.target

    if(/[a-z]/gi.test(value)) return;

    setOtp(prev=>({
      ...prev,
      [name]: value.slice(-1),
    }))

   if(value&&index < 5){
    inputRef.current[index +1].focus()
   }
    // event.target.nextSibling.focus()
  }
  // console.log(inputRef.current);

  const handleBackspace=(event,index)=>{
    if(event.key==="Backspace"){
      if(index > 0){
    inputRef.current[index -1].focus()
      }
    }
  }

  const renderInput=(keys,index)=>{
    return Object.keys(otp).map((keys,index)=>(
     <input type="text" ref={element=> inputRef.current[index] = element} key={index} name={keys}
      className='w-16 h-12 rounded-md mr-3 text-center text-xl' onKeyUp={(event)=>handleBackspace(event,index)}
       onChange={(event)=>handleChange(event,index)} value={otp[keys]} />

    ))
  }
  return (
    <>
      <form action="">
        <h3 className='text-3xl mb-8'>Please fill in the otp</h3>
        <div>
         {renderInput()}
        </div>
        <button className='mt-4 w-32 border border-solid bg-[#3b3b3b] rounded hover:bg-[#252525] hover:border-[#3b3b3b]'>Submit</button>
      </form>
    </>
  )
}

export default App
