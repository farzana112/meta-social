import { Box, useMediaQuery} from "@mui/material"
import Navbar from "../Navbar/Navbar";
import UserWidget from "../Widgets/UserWidget";
// import MyPostWidget from "../../components/Widget/PostWidget";
import PostsWidget from "../../components/Widget/PostsWidget"
import MyPostWidget from "../../pages/Widgets/MyPost"
import FriendListWidget from "../../components/Widget/FriendList"; 
import { useSelector} from "react-redux"
import { useState, useEffect} from "react"
import { io } from "socket.io-client";

const HomePage=()=>{
  const{ _id,displayPicture}=useSelector((state)=>state.user)
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
const user=useSelector((state)=>state.user)
const [click,setClick] = useState(false)
const handleClick = () =>{
  setClick(!click)
}

useEffect(()=>{

},[click])

const socket = io("http://metasocial.cloud")

useEffect(()=>{
  socket?.emit("new-user-add",user._id)
 
 },[socket,user])
 
 


    return ( 
    <Box>
      <Navbar socket={socket}/>
      
      <Box
        width='100%'
        padding='7rem 6%'
        display={isNonMobileScreens ? "flex" : "block"}
        gap='0.5rem'
        justifyContent='space-between'
      >
        <Box  height="fit-content"
          position={isNonMobileScreens ? "sticky" : "static"}
          top="7rem" flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={_id} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
          
        >
        <MyPostWidget picturePath={displayPicture} handleClick={handleClick} />
        <PostsWidget click={click}  userId={_id} socket={socket} />
        
          
        </Box>
        {isNonMobileScreens && (
          <Box
            flexBasis='26%'
          
          >

<FriendListWidget userId={_id} handleClick={handleClick}/>

           

            <Box m='2rem 0' />
            <FriendListWidget userId={_id} isFollowingList={true} handleClick={handleClick} />
            

            <Box m='2rem 0' />
          </Box>
        )}
      </Box>

      </Box>
      )
}

export default HomePage;
