import { useEffect } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import UserMainPage from "../src/user/UserMainPage"
import AdminMainPage from './admin/AdminMainPage';
import LoginPage from './admin/pages/LoginPage/LoginPage';
import { use } from 'react';
import { checkToken } from './apiUtils/apiCalls';
import AdminPage from './admin/pages/AdminPage/AdminPage';
import ProblemSet from './user/pages/ProblemSetPage/ProblemSet';
import SolveProblemPage from './user/pages/SolveProblemPage/SolveProblemPage';
import QuestionEditPage from './admin/pages/QuestionEditPage/QuestionEditPage';
import ReportPage from './user/pages/ReportPage/ReportPage';
import ChatPage from './user/pages/ChatPage/ChatPage';


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

useEffect(() => {
  const token = localStorage.getItem('token');
  if(token){
   const responseFromCheckToken = checkToken(token);
   if(responseFromCheckToken.success === false){
     localStorage.removeItem('token');
     window.location.href = '/';
   }
  }
},[] );



  return (
    <Router>
    <Routes>
       <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<AdminMainPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/problems" element={<ProblemSet />} />
        <Route path="/solve/:index" element={<SolveProblemPage />} />
         <Route path="/question/addOrUpdate" element={<QuestionEditPage />} />
         <Route path="/reports" element={<ReportPage />} />
         <Route path="/chat" element={<ChatPage />} />
    </Routes>
    </Router>
    
  );
}

export default App;
