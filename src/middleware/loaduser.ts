import { NextFunction, Response } from 'express';
import User from '../models/user'

const TAG = 'LOAD_USER';
export async function loadUser(req, res: Response, next: NextFunction){

  if(req.authToken?.provider === 'GOOGLE' && req.authToken.token){
    const registeredUser = await User.findOne({google_id: req.authToken.token.sub})
    console.log(TAG, 'registeredUser=', registeredUser);
    req.principal = registeredUser;
  }

  next();
}
