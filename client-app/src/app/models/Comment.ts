

export interface VideoCommentsModel{
    videoId:string;
    comments: Comment[];
}

export interface Comment{
    id:string;
    body:string;
    author: CommentAuthor;
    createdAt: string;
}

export interface CommentAuthor{
    username: string;
    displayName: string;
}