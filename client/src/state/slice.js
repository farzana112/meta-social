import { createSlice} from "@reduxjs/toolkit"

const initialState={
    mode:"light",
    user:null,
    token:null,
    adminToken:null,
    admin:null,
    posts:[],
    followers:[],
    following:[],
    friendFollowers:[],
    friendFollowing:[],
    chatUsers:[]

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
                if(post._id===action.payload.post._id) return action.payload.post
                return post
            })
            state.posts=updatedPosts
        },

        setUpdatePost: (state, action) => {

            state.posts.shift(action.payload.posts)
        },

        
        deleteUpdate: (state, action) => {
            const postId = action.payload;
            state.posts = state.posts.filter((post) => post._id !== postId);
        },


        setFollowers: (state, action) => {
            if (state.user) {
                state.user.followers = action.payload.followers;
                state.followers = action.payload.followers
            } else {
                console.error("user friends non-existent :(");
            }
        },
        
        
        setFollowing: (state, action) => {
            if (state.user) {
                state.user.following = action.payload.following;
                state.following = action.payload.following
            } else {
                console.error("user following non-existent :(");
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

        
        
        setUpdate: (state, action) => {
            state.user = action.payload;
            state.user.following = state.following
            state.user.followers = state.followers
        },


        setChatUsers: (state, action) => {
            state.chatUsers = action.payload.user
        }
    },


   



  });

export const {

    setMode,
    setLogin,
    setLogout,
    setAdminLogin,
    setAdminLogout,
    setPost,
    setPosts,
    setUpdatePost,
    deleteUpdate,
    setFollowers,
    setFollowing,
    setFriendFollowing,
    setFriendFollowers,
    setUpdateFriendFollowers,
    setUpdate , 
    setChatUsers } = authSlice.actions

export default authSlice.reducer;

  