import { User } from "./User";

export interface Video {
    id: string,
    title: string,
    videoUrl: string,
    fileKey: string,
    owner: User
}