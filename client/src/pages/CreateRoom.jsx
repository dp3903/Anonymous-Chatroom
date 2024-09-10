import React,{ useEffect } from 'react'
import styles from './createRoom.module.css'

function CreateRoom() {


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
        <form action="#" id={styles.roomForm}>

            <input type="text" required minLength="3" maxLength="15" placeholder="Enter Room Name" name="code" id={styles.code}/>
            <input type="text" required minLength="3" maxLength="15" placeholder="Enter User Name" name="code" id={styles.code}/>
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
