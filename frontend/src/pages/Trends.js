import { useState } from 'react';
import Navbar from "./Navbar";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const dummyTrends = [
  {
    id: 1,
    trend_type: 'Clothing Trends',
    style_name: 'Boho Bliss',
    description: 'Free-spirited and vibrant, a mix of textures and earthy tones.',
    size: 'XS, S, M, L, XL',
    pic_url: "/images/ward8.jpg"
  },
  {
    id: 2,
    trend_type: 'Clothing Trends',
    style_name: 'Urban Streetwear',
    description: 'A fusion of hip-hop culture and high fashion.',
    size: 'S, M, L, XL',
    pic_url: "/images/ward3.jpg"
  },
  {
    id: 5,
    trend_type: 'Clothing Trends',
    style_name: 'Monochrome Magic',
    description: 'Timeless elegance in black and white.',
    size: 'XS, S, M, L',
    pic_url: "/images/ward5.webp"
  },
  {
    id: 4,
    trend_type: "Industry News",
    style_name: "AI-Powered Custom Fits",
    description: "Artificial Intelligence tailoring clothes based on user body data.",
    pic_url: "/images/trending.png"
  },
  {
    id: 5,
    trend_type: "Industry News",
    style_name: "Tech-Infused Wearables",
    description: "Smart fashion integrating fitness tracking and LED styles.",
    pic_url: "/images/trend2.png"
  },
  {
    "id": 6,
    trend_type: "Industry News",
    style_name: "Zero-Waste Fashion",
    description: "Innovative designs created with minimal fabric waste.",
    pic_url: "/images/trending3.png"
  }
];

const Trends = () => {
  const [trends] = useState(dummyTrends);
  const [filter, setFilter] = useState('Clothing Trends');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTrends = trends.filter(trend =>
    trend.trend_type === filter && trend.style_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', padding: '20px 0' }}>
      <Container className="mt-4 p-4" style={{ maxWidth: '85vw', borderRadius: '15px', background: '#ffffff', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}>
        <Navbar />
        <h1 className="text-center mb-4" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#007bff' }}>🔥 Trending Styles</h1>

        <div className="text-center mb-4 d-flex justify-content-center flex-wrap">
          {['Clothing Trends', 'Industry News'].map((type) => (
            <Button key={type} onClick={() => setFilter(type)}
              style={{
                background: filter === type ? '#007bff' : '#e0e0e0',
                color: '#fff', border: 'none', borderRadius: '25px', padding: '10px 20px',
                fontSize: '1rem', margin: '5px 15px', transition: '0.3s',
                boxShadow: filter === type ? '0 4px 10px rgba(0,0,0,0.2)' : 'none'
              }}>
              {type}
            </Button>
          ))}
        </div>

        <Form className="mb-4 text-center">
          <Form.Control type="text" placeholder="Search trends..." style={{
            maxWidth: '400px', margin: '0 auto', borderRadius: '20px', padding: '10px',
            border: '1px solid #007bff', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
          }} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </Form>

        {filteredTrends.length === 0 ? (
          <p className="text-center text-muted">No trends found.</p>
        ) : (
          <Row className="g-4 justify-content-center">
            {filteredTrends.map(trend => (
              <Col key={trend.id} lg={4} md={6} sm={12}>
                <Card className="shadow-sm border-0 h-100" style={{
                  borderRadius: '15px', transition: 'transform 0.3s ease',
                  background: '#f8f9fa', color: '#333',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                  <Card.Img variant="top" src={trend.pic_url} alt={trend.style_name}
                    style={{ height: '600px', objectFit: 'cover', borderRadius: '15px 15px 0 0' }} />
                  <Card.Body className="d-flex flex-column">
                    <Card.Title style={{ fontWeight: 'bold', fontSize: '1.4rem', color: '#007bff' }}>{trend.style_name}</Card.Title>
                    <Card.Text style={{ fontSize: '1rem', flexGrow: 1 }}>{trend.description}</Card.Text>
                    {trend.size && (
                      <Card.Text style={{ fontSize: '0.9rem', fontStyle: 'italic' }}>Available Sizes: {trend.size}</Card.Text>
                    )}
                    <Button style={{
                      background: '#007bff', border: 'none', color: '#fff',
                      borderRadius: '20px', fontSize: '1rem', width: '100%', marginTop: '10px',
                      transition: '0.3s', boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                    }}
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                      Explore
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};

export default Trends;
