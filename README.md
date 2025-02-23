# 🏠 Uspace - Space Booking Platform

## Overview

**Uspace** is a modern space booking platform where users can browse, search, and rent spaces seamlessly. From category-based searches to secure Stripe payments, Uspace provides a smooth experience for both users and space owners.

---

## 📸 Screenshot

![Uspace Screenshot](https://i.postimg.cc/2jGrrsmx/Screenshot-2025-02-10-002809.png)

---

## 🛠️ Technologies Used

### **Frontend & Backend**

- Next.js 14
- React.js 18
- Tailwind CSS
- Framer Motion (for animations)

### **State Management**

- Zustand (lightweight global state management)

### **Authentication**

- NextAuth.js with @auth/prisma-adapter
- Social login support

### **Database & ORM**

- MongoDB with Mongoose
- Prisma ORM

### **File & Media Storage**

- Cloudinary (for images & videos)

### **Payment Integration**

- Stripe with webhooks

### **Others**

- Mailtrap (for email confirmations)
- Radix UI components

---

## 🚀 Core Features

✔️ **Space Booking & Management**

- Browse spaces based on categories (e.g., offices, warehouses, studios).
- Search for spaces by name.
- Filter results by price, category, or name.
- View detailed space pages with images, videos, and descriptions.

✔️ **Seamless Booking Process**

- Choose start and end dates for rental.
- Add selected spaces to the cart before checkout.
- Secure Stripe payments with webhook integration.

✔️ **Authentication & User Management**

- Social login for easy access.
- Users can add new spaces, upload images & videos via Cloudinary.
- After login, users can manage their bookings and spaces.

✔️ **Order Confirmation & Email Notifications**

- Upon successful payment, users receive a confirmation email.
- View past orders with payment status.

---

## 📦 Dependencies

### **Production Dependencies**

```json
{
  "@auth/prisma-adapter": "^2.7.0",
  "@hookform/resolvers": "^3.9.0",
  "@prisma/client": "^5.20.0",
  "@radix-ui/react-dialog": "^1.1.2",
  "@radix-ui/react-icons": "^1.3.0",
  "@radix-ui/react-label": "^2.1.0",
  "@radix-ui/react-navigation-menu": "^1.2.1",
  "@radix-ui/react-select": "^2.1.2",
  "@radix-ui/react-slider": "^1.2.1",
  "@radix-ui/react-slot": "^1.1.0",
  "@radix-ui/react-toast": "^1.2.2",
  "@stripe/stripe-js": "^4.8.0",
  "axios": "^1.7.7",
  "bcrypt": "^5.1.1",
  "class-variance-authority": "^0.7.0",
  "cloudinary": "^2.5.1",
  "clsx": "^2.1.1",
  "formidable": "^3.5.1",
  "framer-motion": "^11.11.8",
  "lucide-react": "^0.452.0",
  "mailtrap": "^3.4.0",
  "mongodb": "^6.9.0",
  "mongoose": "^8.7.2",
  "next": "14.2.15",
  "next-auth": "^5.0.0-beta.22",
  "react": "^18",
  "react-confetti": "^6.1.0",
  "react-datepicker": "^7.5.0",
  "react-dom": "^18",
  "react-hook-form": "^7.53.0",
  "react-icons": "^5.3.0",
  "stripe": "^17.2.1",
  "tailwind-merge": "^2.5.3",
  "tailwindcss-animate": "^1.0.7",
  "zod": "^3.23.8",
  "zustand": "^5.0.0-rc.2"
}
```

---

## 🛠️ Getting Started (Run Locally)

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/tapader13/USpace.git
cd USpace
```

### 2️⃣ Install Dependencies

```sh
npm install
```

### 3️⃣ Set Up Environment Variables

Create a `.env` file in the root directory and add the following:

```env
NEXT_PUBLIC_STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_URl=https://space-booking-psi.vercel.app/
DATABASE_URL=your_mongodb_connection_string
AUTH_GOOGLE_ID=your_google_auth_client_id
AUTH_GOOGLE_SECRET=your_google_auth_secret
NEXT_PUBLIC_SECRET=your_secret_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_STRIPE_PUBLISABLE_KEY=your_stripe_public_key
NEXT_PUBLIC_STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_MAIL_TOKEN=your_mailtrap_token
```

### 4️⃣ Run Migrations (For Prisma)

```sh
npx prisma migrate dev --name init
```

### 5️⃣ Start the Development Server

```sh
npm run dev
```

### 6️⃣ Open in Browser

Visit **[https://space-booking-psi.vercel.app](https://space-booking-psi.vercel.app)** to see the app in action.

---

## 🔗 Live Demo & Resources

🚀 **Live Project:** [Uspace Live](https://space-booking-psi.vercel.app/)

---

## 🤝 Contributing

Contributions are always welcome!

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---

⭐ **Like this project?** Give it a star on GitHub!
