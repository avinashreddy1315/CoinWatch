import * as React from 'react';
import LoginComponent from "../../components/logincomponent";
import BeforeNavBar from '../../components/beforenavbarcomponent';
import OtherSignInMethods from '../../components/othersigninmethodscomponent'
import { Link, Outlet } from "react-router-dom";
import AnimatedPage from '../../components/pageAnimations/AnimatedPage';





export default function LoginPage() {

  const [showPassword, setShowPassword] = React.useState(false);


  return (
    <AnimatedPage>
    <div>
      
      <div className="login">
        <LoginComponent />
      
        <p id='or'>or</p>
        {/*<OtherSignInMethods  />*/}

        <Link to="/signup" id='dont_wallet'><a >Don't Have an Wallet?</a></Link>
        
      </div>
    </div>
    </AnimatedPage>
  )
}