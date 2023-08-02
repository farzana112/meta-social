import React, { useState, useEffect } from "react";
import { Typography, Box, Button, TextField,useTheme,Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CenterFocusStrong } from "@mui/icons-material";
import { verifyOtp } from "../../api/AuthRequest/AuthRequest";
function EmailVerification() {
  const [timerCount, setTimer] = useState(60);
  const [OTPinput, setOTPinput] = useState(["", "", "", "","",""]);
  const [disable, setDisable] = useState(true);
  const navigate = useNavigate();
  const theme=useTheme()
  const neutralLight=theme.palette.neutral.light;
const dark=theme.palette.neutral.dark
const background=theme.palette.background.default
const primaryLight=theme.palette.primary.light;
const alt=theme.palette.background.alt 
  function verfiyOTP() {
    // Your verification logic here
    // For demonstration purposes, let's assume the OTP is 1234
    const otp=1234
    if (parseInt(OTPinput.join("")) === otp) {
      // Navigate to the reset page if OTP is correct
      navigate("/reset");
      return;
    }
    alert("The code you have entered is not correct, try again or re-send the link");
    return;
  }

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable]);

  const handleVerifyOtp = async (values, onSubmitProps, handleToast) => {
    try {
      const formData = new FormData();
      formData.append("otp", values.OTPinput);
      console.log("value otpiniput")
      console.log(values)
console.log(formData)
      const response = await verifyOtp(values, onSubmitProps, handleToast);
      console.log("response")
      console.log(response)
      if(response)

      navigate("/reset");
    } catch (error) {
     console.error(error)
    } finally {
      // Reset the form submission state
    }
  };

  return (

      <Box className="bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
        
       

<Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
         OTP Verification
         <Typography >We have sent a code to your email </Typography>
        </Typography>
      </Box>
            
      <Container
      component='main'
      maxWidth='xs'
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >  
            
          

          <div>
          
        
            <form>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {OTPinput.map((value, index) => (
              <div key={index} className="w-16 h-16 ">
                <TextField
                  inputProps={{
                    maxLength: 1,
                    inputMode: "numeric", // Set input mode to numeric
                    pattern: "[0-9]*", // Allow only numeric inputs
                    
                  }}
                  type="text"
                  value={value}
                  
                  onChange={(e) => {
                    const newInput = [...OTPinput];
                    console.log(newInput)
                    newInput[index] = e.target.value;
                    setOTPinput(newInput);
                  }}
                />
              </div>
            ))}
          </div>

          <div>
            <Button
              variant="contained"
              onClick={handleVerifyOtp}
              disabled={disable}
              className="w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm"
            >
              Verify OTP
            </Button>
          </div>

          <Typography>
           
            <Typography
              className="flex flex-row items-center"
              style={{
                color: disable ? "gray" : "blue",
                cursor: disable ? "none" : "pointer",
                textDecorationLine: disable ? "none" : "underline",
              }}
            >
             
            </Typography>
          </Typography>
        </form>
            
          </div>
          </Container>
        
      </Box>
    
  );
}

export default EmailVerification;
