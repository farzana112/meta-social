/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAUser } from "../../api/userRequest/userRequest";
import { setChatUsers } from "../../state/slice";
import FlexBetween from "../FlexBetween"
import UserImage from "../UserImage/UserImage";

const Conversation = ({ data, currentUserId, online }) => {
  const [userData, setUserData] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  useEffect(() => {
    const userId = data?.members?.find((id) => id !== currentUserId);
    const getUserData = async () => {
      try {
        const data = await getAUser(userId, token);
        setUserData(data);
        dispatch(setChatUsers(data));
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);
  return (
    <>
      <div className='follower conversation'>
        <div>
          {online && <div className='online-dot'></div>}
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <UserImage image={userData?.displayPicture} size='55px' />
            <Box>
              <Typography variant='h5' fontWeight='500'>
                {userData?.userName}
              </Typography>
              <Typography fontSize='0.75rem'>
                {online ? "Online" : "Offline"}
              </Typography>
            </Box>
            <Box></Box>
          </div>
          
        </div>
      </div>
      <hr style={{ width: "85%", border: "0.1px solid #ececec" }} />
    </>
  );
};

export default Conversation;
