/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {Grid, Typography} from '@mui/material'; // Importing Material-UI components
import AppCard from 'components/AppCard'; // Importing AppCard component
import Filters from 'components/Filters'; // Importing Filters component
import Header from 'components/Header'; // Importing Header component
import {type WebinarDetailsType} from 'configs/appTypes'; // Importing WebinarDetailsType type
import {useWebinarContext} from 'context/WebinarContext'; // Importing custom hook for Webinar context
import React, {useEffect, useState} from 'react';

/**
 * Home component to display the list of webinars with filtering options.
 *
 * @returns {JSX.Element} The rendered Home component.
 */
function Home(): JSX.Element {
  // Destructuring context values
  const {showWebinarData, setShowWebinarData, allWebinarDatas} =
    useWebinarContext();

  // State for search query
  const [searchQuery, setSearchQuery] = useState<string>('');
  // State for selected topic
  const [selectedTopic, setSelectedTopic] = useState<string>('All');

  /**
   * Filters webinars based on search query and selected topic.
   *
   * @param {WebinarDetailsType[]} webinars - Array of webinar details.
   * @param {string} query - Search query string.
   * @param {string} topic - Selected topic for filtering.
   * @returns {WebinarDetailsType[]} Filtered array of webinar details.
   */
  const filterWebinars = (
    webinars: WebinarDetailsType[],
    query: string,
    topic: string,
  ): WebinarDetailsType[] => {
    const lowerCaseQuery = query.toLowerCase(); // Convert query to lowercase for case-insensitive search
    return webinars.filter(webinar => {
      // Check if any property of the webinar matches the search query
      const matchesSearchQuery = Object.values(webinar).some(
        value =>
          typeof value === 'string' &&
          value.toLowerCase().includes(lowerCaseQuery),
      );
      // Check if the webinar matches the selected topic
      const matchesTopic = topic === 'All' || webinar.topics === topic;
      return matchesSearchQuery && matchesTopic;
    });
  };

  // useEffect to update the displayed webinars when search query or selected topic changes
  useEffect(() => {
    let updatedWebinars = filterWebinars(
      allWebinarDatas,
      searchQuery,
      selectedTopic,
    );

    // Show all webinars if no search query and no specific topic selected
    if (searchQuery === '' && selectedTopic === 'All') {
      updatedWebinars = allWebinarDatas;
    }

    // Update the context with filtered webinars
    setShowWebinarData(updatedWebinars);
  }, [searchQuery, selectedTopic, setShowWebinarData]);

  return (
    <React.Fragment>
      {/* Header component */}
      <Header />
      {/* Filters component with props for search query and topic selection */}
      <Filters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
      />
      <Grid container spacing={3} sx={{mb: 5}}>
        {showWebinarData?.length > 0 ? (
          // Map through the filtered webinars and render an AppCard for each
          showWebinarData?.map((webinar, index) => {
            return (
              <Grid key={webinar.id} item sm={6} md={4}>
                <AppCard singleWebinarDetail={webinar} index={index} />
              </Grid>
            );
          })
        ) : (
          // Show a message if no webinars are available
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
