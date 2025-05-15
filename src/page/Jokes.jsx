import React, { useState, useEffect } from "react";
import { Card, Dropdown, Menu, Spin, Typography, Row, Col, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

function Jokes() {
  const [jokes, setJokes] = useState([]);
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    fetch(`https://official-joke-api.appspot.com/jokes/random/` + count)
      .then((response) => response.json())
      .then((data) => {
        setJokes(Array.isArray(data) ? data : [data]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching jokes:", error);
        setLoading(false);
      });
  }, [count]);
  const menu = (
    <Menu onClick={(e) => setCount(Number(e.key))}>
      <Menu.Item key={1}>1</Menu.Item>
      <Menu.Item key={5}>5</Menu.Item>
      <Menu.Item key={10}>10</Menu.Item>
      <Menu.Item key={20}>20</Menu.Item>
      <Menu.Item key={30}>30</Menu.Item>
      <Menu.Item key={40}>40</Menu.Item>
      <Menu.Item key={50}>50</Menu.Item>
      <Menu.Item key={60}>60</Menu.Item>
      <Menu.Item key={70}>70</Menu.Item>
      <Menu.Item key={80}>80</Menu.Item>
      <Menu.Item key={90}>90</Menu.Item>
      <Menu.Item key={100}>100</Menu.Item>
    </Menu>
  );
  return (
    <div className="jokes-container">
      <Title level={2} style={{ marginBottom: "20px" }}>
        📖 Question and Answer 📖
      </Title>
    
      <div className="dropdown-container">
        <label>Select the number of jokes:</label>
         <Dropdown overlay={menu} trigger={["click"]}> 
        {/* <Dropdown menu={menu} trigger={["click"]}>
         */}
          <Button className="responsive-dropdown">
            {count} <DownOutlined />
          </Button>
        </Dropdown>
      </div>
  
      {loading ? (
        <div style={{ textAlign: "center", margin: "20px 0" }}>
          <Spin size="large" />
        </div>
      ) : (
        <Row gutter={[16, 16]} justify="center">
          {jokes.map((joke, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card hoverable className="joke-card">
                <Title level={4} className="joke-question">Q: {joke.setup}</Title>
                <Text strong className="joke-answer">A: {joke.punchline}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}
export default Jokes;



















//fetch(`https://official-joke-api.appspot.com/jokes/random/${count}`)
