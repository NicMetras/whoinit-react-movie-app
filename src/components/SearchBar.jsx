// SearchBar.js
import React, { useState } from "react";
import { Box, Button, FormControl, Input, Stack } from '@chakra-ui/react';

function SearchBar({ placeholder, handleSearch }) {
    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleButtonClick = (event) => {
        event.preventDefault();
        handleSearch(searchValue);
    };

    return (
        <Box minWidth={{lg: '100vw'}} pl="75px" pr="75px" pt="25px" pb="25px">
            <form>
                <FormControl>
                    <Stack spacing={10} direction='row'>
                        <Input width="700px" type='text' name='title' placeholder={placeholder} value={searchValue} onChange={handleInputChange} color="white" />
                        <Button colorScheme="blue" onClick={handleButtonClick}>Search</Button>
                    </Stack>
                </FormControl>
            </form>
        </Box>
    );
}

export default SearchBar;
