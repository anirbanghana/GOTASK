import { useState } from "react";
import styled from "styled-components";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import FlexBox from "../../common/ui/FlexBox";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  row-gap: 1rem;
  align-items: center;
`;

const FormGroup = styled(FlexBox)`
  row-gap: 0.5rem;
  flex-direction: column;
`;

const Label = styled.label``;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid grey;
  border-radius: 2rem;
  box-sizing: border-box;
  width: 20rem;
  @media (max-width: 768px) {
    width: 15rem;
  }
`;

const ToggleIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 1rem;
  border-radius: 2rem;
  cursor: pointer;
  width: 12rem;
  font-weight: 700;
`;

const RegisterLink = styled.div`
  margin-top: 1rem;
  text-align: center;
`;

const LoginLink = styled.span`
  color: #007bff;
  cursor: pointer;
`;
const Logo = styled(FlexBox)`
  background-color: white;
  padding: 0.5rem;
  border-radius: 1rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Register = ({ onLoginClick }) => {
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    password: "",
    showPassword: false, // State for controlling password visibility
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setFormData((prevData) => ({
      ...prevData,
      showPassword: !prevData.showPassword,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://todo-backend-daem.vercel.app/register",
        {
          email: formData.email,
          fullname: formData.fullname,
          password: formData.password,
        }
      );

      if (response.status === 201) {
        console.log("Registration successful");
        navigate("/login");
      } else {
        console.error("Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <Wrapper>
      <Logo>
        <img src="src\assets\GoTask.png" alt="GoTask" />
      </Logo>
      <Container>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Full Name</Label>
            <Input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <InputWrapper>
              <Input
                type={formData.showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <ToggleIcon onClick={togglePasswordVisibility}>
                {formData.showPassword ? (
                  <BsEyeSlash size="1.5rem" />
                ) : (
                  <BsEye size="1.5rem" />
                )}
              </ToggleIcon>
            </InputWrapper>
          </FormGroup>
          <Button type="submit">Register</Button>
        </Form>
        <RegisterLink>
          Already have an account?{" "}
          <LoginLink
            onClick={() => {
              navigate("/");
            }}
          >
            Login
          </LoginLink>
        </RegisterLink>
      </Container>
    </Wrapper>
  );
};

export default Register;
