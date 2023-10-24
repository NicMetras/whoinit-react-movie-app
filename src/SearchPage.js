import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from "./components/SearchBar";
import { SimpleGrid, Card, CardBody, Image, Stack, Heading, Text, useToast, Flex, Box, CloseButton, HStack } from '@chakra-ui/react';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [movieId, setMovieId] = useState('');
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);

  const toast = useToast();

  const showToast = (movie) => {
    toast({
      duration: null,
      render: () => (
        <Box p={4} color="white" bg="#2272FF" borderRadius="md" position="relative">
          <Flex align="center">
            <Image src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt={movie.title} boxSize="150px" objectFit="cover" />
            <Stack ml={4}>
              <HStack>
              <Heading size='md'>{movie.title}</Heading>
              <Text>{movie.release_date}</Text>
              </HStack>
              <Text>{movie.overview}</Text>
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

  const getCast = () => {
    const getCasturl =
      'https://api.themoviedb.org/3/movie/' +
      movieId +
      '/credits?api_key=f7d8053162528c8cf06e6a45f4799108';
    axios
      .get(getCasturl)
      .then((result) => {
        console.log(result.data.cast);
        setCast(result.data.cast);
      })
      .catch((err2) => {
        console.log(err2);
      });
  };

  const getRelatedVids = () => {
    const getVidsurl =
      'https://api.themoviedb.org/3/movie/' +
      movieId +
      '/videos?api_key=f7d8053162528c8cf06e6a45f4799108';
    axios
      .get(getVidsurl)
      .then((result) => {
        console.log(result.data.results);
        setVideos(result.data.results);
      })
      .catch((err2) => {
        console.log(err2);
      });
  };


  useEffect(() => {
    if (movieId) {
      getCast();
      getRelatedVids();
    }
  }, [movieId]);

  const handleSearch = (value) => {
    toast.closeAll(); 
    const url =
      'https://api.themoviedb.org/3/search/movie?api_key=f7d8053162528c8cf06e6a45f4799108&query=' +
      value;
    axios
      .get(url)
      .then((res) => {
        setMovieId(res.data.results[0].id);
        showToast(res.data.results[0]); // Calling the showToast function on successful search
      })
      .catch((err) => {
        console.log(err);
      });
    setQuery(value);
  };

  return (
    <div>
      <SearchBar placeholder="Enter a Movie Title.." handleSearch={handleSearch} />
      <SimpleGrid spacing={10} minChildWidth="200px">
        {cast && cast.map(castItem => (
          <Card key={castItem.cast_id}>
            <CardBody>
              <Image
                src={'https://image.tmdb.org/t/p/original/' + castItem.profile_path}
                alt={castItem.name}
                boxSize="200px"
                objectFit="cover"
                borderRadius='lg'
              />
              <Stack mt='6' spacing='3'>
                <Heading size='md'>{castItem.name}</Heading>
                <Text>{castItem.character}</Text>
              </Stack>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
      
    </div>
  );
};

export default SearchPage;
