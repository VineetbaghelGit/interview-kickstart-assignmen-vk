/* eslint-disable @typescript-eslint/no-unsafe-argument */
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
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

import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

// Styles for the modal
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
  height: '83vh',
};

/**
 * Component representing a modal for creating or editing webinars.
 *
 * @param {AppModalPropsType} props - The properties for the modal component.
 * @returns {JSX.Element} The rendered modal component.
 */
function AppModal({
  title,
  buttonText,
  showModal,
  handleClose,
  editableData,
}: Readonly<AppModalPropsType>): JSX.Element {
  const {
    showWebinarData,
    setShowWebinarData,
    setAllWebinarDatas,
    allWebinarDatas,
  } = useWebinarContext();

  // Formik setup for form validation and submission
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
      endTime: Yup.string()
        .required('End time is required')
        .test(
          'end-time-after-start-time',
          'End time must be after start time',
          function (value) {
            const {startTime} = this.parent;
            if (startTime && value) {
              return dayjs(value, 'HH:mm').isAfter(dayjs(startTime, 'HH:mm'));
            }
            return true;
          },
        ),
    }),
    onSubmit: async value => {
      try {
        if (editableData) {
          // Update existing webinar data
          const updatedData = showWebinarData.map(data =>
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
          setShowWebinarData(updatedData);
          setAllWebinarDatas(updatedData);
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
          setShowWebinarData([...showWebinarData, newWebinar]);
          setAllWebinarDatas([...allWebinarDatas, newWebinar]);
          ToasterMessage(SUCCESS, 'New webinar added!');
          formValidation.resetForm();
        }
        handleClose();
      } catch (err: any) {
        ToasterMessage(ERROR, 'Something went wrong');
      }
    },
  });

  // Reset form and close modal
  const handleModalClose = (): void => {
    formValidation.resetForm();
    handleClose();
  };

  // Update form values when editableData changes
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

  // Submit form
  const handleSubmit = (): void => {
    formValidation.handleSubmit();
  };

  return (
    <Modal
      keepMounted
      open={showModal}
      onClose={handleModalClose}
      closeAfterTransition
      sx={{width: '100%'}}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description">
      <Box sx={style} className="modal_container">
        {/* Modal Header */}
        <ModalHeader title={title} onClose={handleModalClose} />

        {/* Modal Body */}
        <ModalBody formValidation={formValidation} />

        {/* Modal Footer */}
        <ModalFooter
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          buttonText={buttonText}
        />
      </Box>
    </Modal>
  );
}

export default AppModal;
