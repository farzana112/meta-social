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
import Friend from "../../components/Friend/Friend";


const FriendListWidget = ({userId,isFollowingList=false,handleEffect,handleClick})=> 
{
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

const {palette}=useTheme;
const primaryLight=palette.primary.light;
const primaryDark=palette.primary.dark
const main =palette.neutral.main;
const medium=palette.neutral.meidum
const[expanded,setExpanded]=useState(false)  

const handleExpand = () => {
    setExpanded(true);
  };


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

        <Box display='flex' flexDirection='column' gap='1.5rem'>
         
            {/* <Friend
              
            /> */}
        
            <Button variant='text' onClick={handleExpand}>
              Show More
            </Button>
    
          <Collapse in={expanded} timeout='auto'>
        
              <Friend
                
              />
          
          </Collapse>
        </Box>

    </WidgetWrapper>
  )

}

export default FriendListWidget
