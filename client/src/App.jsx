import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [message, setMessage] = useState("Connecting to server...");
  useEffect(()=>{
    fetch('http://localhost:3000/',{
        method: "GET",
        mode: "cors",  // Change the mode to CORS  
      }).then(
        (res) =>{
          return res.json();
        }
      ).then(
        (data) => {
          console.log(data);
          setMessage(data.message);
        }
      ).catch(
        (err) => {
          console.log(err);
          setMessage("Could not connect to server");
        }
      )
  },[]);

  return (
    <>
      <div className="test">
        {message}
      </div>
    </>
  )
}

export default App
