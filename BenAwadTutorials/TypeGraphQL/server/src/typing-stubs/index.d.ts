import session from 'express-session';

declare module 'express-session' {
    export interface SessionData {
        userID: any;
        [Key: string]: any;
    }
}