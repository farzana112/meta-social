import { useEffect,useState } from "react"

import { useDispatch,useSelector } from "react-redux"

import { setPosts } from "../../state/slice"
import PostWidget from "../../components/Widget/PostWidget"
import {getPosts,getUserPosts} from "../../api/postRequest/postRequest"
import {
    Box,
    LinearProgress
} 
from "@mui/material"

const PostsWidget=  ({click,userId,isProfile =false})  =>
 {

   const dispatch=useDispatch();
   const posts=useSelector((state)=>state.posts);
   const token=useSelector((state)=>state.token)
   const [isLoading, setIsLoading] = useState(true);
   const [post, setPost] = useState(false);


const getPost=async () => {
    const response = await getPosts(userId, token);
    console.log("all posts")
    console.log(response)
    const data = await response;
    dispatch(setPosts({ posts: data.posts }));
    setIsLoading(false);
  };
const userPosts = async () => {
    const response = await getUserPosts(userId, token);
    const data = await response;
    console.log("posts of the user")
    console.log(response)
    dispatch(setPosts({ posts: data.posts }));
    setIsLoading(false);
  };
  const buttonclicked = () => {
    setPost(!post);
  };

  useEffect(() => {
    if (isProfile) {
      userPosts();
    } else {
      getPost();
    }
  }, [post, isProfile, userId,click]); // eslint-disable-line react-hooks/exhaustive-deps

  return(
    <>
    {isLoading ? (
      <>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <LinearProgress color='secondary' />
          <LinearProgress color='success' />
          <LinearProgress color='inherit' />
        </Box>
      </>
    ) : posts.length === 0 ? (
      isProfile ? (
        <p>No posts to show...</p>
      ) : (
        <p>Follow some friends to see their posts...</p>
      )
    ) : (
      posts.map(
        ({
          _id,
          userId,
          userName,
          description,
          image,
          likes,
          comments,
          report,
          createdAt,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserName={userName}
            postUserId={userId}
            postCreatedAt={createdAt}
            name={userName}
            description={description}
            image={image}
            likes={likes}
            comments={comments}
            report={report}
            buttonclicked={buttonclicked}
            isProfile={isProfile ? isProfile : false}
            
          />
        )
      )
    )}
  </>
  )

}



export default PostsWidget