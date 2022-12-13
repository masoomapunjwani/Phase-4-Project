import { Container,Content,FlexboxGrid,Message, Panel, Form, Button, Input, SelectPicker,Schema } from 'rsuite';
import {useState, useEffect} from 'react';
import { useNavigate, Link } from "react-router-dom";
import '../css/style.css'
//selector
const selectData = ['MALE', 'FEMALE'].map(item => ({
    label: item,
    value: item
  }));
  

  //input validation:: validating if fields are empty or are filled correctly
  const nameRule = Schema.Types.StringType().isRequired('This fields is required'); 
  const emailRule = Schema.Types.StringType().isEmail('Please Enter A valid Email Address'); 



export default function SignUp({ setUser }) {

  const [error, setError] = useState(null);
    const [formValue, setFormValue] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation:'', 
    gender:''
  });
    
const nav = useNavigate();
    
function handleOnSubmit(e) {
    fetch("https://mopay-production.up.railway.app/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formValue),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => {
              setUser(user)
              nav("/dashboard")
              
              sessionStorage.setItem("user", JSON.stringify(user))
              sessionStorage.setItem("id", user.id)
              sessionStorage.setItem("cards", JSON.stringify(user.cards))
          });
        }else{
          r.json().then((err) => {
            console.log(err.errors[0])
            setError(err.errors[0])
          })
         
        }
      }).catch(e=>{
        console.log(e)
      });
}

    return(
        <div className='row'>
            
        <Container>
            <Content>
                <FlexboxGrid justify="center">
                <FlexboxGrid.Item colspan={12}>
                    <Panel header={<h3>Register</h3>} bordered>
                    <Form fluid onChange={setFormValue} formValue={formValue} onSubmit={handleOnSubmit}>
                        <Form.Group controlId="name-9">
                        <Form.ControlLabel>Username</Form.ControlLabel>
                        <Form.Control name="username" rule={nameRule} />
                        <Form.HelpText>Required</Form.HelpText>
                        </Form.Group>
                        <Form.Group controlId="name-10">
                        <Form.ControlLabel>Phone</Form.ControlLabel>
                        <Form.Control name="phone"  rule={nameRule} type="phone"/>
                        <Form.HelpText>Required</Form.HelpText>
                        </Form.Group>
                        <Form.Group controlId="email-9">
                        <Form.ControlLabel>Email</Form.ControlLabel>
                        <Form.Control name="email" rule={emailRule} type="email" />
                        <Form.HelpText>Required</Form.HelpText>
                        </Form.Group>
                        <Form.Group controlId="pass-9">
                        <Form.ControlLabel>Password</Form.ControlLabel>
                        <Form.Control name="password" rule={nameRule} type="password" autoComplete="off" />
                        </Form.Group>
                        <Form.Group controlId="pass-conf-9">
                        <Form.ControlLabel>Confirm Password</Form.ControlLabel>
                        <Form.Control name="password_confirmation" rule={nameRule} type="password" autoComplete="off" />
                        </Form.Group>
                        <Form.Group controlId="select-10">
                        <Form.ControlLabel>Gender</Form.ControlLabel>
                        <Form.Control name="gender" data={selectData} accepter={SelectPicker} />
                        </Form.Group>
                        <Form.Group>
                          {error && (
                            <Message showIcon type="error">
                              {error}
                            </Message>
                          )}
                        </Form.Group>
                        <button className="btn">
                            Submit
                        </button>
                        <p style={{marginTop:20}}>Already Have an account? <Link to="/login">Login</Link></p>
                        
                    </Form>
                    </Panel>
                </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        </Container>
            
        </div>
    
    )
}