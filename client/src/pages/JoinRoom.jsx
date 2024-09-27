import React,{ useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './joinRoom.module.css'

function JoinRoom() {

    const navigate = useNavigate();

    const [code,setCode] = useState('');
    const [user,setUser] = useState('');
    const [error,setError] = useState('');

    const join = (event) => {
        event.preventDefault();

        // fetch(`https://anonymous-chatroom-server.vercel.app/AnonymousChatroom/getRoomById?roomId=${code}`,  //production
      fetch(`http://localhost:3000/AnonymousChatroom/getRoomById?roomId=${code}`,  //development 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
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
                  throw JSON.parse(e);
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
            let members = data.Room.members;
            // console.log(members);
            for(let u in members){
                if(members[u] == user){
                    throw {error: "name already exists within the room, please change your name and try again."};
                }
            }
            setError('');
            navigate('/chatRoom', { state: { user, roomId: code } });
          }
        ).catch(
          (e) => {
            setError(e.error);
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
            {/* <button id={styles.backbtn}>&lt;</button> */}
            <h1 className={styles.title}>Join Room</h1>
            <ul className={styles.help}>
                <li>Code must be 8 characters long.</li>
                <li>Your privacy is our priority. As such none of your precious data will be stored after the room is deleted.</li>
                <li>Room is automatically deleted after the last active member leaves group.</li>
                <li>Room cannot be deleted by anyone as long as any member is active, not even by the creator.</li>
            </ul>
            <form id={styles.roomForm} onSubmit={join}>

                <input type="text" value={code} onChange={(e)=>setCode(e.target.value)} required minLength="3" maxLength="15" placeholder="Enter Code" name="code" id={styles.code}/>
                <input type="text" value={user} onChange={(e)=>setUser(e.target.value)} required minLength="3" maxLength="15" placeholder="Enter Your Name" name="code" id={styles.code}/>
                {(error != '') && error}
                <div className={styles.buttons}>
                    <button content="Copy">Copy</button>
                    <button content="Join" type="submit">Join</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default JoinRoom
