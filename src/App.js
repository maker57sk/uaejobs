import React, { useState, useEffect } from 'react';
import './App.css';
import { CircularProgress, Grid, Box } from '@material-ui/core';
import Jobcard from './components/Job/Jobcard';
import Header from './components/Header';
import SearchBar from './components/SearchBar'
import NewJobModule from './components/Job/NewJobModule';
// import jobData from './dummyData';
import { db, app } from './firebase/config';
function App() {

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newJobModule, setNewJobModule] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    const req = await db
      .collection('jobs')
      .orderBy('postedOn', 'desc')
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate()
    }));
    setJobs(tempJobs);
    setLoading(false);
  };

  const fetchJobCustom = async jobSearch => {

    setLoading(true);
    const req = await db
      .collection('jobs')
      .orderBy('postedOn', 'desc')
      .where("type", '==', jobSearch.type)
      .where("location", '==', jobSearch.location)
      .get();
    const tempJobs = req.docs.map((job) => ({
      ...job.data(),
      id: job.id,
      postedOn: job.data().postedOn.toDate()
    }));
    setJobs(tempJobs);
    setLoading(false);

  };


  const postJob = async jobDetails => {
    await db.collection('jobs').add({
      ...jobDetails,
      postedOn: new Date()
    })

    fetchJobs();
  }
  useEffect(() => {
    fetchJobs();
  }, []);


  return (
    <div >

      <Header openNewJobModule={() => setNewJobModule(true)} />
      <NewJobModule
        closeModule = {() => setNewJobModule(false)}
        newJobModule={newJobModule}
        postJob={postJob}
      />
      <Grid container justify='center'>
        <Grid item xs={10}>
          <SearchBar fetchJobCustom={fetchJobCustom} />
          {
            loading ? <Box display='flex' justifyContent='center'>
              <CircularProgress />
            </Box>

              : jobs.map(job =>
                (<Jobcard key={job.id} {...job} />))

          }


        </Grid>
      </Grid>


    </div>
  );
}

export default App;
