import React from 'react'
import {Link} from 'react-router-dom'


import { Box, VStack, Heading, Button, Container } from '@chakra-ui/react'

function Home() {
    const bgColor = 'rgb(25,25,25)'
    const headerBgColor = 'rgb(87, 39, 163)'
    const buttonColorScheme = 'rgb(145, 83, 244)'

  return (
    <Box minHeight="100vh" bg={bgColor} display="flex" flexDirection="column">
      <Box as="header" bg={headerBgColor} py={4} px={6} mb={8}>
        <Heading as="h1" size="xl" color="white" textAlign="center">
          Anonymous Chatroom
        </Heading>
      </Box>
      <Container maxW="container.sm" flex={1} display="flex" alignItems="center">
        <VStack spacing={6} width="100%">
          <Link to="/joinRoom" style={{ width: '100%' }}>
            <Button
              bg={buttonColorScheme}
              size="lg"
              width="100%"
              height="60px"
              fontSize="xl"
            >
              Join a Chatroom
            </Button>
          </Link>
          <Link to="/createRoom" style={{ width: '100%' }}>
            <Button
                colorScheme='blue'
              size="lg"
              width="100%"
              height="60px"
              fontSize="xl"
              variant="outline"
            >
              Create a Chatroom
            </Button>
          </Link>
        </VStack>
      </Container>
    </Box>
  )
}

export default Home
