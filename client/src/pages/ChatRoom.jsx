import React, { useState,useEffect } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import styles from './ChatRoom.module.css'
import { io } from 'socket.io-client';


function ChatRoom() {

  const navigate = useNavigate();

  const [error,setError] = useState('');
  const [messages,setMessages] = useState([]);
  const [members,setMembers] = useState([]);
  let roomName;

  const location = useLocation();
  const { user,roomId } = location.state || {};

  useEffect(()=>{
    // console.log(user);
    // console.log(roomId);
    if(!location.state){
      navigate('/');
    }

    
    const socket = io('http://localhost:3000',{
      query: {
        user,
        roomId
      }
    });

    fetch(`http://localhost:3000/AnonymousChatroom/getRoomById?roomId=${roomId}`, {
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
        // console.log(data);
        roomName = data.Room.name;
        setMembers(data.Room.members);
        // console.log(members);
        setMessages(data.Messages);
        // console.log(messages);
        
        setError('');
      }
    ).catch(
      (e) => {
        setError(e.error);
        // console.log("Error: ");
        // console.log(e);
      }
    );

    return ()=>{
      socket.emit("predisconnect",{ roomId, user });
    }

  },[]);

  return (
    <div className={styles.body}>
      <div className={styles.sidebar}>
        <div id={styles.expand}>
            <button id={styles.open}>
                <div className={styles.burger}><hr/></div>
                <div className={styles.burger}><hr/></div>
                <div className={styles.burger}><hr/></div>
            </button>
            <div className={styles.header}>
                <b>
                    Anonymous Chatroom
                </b>
            </div>
        </div>
        <div className={styles.header}>
            <b>
                Anonymous Chatroom
            </b>
        </div>
        <div className={styles.roomname}>
            {roomName}
        </div>
        <div className={styles.roomcode}>
            Code: {roomId}
        </div>
        <h3 className={styles.userheader}>
            Users:
        </h3>
        <ul className={styles.users}>
            {members.map(item => {
              return <li key={item} >{item}</li>
            })}
        </ul>
    </div>
    <div className={styles.chatpanel}>
        <div className={styles.chats} id={styles.chats}>
            
            {messages.map(item => {
              if(item.sender == user){
                return <div key={item.id} className={styles.self} >{item.data}</div>
              }
              return <div key={item.id} className={styles.other} >{item.data}</div>
              
            })}
                            
        </div>
        <div className={styles.sender}>
            <button id={styles.send}>&gt;</button>
            <div className={styles.divider}></div>
            <input type={styles.text} id={styles.message}/>
        </div>
    </div>
    </div>
  )
}

export default ChatRoom
