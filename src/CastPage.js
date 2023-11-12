// CastPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from './components/SearchBar';
import { Box, Image, Flex, Heading, Text, Button } from '@chakra-ui/react';

const CastPage = () => {
  const [actorInfo, setActorInfo] = useState([]);
  const [commonCredits, setCommonCredits] = useState([]);

  const getCredits = (id) => {
    const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=f7d8053162528c8cf06e6a45f4799108`;
    return axios
      .get(url)
      .then((res) => res.data.cast)
      .catch((err) => console.log(err));
  };

  const handleSearch = (newQuery) => {
    const url = `https://api.themoviedb.org/3/search/person?api_key=f7d8053162528c8cf06e6a45f4799108&query=${newQuery}`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.results.length > 0) {
          const id = res.data.results[0].id;
          const name = res.data.results[0].name;
          const profile_path = res.data.results[0].profile_path
            ? `https://image.tmdb.org/t/p/w500/${res.data.results[0].profile_path}`
            : 'https://www.placecage.com/200/300'; // Placeholder image if profile_path is not available

          return getCredits(id)
            .then((credits) => {
              const actor = {
                id,
                name,
                profile_path,
                credits,
              };
              setActorInfo([...actorInfo, actor]);

              // Update common credits
              updateCommonCredits();
            })
            .catch((err) => console.log('Error getting credits:', err));
        } else {
          console.log('No results found for query:', newQuery);
        }
      })
      .catch((err) => {
        console.log('Error making API call:', err);
      });
  };

  const handleClear = () => {
    setActorInfo([]);
    setCommonCredits([]);
  };

  const updateCommonCredits = () => {
    if (actorInfo.length > 1) {
      const commonCredits = actorInfo.reduce((prev, current) => {
        return prev.filter((credit) => current.credits.some((item) => item.id === credit.id));
      }, actorInfo[0].credits);

      setCommonCredits(commonCredits);
      
    }
  };

  const handleNewSearch = () => {
    // Logic for the new blue button click
    // Display only the movies that appear in all the credits for each actor
    if (actorInfo.length > 0) {
      const commonCredits = actorInfo.reduce((prev, current) => {
        return prev.filter((credit) => current.credits.some((item) => item.id === credit.id));
      }, actorInfo[0].credits);

      setCommonCredits(commonCredits);
      console.log(commonCredits);
    }
  };

  return (
    <div>
      <SearchBar placeholder="Add Actor to list.." handleSearch={handleSearch} />
      <Text pl="75px" color='white' fontSize='lg'>Add multiple Actors to list to search Movies they costarred in</Text>
      <Heading as='h2' pl="75px" color='white' size='xl'>Cast Search List:</Heading>
      <Flex wrap="wrap" justify="center">
        {actorInfo.map((actor, index) => (
          <Box key={index} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" m={4}>
            <Image src={actor.profile_path} alt={actor.name} />
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Box fontWeight="semibold" as="h4" lineHeight="tight" color='white'>
                  {actor.name}
                </Box>
              </Box>
            </Box>
          </Box>
        ))}
      </Flex>

      {/* Display buttons only if actor info is present */}
      {actorInfo.length > 0 && (
        <Flex justify="center" mt={4}>
          <Button colorScheme="blue" mr={2} onClick={handleNewSearch}>Search</Button>
          <Button colorScheme="red" onClick={handleClear}>Clear</Button>
        </Flex>
      )}

      {/* Display common credits in cards */}
      {commonCredits.length > 0 && (
        <Flex wrap="wrap" justify="center" mt={4}>
          {commonCredits.map((credit, index) => (
            <Box key={index} maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden" m={4}>
              <Image src={'https://image.tmdb.org/t/p/original/' + credit.poster_path} alt={credit.title} />
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Box fontWeight="semibold" as="h4" lineHeight="tight" color='white'>
                  {credit.title}
                 
                </Box>
                <Box fontWeight="semibold" as="h4" lineHeight="tight" color='white'>
                  {credit.release_date}
                </Box>
              </Box>
            </Box>
            </Box>
          ))}
        </Flex>
      )}
    </div>
  );
};

export default CastPage;
