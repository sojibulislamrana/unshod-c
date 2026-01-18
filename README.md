# UniShop Client

The frontend application for UniShop, a modern e-commerce platform built with Next.js 15.

## 🚀 Features
- **Responsive Design**: Premium UI with Hero, Featured Categories, and Trending sections.
- **Product Management**: Browse collections and view detailed product pages.
- **Admin Features**: Secure "Add Item" page with Toast notifications.
- **Authentication**: Custom authentication flow using NextAuth.js (Mock Credentials).

## 🛠 Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS, Lucide React icons
- **Authentication**: NextAuth.js
- **State Management**: React Context (ToastProvider)

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- UniShop Server running on port 5001

### Installation

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment:
   Create `.env.local`:
   ```env
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=any_secret_string
   ```

### Running the App

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔑 Login Credentials (Mock)
- **Email**: `admin@example.com`
- **Password**: `password123`

## 📂 Key Directory Structure
- `src/app` - App Router pages (`/`, `/items`, `/login`, `/admin`)
- `src/components` - Reusable UI components (`ProductCard`, `Navbar`, etc.)
- `src/components/ui` - Shadcn-like UI primitives (Button, Input, Toast)
- `src/lib` - Utilities

## 📝 Usage
1. **Browse**: Visit the home page to see trending items.
2. **Shop**: Click "Shop" or "View Collections" to see all products.
3. **Login**: Use the credentials above to access admin features.
4. **Add Item**: Navigate to "Add Item" (after login) to list new products.
