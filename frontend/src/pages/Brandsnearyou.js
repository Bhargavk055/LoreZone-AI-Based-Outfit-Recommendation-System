import React from "react";
import Navbar from "./Navbar";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Brandsnearyou.css"; // We'll create this

const brands = [
    {
      name: "ZARA",
      pic_url: "https://www.logo.wine/a/logo/Zara_(retailer)/Zara_(retailer)-Logo.wine.svg",
      location: "HRX Mall/HYD",
      website: "https://www.zara.com/",
    },
    {
      name: "H&M",
      pic_url: "https://images.unsplash.com/photo-1578983662508-41895226ebfb?q=80&w=2711&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "Surgango Mall/HYD",
      website: "https://www2.hm.com/",
    },
    {
      name: "Cadillac",
      pic_url: "https://images.unsplash.com/photo-1627064719444-1985feb93f54?q=80&w=2615&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "DRX Mall/HYD",
      website: "#",
    },
    {
      name: "BURBERRY",
      pic_url: "https://images.seeklogo.com/logo-png/2/1/burberry-logo-png_seeklogo-23638.png",
      location: "HRX Mall/HYD",
      website: "https://www.burberry.com/",
    },
    {
      name: "UNITED COLORS OF BENETTON",
      pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLMtKxeg8b9RFjU0bZXiN2laGSy41uNEyCsA&s",
      location: "Surgango Mall/HYD",
      website: "https://world.benetton.com/",
    },
    {
      name: "FLYING MACHINE",
      pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmuLtMsuJZ2lHTTMpqJZKTpFsR9xuadjiJJg&s",
      location: "DRX Mall/HYD",
      website: "https://www.flyingmachine.in/",
    },
    {
      name: "ADIDAS",
      pic_url: "https://images.unsplash.com/photo-1658087252613-a4d09bf7a64c?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      location: "HRX Mall/HYD",
      website: "https://www.adidas.co.in/",
    },
    {
      name: "BIBA",
      pic_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKSMeXU52HrMq6qDAYPKNYkdG_hcPSzRmqaA&s",
      location: "Surgango Mall/HYD",
      website: "https://www.biba.in/",
    },
    {
      name: "ALLEN SOLLY",
      pic_url: "https://seeklogo.com/images/A/allen-solly-logo-D61D9C1551-seeklogo.com.png",
      location: "DRX Mall/HYD",
      website: "https://www.allensolly.com/",
    },
  ];
  

const Brandsnearyou = () => {
  return (
    <div>
      <Navbar />
      <Container className="mt-5 mb-5"> {/* Add margin-top to fix overlap */}
        <Row className="align-items-center mb-4">
          <Col xs={6} className="text-start">
            <button className="location-btn">📍 Press to select the location</button>
          </Col>
          <Col xs={6} className="text-end">
            <h2 className="fw-bold">Clothing Brands Near You</h2>
          </Col>
        </Row>

        <Row className="gy-4">
          {brands.map((brand, idx) => (
            <Col key={idx} xs={12} sm={6} md={4}>
              <Card className="brand-card text-center">
              <Card.Img variant="top" src={brand.pic_url} className="brand-image" />
                <Card.Body>
                  <div className="discount-pill">30% OFF</div>
                  <div className="location-pill">{brand.location}</div>
                  <Button variant="dark" href={brand.website} size="sm" className="mt-2">
                    Visit web
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Brandsnearyou;