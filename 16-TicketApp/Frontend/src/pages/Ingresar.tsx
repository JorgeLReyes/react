import type { FormProps } from "antd";
import { Button, Divider, Form, Input, InputNumber, Typography } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useHideMain } from "../hooks/useHideMain";
import { getUserStorage } from "../helper/getUserStorage";
import { useEffect, useState } from "react";

const { Title, Text } = Typography;

type FieldType = {
  agente?: string;
  escritorio?: string;
};

export const Ingresar = () => {
  useHideMain(false);
  const [usuario] = useState(getUserStorage());
  const navigate = useNavigate();

  useEffect(() => {
    if (usuario.agente && usuario.escritorio) {
      navigate(
        {
          pathname: "/escritorio",
        },
        {
          replace: true,
        }
      );
    }
  }, [usuario]);

  const onFinish: FormProps<FieldType>["onFinish"] = ({
    agente,
    escritorio,
  }) => {
    localStorage.setItem("agente", agente!);
    localStorage.setItem("escritorio", escritorio!);

    navigate({
      pathname: "/escritorio",
    });
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  // if (usuario.agente && usuario.escritorio) {
  //   return <Navigate to={"/escritorio"} />;
  // }

  return (
    <>
      <Title level={2}>Ingresar</Title>
      <Text>Ingrese su nombre y numero de escritorio</Text>
      <Divider />
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 14 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Nombre del agente"
          name="agente"
          rules={[{ required: true, message: "Ingrese su nombre!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Escritorio"
          name="escritorio"
          rules={[
            { required: true, message: "Ingrese el numero de escritorio!" },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" shape="round">
            <SaveOutlined />
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
