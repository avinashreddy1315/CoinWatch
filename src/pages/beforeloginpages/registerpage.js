import BeforeNavBar from "../../components/beforenavbarcomponent";
import AnimatedPage from "../../components/pageAnimations/AnimatedPage";
import RegisterComponent from "../../components/registercomponent";
import { Link } from "react-router-dom";



export default function RegisterPage(){
    
    return(
        <AnimatedPage>
        <div  className="justify-content-center align-items-center d-flex flex-column hh">
            <div id="register">
            
            <RegisterComponent  />

            </div>

            
        </div>
        </AnimatedPage>
    )
}