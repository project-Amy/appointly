import { useEffect, useState } from "react";
import { Button, Input, message, Space } from "antd";
import { Content } from "antd/es/layout/layout";
import { useNavigate } from "react-router-dom";
import { CredentialsProps } from "../types/type";
import useAuthStore from "../stores/useAuthStore";

export default function Login() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<CredentialsProps>({
    email: "",
    password: "",
  });
  const {registerUser } = useAuthStore();

  const { user,  error, signIn, initialize } = useAuthStore();
  const [isLogin, setIsLogin] = useState(true);
  
  async function handleLogin() {
    await signIn(credentials.email, credentials.password);
  }



  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
    if (user) {
      navigate("/appointments");
    }
  }, [error, user, navigate]);

  return (
    <>
      <div className="absolute  w-full centralized z-20 overflow-hidden h-screen bg-primary ">
        <Content className="sm:p-8 flex justify-center items-center  ">
          <Space
            direction="vertical"
            size="large"
            className=" w-[80%] sm:w-[500px] h-[300px] bg-rose-100 mt-40 px-4 sm:p-10 rounded-lg shadow-lg  "
          >
            <div className="flex justify-between gap-1 ">
              <Button
              className="w-full border-2 border-black/10 rounded-tr-none rounded-br-none"
                color="default"
                variant="filled"
                onClick={() => setIsLogin(true)}
              >
                Accedi
              </Button>
              <Button
                color="default"
                variant="filled"
                className="w-full border-2 border-black/10 rounded-tl-none rounded-bl-none"
                onClick={() => setIsLogin(false)}
              >
                Registrati
              </Button>
            </div>
            <Space direction="vertical" size="middle" className="w-full">
              <Input
                placeholder="Email"
                value={credentials.email}
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
              <Input.Password
                placeholder="Password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              <Button
                onClick={() =>
                  isLogin
                    ? handleLogin()
                    : registerUser(credentials.email, credentials.password)
                    
                    // handleRegister(credentials.email, credentials.password)
                }
                block
              >
                {isLogin ? "Accedi" : "Registrati"}
              </Button>
            </Space>
          </Space>
        </Content>
      </div>
    </>
  );
}
