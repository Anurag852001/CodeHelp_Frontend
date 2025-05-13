import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import UserMainPage from "../src/user/UserMainPage"
import AdminMainPage from './admin/AdminMainPage';


function App() {


useEffect(() => {
 const handleUncaughtError = (event) => {
    // Check if the error is related to ResizeObserver
    if (event.message && event.message.includes('ResizeObserver loop completed with undelivered notifications')) {
      // Suppress the ResizeObserver warning by not logging it
      console.warn('ResizeObserver warning suppressed:', event.message);
      return;
    } else {
      // Log other uncaught errors
      console.error('Uncaught Error:', event);
    }
  };

  const handleUnhandledRejection = (event) => {
    console.error('Unhandled Promise Rejection:', event.reason);
  };

  window.addEventListener('error', handleUncaughtError);
  window.addEventListener('unhandledrejection', handleUnhandledRejection);

  return () => {
    window.removeEventListener('error', handleUncaughtError);
    window.removeEventListener('unhandledrejection', handleUnhandledRejection);
  };
}, []);
  return (
    <Router>
      <AdminMainPage />
    </Router>
  );
}

export default App;
