# LinkUp Social Media

A modern, feature-rich social media application built with React and Vite. Connect with friends, share posts, message users, and explore profiles in a beautiful, responsive interface.

## 🌟 Features

- **User Authentication**: Secure login and registration with Firebase
- **Feed & Posts**: Create, view, and interact with posts from your network
- **User Profiles**: View and edit your profile, explore other users' profiles
- **Messaging**: Real-time messaging system to communicate with friends
- **Friends Management**: Add and manage your friend connections
- **Saved Posts**: Bookmark posts for later viewing
- **Settings**: Customize your account preferences and privacy settings
- **Responsive Design**: Beautiful UI that works seamlessly on all devices

## 🛠️ Tech Stack

### Frontend
- **React 19.2.0** - UI library for building interactive components
- **React Router 7.11.0** - Client-side routing and navigation
- **Vite 7.2.4** - Lightning-fast build tool and development server
- **Tailwind CSS 4.1.18** - Utility-first CSS framework for styling
- **DaisyUI 5.5.14** - Component library built on Tailwind CSS
- **Firebase 12.7.0** - Backend services including authentication and database
- **Axios 1.13.2** - HTTP client for API requests
- **Framer Motion 12.23.26** - Animation library for smooth transitions
- **SweetAlert2 11.26.17** - Beautiful alert dialogs and notifications

### Development Tools
- **ESLint 9.39.1** - Code quality and linting
- **Vite Plugin React 5.1.1** - React support for Vite with Fast Refresh

## 📁 Project Structure
src/ ├── Authentication/   #Login, Registration, and PrivateRoute components ├── Chat/             #Chat and messaging functionality ├── Components/       # Reusable UI components (Main, Feed_RightBar, etc.) ├── Context/          # React Context for global state management ├── LayOut/           # Page layouts (Profile, Friends, Message, Saved, Setting, etc.) ├── User/             # User-related components (EditProfile, etc.) ├── assets/           # Images and static assets ├── App.jsx           # Main application component ├── main.jsx          # Application entry point with routing configuration ├── App.css           # Application-wide styles └── index.css         # Global styles


## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/anujpaul27/LinkUp-Social-Media.git
   cd LinkUp-Social-Media
   
2. **Install dependencies**
   ```bash
   npm install
1. **Set up environment variables Create a .env file in the root directory with your Firebase configuration:**
   ```bash
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id

## 🔐 Authentication

The application uses Firebase Authentication with a private route system. Users must be logged in to access the main application. The PrivateRoute component protects all routes except login and registration pages.
## 🎨 Styling

The application uses Tailwind CSS with DaisyUI components for consistent, modern styling. Custom CSS can be added in component-specific CSS files or through Tailwind utilities.
## 📊 State Management

Global state is managed using React Context API through the ContextProvider component. This allows efficient data sharing across the application without prop drilling.
## 🤝 Contributing
Contributions are welcome! Feel free to:

  - **Fork the repository
  - **Create a feature branch (git checkout -b feature/amazing-feature)
  - **Commit your changes (git commit -m 'Add amazing feature')
  - **Push to the branch (git push origin feature/amazing-feature)
  - **Open a Pull Request



## 📝 License
This project is open source and available for educational and personal use.
## 📧 Contact
For questions or support, please to email fr.anujpaul@gmail.com 
