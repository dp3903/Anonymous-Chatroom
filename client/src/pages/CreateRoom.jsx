import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import {
  Box,
  VStack,
  Heading,
  Input,
  Button,
  Container,
  List,
  ListItem,
  ListIcon,
  FormControl,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react'
import { InfoIcon } from 'lucide-react'

function CreateRoom() {

  const navigate = useNavigate();
  const toast = useToast();

  const [room,setRoom] = useState('');
  const [user,setUser] = useState('');
  const [error,setError] = useState('');

  const handleBack = () => {
    navigate(-1); // Goes to the previous page in the browser history
  };

  const create = (event) => {
    event.preventDefault();
    let data = {
      name: room,
      creator: user
    };

    // fetch('https://anonymous-chatroom-server.vercel.app/createRoom',   //production
    fetch('http://localhost:3000/AnonymousChatroom/createRoom',  //development
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
        e = JSON.parse(e);
        setError(e.error);
        toast({
          title: "An error occurred.",
          description: "Unable to join chatroom. "+e.error,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
        console.log("Error: ");
        console.log(e);
      }
    );
  }

  const bgColor = 'rgb(25,25,25)'
  const headerBgColor = 'rgb(87, 39, 163)'
  const contentBgColor = 'black'

  return (
    <Box minHeight="100vh" bg={bgColor} display="flex" flexDirection="column">
      <Box as="header" bg={headerBgColor} py={4} px={6} mb={8}>
        <Heading as="h1" size="xl" color="white" textAlign="center">
          Anonymous Chatroom
        </Heading>
      </Box>

      <Container color='white' maxW="container.md" flex={1}>
        <VStack
          spacing={6}
          align="stretch"
          bg={contentBgColor}
          p={8}
          borderRadius="lg"
          boxShadow="md"
        >
          <Heading as="h2" size="lg" textAlign="center">
            Create a Room
          </Heading>

          <List spacing={3}>
            <ListItem>
              <ListIcon as={InfoIcon} color="blue.500" />
              The name you provide for the room must be unique.
            </ListItem>
            <ListItem>
              <ListIcon as={InfoIcon} color="blue.500" />
              Your privacy is our priority. As such none of your precious data will be stored after the room is deleted.
            </ListItem>
            <ListItem>
              <ListIcon as={InfoIcon} color="blue.500" />
              Room is automatically deleted after the last active member leaves group.
            </ListItem>
            <ListItem>
              <ListIcon as={InfoIcon} color="blue.500" />
              Room cannot be deleted by anyone as long as any member is active, not even by the creator.
            </ListItem>
          </List>

          <form onSubmit={create}>
            <VStack spacing={4}>
              <FormControl isInvalid={error !== ''}>
                <Input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  required
                  minLength={3}
                  maxLength={15}
                  placeholder="Enter Room Name"
                  size="lg"
                />
              </FormControl>

              <FormControl>
                <Input
                  type="text"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  required
                  minLength={3}
                  maxLength={15}
                  placeholder="Enter Your Name"
                  size="lg"
                />
              </FormControl>

              {error && (
                <FormErrorMessage>{error}</FormErrorMessage>
              )}

              <Box width="100%" display="flex" justifyContent="space-between">
                <Button colorScheme="blue" onClick={handleBack} size="lg" variant='outline' width="48%">
                  Back
                </Button>
                <Button bg='rgb(145, 83, 244)' size="lg" width="48%" type="submit">
                  Create and Join
                </Button>
              </Box>
              {error}
            </VStack>
          </form>
        </VStack>
      </Container>
    </Box>
  )
}

export default CreateRoom
