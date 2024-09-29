import React, { useState,useEffect,useRef } from 'react'
import { useLocation,useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { FiLogOut } from 'react-icons/fi';
import {
  Box,
  Flex,
  VStack,
  Heading,
  Text,
  Button,
  Input,
  List,
  ListItem,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
} from '@chakra-ui/react';
import { Menu as MenuIcon, Send as SendIcon } from 'lucide-react';


function ChatRoom() {
  const [error,setError] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, sender: 'User2', data: 'Hello everyone!' },
    { id: 2, sender: 'User1', data: 'Hi there!' },
    { id: 3, sender: 'User3', data: 'How are you all doing?' },
    { id: 4, sender: 'User4', data: 'I\'m doing well, thanks for asking!' },
    { id: 5, sender: 'User5', data: 'Good afternoon!' },
    { id: 6, sender: 'User2', data: 'Has anyone seen the new movie?' },
    { id: 7, sender: 'User3', data: 'Not yet, but I heard it\'s great!' },
    { id: 8, sender: 'User1', data: 'I watched it yesterday. Amazing plot!' },
    { id: 9, sender: 'User4', data: 'What\'s it called?' },
    { id: 10, sender: 'User5', data: 'It\'s called "The Final Hour".' },
    { id: 11, sender: 'User2', data: 'I\'ll check it out this weekend!' },
    { id: 12, sender: 'User1', data: 'Same here. Looks interesting.' },
    { id: 13, sender: 'User3', data: 'Anyone up for a game later?' },
    { id: 14, sender: 'User5', data: 'Count me in!' },
    { id: 15, sender: 'User4', data: 'I might join, depends on my work.' },
    { id: 16, sender: 'User2', data: 'I\'ll be free after 6 PM.' },
    { id: 17, sender: 'User1', data: 'Let\'s aim for 7 PM then?' },
    { id: 18, sender: 'User3', data: '7 PM sounds good to me.' },
    { id: 19, sender: 'User5', data: 'Alright, see you all at 7!' },
    { id: 20, sender: 'User4', data: 'Looking forward to it!' }
  ]
  );
  const [members, setMembers] = useState([]);
  const [roomName, setRoomName] = useState('RoomName');
  const [leave,setLeave] = useState(()=>()=>{});
  const [send,setSend] = useState(()=>()=>{});
  const { isOpen, onOpen, onClose } = useDisclosure()

  const bgColor = 'rgb(25,25,25)'
  const headerBgColor = 'rgb(87, 39, 163)'
  const sidebarBgColor = 'rgb(30,30,30)'
  const inputBgColor = 'gray.800'
  const selfMessageBgColor = 'rgb(145, 83, 244)'
  const otherMessageBgColor = 'rgb(50,50,50)'

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
    console.log("bg="+bgColor);
    console.log("self="+selfMessageBgColor);
    console.log("other="+otherMessageBgColor);
  }, [messages]);

  const location = useLocation();
  const { user,roomId } = location.state || {user:"User1",roomId:"123456"};
  const navigate = useNavigate();

  useEffect(()=>{
    
      // const socket = io('https://anonymous-chatroom-server.vercel.app', //production
      const socket = io('http://localhost:3000', //development
      // const socket = io('http://192.168.155.35:3000', //development
      {
        query: {
          user,
          roomId
        },
        autoConnect: false,
      });

      // if(!location.state){
      //   navigate('/');
      // }

      // console.log(user);
      // console.log(roomId);
      // fetch(`https://anonymous-chatroom-server.vercel.app/AnonymousChatroom/getRoomById?roomId=${roomId}`,  //production
      fetch(`http://localhost:3000/AnonymousChatroom/getRoomById?roomId=${roomId}`,  //development
      // fetch(`http://192.168.155.35:3000/AnonymousChatroom/getRoomById?roomId=${roomId}`,  //development
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
          setRoomName(data.Room.name);
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
        // leavebtn();
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

  const onSend = (e)=>{
    e.preventDefault();
    console.log("sending...");
    console.log(message);
    send(message);
    // setMessages((messages) => [...messages, { id: 20, sender: 'User1', data: message }])
    setMessage('');
  }


  return (
    <Flex h="100vh" direction={{ base: 'column', md: 'row' }} bg={bgColor} color="white">
      {/* Sidebar for larger screens */}
      <Box
        display={{ base: 'none', md: 'block' }}
        w={{ md: '300px' }}
        bg={sidebarBgColor}
        p={4}
        boxShadow={'4px 0 10px black'}
      >
        <SidebarContent
          roomName={roomName}
          roomId={roomId}
          members={members}
          leavebtn={leavebtn}
        />
      </Box>

      {/* Main chat area */}
      <Flex flex={1} direction="column">
        <Box bg={headerBgColor+'!important'} p={4} color="white" boxShadow={'0 4px 10px black'}>
          <Flex justify="space-between" align="center">
            <Heading size="md">{roomName}</Heading>
            <IconButton
              icon={<MenuIcon />}
              aria-label="Open menu"
              display={{ base: 'block', md: 'none' }}
              onClick={onOpen}
              variant="outline"
              colorScheme="whiteAlpha"
            />
          </Flex>
        </Box>
        <VStack flex={1} overflowY="auto" p={4} scrollBehavior={'smooth'} spacing={4} align="stretch" css="
          &::-webkit-scrollbar {
            width: 8px;
          }
          &::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 4px;
          }
          &::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.2);
            border-radius: 4px;
          }
          &::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.3);
          }
          /* For Firefox */
          * {
            scrollbar-width: thin;
            scrollbar-color: rgba(255, 255, 255, 0.2) rgba(0, 0, 0, 0.1);
          }
        ">
          {messages.map((item) => (
            <Box
              key={item.id}
              alignSelf={item.sender === user ? 'flex-end' : 'flex-start'}
              bg={item.sender === user ? selfMessageBgColor : otherMessageBgColor}
              p={2}
              borderRadius={item.sender === user ? "8px 8px 0 8px" : "8px 8px 8px 0"}
              borderLeft={item.sender == user ? 'none' : '4px solid'}
              borderRight={item.sender != user ? 'none' : '4px solid'}
              borderBottom={'8px solid'}
              borderColor={bgColor}
              borderBottomColor={item.sender === user ? selfMessageBgColor : otherMessageBgColor}
              maxW="70%"
              // boxShadow={item.sender === user ? '-4px 4px 20px black' : '4px 4px 20px black'}
            >
              <Text>{item.data}</Text>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </VStack>
        <form onSubmit={onSend}>
          <Flex p={4} bg={inputBgColor} boxShadow={'0 -4px 10px black'}>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              mr={2}
              bg={inputBgColor}
              border="1px solid"
              borderColor="gray.600"
              _focus={{ borderColor: 'blue.500' }}
              />
            <Button type='submit' onClick={onSend} colorScheme="blue">
              <SendIcon size={20} />
            </Button>
          </Flex>
        </form>
      </Flex>

      {/* Sidebar drawer for mobile */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={sidebarBgColor} color="white">
          <DrawerCloseButton />
          <DrawerHeader>Room Information</DrawerHeader>
          <DrawerBody>
            <SidebarContent
              roomName={roomName}
              roomId={roomId}
              members={members}
              leavebtn={leavebtn}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  )
}

function SidebarContent({ roomName, roomId, members, leavebtn }) {
  return (
    <VStack align="stretch" spacing={4}>
      
      <Flex justifyContent={'space-around'} alignItems={'center'} width={'100%'}>
        <Heading size="md">Anonymous Chatroom</Heading>
        <IconButton
          aria-label="Leave Room"
          icon={<FiLogOut />} // Icon representing "Leave"
          onClick={() => leavebtn()} // Call the leave function
          colorScheme="white" // Optional: Set color scheme to red to indicate danger/exit
          variant='outline'
          width={'fit-content'}
        />  
      </Flex>
      <Text fontWeight="bold">{roomName}</Text>
      <Text>Code: {roomId}</Text>
      <Heading size="sm">Users:</Heading>
      <List spacing={2}>
        {members.map((item) => (
          <ListItem key={item}>{item}</ListItem>
        ))}
      </List>
    </VStack>
  )
}

export default ChatRoom
