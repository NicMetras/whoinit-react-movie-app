import { List, ListItem, ListIcon } from '@chakra-ui/react';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ReactComponent as MovieIcon } from '../icons/movie.svg';
import { ReactComponent as ActorIcon } from '../icons/actor.svg';
import { ReactComponent as CastIcon } from '../icons/cast.svg';

const Sidebar = ({ videos }) => {
    return (
        <List color="white" fontSize="1.2em" spacing={4}>
            <ListItem>
                <ListIcon as={MovieIcon} />
                <NavLink to="/">
                    Movie Lookup
                </NavLink>
            </ListItem>
            <ListItem>
                <ListIcon as={ActorIcon} />
                <NavLink to="actor">
                    Actor Filmography
                </NavLink>
            </ListItem>
            <ListItem>
                <ListIcon as={CastIcon}  />
                <NavLink to="cast">
                    Lookup by Cast
                </NavLink>
            </ListItem>
          
        </List>
    );
}

export default Sidebar;
