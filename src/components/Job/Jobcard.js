import React from 'react';
import { Box, Grid, Typography, Button, makeStyles } from '@material-ui/core';
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInMonths, differenceInWeeks } from 'date-fns';



// const skills = ['Javascript', 'React', 'Node.js'];

const useStyles = makeStyles({
    wrapper: {
        border: "1px solid #e8e8e8",
        borderRadius: '6px',
        backgroundColor: 'rgba(63, 81, 181, 0.04)',
        cursor: 'pointer',
        transition: '.3s',
        "&:hover": {
            boxShadow: "0px 5px 25px rgba(0, 0, 0, 0.1)",
            borderLeft: "6px solid #4D64E4",
        },
    },
    companyName: {
        fontSize: '14px',
        backgroundColor: '#3f51b5',
        display: 'inline-block',
        borderRadius: ' 5px',
        color: 'white',
        margin: '4px',
        padding: '6px',
    },
    skillchip: {
        fontSize: '14px',
        backgroundColor: 'black',
        fontWeight: '600',
        borderRadius: ' 5px',
        color: 'white',
        margin: '4px',
        padding: '6px',
        transition: '.3s',



    }
})

const Jobcard = (props) => {
    const classes = useStyles()
    return (
        <Box p={2} mt={1} mb={1} className={classes.wrapper}>
            <Grid container alignItems='center'>
                <Grid item xs>
                    <Typography variant='subtitle1'>{props.title}</Typography>
                    <Typography variant='subtitle1' className={classes.companyName}>{props.companyName}</Typography>

                </Grid>
                <Grid item container xs>
                    {props.skills.map((skill) => (
                        <Grid className={classes.skillchip} key={skill} item>
                            {skill}
                        </Grid>
                    ))}
                </Grid>
                <Grid item container direction='column' alignItems='flex-end' xs>
                    <Grid item>
                        <Typography variant='caption'>

                            {
                                differenceInMinutes(Date.now(), props.postedOn) < 60 
                                ?differenceInMinutes(Date.now(), props.postedOn) + ' minutes ago'
                                :differenceInHours(Date.now(), props.postedOn) < 24
                                ?differenceInHours(Date.now(), props.postedOn) + ' hours ago'
                                :differenceInDays(Date.now(), props.postedOn) < 7
                                ?differenceInDays(Date.now(), props.postedOn) + ' days ago'
                                :differenceInWeeks(Date.now(), props.postedOn) < 5
                                ?differenceInWeeks(Date.now(), props.postedOn) + ' weeks ago'
                                :differenceInMonths(Date.now(), props.postedOn) + ' months ago'
                            }
                            
                            | {props.type} | {props.location}</Typography>
                    </Grid>
                    <Grid item>
                        <Box mt={2}>
                            <Button variant='outlined' color='primary'>Check</Button>
                        </Box>
                    </Grid>
                </Grid>

            </Grid>

        </Box>
    );
};

export default Jobcard;

