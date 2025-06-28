# CodeHelp Frontend

A modern React-based coding platform that provides an interactive environment for practicing coding problems, with features like code compilation, AI assistance, and comprehensive reporting.

## 🚀 Features

### For Users
- **Interactive Code Editor**: Monaco Editor with syntax highlighting for multiple languages (Java, C++, Python)
- **Problem Solving**: Practice coding problems with real-time compilation and testing
- **AI Chat Assistant**: Get help and explanations for coding problems
- **Progress Tracking**: View detailed reports and analytics of your coding progress
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### For Admins
- **Question Management**: Create and edit coding problems with rich formatting
- **Content Management**: Add constraints, examples, and test cases
- **User Management**: Monitor user progress and system usage

## 🛠️ Tech Stack

- **Frontend**: React 18 with Hooks
- **Code Editor**: Monaco Editor (VS Code's editor)
- **Styling**: CSS Modules
- **Charts**: ECharts for data visualization
- **Icons**: Material-UI Icons
- **Routing**: React Router DOM
- **Build Tool**: Create React App

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd CodeHelp_Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Configuration

### Environment Setup
The application expects the following backend services to be running:

- **Main Backend**: `http://localhost:8000` (configured in package.json proxy)
- **AI Backend**: `http://localhost:8080` (for chat functionality)
- **Reporting Backend**: `http://localhost:9000` (for analytics)

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📁 Project Structure

```
src/
├── admin/                 # Admin interface components
│   ├── pages/            # Admin pages (login, question editing)
│   └── AdminMainPage.js  # Main admin dashboard
├── user/                 # User interface components
│   ├── pages/            # User pages (problem solving, chat, reports)
│   └── UserMainPage.js   # Main user dashboard
├── components/           # Reusable UI components
│   ├── AutoComplete/     # Dropdown component
│   ├── InputText/        # Text input component
│   ├── NavigationBar/    # Navigation component
│   └── ResultModal/      # Modal for displaying results
├── apiUtils/            # API integration layer
├── enums/               # Application enums
├── resources/           # Static assets (images, icons)
└── utils/               # Utility functions
```

## 🎯 Key Components

### Code Editor
- Monaco Editor integration with syntax highlighting
- Support for multiple programming languages
- Real-time code compilation and testing
- Customizable themes and settings

### Chat System
- AI-powered coding assistant
- Real-time messaging interface
- Message history and timestamps
- Loading states and error handling

### Problem Management
- Rich text editing for problem descriptions
- Dynamic constraint and example management
- Variable type management with autocomplete
- Code template generation

## 🔒 Security Features

- Token-based authentication
- Secure API communication
- Input validation and sanitization
- Error boundary implementation

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop computers (1920x1080 and above)
- Tablets (768px and above)
- Mobile devices (480px and above)

## 🐛 Error Handling

The application includes comprehensive error handling:
- Network error recovery
- User-friendly error messages
- Loading states for better UX
- Graceful degradation for offline scenarios

## 🚀 Performance Optimizations

- Lazy loading of components
- Optimized bundle splitting
- Efficient state management
- Minimal re-renders with React.memo

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

If you encounter any issues or have questions:
1. Check the existing issues in the repository
2. Create a new issue with detailed information
3. Contact the development team

## 🔄 Recent Updates

- Improved error handling across all components
- Enhanced user experience with loading states
- Better responsive design for mobile devices
- Comprehensive form validation
- Modern chat interface with real-time features

---

**Built with ❤️ by the CodeHelp Team**
