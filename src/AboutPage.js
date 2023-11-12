// About.js
import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const About = () => {
  return (
    <Box maxW="800px" mx="auto" mt="8">
      
      <Text fontSize="lg" mb="4" color="white">
        Welcome to the Whoinit App, a platform for searching and exploring information about movies and actors.
      </Text>

      <Heading as="h2" size="lg" mt="6" mb="4" color="white">
        Description
      </Heading>
      <Text color="white">
        Whoinit is a web application that allows users to search for movies and actors using the extensive database provided by The Movie Database (TMDb). It provides detailed information about movies, including cast members, and offers insights into actors' filmographies.
      </Text>

      <Heading as="h2" size="lg" mt="6" mb="4" color="white">
        Features
      </Heading>
      <Text color="white">
        <ul>
          <li>Search for movies and actors</li>
          <li>View detailed information about movies</li>
          <li>Explore cast members of movies</li>
          <li>Access information about actors and their filmographies</li>
        </ul>
      </Text>

      <Heading as="h2" size="lg" mt="6" mb="4" color="white">
        Technologies Used
      </Heading>
      <Text color="white">
        <ul>
          <li>React</li>
          <li>JavaScript</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>Axios</li>
          <li>The Movie Database (TMDb) API</li>
        </ul>
      </Text>

      <Heading as="h2" size="lg" mt="6" mb="4" color="white">
        Usage
      </Heading>
      <Text color="white">
        <ul>
          <li>Enter the name of a movie or an actor in the search bar and click "Submit" to retrieve relevant information.</li>
          <li>Explore the cast members and movie details on the respective pages.</li>
        </ul>
      </Text>
    </Box>
  );
};

export default About;
