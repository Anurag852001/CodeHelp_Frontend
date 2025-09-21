import { color } from 'echarts';
import WelcomeBackGround from '../../../components/WelcomeBackground/WelcomeBackGround';
import styles from './LoginPage.module.css';
import { useEffect, useState, } from 'react';
import Logo from "../../../resources/Logo.svg";
import { Google } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Facebook,Twitter,Instagram } from '@mui/icons-material';
import { login } from '../../../apiUtils/apiCalls';
import { useNavigate } from 'react-router-dom';
import tokenChecker from '../../../utils/tokenChecker';
function LoginPage(){
    const [isAdmin,setIsAdmin] = useState(true);
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [otpEnabled,setOtpEnabld] = useState(false);
    const [loading, setLoading] = useState(true);
    const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);
    
    const navigate = useNavigate();

    const onAdminSwitchToggleClick=()=>{
        setIsAdmin(!isAdmin);
    }
    const onEmailChangeHandler = (event) => {
        setEmail(event.target.value);
    }
    const onPasswordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    useEffect(() => {
        tokenChecker().then((isValid) => {
            if (isValid) {
                setIsAlreadyLoggedIn(true);
                setLoading(false);
                navigate(isAdmin ? '/' : '/problems');
            } else {
                setLoading(false);
            }
    })}, []);


    const onLoginClickHandler = () => {
        if (email === '' || password === '') {
            alert('Please enter both email and password');
            return;
        }
        login(email, password, otpEnabled, isAdmin ? 'ADMIN' : 'USER').then((response) => {
            console.log('Login response:', response);
            if(response.success == false){
                throw new Error(response.message);
            }
         
            localStorage.setItem('token', response.token);
            if(isAdmin){
                navigate ('/admin');
            }
            else{
                navigate ('/problems'); 
            }
        }).catch((error) => {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
        }
        );
    }

return  loading? <div>Loading..</div>:<WelcomeBackGround  >
        <div className={styles.mainContainer}>
       <div className={styles.leftSection}>
  <img src={Logo} alt="Welcome" className={styles.illustration} />
  <div className={styles.welcomeText}>Code. Compile. Conquer.</div>
</div>

        <div className={styles.rightSection}> 
            <div className={styles.loginPortal}> 
                <div className={`${styles.adminWebsiteSwitch} ${isAdmin ? styles.websiteActive : ''}`} onClick={onAdminSwitchToggleClick}> 
                    
                    <span className ={!isAdmin ? styles.adminSwitchSpanActive:styles.adminSwitchSpanDisabled }>Admin</span>
                    <span className={isAdmin ? styles.adminSwitchSpanActive:styles.adminSwitchSpanDisabled}>User</span>
                    <div className={styles.slider}></div>
                </div>
            <div className={styles.inputSection}>
                <input type='Text' placeholder='Enter email or phone number' onChange={onEmailChangeHandler}></input>
                <input type='Password' placeholder='Enter password' onChange={onPasswordChangeHandler}></input>
                <button onClick={onLoginClickHandler}>Login</button>
            </div>
          <div className={styles.footerSection}> 
            <IconButton aria-label="Login with Google" className={styles.footerSpan}>
                <Google className={styles.icon} />
            </IconButton>
            <IconButton aria-label="Login with Facebook" className={styles.footerSpan}>
                <Facebook className={styles.icon} />
            </IconButton>
             <IconButton aria-label="Login with Google" className={styles.footerSpan}>
                <Twitter className={styles.icon} />
            </IconButton>
            <IconButton aria-label="Login with Facebook" className={styles.footerSpan}>
                <Instagram className={styles.icon} />
            </IconButton>
        </div>
            </div>
        </div>
        </div>
        </WelcomeBackGround>
}
export default LoginPage;