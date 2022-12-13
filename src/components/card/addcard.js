import Container from "../container";
import { Modal, Form, Button, Input, SelectPicker,Schema,FlexboxGrid } from 'rsuite';
import {useState, forwardRef} from 'react';
//selector
const selectData = ['VISA CARD', 'MASTER CARD','MPESA CARD'].map(item => ({
    label: item,
    value: item
  }));
  
  const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

  //input validation:: validating if fields are empty or are filled correctly
  const nameRule = Schema.Types.StringType().isRequired('This fields is required'); 
  const emailRule = Schema.Types.StringType().isEmail('Please Enter A valid Email Address');


export default function AddPayment({setMessage, setAdded, uuid}) {

  const [open, setOpen] = useState(false);
  const [size, setSize] = useState();
  const handleOpen = value => {
    setSize(value);
    setOpen(true);
  };
  const [formValue, setFormValue] = useState({
    card_name: '',
    card_number: '',
    expiration: '',
    card_bank:"",
    amount:"3500", 
    user_id:uuid,
    cvv: ''
  });
  const handleClose = () => setOpen(false);



    function handleOnSubmit(e) {
        fetch("/cards", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formValue),
        }).then((r) => {
            if (r.ok) {
            r.json().then(data => setMessage(data));
            setMessage("Card Added successfully, kindly refresh your page to reflect")
            setAdded(true)
            }
        })
        .catch(e => console.log(e))
    }

    return(
        <>
        <Container>
             <div className="add-card" onClick={() => handleOpen('md')}><h4> +Card</h4></div>
        </Container>

        <Modal size={size} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
        <Form fluid onChange={setFormValue} formValue={formValue} onSubmit={handleOnSubmit}>
        <FlexboxGrid>
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
            <FlexboxGrid.Item colspan={12} >
                <Form.Group controlId="name-9">
                <Form.ControlLabel>Expiration</Form.ControlLabel>
                <Form.Control name="expiration" placeholder="MM/YY" rule={nameRule} />
                <Form.HelpText>Required</Form.HelpText>
                </Form.Group>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={5} style={{ marginLeft: 20 }}>
                <Form.Group controlId="name-10">
                <Form.ControlLabel>Cvv</Form.ControlLabel>
                <Form.Control name="cvv" placeholder="***" rule={nameRule}/>
                <Form.HelpText>Required</Form.HelpText>
                </Form.Group>
            </FlexboxGrid.Item>
            <FlexboxGrid.Item colspan={5} style={{ marginLeft: 20, marginTop:14 }}>
            <button className="btn"><h6>+ Add Card </h6></button>
            </FlexboxGrid.Item>
           
        </FlexboxGrid>
            
          </Form>

        </Modal.Body>
        
      </Modal>
      </>
    )
    
}