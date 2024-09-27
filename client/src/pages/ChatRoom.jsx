import React, { useState,useEffect,useRef } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import styles from './ChatRoom.module.css'
import { io } from 'socket.io-client';


function ChatRoom() {

  const navigate = useNavigate();

  const [error,setError] = useState('');
  const [message,setMessage] = useState('');
  const [messages,setMessages] = useState([]);
  const [members,setMembers] = useState([]);
  const [leave,setLeave] = useState(()=>()=>{});
  const [send,setSend] = useState(()=>()=>{});

  const hasMounted = useRef(false);

  let roomName;

  const location = useLocation();
  const { user,roomId } = location.state || {};


  useEffect(()=>{
    
    // if(!hasMounted.current){
    //   hasMounted.current = true;
      // const socket = io('https://anonymous-chatroom-server.vercel.app', //production
      const socket = io('http://localhost:3000', //development
      {
        query: {
          user,
          roomId
        },
        autoConnect: false,
      });

      if(!location.state){
        navigate('/');
      }
      // console.log(user);
      // console.log(roomId);
      // fetch(`https://anonymous-chatroom-server.vercel.app/AnonymousChatroom/getRoomById?roomId=${roomId}`,  //production
      fetch(`http://localhost:3000/AnonymousChatroom/getRoomById?roomId=${roomId}`,  //development
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
          // console.log(data);
          roomName = data.Room.name;
          setMembers(data.Room.members);
          // console.log(members);
          setMessages(data.Messages);
          // console.log(messages);

          socket.connect();
          setLeave(() => () => {
            socket.emit("leaving",{roomId, user});
          });
          setSend(() => (message) => {
            console.log(message);
            socket.emit('chatMessage', {roomId, user, message});
          })

          socket.on('message',({newmess}) => {
            // console.log(newmess);
            setMessages((messages) => ([...messages, newmess]));
          });

          socket.on('newuser',({newuser})=>{
            setMembers((members) => ([...members, newuser]));
          });

          socket.on('left',({user})=>{
            console.log("left user: "+user);
            setMembers((members)=>{
              return members.map(m => (m != user));
            })
          });
          
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
        console.log("leaving");
        leave();
        // alert("are you sure?");
        // socket.disconnect();
      }
    // }

  },[]);

  const leavebtn = () => {
    console.log("leaving");
    // console.log(socket);
    leave();
    navigate('/');
  }

  const onSend = ()=>{
    console.log("sending...");
    console.log(message);
    send(message);
    // setMessage('');
  }

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
        <div>
          <button className={styles.leavebtn} onClick={()=>leavebtn()}>Leave</button>
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
            <button id={styles.send} onClick={onSend}>&gt;</button>
            <div className={styles.divider}></div>
            <input type={styles.text} value={message} onChange={(e)=>setMessage(e.target.value)} id={styles.message}/>
        </div>
    </div>
    </div>
  )
}

export default ChatRoom
