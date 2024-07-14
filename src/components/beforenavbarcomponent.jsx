import logo from '../images/logo.png'
import coinwatch from '../images/coinwatchbgremoved.png'


export default function BeforeNavBar(){
    return(
        <nav id="before_navbar">
            <img id='belogo' src={logo} alt='logo'></img>
            <img id='becoinwatch' src={coinwatch} alt='cryptowatch'></img>
        </nav>
    )
}