import {
 ManageAccountsOutlined,
 EditOutlined,
 LocationOnOutlined,
 WorkOutlineOutlined,
 ReportOutlined,
 MessageOutlined
} from "@mui/icons-material"

import {
     Box,
      Typography, 
      Divider, 
      useTheme,
      Button,
      DialogActions,
      Dialog,
      DialogTitle,
      TextField,
      DialogContent
} from "@mui/material"
import UserImage from "../../components/UserImage/UserImage"
import FlexBetween from "../../components/FlexBetween.jsx"
import WidgetWrapper from "../../components/Widget/WidgetWrapper"
import {useSelector, useDispatch} from "react-redux"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const UserWidget= ( { userId,userData,isProfile=false,handleEffect}) =>{
   
    const {palette} =useTheme()
    const navigate= useNavigate()
    const dispatch=useDispatch()
    const token= useSelector((state)=>state.token)
    // const user = useSelector((state) => state.user);
    const [user,setUser]=useState(null)
    const dark=palette.neutral.dark;
    const medium=palette.neutral.medium;
    const main=palette.neutral.main
      const following=useSelector((state)=>state.user.following)
const getUser= async () =>{
    const response=await fetch(`http://localhost:5000/api/user/${userId}`,
    {
        method: "GET",
        headers : {Authorization:`Bearer ${token}`}
    })

    const data=await response.json()
    console.log("data")
    console.log(data)
    setUser(data.user)
}

useEffect(()=>{
    getUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[])



if(!user)
return null

const{
    name,
    userName,
    age,
    email,password
} =user


console.log("user widget page");
console.log(name, userName, age, email);
return(
    

    <WidgetWrapper>
    <FlexBetween gap='0.5rem' pb='1.1rem'>
      <FlexBetween gap='1rem' onClick={() => navigate(`/profile/${userId}`)}>
        {/* <UserImage
          image={ user.displayPicture}
        /> */}
        <Box>
          <Typography
            variant='h4'
            color={dark}
            fontWeight='500'
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            { user?.name}
          </Typography>
          <Typography color={medium}>
            {user?.userName}
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
          <Button variant='outlined' >
           
          </Button>
            <Button
              variant='outlined'
              startIcon={<MessageOutlined />}
              
              sx={{ marginTop: "0.5rem" }}
            >
              Message
            </Button>
          
        </Box>
      )}
      {userId === user._id && (
        <ManageAccountsOutlined
          sx={{
            "&:hover": { color: palette.primary.light, cursor: "pointer" },
          }}
          
        />
      )}
    </FlexBetween>

   
    <Divider />

    <Box p='1rem 0'>
      <Box display='flex' alignItems='center' gap='1rem' mb='0.5rem'>
        <LocationOnOutlined fontSize='large' sx={{ color: main }} />
        <Typography color={medium}>
          { user?.location}
        </Typography>
      </Box>
      <Box display='flex' alignItems='center' gap='1rem'>
        <WorkOutlineOutlined fontSize='large' sx={{ color: main }} />
        <Typography color={medium}>
          { user?.about}
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
       0
        </Typography>
      </FlexBetween>
      <FlexBetween>
        <Typography color={main} fontWeight='500'>
          Following
        </Typography>
        <Typography color={main} fontWeight='500'>
            0
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
              
            >
             Reported?
            </Button>
          </Box>
        </Box>
      </>
    )}
    <Dialog  >
      <DialogTitle>Report User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          multiline
          rows={4}
          variant='outlined'
          label='Reason for Reporting'
          
          
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button >Cancel</Button>
        <Button
          
          variant='contained'
          color='primary'
         
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  </WidgetWrapper>
)

}

export default UserWidget

