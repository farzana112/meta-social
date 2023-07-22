import React from 'react'
import {useState} from "react"
import { 
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    Tooltip,
    CircularProgress,
    Popover
} from "@mui/material"
import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close,
    
} from "@mui/icons-material"
import { userSearch } from '../../api/userRequest/userRequest'
import { useDispatch,useSelector } from "react-redux"
import { setMode,setLogout } from "../../state/slice"
import { useNavigate } from "react-router-dom"
import FlexBetween from '../../components/FlexBetween'
import AdminLogin from "../AdminLogin/AdminLogin"
const Navbar = () => {
  
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const admin=useSelector((state)=>state.admin)
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
const theme=useTheme()
const neutralLight=theme.palette.neutral.light;
const dark=theme.palette.neutral.dark
const background=theme.palette.background.default
const primaryLight=theme.palette.primary.light;
const alt=theme.palette.background.alt 

const fullName = `${user?.userName}`;
const adminName=`${admin?.userName}`



const searchUser = (event) => {
  const inputValue = event.target.value;
  handleQueryChange(inputValue);
};


return (
    <Box sx={{ position: "fixed", minWidth: "100%", zIndex: "2" }}>
      <FlexBetween padding='1rem 6%' backgroundColor={alt}>
        <FlexBetween gap='1.75rem'>
          <Typography
            fontWeight='bold'
            fontSize='clamp(1rem, 2rem, 2.25rem)'
            color='primary'
            onClick={() => navigate("/home")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer",
              },
            }}
          >
            Meta Social
          </Typography>
          {isNonMobileScreens && (
            <Box sx={{ position: "relative", width: "300px" }}>
              <FlexBetween
                backgroundColor={neutralLight}
                borderRadius='9px'
                gap='3rem'
                padding='0.1rem 1.5rem'
              >
                <InputBase placeholder='Search...' />
                <IconButton>
                  <Tooltip title='Search user' placement='bottom'>
                    <Search />
                  </Tooltip>
                </IconButton>
              </FlexBetween>
              {loading && <CircularProgress />}
              {Boolean(suggestions.length) && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    backgroundColor: background,
                    borderRadius: "0.5rem",
                    boxShadow: theme.shadows[1],
                    mt: "0.25rem",
                    zIndex: 1,
                    overflowY: "auto",
                  }}
                >
                  {suggestions.map((suggestion) => (
                    <Typography
                      key={suggestion._id}
                      
                      sx={{
                        py: "0.5rem",
                        px: "1rem",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: theme.palette.primary.light,
                          color: theme.palette.background.default,
                        },
                      }}
                    >
                      {suggestion.name}
                    </Typography>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </FlexBetween>
{/* 
        NOTIFICATION POPOVER */}
        {/* <Popover
          open={isNotificationPopoverOpen}
          anchorEl={notificationAnchorEl}
          onClose={closeNotificationPopover}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <Box sx={{ p: "1rem" }}>
            {notifications.length === 0 ? (
              <Typography>No notifications</Typography>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                }}
              >
                {notifications.map((notification) => {
                  // if (index % 2 === 1) {
                  //   // Skip odd indexes
                  //   return null;
                  // }

                  return (
                    <Typography
                      key={notification.id}
                      style={{ marginBottom: "0.5rem" }}
                    >
                      {displayNotification(notification)}
                    </Typography>
                  );
                })}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    marginTop: "1rem",
                  }}
                >
                  <Typography
                    variant='body2'
                    sx={{ marginRight: "0.5rem", color: "gray" }}
                  >
                    {notifications.length} unread notifications
                  </Typography>
                  <Button
                    variant='contained'
                    onClick={() => setNotifications([])}
                    sx={{
                      backgroundColor: "#00D5FA",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "#00353F",
                      },
                    }}
                  >
                    Clear Notifications
                  </Button>
                </div>
              </div>
            )}
          </Box>
        </Popover> */}

        {/* DESKTOP NAV */}
        {isNonMobileScreens ? (
          <FlexBetween gap='2rem'>
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <Tooltip title='Light mode' placement='bottom'>
                  <DarkMode sx={{ fontSize: "25px" }} />
                </Tooltip>
              ) : (
                <Tooltip title='Dark mode' placement='bottom'>
                  <LightMode sx={{ color: dark, fontSize: "25px" }} />
                </Tooltip>
              )}
            </IconButton>
            <Tooltip title='Chat' placement='bottom'>
              <Message
                sx={{ fontSize: "25px" }}
                onClick={() => {navigate("/chat") ;
                navigate(0)}}
              />
            </Tooltip>
            <Tooltip title='Notification' placement='bottom'>
              {/* <IconButton
                sx={{ fontSize: "25px" }}
                onClick={openNotificationPopover}
              >
                {hasUnreadNotifications ? (
                  <Badge badgeContent={notifications.length} color='error'>
                    <Notifications sx={{ fontSize: "25px" }}/>
                  </Badge>
                ) : (
                  <Notifications sx={{ fontSize: "25px" }}/>
                )}
              </IconButton> */}
            </Tooltip>
            <Tooltip title='Help' placement='bottom'>
              <Help sx={{ fontSize: "25px" }} />
            </Tooltip>
            <FormControl variant='standard' value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem >
                <Typography>My Profile</Typography>
                
                </MenuItem>

                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        ) : (
          <IconButton
            onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
          >
            <Menu />
          </IconButton>
        )}

        {/* MOBILE NAV */}
        {!isNonMobileScreens && isMobileMenuToggled && (
          <Box
            position='fixed'
            right='0'
            bottom='0'
            height='100%'
            zIndex='10'
            maxWidth='500px'
            minWidth='300px'
            backgroundColor={background}
          >
            {/* CLOSE ICON */}
            <Box display='flex' justifyContent='flex-end' p='1rem'>
              <IconButton
                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
              >
                <Close />
              </IconButton>
            </Box>

            {/* MENU ITEMS */}
            <FlexBetween
              display='flex'
              flexDirection='column'
              justifyContent='center'
              alignItems='center'
              gap='3rem'
            >
              <IconButton
                onClick={() => dispatch(setMode())}
                sx={{ fontSize: "30px" }}
              >
                {theme.palette.mode === "dark" ? (
                  <Tooltip title='Light mode' placement='bottom'>
                    <DarkMode />
                  </Tooltip>
                ) : (
                  <Tooltip title='Dark mode' placement='bottom'>
                    <LightMode sx={{ color: dark }} />
                  </Tooltip>
                )}
              </IconButton>
              <IconButton
                sx={{ fontSize: "30px" }}
                onClick={() => {navigate("/chat") ;
                navigate(0)}}
              >
                <Tooltip title='Chat' placement='bottom'>
                  <Message />
                </Tooltip>
              </IconButton>
              <IconButton sx={{ fontSize: "30px" }}>
                <Tooltip title='Notification' placement='bottom'>
                  <Notifications />
                </Tooltip>
              </IconButton>
              <IconButton sx={{ fontSize: "30px" }}>
                <Tooltip title='Help' placement='bottom'>
                  <Help />
                </Tooltip>
              </IconButton>
              <FormControl variant='standard' value={fullName}>
                <Select
                  value={fullName}
                  sx={{
                    backgroundColor: neutralLight,
                    width: "200px",
                    borderRadius: "0.25rem",
                    p: "0.25rem 1rem",
                    "& .MuiSvgIcon-root": {
                      pr: "0.25rem",
                      width: "3rem",
                    },
                    "& .MuiSelect-select:focus": {
                      backgroundColor: neutralLight,
                    },
                  }}
                  input={<InputBase />}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem> 
                  <MenuItem onClick={() => dispatch(setLogout())}>
                    Log Out
                  </MenuItem>
                </Select>
              </FormControl>
            </FlexBetween>
          </Box>
        )}
      </FlexBetween>
    </Box>
  );

 
}

export default Navbar
