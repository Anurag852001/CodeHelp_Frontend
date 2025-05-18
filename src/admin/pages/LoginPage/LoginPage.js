import { color } from 'echarts';
import WelcomeBackGround from '../../../components/WelcomeBackground/WelcomeBackGround';
import styles from './LoginPage.module.css';
import { useState } from 'react';
import Logo from "../../../resources/Logo.svg";
import { Google } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Facebook,Twitter,Instagram } from '@mui/icons-material';
function LoginPage(){
    const [isAdmin,setIsAdmin] = useState(false);

    const onAdminSwitchToggleClick=()=>{
        setIsAdmin(!isAdmin);
    }

    return <WelcomeBackGround  >
        <div className={styles.mainContainer}>
       <div className={styles.leftSection}>
  <img src={Logo} alt="Welcome" className={styles.illustration} />
  <div className={styles.welcomeText}>Code. Compile. Conquer.</div>
</div>

        <div className={styles.rightSection}> 
            <div className={styles.loginPortal}> 
                <div className={`${styles.adminWebsiteSwitch} ${!isAdmin ? styles.websiteActive : ''}`} onClick={onAdminSwitchToggleClick}> 
                    
                    <span className ={ isAdmin ? styles.adminSwitchSpanActive:styles.adminSwitchSpanDisabled }>Admin</span>
                    <span className={!isAdmin ? styles.adminSwitchSpanActive:styles.adminSwitchSpanDisabled}>User</span>
                    <div className={styles.slider}></div>
                </div>
            <div className={styles.inputSection}>
                <input type='Text' placeholder='Enter email or phone number'></input>
                <input type='Password' placeholder='Enter password'></input>
                <button>Login</button>
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