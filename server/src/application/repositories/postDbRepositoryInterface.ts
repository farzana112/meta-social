import { postRepositoryType } from "../../frameworks/database/Mongodb/repositories/postRepository"


export const postDbInterface=(repository:ReturnType<postRepositoryType>) => {

    const createPost = async(post:{
        userId:string;
        description:string;
        image:string[];
        userName:string;

        
    }) => await repository.createPost(post)

    const getAllPosts = async () => await repository.getAllPosts()

    const getUserPosts=async (id: string) => await repository.getUserPosts(id)

    const deletePost = async (id: string) => await repository.deletePost(id) 

    const editPost = async ( postId: string,description: string) => await repository.editPost(postId,description)

    const addComment= async ( postId:string , userId: string , comment:string)=> await repository.addComment(postId,userId,comment)

    const deleteComment= async ( postId:string , userId:string , index:number) => await repository.deleteComment(postId,userId,index)
    return {
        createPost,
        getAllPosts,
        getUserPosts,
        deletePost,
        editPost,
        addComment,
        deleteComment
    }


    
}
export type postDbInterfaceType = typeof postDbInterface
