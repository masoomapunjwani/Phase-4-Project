import '../css/style.css'
export default function Footer(){


    function handleSubscriberSubmit(e){
        e.preventDefault();
    }
    return(
        <footer className="footer">

        <section>

            <h3 className="Newsletter">Newsletter</h3>

            <form onSubmit={handleSubscriberSubmit}>
                <input type="email" placeholder="enter your email"/>
                <input type="submit" value="subscribe"/>
            </form>

            <div className="box-container">
                <div className="box">
                    <h3>quick links</h3>
                    <a href="#home"> <i className="fas fa-arrow-right"></i> Home</a>
                    <a href="#about"> <i className="fas fa-arrow-right"></i> About</a>
                    <a href="#popular"> <i className="fas fa-arrow-right"></i> Wallet</a>
                    <a href="#menu"> <i className="fas fa-arrow-right"></i> News</a>
                </div>
                <div className="box">
                    <h3>extra links</h3>
                    <a href="#"> <i className="fas fa-arrow-right"></i> my account</a>
                    <a href="#"> <i className="fas fa-arrow-right"></i> terms of use</a>
                    <a href="#"> <i className="fas fa-arrow-right"></i> policy</a>
                </div>
                <div className="box">
                    <h3>opening hours</h3>
                    <p>Monday : 7:00am To 10:00pm</p>
                    <p>Tuesday : 7:00am To 10:00pm</p>
                    <p>Wednesday : 7:00am To 10:00pm</p>
                    <p>Friday : 7:00am To 10:00pm</p>
                    <p>Saturday And Sunday Closed</p>
                </div>
            </div>

            <div className="bottom">
                <div className="social">
                    <a href="#" className="fab fa-facebook-f"></a>
                    <a href="#" className="fab fa-twitter"></a>
                    <a href="#" className="fab fa-instagram"></a>
                    <a href="#" className="fab fa-linkedin"></a>
                    <a href="#" className="fab fa-pinterest"></a>
                </div>
                <div className="copy-right">
                    <p>All Rights Reserved!</p>
                </div>
            </div>

        </section>

    </footer>
    )
}