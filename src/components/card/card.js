import Container from '../container'
import './card.css'
export default function Card({card, name}){
    let css="card"
    if (card.card_bank==="MORICOIN") {
        css="card"
    } else if (card.card_bank==="VISA CARD") {
        css="visacard"
    }else if (card.card_bank==="MASTER CARD") {
        css="mastercard"
    }else if (card.card_bank==="MPESA CARD") {
        css="mpesacard"
    }else{
        
    }
    if (card.card_bank) {
        return(
            <Container>
                <div className={css}>
                    <span className="line-1"></span>
                    <span className="line-2"></span>
                    <span className="line-3"></span>
                    <div className="top-row">
                        <div className="visa">
                            <h5>{card.card_bank}</h5>
                            <span>{card.card_name}</span>
                        </div>
                        <div className="tick">
                            <i className="fa fa-check"></i>
                        </div>
                     
                    </div>
                    
                  
                    <div className="bottom-row">
                            <div className="dots">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            
                            <span className="number">{card.card_number}</span>
                    </div>
                  
                    
                </div>
                
            </Container>
                   
            )
    }
   
}