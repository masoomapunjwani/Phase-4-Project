import '../css/style.css'
import image1 from '../img/payment.png'
import { Link } from 'react-router-dom'

export default function Hero(){

    return(

    <section className="home" id="home">

        <div className="left-side">
            <span>Welcome Mori-Pay</span>
            <h3> Start taking charge of your personal finance.</h3>
            <p>"At Mori-Pay you can easily make payments and take charge of your personal expenses”.</p>
            <Link to="/signup"><button className="btn">Create Account</button></Link>
        </div>

        <div className="right-side">
            <img src={image1} alt="" className="home-img"/>
        </div>

    </section>

    )
}