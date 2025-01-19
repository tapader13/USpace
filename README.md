# 🏠 Uspace - Space Booking Platform  

Uspace is a modern space booking platform where users can browse, search, and rent spaces seamlessly. From category-based searches to secure Stripe payments, Uspace provides a smooth experience for both users and space owners.  

---

## 🚀 Features  

### 🏢 **Space Booking & Management**  
- Browse spaces based on **categories** (e.g., offices, warehouses, studios).  
- **Search** for spaces by name.  
- **Filter** results by price, category, or name.  
- View **detailed space pages** with images, videos, and descriptions.  

### 📅 **Seamless Booking Process**  
- Choose **start and end dates** for rental.  
- Add selected spaces to the **cart** before checkout.  
- Secure **Stripe payments** with webhooks integration.  

### 🔐 **Authentication & User Management**  
- **Social login** for easy access.  
- Users can **add new spaces**, upload **images & videos** via **Cloudinary**.  
- After login, users can **manage their bookings** and spaces.  

### 📧 **Order Confirmation & Email Notifications**  
- Upon successful payment, users receive a **confirmation email**.  
- **View past orders** with payment status.  

---

## 🛠️ Tech Stack  

### **Frontend & Backend**  
- **Next.js 14**  
- **React.js 18**  
- **Tailwind CSS**  
- **Framer Motion** (for animations)  

### **State Management**  
- **Zustand** (lightweight global state management)  

### **Authentication**  
- **NextAuth.js** with **@auth/prisma-adapter**  
- **Social login support**  

### **Database & ORM**  
- **MongoDB** with **Mongoose**  
- **Prisma ORM**  

### **File & Media Storage**  
- **Cloudinary** (for images & videos)  

### **Payment Integration**  
- **Stripe** with **webhooks**  

### **Others**  
- **Mailtrap** (for email confirmations)  
- **Radix UI** components