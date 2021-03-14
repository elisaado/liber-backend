import { OAuth2Client } from "google-auth-library";
import { googleOAuth2ClientID } from "../../config.json";
const client = new OAuth2Client(googleOAuth2ClientID);

export default client;