import { MailtrapClient } from 'mailtrap';

export const client = new MailtrapClient({
  token: process.env.NEXT_PUBLIC_MAIL_TOKEN || '',
});

export const sender = {
  email: 'hello@demomailtrap.com',
  name: 'Booking Space',
};
