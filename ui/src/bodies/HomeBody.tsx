import './HomeBody.css'
import { Link } from 'react-router-dom';

export const HomeBody = () => {
    return(
       <>
           <div className="home-container">
                <div className="information-container">
                    <h2>Please select one of the platforms to get your data.</h2>
                </div>
                <div className="modules-container">
                    <Link className="crf-link" to="/crf">CRF</Link>
                    <Link className="fedebom-link" to="/fedebom">FEDEBOM</Link>
                </div>
           </div>
       </>
    )
}