import './MainHeader.css'
import FordLogo from '../assets/ford-icon.png'
import User from '../assets/user.png'

const MainHeader = ({userName}:any) =>{
    return(
        <div className="main-content">
                <a href="/">
                    <img src={FordLogo} className="ford-logo"/>
                    <h2>Program Financial</h2>
                </a>
            <div className="user-information">
                <img src={User} className="user-logo"/>
                <ul className="user-info">
                    <li>Hello,</li>
                    <li>{userName}</li>
                </ul>
            </div>
        </div>
    )
}

export default MainHeader;