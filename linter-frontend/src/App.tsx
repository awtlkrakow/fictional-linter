import { ChangeEventHandler, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { Button, Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
 
// Define the form values type
type FormValues = {
  file: FileList | null;
};


function App() {
  const [greetMsg, setGreetMsg] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { register, handleSubmit } = useForm<FormValues>();
 
  //if yes, dark theme
  const [theme, setTheme] = useState<boolean>(true);

  const onSubmit = (data: FormValues) => {
    //send file to server
    console.log(data.file);
  };

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <>
      <header>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container className="py-0">
            <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Separated link
                    </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <div className="d-flex flex-row lg-container w-100">
          <Container className="left">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input type="file" {...register('file')} />
              <Button type="submit">Submit</Button>
            </form>
            <Container className="filePreview text-left">
              placeholder text
            </Container>
          </Container>
          <Container className="right">

          </Container>
        </div>
      </main>
      <footer>
        foot
      </footer>
    </>
  );
}

export default App;
