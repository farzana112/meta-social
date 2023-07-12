import {
 ManageAccountsOutlined,
 EditOutlined,
 LocationOutlined,
 WorkOutlineOutlined,
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
    const medium=palette.neutal.medium;
    const main=palette.neutral.main
      const following=useSelector((state)=>state.user.following)
const getUser= async () =>{
    const response=await fetch(`http://ocalhost:5000/user/${userId}`,
    {
        method: "GET",
        headers : {Authorization:`Bearer ${token}`}
    })

    const data=await response.json()
    setUser(data)
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

return(
    <WidgetWrapper>
      <FlexBetween
      gap=".5rem"
      pb="1.1rem"
      onClick={()=>navigate(`/profile/${userId}`)}

      >
        <FlexBetween></FlexBetween>
        </FlexBetween>  
    </WidgetWrapper>
)

}

export default UserWidget

