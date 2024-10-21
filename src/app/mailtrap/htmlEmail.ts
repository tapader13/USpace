export const generateOrderEmailHtml = (orderDetails: any) => {
  const { email, amount, shippingAddress, billingAddress, products, isPaid } =
    orderDetails;
  console.log(products, 'products2');
  console.log(orderDetails, 'orderDetails2');
  const productList =
    Array.isArray(products) && products.length > 0
      ? products
          .map(
            (product) => `
        <tr>
          <td>${product.product.name}</td>
          <td>${product.quantity}</td>
          <td>${product.rentalDate}</td>
          <td>${product.startTime} - ${product.endTime}</td>
        </tr>
      `
          )
          .join('')
      : `<tr><td colspan="4">No products in this order.</td></tr>`;

  return `
    <html>
      <head>
        <style>
          .email-container {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            padding: 20px;
            background-color: #f4f4f4;
            border-radius: 10px;
            max-width: 600px;
            margin: auto;
          }
          .email-header {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            text-align: center;
            border-radius: 10px 10px 0 0;
          }
          .email-body {
            padding: 20px;
            background-color: white;
            border-radius: 0 0 10px 10px;
          }
          .email-footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #777;
          }
          .order-table {
            width: 100%;
            border-collapse: collapse;
          }
          .order-table th, .order-table td {
            border: 1px solid #ddd;
            padding: 8px;
          }
          .order-table th {
            background-color: #f2f2f2;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>Thank you for your order, ${email}!</h1>
          </div>
          <div class="email-body">
            <p>Order ID: <strong>${products[0].orderId}</strong></p>
            <p>Payment Status: <strong>${isPaid}</strong></p>
            <p>Total Amount: <strong>$${amount}</strong></p>

            <h3>Shipping Address:</h3>
            <p>${shippingAddress.name}<br/>
               ${shippingAddress.street}<br/>
               ${shippingAddress.city}, ${shippingAddress.postalCode}</p>

            <h3>Billing Address:</h3>
            <p>${billingAddress.name}<br/>
               ${billingAddress.street}<br/>
               ${billingAddress.city}, ${billingAddress.postalCode}</p>

            <h3>Order Details:</h3>
            <table class="order-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                ${productList}
              </tbody>
            </table>

            <p>If you have any questions or need assistance, feel free to reach out to us.</p>
            <p>Best Regards,<br/>The Booking Space Team</p>
          </div>
          <div class="email-footer">
            <p>&copy; 2024 Booking Space. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

// export const generateOrderEmailHtml = (orderDetails: any) => {
//   const htmlContent = `<html><body><h1>Hello, ${orderDetails?.email}</h1><p>This is a test email.</p></body></html>`;
//   return htmlContent;
// };
