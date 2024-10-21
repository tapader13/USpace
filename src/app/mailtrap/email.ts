import { generateOrderEmailHtml } from './htmlEmail';
import { client, sender } from './mailtrap';
export const sendOrderEmail = async (email: string, orderDetails: any) => {
  const recipient = [{ email }];
  console.log(client, 'client');
  console.log(sender, 'sender');
  const htmlContent = generateOrderEmailHtml(orderDetails);
  console.log(htmlContent, 'htmlContent');
  try {
    const res = await client.send({
      from: sender,
      to: recipient,
      subject: 'Order Payment Confirmation',
      html: htmlContent,
      // text: 'Order Payment Confirmation',
      category: 'order 1',
      template_variables: {
        companyName: 'Booking Space Team',
        companyEmail: 'hello@demomailtrap.com',
      },
    });
    console.log(res, 'Order email sent successfully');
  } catch (error) {
    console.log(error);
    throw new Error('Error sending email');
  }
};
