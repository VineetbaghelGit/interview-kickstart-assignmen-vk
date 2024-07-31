/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {Grid, Typography} from '@mui/material';
import AppCard from 'components/AppCard';
import Filters from 'components/Filters';
import Header from 'components/Header';
import {type WebinarDetailsType} from 'configs/appTypes';
import {useWebinarContext} from 'context/WebinarContext';
import WebinarDetails from 'data/WebinarDetails';
import React, {useEffect, useState} from 'react';

function Home(): JSX.Element {
  const {webinarData, setWebinarData} = useWebinarContext();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');

  const filterWebinars = (
    webinars: WebinarDetailsType[],
    query: string,
    topic: string,
  ): WebinarDetailsType[] => {
    const lowerCaseQuery = query.toLowerCase();
    return webinars.filter(webinar => {
      const matchesSearchQuery = Object.values(webinar).some(
        value =>
          typeof value === 'string' &&
          value.toLowerCase().includes(lowerCaseQuery),
      );
      const matchesTopic = topic ? webinar.topics === topic : true;
      return matchesSearchQuery && matchesTopic;
    });
  };

  useEffect(() => {
    let updatedWebinars = filterWebinars(
      WebinarDetails,
      searchQuery,
      selectedTopic,
    );

    if (searchQuery === '' && selectedTopic === 'All') {
      updatedWebinars = WebinarDetails;
    }

    setWebinarData(updatedWebinars);
  }, [searchQuery, selectedTopic, setWebinarData]);
  return (
    <React.Fragment>
      <Header />
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
      />
      <Grid container spacing={3}>
        {webinarData.length > 0 ? (
          webinarData.map((webinar, index) => {
            return (
              <Grid key={webinar.id} item sm={6} md={4}>
                <AppCard singleWebinarDetail={webinar} index={index} />
              </Grid>
            );
          })
        ) : (
          <Typography
            variant="h5"
            component="p"
            sx={{
              mt: '60px',
              fontSize: '24px',
              fontWeight: '550',
              lineHeight: '24px',
              color: '#0E51F1',
              textAlign: 'center',
              width: '100%',
            }}>
            No webinars available
          </Typography>
        )}
      </Grid>
    </React.Fragment>
  );
}

export default Home;
