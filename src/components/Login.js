import { Button, Form, Input } from "antd";
import bcrypt from "bcryptjs";

const salt = "$2b$10$3c22hEeSjfAnsuZ76BHS0O";

export default function Login({ setToken }) {
  const handleLogin = ({ email, password }) => {
    console.log(email, password);
    const hash = bcrypt.hashSync(password, salt);
    console.log(hash);
    fetch("http://localhost:5050/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: hash }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
          return;
        }
        console.log(data.token);
        localStorage.setItem("token", data.token); //allows token to be stored in localStorage
        setToken(data.token);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      <h1>Login</h1>
      <Form
        name="login"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={handleLogin}
      >
        <Form.Item name="email" label="Email">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="Password">
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 16, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
