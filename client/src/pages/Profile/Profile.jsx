/* eslint-disable react-hooks/exhaustive-deps */
import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar"
// import FriendListWidget from "../Widgets/FriendList";
import FriendListWidget from "../../components/Widget/FriendList";
import PostsWidget from "../../components/Widget/PostsWidget"
import UserWidget from "../../pages/Widgets/UserWidget"
import { getAUser } from "../../api/userRequest/userRequest";
// import MyPostWidget from "../Widgets/MyPost";
import MyPostWidget from "../Widgets/MyPost";


const Profile = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const [click, setCkick] = useState(false);
  const token = useSelector((state) => state.token);
  const { _id } = useSelector((state) => state.user);
  const loggedUser = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const [run,setRun] = useState(false)
  const handleClick = () =>{
    setRun(!run)
  }
  const getuser = async () => {
    const response = await getAUser(userId, token);
    setUser(response);
  };
  const handleEffect = () => {
    setCkick(!click);
  };

  useEffect(() => {
    getuser();
  }, [click, userId]); // eslint-disable-line react-hooks/exhaustive-deps
 
  useEffect(() => {
   
  }, [ loggedUser]);
  if (!user) return null;


  return (
    <Box>
      <Navbar  />
      <Box
        width='100%'
        padding='7rem 6%'
        display={isNonMobileScreens ? "flex" : "block"}
        gap='2rem'
        justifyContent='center'
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget
            userId={userId}
            userData={user}
            picturePath={user.picturePath}
            isProfile
            handleEffect={handleEffect}
            click={click}
          />
          <Box m='2rem 0' />
          <FriendListWidget userId={userId} handleEffect={handleEffect} handleClick={handleClick}/>
          <Box m='2rem 0' />
          <FriendListWidget
            userId={userId}
            isFollowingList={true}
            handleEffect={handleEffect}
            handleClick={handleClick}
          />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {userId === _id && (
            <>
              <MyPostWidget picturePath={user.picturePath} handleClick={handleClick}/>
              <Box m='2rem 0' />
            </>
          )}

          <PostsWidget click={run} userId={userId} isProfile  />
        </Box>
      </Box>
    </Box>
  );
};

export default Profile;
