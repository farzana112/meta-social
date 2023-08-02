import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  TextField,
} from "@mui/material";


import * as yup from "yup";
import { sendMail } from "../../api/AuthRequest/AuthRequest";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react"
import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {
  const [message,setMessage]=useState("")
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const initialValues = {
    email: "",
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Required"),
  });

  const navigate = useNavigate();
  const handleToast = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };
 

  const handleSendEmail = async (values, onSubmitProps, handleToast) => {
    try {
      const formData = new FormData();
      formData.append("email", values.email);

      const response = await sendMail(values, onSubmitProps, handleToast);
      
      if(response)
      setMessage(true)
      
    } catch (error) {
     console.error(error)
    } finally {
      onSubmitProps.setSubmitting(false); // Reset the form submission state
    }
  };

  return (
    <Box>
      <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Meta Social
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        p="2rem"
        m="2rem auto"
        borderRadius="1.5rem"
        backgroundColor={theme.palette.background.alt}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Meta Social, please type your registered Email Address here...
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
         
  onSubmit={(values, onSubmitProps) => handleSendEmail(values, onSubmitProps, handleToast)} // Pass handleToast here
        >
          {(formik) => (
            <Form>
              {/* Input field for email */}
              <Field
                as={TextField}
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={<ErrorMessage name="email" />}
                sx={{ mb: "1rem" }}
              />

              {/* Button to send email */}
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={formik.isSubmitting}
              >
                Send Email
              </Button>
              
              {message ? <p style={{ color: "green", fontWeight: "bold" }}>Check your email to see the link to rest your password</p> :"" }
            </Form>
          )}
        </Formik>
      </Box>
      <ToastContainer/>
    </Box>
  );
};

export default ForgotPassword;
