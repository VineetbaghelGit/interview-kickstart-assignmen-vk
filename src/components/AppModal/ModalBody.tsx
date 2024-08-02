/* eslint-disable @typescript-eslint/no-unsafe-argument */

import AddIcon from '@mui/icons-material/Add';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import {FormControl, Grid} from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import InputTextField from 'components/InputTextField';
import dayjs from 'dayjs';
import * as React from 'react';
const ModalBody = ({formValidation}: any): JSX.Element => {
  const [instructorImage, setInstructorImage] = React.useState<string | null>(
    null,
  );

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        const imageUrl = e.target?.result as string;
        setInstructorImage(imageUrl);
        formValidation.setFieldValue('image', imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  React.useEffect(() => {
    // Update image state if formValidation has image value
    setInstructorImage(formValidation.values.image || null);
  }, [formValidation.values.image]);

  return (
    <Box className="modal_body">
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': {m: 1, width: '28ch'},
        }}>
        {/* Instructor Details Section */}
        <Box
          className="instructor_details"
          sx={{display: 'flex', gap: '30px', padding: '14px 22px'}}>
          <PeopleAltOutlinedIcon sx={{color: '#444952', fontSize: '24px'}} />
          <Box sx={{flex: '1'}}>
            <Typography
              variant="h6"
              component="h2"
              sx={{fontSize: '18px', fontWeight: '550'}}>
              Instructor Details
            </Typography>
            <Grid container spacing={2} sx={{alignItems: 'center'}}>
              <Grid item md={6} className="form_inputs_grid">
                {/* Instructor Name Input */}
                <FormControl sx={{marginTop: '7px', display: 'block'}}>
                  <InputTextField
                    id="instructorName"
                    name="instructorName"
                    label="Instructor Name"
                    type="text"
                    required
                    value={formValidation.values.instructorName}
                    placeholder="Type the instructor name"
                    onChange={formValidation.handleChange}
                    onBlur={formValidation.handleBlur}
                    className="form_inputs"
                    size="small"
                    error={
                      (formValidation.touched.instructorName ?? false) &&
                      Boolean(formValidation.errors.instructorName)
                    }
                    helperText={
                      formValidation.touched.instructorName
                        ? formValidation.errors.instructorName
                        : undefined
                    }
                  />
                </FormControl>
                {/* Instructor Role Input */}
                <FormControl sx={{marginTop: '7px', display: 'block'}}>
                  <InputTextField
                    id="instructorRole"
                    name="instructorRole"
                    label="Instructor Role"
                    required
                    type="text"
                    placeholder="Type the instructor role"
                    value={formValidation.values.instructorRole}
                    onChange={formValidation.handleChange}
                    onBlur={formValidation.handleBlur}
                    className="form_inputs"
                    size="small"
                    error={
                      (formValidation.touched.instructorRole ?? false) &&
                      Boolean(formValidation.errors.instructorRole)
                    }
                    helperText={
                      formValidation.touched.instructorRole
                        ? formValidation.errors.instructorRole
                        : undefined
                    }
                  />
                </FormControl>
                {/* Instructor Company and Topics Inputs */}
              </Grid>
              <Grid item md={6} className="image_upload_grid">
                <Box>
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                      fontSize: '14px',
                      fontWeight: '550',
                      marginBottom: '10px',
                    }}>
                    Instructor Image
                  </Typography>
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      border: '1px dashed #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '10px',
                      cursor: 'pointer',
                    }}
                    component="label">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{display: 'none'}}
                    />
                    {instructorImage ? (
                      <img
                        src={instructorImage}
                        alt="Instructor"
                        style={{width: '100%', height: '100%'}}
                      />
                    ) : (
                      <Typography component="span" sx={{color: '#636973'}}>
                        <AddIcon sx={{fontSize: '40px', fontWeight: 'bold'}} />
                      </Typography>
                    )}
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{alignItems: 'center'}}>
              <Grid item md={6} className="form_inputs_grid">
                <FormControl
                  sx={{marginTop: '7px', display: 'block', flex: '1'}}>
                  <InputTextField
                    id="instructorCompany"
                    name="instructorCompany"
                    label="Instructor Company"
                    required
                    type="text"
                    placeholder="Type the instructor company"
                    value={formValidation.values.instructorCompany}
                    onChange={formValidation.handleChange}
                    onBlur={formValidation.handleBlur}
                    className="form_inputs"
                    size="small"
                    error={
                      (formValidation.touched.instructorCompany ?? false) &&
                      Boolean(formValidation.errors.instructorCompany)
                    }
                    helperText={
                      formValidation.touched.instructorCompany
                        ? formValidation.errors.instructorCompany
                        : undefined
                    }
                  />
                </FormControl>
              </Grid>
              {/* Instructor Name Input */}
              <Grid item md={6} className="form_inputs_grid topic_input">
                <FormControl sx={{display: 'block', flex: '1'}}>
                  <InputTextField
                    id="topics"
                    name="topics"
                    label="Topics"
                    required
                    type="text"
                    placeholder="Type the topics"
                    value={formValidation.values.topics}
                    onChange={formValidation.handleChange}
                    onBlur={formValidation.handleBlur}
                    className="form_inputs"
                    size="small"
                    error={
                      (formValidation.touched.topics ?? false) &&
                      Boolean(formValidation.errors.topics)
                    }
                    helperText={
                      formValidation.touched.topics
                        ? formValidation.errors.topics
                        : undefined
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* Webinar Details Section */}
        <Box
          className="instructor_details"
          sx={{
            display: 'flex',
            gap: '30px',
            margin: '10px 0px',
            padding: '14px 22px',
          }}>
          <VideoCameraBackOutlinedIcon
            sx={{color: '#444952', fontSize: '24px'}}
          />
          <Box sx={{flex: '1'}}>
            <Typography
              variant="h6"
              component="h2"
              sx={{fontSize: '18px', fontWeight: '550'}}>
              Webinar Details
            </Typography>

            {/* Webinar Title Input */}
            <FormControl sx={{marginTop: '7px', display: 'block'}}>
              <InputTextField
                id="webinarTitle"
                name="webinarTitle"
                label="Webinar Title"
                required
                type="text"
                placeholder="Type the webinar title"
                value={formValidation.values.webinarTitle}
                onChange={formValidation.handleChange}
                onBlur={formValidation.handleBlur}
                className="form_inputs"
                size="small"
                error={
                  (formValidation.touched.webinarTitle ?? false) &&
                  Boolean(formValidation.errors.webinarTitle)
                }
                helperText={
                  formValidation.touched.webinarTitle
                    ? formValidation.errors.webinarTitle
                    : undefined
                }
              />
            </FormControl>

            {/* Start Date Picker */}
            <FormControl sx={{marginTop: '7px'}} className="date_time_picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DemoItem
                    label={
                      <span>
                        Start Date <span style={{color: 'red'}}>*</span>
                      </span>
                    }>
                    <DatePicker
                      value={
                        formValidation.values.startDate
                          ? dayjs(formValidation.values.startDate, 'YYYY-MM-DD')
                          : null
                      }
                      onChange={async value => {
                        const formattedDate = value?.format('YYYY-MM-DD');
                        await formValidation.setFieldValue(
                          'startDate',
                          formattedDate,
                        );
                      }}
                      slotProps={{textField: {placeholder: 'Type start date'}}}
                      disablePast={true}
                      format="YYYY-MM-DD"
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
              {formValidation.touched.startDate && (
                <Typography
                  variant="body2"
                  color={
                    (formValidation.touched.startDate ?? false) &&
                    Boolean(formValidation.errors.startDate)
                      ? 'error.main'
                      : 'text.secondary'
                  }
                  sx={{marginTop: '3px', marginLeft: '10px'}}>
                  {formValidation.errors.startDate}
                </Typography>
              )}
            </FormControl>

            {/* Start Time Picker */}
            <FormControl sx={{marginTop: '7px'}} className="date_time_picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <DemoItem
                    label={
                      <span>
                        Start Time <span style={{color: 'red'}}>*</span>
                      </span>
                    }>
                    <TimePicker
                      value={
                        formValidation.values.startTime
                          ? dayjs(formValidation.values.startTime, 'HH:mm')
                          : null
                      }
                      onChange={async value => {
                        const formattedTime = value?.format('HH:mm'); // Formatting time
                        await formValidation.setFieldValue(
                          'startTime',
                          formattedTime,
                        );
                      }}
                      format="HH:mm"
                      slotProps={{textField: {placeholder: 'Type start time'}}}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
              {formValidation.touched.startTime && (
                <Typography
                  variant="body2"
                  color={
                    (formValidation.touched.startTime ?? false) &&
                    Boolean(formValidation.errors.startTime)
                      ? 'error.main'
                      : 'text.secondary'
                  }
                  sx={{marginTop: '3px', marginLeft: '10px'}}>
                  {formValidation.errors.startTime}
                </Typography>
              )}
            </FormControl>

            {/* End Time Picker */}
            <FormControl sx={{marginTop: '7px'}} className="date_time_picker">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <DemoItem
                    label={
                      <span>
                        End Time <span style={{color: 'red'}}>*</span>
                      </span>
                    }>
                    <TimePicker
                      value={
                        formValidation.values.endTime
                          ? dayjs(formValidation.values.endTime, 'HH:mm')
                          : null
                      }
                      onChange={async value => {
                        const formattedTime = value?.format('HH:mm'); // Formatting time
                        await formValidation.setFieldValue(
                          'endTime',
                          formattedTime,
                        );
                      }}
                      format="HH:mm"
                      slotProps={{textField: {placeholder: 'Type end time'}}}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
              {formValidation.touched.endTime && (
                <Typography
                  variant="body2"
                  color={
                    (formValidation.touched.endTime ?? false) &&
                    Boolean(formValidation.errors.endTime)
                      ? 'error.main'
                      : 'text.secondary'
                  }
                  sx={{marginTop: '3px', marginLeft: '10px'}}>
                  {formValidation.errors.endTime}
                </Typography>
              )}
            </FormControl>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalBody;
