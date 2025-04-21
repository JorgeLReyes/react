import { Card, Col, List, Row, Tag, Typography, Divider } from "antd";
// import { data } from "../../public/data";
import { useHideMain } from "../hooks/useHideMain";
import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";
import { Ticket } from "../../../Backend/models/ticket";

const { Title, Text } = Typography;

export const Cola = () => {
  useHideMain(true);
  const { socket } = useContext(SocketContext);
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const response = await fetch("http://localhost:3000/ultimos");
      if (!response.ok) return;
      const data = await response.json();
      setTickets(data);
    };
    fetchTickets();
  }, []);

  useEffect(() => {
    socket.on("ticket-assigned", (tickets) => setTickets(tickets));

    return () => {
      socket.off("ticket-assigned");
    };
  }, [socket]);

  return (
    <>
      <Title level={1}>Atendiendo al cliente</Title>
      <Row>
        <Col span={12}>
          <List
            dataSource={tickets.slice(0, 3)}
            renderItem={(item) => {
              return (
                <List.Item>
                  <Card
                    style={{ width: 300, marginTop: 16 }}
                    actions={[
                      <Tag color="volcano">{item.agent}</Tag>,
                      <Tag color="magenta">Escritorio {item.desk}</Tag>,
                    ]}
                  >
                    <Title level={2}>No. {item.number}</Title>
                  </Card>
                </List.Item>
              );
            }}
          />
        </Col>
        <Col span={12}>
          <Divider>Historial</Divider>
          <List
            dataSource={tickets.slice(3)}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`Ticket no: ${item.number}`}
                  description={
                    <>
                      <Text type="secondary">En el escritorio</Text>
                      <Tag color="magenta">{item.number}</Tag>
                      <Text type="secondary">Agente</Text>
                      <Tag color="volcano">{item.agent}</Tag>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </>
  );
};
