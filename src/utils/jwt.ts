import { KJUR } from 'jsrsasign';
const JWS = KJUR.jws.JWS;

import Config from 'react-native-config';
const { 
  TWILIO_ACCOUNT_SID: account_sid,
  TWILIO_API_KEY: api_key,
  TWILIO_API_SECRET: api_secret,
} = Config;

/**
 * Twilio JWT Format:
 * https://www.twilio.com/docs/iam/access-tokens#jwt-format
 * 
 * How to Generate with jsrasign:
 * https://github.com/kjur/jsrsasign/wiki/Tutorial-for-JWT-generation
 */
export const twilio = (
  identity: string = 'test-uid',
  room: string = 'test',
): string | null => {
  if (!account_sid || !api_key || !api_secret) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);  
  const header = {
    alg: 'HS256',
    cty: 'twilio-fpa;v=1',
    typ: 'JWT'
  };
  const payload = {
    jti: api_key + '-' + now,
    iss: api_key,
    sub: account_sid,
    iat: now,
    nbf: now,
    exp: now + (60 * 60), // 60 seconds * 60 mins = 1 hour
    grants: { 
      identity,
      video: { room } 
    }
  };
  const token = JWS.sign(
    'HS256',
    JSON.stringify(header), 
    JSON.stringify(payload), 
    {utf8: api_secret}
  );

  console.log('JWT Token: ', token);
  return token;
}