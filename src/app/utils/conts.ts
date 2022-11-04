export interface User {
    id: string,
    username: string,
    //avatar: ????  
}

export interface UserIdToData {
     [key: string]: User 
};

export interface Message {
    user?: any //string
    //avatar: ????
    message:  any //string,
    createdAt: any //string,
}