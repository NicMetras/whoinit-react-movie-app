import React, { useState, useEffect } from 'react';
import SearchBar from "./components/SearchBar";

import axios from 'axios';
import './App.css';
import { SimpleGrid, Card, CardBody, Image, Stack, Heading, Text, useToast, Flex, Box, CloseButton, HStack } from '@chakra-ui/react';


const ActorPage = () => {
  const [query, setQuery] = useState('');
  const [actorId, setActorId] = useState('');
  const [actorName, setActorName] = useState('');
  const [credits, setCredits] = useState([]);

  const toast = useToast();

  const showToast = (actor) => {
    toast({
      duration: null,
      render: () => (
        <Box p={4} color="white" bg="#2272FF" borderRadius="md" position="relative">
          <Flex align="center">
            <Image src={`https://image.tmdb.org/t/p/original/${actor.profile_path}`} alt={actor.name} boxSize="150px" objectFit="cover" />
            <Stack ml={4}>
              <Heading size='md'>{actor.name}</Heading>
            </Stack>
          </Flex>
          <Box position="absolute" top="6px" right="6px">
            <CloseButton onClick={() => {
              window.location.reload();
            }} />
          </Box>
        </Box>
      ),
    });
  };

  const getCredits = () => {
    const url =
      'https://api.themoviedb.org/3/person/' +
      actorId +
      '/movie_credits?api_key=f7d8053162528c8cf06e6a45f4799108';

    axios
      .get(url)
      .then((res) => {
        console.log(res.data.cast);
        setCredits(res.data.cast);
      })
      .catch((err2) => {
        console.log(err2);
      });
  };

  useEffect(() => {
    if (actorId) {
      getCredits();
    }
  }, [actorId]);

  

  const handleSearch = (value) => {
    toast.closeAll();
    const url =
      'https://api.themoviedb.org/3/search/person?api_key=f7d8053162528c8cf06e6a45f4799108&query=' +
      value;
    axios
      .get(url)
      .then((res) => {
        setActorId(res.data.results[0].id);
        setActorName(res.data.results[0].name);
        showToast(res.data.results[0]);
        
      })
      .catch((err) => {
        console.log(err);
      });
    setQuery('value');
  };

  return (
    <div> 
        <SearchBar placeholder="Enter an Actor's name.." handleSearch={handleSearch} />
        <SimpleGrid spacing={10} minChildWidth="200px">
        {credits && credits.map(movie => (
          <Card key={movie.id}>
            <CardBody>
              <Image
                src={'https://image.tmdb.org/t/p/original/' + movie.poster_path}
                alt={movie.title}
                boxSize="200px"
                objectFit="cover"
                borderRadius='lg'
              />
              <Stack mt='6' spacing='3'>
                <Heading size='md'>{movie.title}</Heading>
                <Text>{movie.release_date}</Text>
                <Text>{movie.character}</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>

    </div>
  );
};

export default ActorPage;
