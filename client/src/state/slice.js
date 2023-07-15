import { createSlice} from "@reduxjs/toolkit"

const initialState={
    mode:"light",
    user:null,
    token:null,
    adminToken:null,
    admin:null,
    posts:[],
    followers:[],
    following:[]

};
export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {


        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },


        setLogin: (state, action) => {

            state.token = action.payload.token.token;
            state.user = action.payload.token.user;
        },


        setAdminLogin: (state, action)=>{
            state.adminToken=action.payload.token.token;
            state.admin=action.payload.token.admin
        },


        setLogout: (state) => {
            state.user = null;
            state.token = null;
            
        },
       

        setAdminLogout: (state) => {
            state.admin = null;
            state.adminToken = null;
        } ,

        setPosts:(state,action)=>{
            state.posts=action.payload.posts;
        } ,

        setPost:(state,action)=> {
            const updatedPosts=state.posts.map((post)=>{
                if(post._id===action.payload.post_id) return action.payload.post
                return post
            })
            state.posts=updatedPosts
        },

        setUpdatePost: (state, action) => {

            state.posts.shift(action.payload.posts)
        },

        setFollowing: (state, action) => {
            if (state.user) {
                state.user.following = action.payload.following;
                state.following = action.payload.following
            } else {
                console.error("user friends non-existent :(");
            }
        },
        

        setFollowers: (state, action) => {
            if (state.user) {
                state.user.followers = action.payload.followers;
                state.followers = action.payload.followers
            } else {
                console.error("user friends non-existent :(");
            }
        },
        
        setFriendFollowers: (state, action) => {
            state.friendFollowers = action.payload?.followers;
        },
        setUpdateFriendFollowers: (state, action) => {
            // state.friendFollowers = action.payload?.followers;
            console.log(state.friendFollowers, "><><><<>");
        },
        setFriendFollowing: (state, action) => {
            state.friendFollowing = action.payload?.following;
        },
        
        deleteUpdate: (state, action) => {
            const postId = action.payload;
            state.posts = state.posts.filter((post) => post._id !== postId);
        },
        
    },
  });

export const {setMode,setLogin,setLogout,setAdminLogin,setAdminLogout,setPost,setPosts,setFollowing,setFollowers,setUpdatePost,setFriendFollowers,deleteUpdate,setUpdateFriendFollowers}=authSlice.actions

export default authSlice.reducer;

  