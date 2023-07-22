import {useEffect, useState } from "react"
import{
    Box,
    Typography,
    useTheme,
    Collapse,
    Button
} from "@mui/material"
import { useSelector, useDispatch} from "react-redux"
import FlexBetween from "../FlexBetween"
import UserImage from "../UserImage/UserImage"
import WidgetWrapper from "./WidgetWrapper"
import {
    setFollowers,
    setFollowing,
    setFriendFollowing,
    setFriendFollowers
    
} from "../../state/slice"
import { getFollowers, getFollowing } from "../../api/userRequest/userRequest"

import Friend from "../../components/Friend/Friend";


const FriendListWidget = ({userId,isFollowingList=false,handleEffect,handleClick})=> 
{
  const dispatch=useDispatch()
const [click,setClick]=useState(false)
const token=useSelector((state)=>state.token)
const id=useSelector((state)=>state.user._id)
const { followers, following } = useSelector((state) => {
    if (id === userId) {
      return {
        followers: state.user.followers,
        following: state.user.following,
      };
    } else {
      return {
        followers: state.friendFollowers,
        following: state.friendFollowing,
      };
    }
  });
  console.log("followers:  "+followers)
  console.log("followers:  "+following)

  const handleRequest = () => {
    setClick(!click)
    handleEffect()
  }

const {palette}=useTheme();
const primaryLight=palette.primary.light;
const primaryDark=palette.primary.dark
const main =palette.neutral.main;
const medium=palette.neutral.medium
const[expanded,setExpanded]=useState(false)  


const getFriends = async () => {
  const followersData = await getFollowers(userId, token);
  console.log("followers data")
  console.log(followersData)
  const followingData = await getFollowing(userId, token);
  console.log("following data")
  console.log(followingData)
  if (id === userId) {
    dispatch(setFollowers({ followers: followersData }));
    dispatch(setFollowing({ following: followingData }));

  } else {
    dispatch(setFriendFollowers({ followers: followersData }));
    dispatch(setFriendFollowing({ following: followingData }));
  }
};

const handleExpand = () => {
    setExpanded(true);
  };
  const displayedFriends = isFollowingList
  ? following?.slice(0, 2)
  : followers?.slice(0, 2);
const remainingFriends = isFollowingList
  ? following?.slice(2)
  : followers?.slice(2);

  useEffect(() => {
    getFriends();
  }, [userId]);

  return(
    <WidgetWrapper>
    <Typography
      color={palette.neutral.dark}
      variant='h5'
      fontWeight='500'
      sx={{ mb: "1.5rem" }}
    >
      {isFollowingList ? "Following List" : "Followers List"}
    </Typography>
    {displayedFriends?.length === 0 ? (
      <Typography variant='body1' color={palette.text.secondary}>
        No {isFollowingList ? "following" : "followers"} to display.
      </Typography>
    ) : (
      <Box display='flex' flexDirection='column' gap='1.5rem'>
        {displayedFriends?.map((friend) => (
          <Friend
            key={friend._id}
            friendId={friend._id}
            name={friend.userName}
            subtitle={friend.name}
            userPicturePath={friend.displayPicture}
            handleRequest={handleRequest}
            handleClick={handleClick}
          />
        ))}
        {remainingFriends?.length > 0 && !expanded && (
          <Button variant='text' onClick={handleExpand}>
            Show More
          </Button>
        )}
        <Collapse in={expanded} timeout='auto'>
          {remainingFriends?.map((friend) => (
            <Friend
              key={friend?._id}
              friendId={friend?._id}
              name={friend?.userName}
              subtitle={friend?.name}
              userPicturePath={friend?.displayPicture}
              handleRequest={handleRequest}
              handleClick={handleClick}
            />
          ))}
        </Collapse>
      </Box>
    )}
  </WidgetWrapper>
  )
          }
export default FriendListWidget
