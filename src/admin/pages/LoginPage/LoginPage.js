import { color } from 'echarts';
import WelcomeBackGround from '../../../components/WelcomeBackground/WelcomeBackGround';
import styles from './LoginPage.module.css';
import { useState } from 'react';
function LoginPage(){
    const [isAdmin,setIsAdmin] = useState(false);

    const onAdminSwitchToggleClick=()=>{
        setIsAdmin(!isAdmin);
    }

    return <WelcomeBackGround  >
        <div className={styles.mainContainer}>
        <div className={styles.leftSection}>Welcome to login</div>
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

            </div>
        </div>
        </div>
        </WelcomeBackGround>
}
export default LoginPage;