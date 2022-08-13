import { Stream } from "stream";


export interface Upload {
    filename: string;
    mimietype: string;
    encoding: string;
    createReadStream: () => Stream
}