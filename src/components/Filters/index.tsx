import SearchIcon from '@mui/icons-material/Search';
import {Box, FormControl, IconButton, InputBase, MenuItem} from '@mui/material';
import Select, {type SelectChangeEvent} from '@mui/material/Select';
import {type FiltersPropsTypes} from 'configs/appTypes';
import {useWebinarContext} from 'context/WebinarContext';
import React, {useEffect, useState} from 'react';

function Filters({
  searchQuery,
  setSearchQuery,
  selectedTopic,
  setSelectedTopic,
}: Readonly<FiltersPropsTypes>): JSX.Element {
  const {allWebinarDatas} = useWebinarContext();
  const [topicsList, setTopicsList] = useState<string[]>([]);
  const [debouncedSearchQuery, setDebouncedSearchQuery] =
    useState<string>(searchQuery);

  useEffect(() => {
    if (allWebinarDatas) {
      const uniqueTopics = Array.from(
        new Set(allWebinarDatas.map(data => data.topics)),
      );
      setTopicsList(uniqueTopics);
    }
  }, [allWebinarDatas]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(debouncedSearchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [debouncedSearchQuery, setSearchQuery]);

  const handleTopicChange = (event: SelectChangeEvent<string>): void => {
    setSelectedTopic(event.target.value);
  };

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    setDebouncedSearchQuery(event.target.value);
  };

  return (
    <Box
      sx={{
        margin: '30px 0px',
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
      }}>
      <Box
        className="search_conatiner"
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
        className="select_box_conatiner"
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
              '&:hover': {
                boxShadow: 'none',
                border: 'none',
              },
            }}
            value={selectedTopic}
            onChange={handleTopicChange}
            inputProps={{'aria-label': 'Topic selector'}}>
            <MenuItem value="All" sx={{fontSize: '14px'}}>
              All Topics
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
