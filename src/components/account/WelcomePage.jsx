import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardBody, CardText, CardTitle, CardGroup } from 'reactstrap';

const WelcomePage = () => {
  return (
    <div>
      <Row>
        <Col>
          <p className="text-center text-dark">&#9732; This right here is called aesthetic excellence*! (*&#9760;)</p>
        </Col>
      </Row>
      <Row className="welcome">
        <Col>
          <CardGroup>
            <Card>
              <CardBody>
                <CardTitle>Vill du ha ett eget konto?</CardTitle>
                <CardText>Det är helt gratis! Skapa ditt konto här och börja boka filmer som en äkta die-hard fan!</CardText>
                <Link to='/registrera-konto' className="btn btn-success btn-block">Skapa konto</Link>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <CardTitle>Har du redan ett konto?</CardTitle>
                <CardText>Vad sägs om att du tar och loggar in på det då. Gör du inte det förblir du utloggad :(</CardText>
                <Link to='/logga-in' className="btn btn-danger btn-block">Logga in</Link>
              </CardBody>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </div>
  );
}

export default WelcomePage;