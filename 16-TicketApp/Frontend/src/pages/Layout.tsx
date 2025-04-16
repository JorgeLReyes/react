import { useContext, useMemo, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import { UIContext } from "../context/UIContext";

const { Header, Sider, Content } = Layout;

const Ant = () => {
  const { pathname } = useLocation();
  const { hiddenMain } = useContext(UIContext);
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const selectedKeyIndex = useMemo(() => {
    const urls = ["/ingresar", "/cola", "/crear-tickets", "/escritorio"];
    return urls.findIndex((url) => pathname.includes(url)) + 1;
  }, [pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider trigger={null} hidden={hiddenMain}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          // defaultSelectedKeys={["1"]}
          selectedKeys={[selectedKeyIndex.toString()]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to="/ingresar">Ingresar</Link>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: <Link to="/cola">Cola</Link>,
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: <Link to="/crear-tickets">Crear</Link>,
            },
            {
              key: "4",
              icon: <UploadOutlined />,
              label: <Link to="/escritorio">Escritorio</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }}> */}
        {/* <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          /> */}
        {/* </Header> */}
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Ant;
