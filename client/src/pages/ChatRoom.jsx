import React from 'react'
import styles from './ChatRoom.module.css'

function ChatRoom() {
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
            My Room-123
        </div>
        <div className={styles.roomcode}>
            Code: Ab12xY2
        </div>
        <h3 className={styles.userheader}>
            Users:
        </h3>
        <ul className={styles.users}>
            <li className={styles.user}>u1</li>
            <li className={styles.user}>u2</li>
            <li className={styles.user}>u3</li>
            <li className={styles.user}>u4</li>
            <li className={styles.user}>u5</li>
            <li className={styles.user}>u5</li>
            <li className={styles.user}>u5</li>
            <li className={styles.user}>u5</li>
            <li className={styles.user}>u5</li>
            <li className={styles.user}>u5</li>
            <li className={styles.user}>u5</li>
        </ul>
    </div>
    <div className={styles.chatpanel}>
        <div className={styles.chats} id={styles.chats}>
            <div className={styles.self}>
                Hey, did you catch the game last night?
              </div>
              <div className={styles.other}>
                No, I missed it. How did it go?
              </div>
              <div className={styles.self}>
                It was intense! Went into overtime and we won by a buzzer-beater.
              </div>
              <div className={styles.other}>
                Wow, that sounds exciting! I wish I could've seen it.
              </div>
              <div className={styles.self}>
                Yeah, it was one of those games you don't forget easily.
              </div>
              <div className={styles.self}>
                By the way, have you decided on your vacation plans yet?
              </div>
              <div className={styles.other}>
                Not yet. I'm still looking at a few options.
              </div>
              <div className={styles.other}>
                Do you have any recommendations?
              </div>
              <div className={styles.self}>
                Well, I've heard great things about Italy if you're into history and culture.
              </div>
              <div className={styles.self}>
                Or if you prefer something more adventurous, Iceland is amazing for outdoor activities.
              </div>
              <div className={styles.other}>
                Both sound fantastic! I'll definitely consider them. Thanks!
              </div>
              <div className={styles.other}>
                Speaking of vacations, have you ever been to Southeast Asia?
              </div>
              <div className={styles.self}>
                No, not yet. What's it like there?
              </div>
              <div className={styles.other}>
                It's incredible! The beaches, the food, the temples—everything is so vibrant and rich in culture.
              </div>
              <div className={styles.self}>
                That sounds amazing! Any particular country you recommend?
              </div>
              <div className={styles.other}>
                Thailand is a must-visit for its beaches and bustling markets. Vietnam is great for its history and landscapes too.
              </div>
              <div className={styles.self}>
                I'll definitely add them to my list. Thanks for the tips!
              </div>
                            
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
