import { DownloadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Typography } from "antd";
import { useHideMain } from "../hooks/useHideMain";
import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { Ticket } from "../../../Backend/models/ticket";

const { Title, Text } = Typography;
export const CrearTicket = () => {
  useHideMain(true);
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(0);

  const nuevoTicket = () =>
    socket.emit("request-ticket", null, (ticket: Ticket) =>
      setTicket(ticket.number)
    );

  return (
    <>
      <Row>
        <Col
          span={14}
          offset={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Title
            level={3}
            style={{
              textAlign: "center",
            }}
          >
            Presione el botón para un nuevo ticket
          </Title>
          <Button
            type="primary"
            shape="round"
            size="large"
            icon={<DownloadOutlined />}
            onClick={nuevoTicket}
          >
            Nuevo ticket
          </Button>
        </Col>
      </Row>
      <Row
        style={{
          marginTop: 100,
        }}
      >
        <Col
          span={14}
          offset={6}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Text>Su numero</Text>
          <br />
          <Text
            type="success"
            style={{
              fontSize: 55,
            }}
          >
            {ticket}
          </Text>
        </Col>
      </Row>
    </>
  );
};
