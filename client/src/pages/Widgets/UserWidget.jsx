  /* eslint-disable no-undef */
  /* eslint-disable react/prop-types */
  import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
    MessageOutlined,
    ReportOutlined,
  } from "@mui/icons-material";
  import {
    Box,
    Typography,
    Divider,
    useTheme,
    Button,
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
  } from "@mui/material";
  import UserImage from "../../components/UserImage/UserImage";
  import FlexBetween from "../../components/FlexBetween"
  import WidgetWrapper from "../../components/Widget/WidgetWrapper";
  import { addChat } from "../../api/ChatRequest/ChatRequest";

  import {
    followReq,
    getFollowers,
    getFollowing,
    reportUser
    
  } from "../../api/userRequest/userRequest";
  import {
    setFollowers,
    setFollowing,
    setFriendFollowers,
    setFriendFollowing,
  } from "../../state/slice";
  import { useSelector, useDispatch } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import { useState, useEffect } from "react";
  // import { addChat } from "../../api/ChatRequest/CHatRequest";
  import AccountEditModal from "../../components/Modal/AccountEditModal";

  const UserWidget = ({ userId, userData, isProfile = false, handleEffect }) => {
    const { palette } = useTheme();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const following = useSelector((state) => state.user.following);
    const isFollowing = following?.find((following) => following._id === userId);
    const [openModal, setOpenModal] = useState(false);
    const user = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const reported = userData
      ? userData.report?.some((report) => report.userId === user._id)
      : user?.report?.some((report) => report.userId === user._id);
    const dark = palette.neutral.dark;
    const medium = palette.neutral.medium;
    const main = palette.neutral.main;

    
    const handleOpenModal = () => {
      setOpenModal(true);
    };
    const handleCloseModal = () => {
      setOpenModal(false);
    };
    const getFriends = async () => {
      const followersData = await getFollowers(
        userData ? userData._id : userId,
        token
      );
      const followingData = await getFollowing(
        userData ? userData._id : userId,
        token
      );
      dispatch(setFriendFollowers({ followers: followersData }));
      dispatch(setFriendFollowing({ following: followingData }));
    };
    useEffect(() => {
      getFriends();
    }, [userId, isFollowing]);
    const handleFollow = async () => {
      const response = await followReq(user._id, userData._id, token);

      dispatch(setFollowers({ followers: response.followers }));
      dispatch(setFollowing({ following: response.following }));

      handleEffect();
    };

    const handleMessage = async () => {
      const chat = await addChat(user._id, userData._id, token);
      if (chat) {
        navigate("/chat");
      }
    };

    const [openReportDialog, setOpenReportDialog] = useState(false);
    const [reportReason, setReportReason] = useState("");

    const handleOpenReportDialog = () => {
      setOpenReportDialog(true);
    };

    const handleCloseReportDialog = () => {
      setOpenReportDialog(false);
    };

    const handleReportReasonChange = (event) => {
      setReportReason(event.target.value);
    };

    const handleReportSubmit = async (accountId) => {
      const result = await reportUser(user._id, accountId, reportReason, token);
      handleEffect();
      console.log("Report Reason:", reportReason);
      setReportReason("");
      handleCloseReportDialog();
    };

    return (
      <WidgetWrapper>
        <FlexBetween gap='0.5rem' pb='1.1rem'>
          <FlexBetween gap='1rem' onClick={() => navigate(`/profile/${userId}`)}>
            <UserImage
              image={userData ? userData.displayPicture : user.displayPicture}
            />
            <Box>
              <Typography
                variant='h4'
                color={dark}
                fontWeight='500'
                sx={{
                  "&:hover": {
                    color: palette.primary.dark,
                    cursor: "pointer",
                  },
                }}
              >
                {userData ? userData.name : user.name}
              </Typography>
              <Typography color={medium}>
                {userData ? userData.userName : user.userName}
              </Typography>
            </Box>
          </FlexBetween>
          {isProfile && userId !== user._id && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button variant='outlined' onClick={handleFollow}>
                {isFollowing ? "Unfollow" : "Follow"}
              </Button>
              {isFollowing && (
                <Button
                  variant='outlined'
                  startIcon={<MessageOutlined />}
                  onClick={handleMessage}
                
                  sx={{ marginTop: "0.5rem" }}
                >
                  Message
                </Button>
              )}
            </Box>
          )}
          {userId === user._id && (
            <ManageAccountsOutlined
              sx={{
                "&:hover": { color: palette.primary.light, cursor: "pointer" },
              }}
              onClick={handleOpenModal}
            />
          )}
        </FlexBetween>

        <AccountEditModal
          open={openModal}
          onClose={handleCloseModal}
          userData={user}
          handleClick={handleEffect}
        />
        <Divider />

        <Box p='1rem 0'>
          <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
            <LocationOnOutlined fontSize='large' sx={{ color: main }} />
            <Typography color={medium}>
              {userData ? userData.location : user?.location}
            </Typography>
          </Box>
          <Box display='flex' alignItems='center' gap='1rem'>
            <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
            <Typography color={medium}>
              {userData ? userData.about: user?.about}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <Box p='1rem 0'>
          <FlexBetween mb='0.5rem'>
            <Typography color={main} fontWeight='500'>
              Followers
            </Typography>
            <Typography color={main} fontWeight='500'>
              {userData ? userData.followers?.length : user.followers?.length}
            </Typography>
          </FlexBetween>
          <FlexBetween>
            <Typography color={main} fontWeight='500'>
              Following
            </Typography>
            <Typography color={main} fontWeight='500'>
              {userData ? userData?.following?.length : user?.following?.length}
            </Typography>
          </FlexBetween>
        </Box>

        <Divider />

        <Box p='1rem 0'>
          <Typography fontSize='1rem' color={main} fontWeight='500' mb='1rem'>
            Social Profiles
          </Typography>

          <FlexBetween gap='1rem' mb='0.5rem'>
            <FlexBetween gap='1rem'>
              <img src='../assets/twitter.png' alt='twitter' />
              <Box>
                <Typography color={main} fontWeight='500'>
                  Twitter
                </Typography>
                <Typography color={medium}>Social Network</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>

          <FlexBetween gap='1rem'>
            <FlexBetween gap='1rem'>
              <img src='../assets/linkedin.png' alt='linkedin' />
              <Box>
                <Typography color={main} fontWeight='500'>
                  Linkedin
                </Typography>
                <Typography color={medium}>Network Platform</Typography>
              </Box>
            </FlexBetween>
            <EditOutlined sx={{ color: main }} />
          </FlexBetween>
        </Box>

        <Divider />
        {isProfile && userId !== user._id && (
          <>
            <Box p='1rem 0'>
              <Box display='flex' justifyContent='center'>
                <Button
                  variant='outlined'
                  startIcon={<ReportOutlined />}
                  onClick={handleOpenReportDialog}
                  disabled={reported}
                >
                  {reported ? "Already Reported" : "Report"}
                </Button>
              </Box>
            </Box>
          </>
        )}
        <Dialog open={openReportDialog} onClose={handleCloseReportDialog}>
          <DialogTitle>Report User</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              multiline
              rows={4}
              variant='outlined'
              label='Reason for Reporting'
              value={reportReason}
              onChange={handleReportReasonChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseReportDialog}>Cancel</Button>
            <Button
              onClick={() => {
                handleReportSubmit(userData ? userData._id : user._id);
              }}
              variant='contained'
              color='primary'
              disabled={reportReason.trim() === ""}
            >
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </WidgetWrapper>
    );
  };

  export default UserWidget;
