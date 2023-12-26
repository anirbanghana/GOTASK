import { useState } from "react";
import styled from "styled-components";
import FlexBox from "../../common/ui/FlexBox";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import goTaskimg from "../../../src/assets/GoTask.png";
import axios from "axios";
import { useEffect } from "react";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  row-gap: 1rem;
`;

const Container = styled.div`
  width: 50%;
  height: fit-content;
  padding: 3rem;
  background-color: white;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  align-items: center;
`;

const FormGroup = styled(FlexBox)`
  row-gap: 0.1rem;
  flex-direction: column;
`;

const Label = styled.label``;

const Input2 = styled.input`
  padding: 1rem;
  border: 1px solid grey;
  border-radius: 0.3rem;
  box-sizing: border-box;
  width: 18rem;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5rem;
  border-radius: 2rem;
  cursor: pointer;
  width: 12rem;
`;

const RegisterLink = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const RegisterRedirect = styled.span`
  color: #007bff;
  cursor: pointer;
`;

const Logo = styled(FlexBox)`
  background-color: white;
  padding: 0.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Login = ({ onRegisterClick, userId, setUserId }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // if (localStorage.getItem("userId")) {
  //   console.log(localStorage.getItem("userId"));
  //   navigate("/homepage");
  // }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData.email, formData.password);

    try {
      const response = await axios.post(
        "https://todo-backend-daem.vercel.app/login",
        {
          email: formData?.email,
          password: formData?.password,
        }
      );

      if (response.status === 200) {
        console.log("Login successful");

        console.log(response.data.user._id);
        setUserId(response.data.user._id);
        // localStorage.setItem("isAuthenticated", true);
        localStorage.setItem("userId", response.data.user._id);
        const user = localStorage.getItem("userId");
        // console.log(user, "uring login");
        setUserId(user);
        navigate("/");
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      alert("Error during login:", error.message);
    }
  };

  return (
    <Wrapper column>
      <Logo>
        <img src={goTaskimg} alt="GoTask" />
      </Logo>
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input2
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input2
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <Button type="submit">Login</Button>
        </Form>
        <RegisterLink>
          Do not have an account?{" "}
          <RegisterRedirect
            onClick={() => {
              navigate("/register");
            }}
          >
            Register
          </RegisterRedirect>
        </RegisterLink>
      </Container>
    </Wrapper>
  );
};

export default Login;
