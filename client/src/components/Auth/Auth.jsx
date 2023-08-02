import { useState } from "react";
import {
  Typography,
  Avatar,
  Button,
  Paper,
  Grid,
  Container,
  Link
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import useStyles from "./styles";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/slice";
import { register, login,googleLogin } from "../../api/AuthRequest/AuthRequest";

const Auth = () => {
  let classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const handleSubmit = async (values, onSubmitProps) => {
    if (isSignup) {
      const userData = await register(values, onSubmitProps, handleToast);
      if (userData.status === "success") {
        dispatch(setLogin(userData));
        navigate("../home", { replace: true });
      } else {
        handleToast("Something went wrong", "error");
      }
    } else {
      const userData = await login(values, onSubmitProps, handleToast);
      dispatch(setLogin(userData));
      navigate("../home", { replace: true });
    }
  };
  const handleToast = (message, type) => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    }
  };



  const getValidationSchema = () => {
    if (isSignup) {
      return yup.object().shape({
        name: yup
          .string()
          .required("Name is required")
          .matches(
            /^[^\s].{2,}$/,
            "Name must not start with a space and have at least 3 characters"
          ),
        userName: yup
          .string()
          .required("UserName is required")
          .matches(
            /^[^\s].{2,}$/,
            "UserName must not start with a space and have at least 3 characters"
          ),
        number: yup
          .string()
          .required("Number is required")
          .matches(
            /^[^\s].{2,}$/,
            "Number must not start with a space and have at least 3 characters"
          ),
          age: yup
          .number()
          .positive("Age must be a positive number")
          .min(18, "Age must be at least 18")
          .required("required"),

        email: yup
          .string()
          .email("Invalid email")
          .required("Email is required"),
          password: yup
          .string()
          .required("Password is required")
          .matches(
            /^(?=.*[0-9])(?=.*[!@#$%^&*])[^\s].{2,}$/,
            "Password must not start with a space, have at least 3 characters, contain a number, and a special character"
          ),
        confirmPassword: yup
          .string()
          .oneOf([yup.ref("password")], "Passwords must match"),

      });
    } else {
      return yup.object().shape({
        userName: yup.string().required("UserName is required"),
        password: yup.string().required("Password is required"),
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      userName: "",
      number: "",
      email: "",
      age:"",
      password: "",
      confirmPassword: "",
    },
    validationSchema: getValidationSchema(),
    onSubmit: handleSubmit,
  });

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    formik.resetForm();
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

 
const handleGoogleLogin = async()=>{
 await signInWithPopup(auth,provider).then(async (UserCredentials)=>{
  const result = await googleLogin(UserCredentials.user,handleToast);
  if (result.status === "success") {
    dispatch(setLogin(result));
    navigate("../home", { replace: true });
  } else {
    handleToast("Something went wrong", "error");
  }
 }).catch((e)=>{
  console.error("Google authentication failed:", e);

  handleToast("Something went wrong", e);

 })
}
 
  
  return (
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
      {/* <ToastContainer position="bottom-left" /> */}
      <Paper className={classes.paper} elevation={6}>
      <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <Typography
            variant="h4"
            component="h1"
            style={{
              fontWeight: "bold",
              color: "#00D5FA",
              textTransform: "uppercase",
            }}
          >
            Meta Social
          </Typography>
        </div>

        <Avatar className={classes.avatar}></Avatar>
        <Typography component='h1' variant='h5'>
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>
        
        <form className={classes.form} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name='name'
                  label='Name'
                  handleChange={formik.handleChange}
                  value={formik.values.name}
                  error={formik.errors.name}
                  autoFocus
                  half
                />
                <Input
                  name='userName'
                  label='UserName'
                  handleChange={formik.handleChange}
                  value={formik.values.userName}
                  error={formik.errors.userName}
                  half
                />
              </>
            )}
            {!isSignup && (
              <Input
                name='userName'
                label='UserName'
                handleChange={formik.handleChange}
                value={formik.values.userName}
                error={formik.errors.userName}
              />
            )}

            {isSignup && (
              <>
                <Input
                  name='number'
                  label='Number'
                  handleChange={formik.handleChange}
                  value={formik.values.number}
                  error={formik.errors.number}
                  type='number'
                />
                <Input
                  name='email'
                  label='Email Address'
                  handleChange={formik.handleChange}
                  value={formik.values.email}
                  error={formik.errors.email}
                  type='email'
                />
                <Input
  name="age"
  label="Age"
  handleChange={formik.handleChange}
  value={formik.values.age}
  error={formik.errors.age}
  type="number"
/>

              </>
            )}

            <Input
              name='password'
              label='Password'
              handleChange={formik.handleChange}
              value={formik.values.password}
              error={formik.errors.password}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name='confirmPassword'
                label='Confirm Password'
                handleChange={formik.handleChange}
                value={formik.values.confirmPassword}
                error={formik.errors.confirmPassword}
                type='password'
              />
            )}
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
            style={{ margin: "16px 0 16px" }}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          

          <Grid container justifyContent='space-between'>

          <Button onClick={handleGoogleLogin}>Login with Google</Button>

          
            <Grid item>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Log In"
                  : "New user? Sign Up"}
              </Button>
              <Grid item>
       
        </Grid> 
            </Grid>
          </Grid>
        </form>
      </Paper>
      <ToastContainer position='bottom-center' />
    </Container>
  );
};

export default Auth;
