import React,{ useEffect } from 'react'
import styles from './joinRoom.module.css'

function JoinRoom() {


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
            <form action="#" id={styles.roomForm}>

                    <input type="text" required minLength="3" maxLength="15" placeholder="Enter Code" name="code" id={styles.code}/>
                    <input type="text" required minLength="3" maxLength="15" placeholder="Enter Your Name" name="code" id={styles.code}/>
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
