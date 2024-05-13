import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Layout from 'view/layout/Layout';
import { Row, Col, Card, Typography } from 'antd';
const { Title, Paragraph } = Typography;

class HomePage extends PureComponent {
  render() {
    const cards = [
      {
        title: 'La mejor universidad3',
        description:
          'Pontificia universidad Javeriana, la mejor universidad, con los mejores estudiantes',
        url: 'https://www.javeriana.edu.co/inicio',
        imageUrl:
          'https://psicologia.javeriana.edu.co/documents/1580420/9567757/BANDERA%20U.%20JAVERIANA%201-26-2015.JPG/1f2fb4f7-6598-9161-e327-a8bdc1dcfc93',
      },
      {
        title: 'Back-end',
        description:
          'El codigo fuente de la Restful API de la presente pagina web se puede encontrar en el este link de Github',
        url: 'https://github.com/foxinuni/petsafe-api',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhA3Q-Y5POgatm6EvEYunWu0jrF_032yQJjbXkJUNFfg&s',
      },
      {
        title: 'Front-end',
        description:
          'El codigo fuente del frontend de la presente pagina web se puede encontrar en el este link de Github',
        url: 'https://github.com/foxinuni/petsafe-front',
        imageUrl:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQrzTwr_Rd-2x7fQe7pPbxhgG27kULt1WimTK3hEqVww&s',
      },
      {
        title: 'Juan Diego Bermudez',
        description: 'XD, despues cambio esto jjsdhjshdjshdjsh',
        url: 'https://www.linkedin.com/in/diegobermu/',
        imageUrl:
          'https://media.licdn.com/dms/image/C5603AQEoerUvVlNAqg/profile-displayphoto-shrink_200_200/0/1644726039220?e=2147483647&v=beta&t=ymQESsFHDE-73FHdXfLeJAbmGvAxPqg22yntqPbA12k',
      },
    ];

    return (
      <div style={{ padding: 20 }}>
        <Title level={1}>Pet safe</Title>
        <Paragraph>
          Pet safe es la mejor opcion para cuidar a tu mascota, si quieres un
          hotel que se preocupe por tu mascota, que le de la mejor atencion, y
          que tenga los mejores desarrolladores de paginas web, entonces debes
          escoger a Pet safe
        </Paragraph>
        <Row gutter={[16, 16]}>
          {cards.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={card.title}
                    src={card.imageUrl}
                    style={{ height: 160, objectFit: 'cover' }}
                  />
                }
                onClick={() => window.open(card.url, '_blank')}
                style={{ cursor: 'pointer' }}
              >
                <Card.Meta title={card.title} description={card.description} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    );
  }
}

export default connect(null)(Layout(HomePage));
