import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_PHONE_NUMBER;

if (!accountSid || !authToken || !fromNumber) {
  throw new Error("Missing Twilio environment variables");
}

const client = twilio(accountSid, authToken);

export async function sendSms(to: string, body: string) {
  return client.messages.create({
    body,
    from: fromNumber,
    to,
  });
}