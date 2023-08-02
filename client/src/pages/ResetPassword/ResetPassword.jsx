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
// import { resetPassword } from "../../api/AuthRequest/AuthRequest"; // You'll need to import the API function for resetting the password
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {

  const [message, setMessage] = useState("");

  const { id, token } = useParams()
console.log("id and token form reset password page")
console.log(id,token)
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = yup.object().shape({
    password: yup.string().min(6, "Password must be at least 6 characters").required("Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });

  const navigate = useNavigate();
  const handleToast = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };

  const handleResetPassword = async (values, onSubmitProps, handleToast) => {
    try {
      const formData = new FormData();
      formData.append("password", values.password);

    //   const response = await resetPassword(values, onSubmitProps, handleToast);
      // Handle the response, for example, show a success message if the password reset is successful.
      // You can set a state variable to display the success message.

    //   if (response) {
    //     setMessage(true);
    //   }
    } catch (error) {
      console.error(error);
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
          Reset Your Password
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, onSubmitProps) =>
            handleResetPassword(values, onSubmitProps, handleToast)
          }
        >
          {(formik) => (
            <Form>
              {/* Input field for password */}
              <Field
                as={TextField}
                label="Password"
                variant="outlined"
                fullWidth
                type="password"
                name="password"
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={<ErrorMessage name="password" />}
                sx={{ mb: "1rem" }}
              />

              {/* Input field for confirm password */}
              <Field
                as={TextField}
                label="Confirm Password"
                variant="outlined"
                fullWidth
                type="password"
                name="confirmPassword"
                error={
                  formik.touched.confirmPassword &&
                  Boolean(formik.errors.confirmPassword)
                }
                helperText={<ErrorMessage name="confirmPassword" />}
                sx={{ mb: "1rem" }}
              />

              {/* Button to reset password */}
              <Button
                variant="contained"
                type="submit"
                fullWidth
                disabled={formik.isSubmitting}
              >
                Reset Password
              </Button>

              {message ? (
                <p style={{ color: "green", fontWeight: "bold" }}>
                  Password reset successful! You can now login with your new password.
                </p>
              ) : (
                ""
              )}
            </Form>
          )}
        </Formik>
      </Box>
      <ToastContainer />
    </Box>
  );
};

export default ResetPassword;
