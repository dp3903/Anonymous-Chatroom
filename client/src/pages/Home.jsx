import React,{ useEffect } from 'react'
import {Link} from 'react-router-dom'
import styles from './Home.module.css'

function Home() {


  return (
    <div className={styles.body}>
        <div className={styles.header}>
            <b>
                Anonymous Chatroom
            </b>
        </div>
        <div className={styles.content}>
            <Link to='/joinRoom'>
                <button className={styles.joinroom} content="Join a Chatroom">Join a Chatroom</button>
            </Link>
            <Link to='/createRoom'>
                <button className={styles.createroom} content="Create a Chatroom">Create a Chatroom</button>
            </Link>
        </div>
    </div>
  )
}

export default Home
