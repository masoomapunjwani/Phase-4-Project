import { Drawer, Schema, Form, RadioGroup, Radio, ButtonToolbar, Button, Placeholder, FlexboxGrid, SelectPicker, Message } from 'rsuite';
import React,{useState} from 'react';
const styles = {
  radioGroupLabel: {
    padding: '8px 12px',
    display: 'inline-block',
    verticalAlign: 'middle'
  }
};

const selectData = ['VISA CARD', 'MASTER CARD','MPESA CARD'].map(item => ({
    label: item,
    value: item
  }));


//input validation:: validating if fields are empty or are filled correctly
const nameRule = Schema.Types.StringType().isRequired('This fields is required'); 
const emailRule = Schema.Types.StringType().isEmail('Please Enter A valid Email Address');


export default function NewTransaction({uuid, cardId}) {
    //   message
    const [message, setMessage] = useState(null)
    const [backdrop, setBackdrop] = React.useState('static');
    const [open, setOpen] = React.useState(false);
  

    // form value
    const [formValue, setFormValue] = useState({
        card_name: '',
        card_number: '',
        card_bank:"",
        receiver_email:"", 
        amount:"", 
        status:"paid",
        user_id:uuid,
        card_id:cardId
      });

   
    //   handle submit
    function handleOnSubmit(e) {
        fetch("https://mopay-production.up.railway.app/pay", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formValue),
        }).then((r) => {
            if (r.ok) {
            r.json().then(data => {
                console.log(data)
                setMessage("Payment Made successfully.")
                setTimeout(function() {
                    setMessage("")
                    setOpen(false)
                }, 2000);
            });
            
            }
        })
        .catch(e => console.log(e))
    }

// delay 

  return (
    <>
     
      <ButtonToolbar>
        <Button onClick={() => setOpen(true)}>+ New Transaction</Button>
      </ButtonToolbar>
      <Drawer backdrop={backdrop} open={open} onClose={() => setOpen(false)}>
      <Form fluid onChange={setFormValue} formValue={formValue} onSubmit={handleOnSubmit}>
        <Drawer.Header>
          <Drawer.Title>New Payment Transaction</Drawer.Title>
          <Drawer.Actions>
            
            <Button onClick={() => handleOnSubmit} type='submit' appearance="primary">
              Pay
            </Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>

          {/* new payment form start */}
          
            <FlexboxGrid>
                <Form.Group>
                    {message && (
                      <Message showIcon type="success">
                        {message}
                      </Message>
                    )}
                  </Form.Group>
                <FlexboxGrid.Item colspan={12} >
                    <Form.Group controlId="name-9">
                    <Form.ControlLabel>Cardholder Name</Form.ControlLabel>
                    <Form.Control name="card_name" placeholder="Dohn Doe" rule={nameRule} />
                    <Form.HelpText>Required</Form.HelpText>
                    </Form.Group>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={7.5} style={{ marginLeft: 20 }}>
                    <Form.Group controlId="name-10">
                    <Form.ControlLabel>Bank</Form.ControlLabel>
                <Form.Control name="card_bank" data={selectData} accepter={SelectPicker} />
                    </Form.Group>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={19}>
                    <Form.Group controlId="email-9">
                    <Form.ControlLabel>Card Number</Form.ControlLabel>
                    <Form.Control name="card_number" placeholder="0000 0000 0000 0000 0000" rule={nameRule}/>
                    <Form.HelpText>Required</Form.HelpText>
                    </Form.Group>
                </FlexboxGrid.Item>
            </FlexboxGrid>
            <FlexboxGrid>
                <FlexboxGrid.Item colspan={24} >
                    <Form.Group controlId="name-9">
                    <Form.ControlLabel>Ammount (ksh)</Form.ControlLabel>
                    <Form.Control name="amount" placeholder="3000" type="number" rule={nameRule} />
                    <Form.HelpText>Required</Form.HelpText>
                    </Form.Group>
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={24} >
                    <Form.Group controlId="name-9">
                    <Form.ControlLabel>Receiver Email</Form.ControlLabel>
                    <Form.Control name="receiver_email" placeholder="user@mail.com" type="email" rule={emailRule} />
                    <Form.HelpText>Required</Form.HelpText>
                    </Form.Group>
                </FlexboxGrid.Item>
                
            
            </FlexboxGrid>
                
            
          {/* new payment end */}
        </Drawer.Body>
        </Form>
      </Drawer>
    </>
  );
};