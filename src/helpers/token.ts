import { sign,verify } from 'jsonwebtoken'

import {config} from 'dotenv'
import { HTTPForbidden } from '../exceptions';
config();

export const generateToken = (payload: {
  userId: number
  roleId: number
}) => sign(payload, process.env.SIGINING_KEY as string, {
  expiresIn: 365 * 24 * 60 * 60   //in sec
})

export const validateToken = function (token: string): Object {
  try {
    const signKey: any = process.env.SIGINING_KEY as string;
    return verify(token, signKey);
  } catch (err) {
    throw new HTTPForbidden('Invalid token');
}};