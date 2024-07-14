import { Link } from "react-router-dom";
import LoginIcon from '@mui/icons-material/LoginOutlined';
import WalletIcon from '@mui/icons-material/Wallet';
import logo from '../images/logo.png'
import coinwatch from '../images/coinwatchbgremoved.png'



export default function WelcomePage() {
    return (
        <div className="welcomepage">
            <nav id='logo_nav'>
                <img id='cryptowatch_logo' src={logo} alt='logo'></img>
                <img id='coinwatch_logo' src={coinwatch} alt='cryptowatch'></img>
            </nav>
            <div className="welcomepage_content">
                <h2 className="text-white">Welcome's you </h2>
                <div className="welcomepagebuttons">
                    <Link to="/login">
                        <button className="welcomepage_btn" id="login_btn">Login <LoginIcon /> </button>
                    </Link>
                    <Link to="/signup">
                        <button className="welcomepage_btn" id="signup_btn" >Create A Wallet <WalletIcon /></button>
                    </Link>
                </div>
            </div>
        </div>
    )
}