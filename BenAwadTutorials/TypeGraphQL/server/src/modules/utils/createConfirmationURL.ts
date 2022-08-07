import {v4} from 'uuid'

import { redis } from '../../redis'

export const createConfirmationURL = async (userID: number) => {
    const token = v4();
    await redis.set(token, userID, "EX", 60*60*24); // 1 day expiration 

    return `http://localhost:3000/user/confrim/${token}` 
}