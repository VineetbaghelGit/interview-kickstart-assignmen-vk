/* eslint-disable @typescript-eslint/no-unsafe-argument */
import CloseIcon from '@mui/icons-material/Close';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import {Button, FormControl} from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import {DemoContainer, DemoItem} from '@mui/x-date-pickers/internals/demo';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import AppButton from 'components/AppButton';
import InputTextField from 'components/InputTextField';
import {
  type AppModalPropsType,
  type WebinarDetailsType,
} from 'configs/appTypes';
import {ERROR, SUCCESS} from 'configs/constant';
import {useWebinarContext} from 'context/WebinarContext';
import dayjs from 'dayjs';
import {useFormik} from 'formik';
import {ToasterMessage} from 'helpers/ToasterHelper';
import * as React from 'react';
import * as Yup from 'yup';
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  bgcolor: 'background.paper',
  border: '1px solid #E3E7EC',
  boxShadow: 24,
  borderRadius: '16px',
  height: '90vh',
};

function AppModal({
  title,
  buttonText,
  showModal,
  handleClose,
  editableData,
}: Readonly<AppModalPropsType>): JSX.Element {
  const {webinarData, setWebinarData} = useWebinarContext();

  const formValidation = useFormik({
    initialValues: {
      instructorName: editableData?.instructorName ?? '',
      instructorRole: editableData?.instructorRole ?? '',
      instructorCompany: editableData?.instructorCompany ?? '',
      topics: editableData?.topics ?? '',
      webinarTitle: editableData?.webinarTitle ?? '',
      startDate: editableData?.startDate ?? '',
      startTime: editableData?.startTime ?? '',
      endTime: editableData?.endTime ?? '',
    },
    validationSchema: Yup.object().shape({
      instructorName: Yup.string().required('Instructor name is required'),
      instructorRole: Yup.string().required('Instructor role is required'),
      instructorCompany: Yup.string().required(
        'Instructor company is required',
      ),
      topics: Yup.string().required('Topic is required'),
      webinarTitle: Yup.string().required('Webinar title is required'),
      startDate: Yup.string().required('Start date is required'),
      startTime: Yup.string().required('Start time is required'),
      endTime: Yup.string().required('End time is required'),
    }),
    onSubmit: async value => {
      try {
        if (editableData) {
          // Update existing webinar data
          const updatedData = webinarData.map(data =>
            data.id === editableData.id
              ? {
                  ...data,
                  instructorName: value.instructorName,
                  instructorRole: value.instructorRole,
                  instructorCompany: value.instructorCompany,
                  topics: value.topics,
                  webinarTitle: value.webinarTitle,
                  startDate: value.startDate,
                  startTime: value.startTime,
                  endTime: value.endTime,
                }
              : data,
          );
          setWebinarData(updatedData);
          ToasterMessage(SUCCESS, 'Webinar updated successfully');
        } else {
          // Add new webinar data
          const newWebinar: WebinarDetailsType = {
            id: crypto.randomUUID(),
            instructorName: value.instructorName,
            instructorRole: value.instructorRole,
            instructorCompany: value.instructorCompany,
            topics: value.topics,
            webinarTitle: value.webinarTitle,
            startDate: value.startDate,
            startTime: value.startTime,
            endTime: value.endTime,
          };
          setWebinarData([...webinarData, newWebinar]);
          ToasterMessage(SUCCESS, 'New webinar added!');
        }
        handleClose();
      } catch (err: any) {
        ToasterMessage(ERROR, 'Something went wrong');
      }
    },
  });
  const handleModalClose = (): void => {
    formValidation.resetForm();
    handleClose();
  };
  React.useEffect(() => {
    if (editableData) {
      void formValidation.setValues({
        instructorName: editableData.instructorName,
        instructorRole: editableData.instructorRole,
        instructorCompany: editableData.instructorCompany,
        topics: editableData.topics,
        webinarTitle: editableData.webinarTitle,
        startDate: editableData.startDate,
        startTime: editableData.startTime,
        endTime: editableData.endTime,
      });
    }
  }, [editableData]);
  return (
    <Modal
      keepMounted
      open={showModal}
      onClose={handleModalClose}
      closeAfterTransition
      sx={{width: '100%'}}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description">
      <Box sx={style}>
        <Box
          className="modal_header"
          sx={{
            padding: '14px 22px',
            borderBottom: '1px solid #E3E7EC',
            display: 'flex',
            justifyContent: 'space-between',
          }}>
          <Typography
            variant="h6"
            component="h2"
            sx={{fontSize: '18px', fontWeight: '550'}}>
            {title}
          </Typography>
          <CloseIcon
            sx={{color: '#444952', fontSize: '24px', cursor: 'pointer'}}
            onClick={handleModalClose}
          />
        </Box>
        <Box className="modal_body" sx={{height: '400px', overflow: 'auto'}}>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': {m: 1, width: '28ch'},
            }}>
            <Box sx={{display: 'flex', gap: '30px', padding: '14px 22px'}}>
              <PeopleAltOutlinedIcon
                sx={{color: '#444952', fontSize: '24px'}}
              />
              <Box sx={{flex: '1'}}>
                <Typography
                  variant="h6"
                  component="h2"
                  sx={{fontSize: '18px', fontWeight: '550'}}>
                  Instructor Details
                </Typography>
                <FormControl sx={{marginTop: '7px', display: 'block'}}>
                  <InputTextField
                    id="instructorName"
                    name="instructorName"
                    label="Instructor Name"
                    type="text"
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
                <FormControl sx={{marginTop: '7px', display: 'block'}}>
                  <InputTextField
                    id="instructorRole"
                    name="instructorRole"
                    label="Instructor Role"
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
                <Box sx={{display: 'flex', gap: '30px'}}>
                  <FormControl
                    sx={{marginTop: '7px', display: 'block', flex: '1'}}>
                    <InputTextField
                      id="instructorCompany"
                      name="instructorCompany"
                      label="Instructor Company"
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
                  <FormControl
                    sx={{marginTop: '7px', display: 'block', flex: '1'}}>
                    <InputTextField
                      id="topics"
                      name="topics"
                      label="Topics"
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
                </Box>
              </Box>
            </Box>
            <Box
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
                <FormControl sx={{marginTop: '7px', display: 'block'}}>
                  <InputTextField
                    id="webinarTitle"
                    name="webinarTitle"
                    label="Webinar Title"
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

                <FormControl
                  sx={{marginTop: '7px'}}
                  className="date_time_picker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DemoItem label="Start Date">
                        <DatePicker
                          // value={formValidation.values.startDate}
                          value={
                            formValidation.values.startDate
                              ? dayjs(
                                  formValidation.values.startDate,
                                  'YYYY-MM-DD',
                                )
                              : null
                          }
                          onChange={async value => {
                            const formattedDate = value?.format('YYYY-MM-DD');
                            await formValidation.setFieldValue(
                              'startDate',
                              formattedDate,
                            );
                          }}
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
                      sx={{marginTop: 1}}>
                      {formValidation.errors.startDate}
                    </Typography>
                  )}
                </FormControl>
                <FormControl
                  sx={{marginTop: '7px'}}
                  className="date_time_picker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                      <DemoItem label="Start Time">
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
                      sx={{marginTop: 1}}>
                      {formValidation.errors.startTime}
                    </Typography>
                  )}
                </FormControl>
                <FormControl
                  sx={{marginTop: '7px'}}
                  className="date_time_picker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['TimePicker']}>
                      <DemoItem label="End Time">
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
                      sx={{marginTop: 1}}>
                      {formValidation.errors.endTime}
                    </Typography>
                  )}
                </FormControl>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            padding: '14px 22px',
            borderTop: '1px solid #E3E7EC',
            display: 'flex',
            gap: '20px',
          }}>
          <AppButton type="button" onClick={formValidation.handleSubmit}>
            {buttonText}
          </AppButton>
          <Button
            sx={{
              color: '#0E51F1',
              fontSize: '18px',
              fontWeight: '600',
              textTransform: 'capitalize',
            }}
            onClick={handleModalClose}
            size="small">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
export default AppModal;
