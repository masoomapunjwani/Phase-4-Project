import { Container,Message, Content,FlexboxGrid, Panel, Form, Button, Input, SelectPicker,Schema } from 'rsuite';
import {useEffect, useState} from 'react';
import { useNavigate, Link } from "react-router-dom";
import '../css/style.css'

 //input validation:: validating if fields are empty or are filled correctly
 const nameRule = Schema.Types.StringType().isRequired('This fields is required'); 


export default function Login({ setUser }) {
  const [error, setError] = useState(null);
  const [formValue, setFormValue] = useState({
    username: '',
    password: ''
  });
    const nav = useNavigate();

  
    function handleSubmit(e) {
      fetch("https://mopay-production.up.railway.app/login", {
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
            setError("Wrong Username or Password")
          })
         
        }
      }).catch(e=>{
        console.log(e)
      })
    }


    return (
      <Container>
      <Content>
          <FlexboxGrid justify="center">
          <FlexboxGrid.Item colspan={12}>
              <Panel header={<h3>Welcome Back</h3>} bordered>
              <Form fluid onChange={setFormValue} formValue={formValue} onSubmit={handleSubmit}>
                  <Form.Group controlId="name-9">
                  <Form.ControlLabel>Username</Form.ControlLabel>
                  <Form.Control name="username" rule={nameRule} />
                  <Form.HelpText>Required</Form.HelpText>
                  </Form.Group>
                  
                  <Form.Group controlId="pass-9">
                  <Form.ControlLabel>Password</Form.ControlLabel>
                  <Form.Control name="password" rule={nameRule} type="password" autoComplete="off" />
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
                  <p style={{marginTop:20}}>Don't Have an account? <Link to="/signup">Sign Up</Link></p>
              </Form>
              </Panel>
          </FlexboxGrid.Item>
          </FlexboxGrid>
      </Content>
  </Container>
    );
  }
