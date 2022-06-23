import { Profile } from "./Profile";

export interface Video {
    id: string,
    title: string,
    videoUrl: string,
    owner: Profile
}
