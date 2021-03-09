import React, { useState } from 'react';
import skills from './skills';
import {
    Box,
    Grid,
    Dialog,
    DialogTitle,
    DialogContent,
    FilledInput,
    Select,
    MenuItem,
    makeStyles,
    Typography,
    DialogActions,
    Button,
    IconButton,
} from '@material-ui/core';

import { Close as CloseIcon } from '@material-ui/icons'

const useStyles = makeStyles({
    skillchip: {
        fontSize: '14px',
        border: '1px solid black',
        fontWeight: '600',
        borderRadius: ' 5px',
        color: 'black',
        margin: '4px',
        padding: '6px',
        cursor: 'pointer',

        "&:hover": {
            backgroundColor: 'black',
            color: 'white',
        },

    },

    included: {
        backgroundColor: 'black',
        color: 'white',
    }

})

const initSate = {
    title: '',
    type: 'Full Time',
    location: 'Remote',
    companyName: '',
    companyUrl: '',
    skills: [],
    link: '',
    description: '',
}
const NewJobModule = (props) => {
    // const [loading, setLoading] = useState(true);
    const [jobDetails, setJobDetails] = useState(initSate);

    const handleChange = e => {
        e.persist();
        setJobDetails((oldState) => ({
            ...oldState,
            [e.target.name]: e.target.value,
        }));
    };

    const addRemoveSkill = (skill) => {
        jobDetails.skills.includes(skill)
            ? setJobDetails(oldState => ({
                ...oldState,
                skills: oldState.skills.filter(lastskill => lastskill !== skill),
            }))
            : setJobDetails(oldState => ({
                ...oldState,
                skills: oldState.skills.concat(skill)
            }))
    }

    const handleSubmit = async () => {

        for (const field in jobDetails){
            if(typeof jobDetails[field] == 'string' && !jobDetails[field]) 
            return;
        }
        if(!jobDetails.skills.length) return;
        // setLoading(true);
        await props.postJob(jobDetails);
        closeModal();
    };

    const closeModal = () => {
        setJobDetails(initSate);
        // setLoading(false);
        props.closeModule();
        
    };

    const classes = useStyles();

    console.log(jobDetails);
    return (
        <div>
            <Dialog open={props.newJobModule} fullWidth>
                <DialogTitle >
                    <Box
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        Post Job
                 <IconButton onClick={closeModal}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <FilledInput
                                onChange={handleChange}
                                name='title'
                                value={jobDetails.title}
                                autoComplete='off'
                                placeholder='Job title*'
                                disableUnderline
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6} >
                            <Select
                                onChange={handleChange}
                                fullWidth
                                name='type'
                                value={jobDetails.type}
                                disableUnderline
                                variant='filled'
                            // defaultValue='Full Time'
                            >
                                <MenuItem value='Full Time'>Full Time</MenuItem>
                                <MenuItem value='Part Time'>Part Time</MenuItem>
                                <MenuItem value='Contract'>Contract</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <FilledInput
                                onChange={handleChange}
                                name='companyName'
                                value={jobDetails.companyName}
                                placeholder='Company name*'
                                disableUnderline
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <FilledInput
                                onChange={handleChange}
                                name='companyUrl'
                                value={jobDetails.companyUrl}
                                autoComplete='off'
                                placeholder='Company Url*'
                                disableUnderline
                                fullWidth />
                        </Grid>
                        <Grid item xs={6} >
                            <Select
                                onChange={handleChange}
                                fullWidth
                                name='location'
                                value={jobDetails.location}
                                disableUnderline
                                variant='filled'
                            // defaultValue='Remote'
                            >
                                <MenuItem value='Remote'>Remote</MenuItem>
                                <MenuItem value='In-office'>In-office</MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={6}>
                            <FilledInput
                                onChange={handleChange}
                                name='link'
                                value={jobDetails.link}
                                autoComplete='off'
                                placeholder='Job link*'
                                disableUnderline
                                fullWidth />
                        </Grid>
                        <Grid item xs={12}>
                            <FilledInput
                                onChange={handleChange}
                                name='description'
                                value={jobDetails.description}
                                autoComplete='off'
                                placeholder='Job description*'
                                disableUnderline
                                fullWidth
                                multiline
                                rows={4}
                            />
                        </Grid>




                    </Grid>
                    <Box mt={2}>
                        <Typography>Skills*</Typography>
                        <Box display='flex'>
                            {skills.map((skill) => (
                                <Box
                                    onClick={() => addRemoveSkill(skill)}
                                    className={`${classes.skillchip} ${jobDetails.skills.includes(skill) && classes.included}`}
                                    key={skill}>{skill}
                                </Box>
                            ))}
                        </Box>

                    </Box>

                </DialogContent>
                <DialogActions>
                    <Box
                        color='red'
                        width="100%"
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                    >
                        <Typography variant='caption'>*Requierd fields</Typography>
                        <Button
                            onClick={handleSubmit}
                            variant='contained'
                            color='primary'
                            disableElevation
                            
                        >
                            Post Job
                        </Button>
                    </Box>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default NewJobModule;