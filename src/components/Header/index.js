import React from 'react';
import { Grid, Box, Typography, Button } from '@material-ui/core';




const index = (props) => {
    return (
        <Box
            py={20}
            bgcolor='black'
            color='white'
        >
            <Grid
                container
                justify='center'
            >
                <Grid
                    item
                    xs={10}
                >
                    <Box
                        display='flex'
                        justifyContent='space-between'
                    >
                        <Typography variant='h4'>Open Job Listing</Typography>


                        <Button
                            onClick= { props.openNewJobModule }
                            variant='contained'
                            color='primary'
                            disableElevation>
                            Post a Job
                        </Button>


                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default index;