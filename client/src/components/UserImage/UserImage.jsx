import { Box } from "@mui/material";
const UserImage = ({ image, size = "60px" }) => {
  const cloudinaryUrl = `${image}`;
  return (
    <Box width={size} height={size}>
      <img
        style={{ objectFit: " cover", borderRadius: "50%" }}
        width={size}
        height={size}
        alt="user"
        src={image?cloudinaryUrl :"assets/profileicon.jpg"}
      />
    </Box>
  );
};

export default UserImage;
