import { google } from 'googleapis';
import { environment } from './environment.helper';

export const OAuth2Client = new google.auth.OAuth2(
  environment.get('GOOGLE_CLIENT_ID'),
  environment.get('GOOGLE_CLIENT_SECRET'),
  'http://localhost:3000',
);
