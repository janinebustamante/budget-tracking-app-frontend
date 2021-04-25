import PropTypes from 'prop-types';
// Import nextJS Link component for client-side navigation
import Link from 'next/link';
import Jumbotron from 'react-bootstrap/Jumbotron';
// Bootstrap grid system components
import { Row, Col } from 'react-bootstrap';

export default function Banner() {
    return (
        <Row>
            <Col>
                <Jumbotron>
                    <h1>Budget Tracking App</h1>
                    <p>The rising budget tracking app in the country</p>
                    <Link href="/register"><a>Register</a></Link>
                </Jumbotron>
            </Col>
        </Row>
    )

}

// Banner.propTypes = {
//     data: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         content: PropTypes.string.isRequired,
//         destination: PropTypes.string.isRequired,
//         label: PropTypes.string.isRequired
//     })
// }