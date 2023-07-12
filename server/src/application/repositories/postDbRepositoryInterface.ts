import { postRepositoryType } from "../../frameworks/database/Mongodb/repositories/postRepository"


export const postDbInterface=(repository:ReturnType<postRepositoryType>) => {

    const createPost = async(post:{
        userId:string;
        description:string;
        image:string[];
        userName:string;

        
    }) => await repository.createPost(post)
    const getAllPosts = async () => await repository.getAllPosts()
    return {
        createPost,
        getAllPosts
    }


    
}
export type postDbInterfaceType = typeof postDbInterface
