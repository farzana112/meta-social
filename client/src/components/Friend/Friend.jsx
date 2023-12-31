/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { PersonAddOutlined, PersonRemoveOutlined , VerifiedOutlined} from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../FlexBetween"
import UserImage from "../UserImage/UserImage";
import { followReq, getAUser,unFollowReq } from "../../api/userRequest/userRequest";
import {
  setFollowers,
  setFollowing,
  setFriendFollowers,
} from "../../state/slice";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const Friend = ({
  friendId,
  name,
  subtitle,
  userPicturePath,
  handleRequest,
  handleClick,
  isProfilePost
}) => {
  const [user, setUser] = useState();
  // const [isFollowingState, setIsFollowingState] = useState(isFollowing);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const following = useSelector((state) => state.user.following);
  const userId = useSelector((state) => state.user._id);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const isFollowing = following?.find((following) => following._id === friendId);
  // const isFollowing = following?.some((following) => following._id === friendId);

  console.log("isFollowing" )
  console.log(isFollowing);
  const followRequest = async () => {
    const response = await followReq(userId, friendId, token);
    dispatch(setFollowers({ followers: response.followers }));
    dispatch(setFollowing({ following: response.following }));
    handleClick && handleClick();
    handleRequest && handleRequest();
    
  };

  const unFollowRequest = async () => {
    const response = await unFollowReq(userId, friendId, token);
    dispatch(setFollowers({ followers: response.followers }));
    dispatch(setFollowing({ following: response.following }));
    handleClick && handleClick();
    handleRequest && handleRequest();
    
  };

  

  
  
  const getuser = async () => {
    const result = await getAUser(friendId, token);
    setUser(result);
  };
  useEffect(() => {
    getuser();
  }, [userId]);
  return (
    <FlexBetween>
      <FlexBetween gap='1rem'>
        <UserImage image={user?.displayPicture} size='55px' />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            // navigate(0);
          }}
        >
          <Typography
            color={main}
            variant='h5'
            fontWeight='500'
            sx={{
              "&:hover": {
                color: palette.primary.medium,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize='0.75rem'>
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {userId !== friendId && (<>
        {!isProfilePost && (
          <IconButton
          onClick={() => followRequest()}
          sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
        >
          {isFollowing ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
        )}
        </>
      )}
    </FlexBetween>
  );
};

export default Friend;
