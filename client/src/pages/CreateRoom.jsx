import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './createRoom.module.css'

function CreateRoom() {

  const navigate = useNavigate(); 

  const [room,setRoom] = useState('');
  const [user,setUser] = useState('');
  const [error,setError] = useState('');

  const create = (event) => {
    event.preventDefault();
    let data = {
      name: room,
      creator: user
    };

    // fetch('https://anonymous-chatroom-server.vercel.app/createRoom',   //production
    // fetch('http://localhost:3000/AnonymousChatroom/createRoom',  //development
    fetch('http://192.168.155.35:3000/AnonymousChatroom/createRoom',  //development
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(
      (response) => {
        if(!response.ok){
          const reader = response.body.getReader(); // Access the ReadableStream
          const decoder = new TextDecoder(); // Decodes the binary data into text (useful for text streams)
          let e = "";
            // Function to read chunks of data
          function readChunk({ done, value }) {
            if (done) {
              // console.log('Stream complete');
              // console.log(e);
              throw e;
            }
            // Process the chunk (e.g., append to a file, update UI, etc.)
            const chunkText = decoder.decode(value, { stream: true });
            e += chunkText;
            // Read the next chunk
            return reader.read().then(readChunk);
          }
          // Start reading the stream
          return reader.read().then(readChunk);
        
        }
        return response.json();
      }
    ).then(
      (data) => {
        console.log(data);
        navigate('/chatRoom', { state: { user, roomId: data.Room.id } });
      }
    ).catch(
      (e) => {
        setError(e);
        console.log("Error: ");
        console.log(e);
      }
    );
  }

  return (
    <div className={styles.body}>
      <div className={styles.header}>
        <b>
            Anonymous Chatroom
        </b>
    </div>

    <div className={styles.content}>
        <h1 className={styles.title}>Create Room Code</h1>
        <ul className={styles.help}>
            <li>Name must be 3-15 characters long.</li>
            <li>Your privacy is our priority. As such none of your precious data will be stored after the room is deleted.</li>
            <li>Room is automatically deleted after the last active member leaves group.</li>
            <li>Room cannot be deleted by anyone as long as any member is active, not even by the creator.</li>
        </ul>
        <form id={styles.roomForm} onSubmit={create}>

            <input type="text" required minLength="3" maxLength="15" onChange={(e)=>setRoom(e.target.value)} placeholder="Enter Room Name" name="code" id={styles.code}/>
            <input type="text" required minLength="3" maxLength="15" onChange={(e)=>setUser(e.target.value)} placeholder="Enter User Name" name="code" id={styles.code}/>
            {(error != "") && error.substring(10,error.length-2)}
            <div className={styles.buttons}>
                <button content="Copy Code">Copy Name</button>
                <button type="submit" content="Create Room">Create Room</button>
            </div>
        </form>
    </div>
    </div>
  )
}

export default CreateRoom
