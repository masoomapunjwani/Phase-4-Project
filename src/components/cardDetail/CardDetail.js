import { Button, FlexboxGrid } from "rsuite";
import Card from "../card/card";
import Container from "../container";
import { Transaction } from "./TransactionHistory";
import { useNavigate } from "react-router-dom";
import "./detail.css"
import { useLocation } from "react-router-dom";
import NewTransaction from "./NewTransaction";

export default function CardDetail({uuid}) {
    const location =useLocation();
    const mycard = location.state.state
    const nav = useNavigate(); 
    function deleteCard(e) {
        fetch(`https://mopay-production.up.railway.app/cards/${e}`, {
            method:'DELETE'
        })
        .then((r) => {
            if (r.ok) {
              nav("/");
            }
          });
    }
    return(

        <Container>
            <FlexboxGrid colspan={24}>   
                
                <div className="col-lg-6 col-md-6 col-sm-12">
                    <h5 style={{marginLeft:20}}>Your {mycard.card_bank} Details</h5>
                    <Card  card={location.state.state}/>
                    <h5 style={{marginLeft:20}}>Card Info</h5>

                    {/* card number */}
                    <FlexboxGrid style={{marginLeft:20, color:"#808080", marginBottom:20, marginTop:20}}>
                        <FlexboxGrid.Item colspan={12}>
                            Card Number 
                        </FlexboxGrid.Item> 
                        <FlexboxGrid.Item colspan={12}>
                            {mycard.card_number}
                        </FlexboxGrid.Item> 
                    </FlexboxGrid>
                    {/* status */}
                    <FlexboxGrid style={{marginLeft:20, color:"#808080", marginBottom:20}}>
                        <FlexboxGrid.Item colspan={12}>
                            Status
                        </FlexboxGrid.Item> 
                        <FlexboxGrid.Item colspan={12}>
                            <p style={{color:'#056608'}}>Active</p>
                        </FlexboxGrid.Item> 
                    </FlexboxGrid>
                    {/* currency */}
                    <FlexboxGrid style={{marginLeft:20, color:"#808080", marginBottom:20}}>
                            <FlexboxGrid.Item colspan={12}>
                                Currency
                            </FlexboxGrid.Item> 
                            <FlexboxGrid.Item colspan={12}>
                                USD
                            </FlexboxGrid.Item> 
                    </FlexboxGrid>
                    {/* Balance */}
                    <FlexboxGrid style={{marginLeft:20, color:"#808080", marginBottom:20}}>
                            <FlexboxGrid.Item colspan={12}>
                                Balance
                            </FlexboxGrid.Item> 
                            <FlexboxGrid.Item colspan={12}>
                                ${mycard.amount}
                            </FlexboxGrid.Item> 
                    </FlexboxGrid>
                    <hr style={{marginLeft:0, marginRight:200}}/>
                    {/* Buttons */}
                    <FlexboxGrid style={{marginLeft:20, color:"#808080", marginBottom:20}}>
                            <FlexboxGrid.Item colspan={12}>
                                <button onClick={()=>deleteCard(mycard.id)} className="btn">Delete This Card</button>
                            </FlexboxGrid.Item> 
                           
                    </FlexboxGrid>
                    


                </div>
                <div className="col-lg-6 col-md-6 col-sm-12 trans">
                  <div className="row">
                    <div className="col-lg-6 col-sm-12">
                     <h5 style={{marginBottom:20}}> {mycard.card_name}'s Recent Transactions</h5>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <NewTransaction uuid={mycard.user_id} cardId={mycard.id}/>
                    </div>
                    <div className="col-lg-12" style={{marginTop:20}}>
                        <FlexboxGrid.Item colspan={24}>
                             <Transaction/>
                        </FlexboxGrid.Item>
                    
                    </div>
                  </div>
                    
                </div>
            </FlexboxGrid> 
        </Container>
        
    )
}