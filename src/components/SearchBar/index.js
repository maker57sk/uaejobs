/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from 'react';
import { Box, Button, Select, MenuItem, makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
    wrapper: {
        backgroundColor: '#fff',
        display: 'flex',
        boxShadow: '0px 1px 5px rgba(0,0,0,0.1)',
        borderRadius: '5px',
        '& > *': {
            flex: 1,
            height: '45px',
            margin: '15px'

        }
    }
})
export default (props) => {

    const [jobSearch, setJobSearch] = useState({

        type: 'Part Time',
        location: 'Remote',

    });

    const handleChange = e => {
        e.persist();
        setJobSearch((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }));
    };
    const search = async () =>{

       await props.fetchJobCustom(jobSearch);
    };

    const classes = useStyles()
    return (
        <Box p={2} mt={-5} mb={2} className={classes.wrapper}>
            <Select onChange={handleChange} value={jobSearch.type} name='type' disableUnderline variant='filled'>
                <MenuItem value='Full Time'>Full Time</MenuItem>
                <MenuItem value='Part Time'>Part Time</MenuItem>
                <MenuItem value='Contract'>Contract</MenuItem>
            </Select>
            <Select onChange={handleChange} value={jobSearch.location} name='location' disableUnderline variant='filled'>
                <MenuItem value='Remote'>Remote</MenuItem>
                <MenuItem value='In-Office'>In-Office</MenuItem>
            </Select>
            <Button onClick={ search } variant='contained' color='primary' disableElevation >
                Search
            </Button>
        </Box>
    );
};

