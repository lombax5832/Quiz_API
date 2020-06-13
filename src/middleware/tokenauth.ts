import { decode } from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { OAuth2Client } from 'google-auth-library';

const CLIENT_ID = '898363856225-9fiul6rmh2ps3a4jhnqrpq1829h84ikl.apps.googleusercontent.com';
/**
 * Google Decoded token
 * {
  iss: 'accounts.google.com',
  azp: '898363856225-9fiul6rmh2ps3a4jhnqrpq1829h84ikl.apps.googleusercontent.com',
  aud: '898363856225-9fiul6rmh2ps3a4jhnqrpq1829h84ikl.apps.googleusercontent.com',
  sub: '115710328113662459527',
  email: 'd.snytkine@gmail.com',
  email_verified: true,
  at_hash: 'CLa8NU43gwZeus9lsJbvag',
  name: 'Dmitri Snytkine',
  picture: 'https://lh3.googleusercontent.com/a-/AOh14GhJAxe_yEB6pQnno-iHv6hMIREZvLE8S0Hu8Da5gw=s96-c',
  given_name: 'Dmitri',
  family_name: 'Snytkine',
  locale: 'en',
  iat: 1592060158,
  exp: 1592063758,
  jti: '219c0fb5eae7fa5c291bf22934a02830cd379f6d'
}
 * @param req
 * @param res
 * @param next
 */



const client = new OAuth2Client(CLIENT_ID);

async function verifyGoogleToken(token: string) {

  try {
    const certs = await client.getFederatedSignonCerts();
    console.log('certs:', certs);
    const verifiedSigned = await client.verifySignedJwtWithCertsAsync(token, certs.certs, CLIENT_ID, ['accounts.google.com']);
    console.log('verifiedSigned', verifiedSigned);
    return verifiedSigned.getPayload();
  } catch (e) {
    console.error('Error verifiedSigned', e);
    throw e;
  }

}


export default function validateToken(req, res: Response, next: NextFunction) {

  if (req.headers?.authorization?.toLowerCase()?.startsWith('bearer ')) {
    const token = req.headers.authorization.substr(7).trim();
    console.log('Have Authorization header:', token);
    const decodedToken = decode(token);
    console.dir(decodedToken);
    if(decodedToken && typeof decodedToken !== 'string' && decodedToken.iss === 'accounts.google.com') {
      verifyGoogleToken(token).then(result => {
        console.log('verified', result);
        /**
         * Pass authToken in req object
         */
        req.authToken = {
          'type': 'JWT',
          'provider': 'GOOGLE',
          token: result
        }
        next();
      }).catch(e => {
        console.error('verification failed', e);
        next(new Error('Failed to validate Google Token. ' + e.message));
      });
    } else {
      console.error('UNKNOWN Authorization token provider', decodedToken);
      next(new Error('Unknown Token Provider'));
    }

  } else {
    console.log('NO Authorization header');
    next();
  }


}
