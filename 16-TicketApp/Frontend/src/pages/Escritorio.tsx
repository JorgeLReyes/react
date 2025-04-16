import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography, Divider } from "antd";
import { useHideMain } from "../hooks/useHideMain";
import { getUserStorage } from "../helper/getUserStorage";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export const Escritorio = () => {
  useHideMain(false);
  const navigate = useNavigate();
  const [usuario] = useState(getUserStorage());

  if (!usuario.agente || !usuario.escritorio) {
    return <Navigate to={"/ingresar"} />;
  }

  const salir = () => {
    localStorage.removeItem("agente");
    localStorage.removeItem("escritorio");
    navigate({
      pathname: "/ingresar",
    });
  };

  const siguienteTicket = () => {};

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}>{usuario.agente}</Title>
          <Text>Escritorio: </Text>
          <Text type="success">{usuario.escritorio}</Text>
        </Col>
        <Col span={4}>
          <Button shape="round" type="default" onClick={salir} danger>
            <CloseCircleOutlined />
            Salir
          </Button>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col>
          <Text>Esta atendiendo el ticket numero:</Text>
          <Text style={{ fontSize: 20 }} type="danger">
            55
          </Text>
        </Col>
      </Row>
      <Row>
        <Col offset={18} span={6}>
          <Button onClick={siguienteTicket} shape="round" type="primary">
            Siguiente
            <RightOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
};
