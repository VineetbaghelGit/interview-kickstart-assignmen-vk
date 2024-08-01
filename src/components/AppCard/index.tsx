import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'; // Importing Material-UI components
import AppModal from 'components/AppModal'; // Importing AppModal component
import {type AppCardPropTypes, type WebinarDetailsType} from 'configs/appTypes'; // Importing types from configs
import {
  CardsColors,
  defaultWebinar,
  SUCCESS,
  UserImages,
} from 'configs/constant'; // Importing constants
import {useWebinarContext} from 'context/WebinarContext'; // Importing custom hook for Webinar context
import formatDateTime from 'helpers/DateFormatter'; // Importing DateFormatter helper
import {ToasterMessage} from 'helpers/ToasterHelper'; // Importing ToasterHelper
import React, {useCallback, useState} from 'react'; // Importing React and hooks

/**
 * AppCard component to display webinar details in a card format.
 *
 * @param {AppCardPropTypes} props - The props for the AppCard component.
 * @returns {JSX.Element} The rendered AppCard component.
 */
function AppCard({
  singleWebinarDetail,
  index,
}: Readonly<AppCardPropTypes>): JSX.Element {
  const {
    showWebinarData,
    setShowWebinarData,
    allWebinarDatas,
    setAllWebinarDatas,
  } = useWebinarContext(); // Destructuring context values
  const [editableData, setEditableData] =
    useState<WebinarDetailsType>(defaultWebinar); // State for editable webinar data
  const [openModal, setOpenModal] = useState(false); // State for modal visibility
  /**
   * Handles the deletion of a webinar.
   *
   * @param {string} webinarId - The ID of the webinar to be deleted.
   */
  const handleDeleteWebinar = useCallback(
    (webinarId: string): void => {
      const filteredData = showWebinarData.filter(
        data => data.id !== webinarId,
      );
      const allfilteredData = allWebinarDatas.filter(
        data => data.id !== webinarId,
      );
      setShowWebinarData(filteredData);
      setAllWebinarDatas(allfilteredData);
      ToasterMessage(SUCCESS, 'Webinar deleted successfully!');
    },
    [showWebinarData, setShowWebinarData],
  );

  /**
   * Opens the edit modal with the data of the selected webinar.
   *
   * @param {WebinarDetailsType} data - The data of the webinar to be edited.
   */
  const handleEditModalOpen = useCallback((data: WebinarDetailsType): void => {
    setOpenModal(true);
    setEditableData(data);
  }, []);

  /**
   * Closes the edit modal.
   */
  const handleClose = useCallback((): void => {
    setOpenModal(false);
  }, []);

  // Calculate color and image index based on the card index
  const colorIndex = index % CardsColors.length;
  const userImgIndex = index % UserImages.length;

  return (
    <Card
      className="app_card"
      sx={{
        maxWidth: 400,
        padding: '16px',
        borderRadius: '24px',
        boxShadow: '0px 20px 46px -24px rgba(0, 0, 0, 0.2)',
        border: '1px solid #E3E7EC',
      }}>
      <CardContent sx={{padding: '0px'}}>
        <Box
          sx={{
            display: 'flex',
            borderRadius: '16px',
            backgroundColor: CardsColors[colorIndex],
            padding: '16px',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#fff',
          }}>
          <Box>
            <Typography
              sx={{
                fontSize: '18px',
                mb: '5px',
                fontWeight: '550',
                lineHeight: '24px',
              }}
              component="p">
              {singleWebinarDetail.instructorName}
            </Typography>
            <Typography
              sx={{fontSize: '14px', lineHeight: '24px'}}
              component="p">
              {singleWebinarDetail.instructorRole}
            </Typography>
            <Typography
              sx={{fontSize: '14px', lineHeight: '24px'}}
              component="p">
              {singleWebinarDetail.instructorCompany}
            </Typography>
          </Box>
          <CardMedia
            component="img"
            sx={{
              width: 76,
              height: 76,
              borderRadius: '16px',
              boxShadow: '0px 20px 46px -24px rgba(0, 0, 0, 0.2)',
            }}
            image={
              singleWebinarDetail?.image?.trim()
                ? singleWebinarDetail.image
                : UserImages[userImgIndex]
            }
            alt="Instructor image"
          />
        </Box>
        <Box sx={{margin: '16px 0px'}}>
          <Typography
            gutterBottom
            variant="h5"
            component="p"
            sx={{
              fontSize: '14px',
              mb: '4px',
              fontWeight: '550',
              lineHeight: '24px',
              color: CardsColors[colorIndex],
            }}>
            {singleWebinarDetail.topics}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontSize: '18px',
              mb: '4px',
              fontWeight: '550',
              lineHeight: '24px',
              color: '#000',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
            component="p">
            {singleWebinarDetail.webinarTitle}
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              fontSize: '14px',
              mb: '4px',
              fontWeight: '550',
              lineHeight: '24px',
              color: '#2E333B',
            }}>
            {formatDateTime(
              singleWebinarDetail.startDate,
              singleWebinarDetail.startTime,
              singleWebinarDetail.endTime,
            )}
          </Typography>
        </Box>
      </CardContent>
      <CardActions sx={{padding: '0px', marginTop: '25px'}}>
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            handleDeleteWebinar(singleWebinarDetail.id);
          }}
          sx={{
            padding: '5px 24px',
            borderRadius: '24px',
            boxShadow: 'none',
            color: '#D14040',
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'capitalize',
            backgroundColor: '#F9E8E8',
            '&:hover': {
              boxShadow: 'none',
              backgroundColor: '#F9E8E8',
            },
          }}>
          Delete
        </Button>
        <Button
          sx={{
            color: '#0E51F1',
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'capitalize',
          }}
          onClick={() => {
            handleEditModalOpen(singleWebinarDetail);
          }}
          size="small">
          Edit
        </Button>
      </CardActions>
      <AppModal
        title="Edit Webinar"
        buttonText="Update Webinar"
        showModal={openModal}
        handleButtonClick={handleClose}
        handleClose={handleClose}
        editableData={editableData}
      />
    </Card>
  );
}

export default AppCard;
