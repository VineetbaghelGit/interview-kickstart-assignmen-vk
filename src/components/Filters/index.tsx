import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'; // Importing custom dropdown arrow icon
import SearchIcon from '@mui/icons-material/Search'; // Importing Search icon from Material-UI
import {Box, FormControl, IconButton, InputBase, MenuItem} from '@mui/material'; // Importing Material-UI components
import Select, {type SelectChangeEvent} from '@mui/material/Select'; // Importing Select component and type from Material-UI
import {type FiltersPropsTypes} from 'configs/appTypes'; // Importing FiltersPropsTypes type
import {useWebinarContext} from 'context/WebinarContext'; // Importing custom hook for Webinar context
import React, {useEffect, useState} from 'react';

/**
 * Filters component for filtering webinars by search query and topic.
 *
 * @param {FiltersPropsTypes} props - The props for the Filters component.
 * @returns {JSX.Element} The rendered Filters component.
 */
function Filters({
  searchQuery,
  setSearchQuery,
  selectedTopic,
  setSelectedTopic,
}: Readonly<FiltersPropsTypes>): JSX.Element {
  const {allWebinarDatas} = useWebinarContext(); // Destructuring context values
  const [topicsList, setTopicsList] = useState<string[]>([]); // State for the list of topics
  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState<string>(searchQuery); // State for the debounced search query

  // Effect to extract unique topics from the webinar data
  useEffect(() => {
    if (allWebinarDatas) {
      const uniqueTopics = Array.from(
        new Set(allWebinarDatas.map(data => data.topics)),
      );
      setTopicsList(uniqueTopics);
    }
  }, [allWebinarDatas]);

  // Effect to debounce the search query input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(debouncedSearchQuery);
    }, 500);

    return () => {
      clearTimeout(handler); // Cleanup the timeout on unmount or when debouncedSearchQuery changes
    };
  }, [debouncedSearchQuery, setSearchQuery]);

  /**
   * Handles the change in the selected topic.
   *
   * @param {SelectChangeEvent<string>} event - The event triggered on changing the selected topic.
   */
  const handleTopicChange = (event: SelectChangeEvent<string>): void => {
    setSelectedTopic(event.target.value);
  };

  /**
   * Handles the change in the search input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} event - The event triggered on changing the search input.
   */
  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setDebouncedSearchQuery(event.target.value);
  };

  return (
    <Box
      className="filter_container"
      sx={{
        margin: '30px 0px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}>
      <Box
        className="search_container"
        sx={{
          border: '1px solid #E3E7EC',
          borderRadius: '10px',
          height: '45px',
          width: '31%',
          display: 'flex',
          justifyContent: 'start',
        }}>
        <IconButton type="button" sx={{p: '10px'}} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          onChange={handleSearchChange}
          value={debouncedSearchQuery}
          sx={{ml: 1, flex: 1, fontSize: '14px'}}
          placeholder="Search for webinar"
          inputProps={{'aria-label': 'Search for webinar'}}
        />
      </Box>
      <Box
        className="select_box_container"
        sx={{
          width: '20%',
        }}>
        <FormControl
          sx={{
            width: '100%',
            border: '1px solid #E3E7EC',
            borderRadius: '10px',
            height: '45px',
          }}>
          <Select
            sx={{
              border: '1px solid #E3E7EC',
              borderRadius: '10px',
              height: '45px',
              boxShadow: 'none',
              fontSize: '14px',
            }}
            value={selectedTopic}
            onChange={handleTopicChange}
            IconComponent={KeyboardArrowDownIcon} // Custom icon for dropdown
            inputProps={{'aria-label': 'Topic selector'}}>
            <MenuItem value="All" sx={{fontSize: '14px'}}>
              Topic
            </MenuItem>
            {topicsList.map(topic => (
              <MenuItem key={topic} value={topic} sx={{fontSize: '14px'}}>
                {topic}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Filters;
