import './Dev.css';
import { Row, Container} from "react-bootstrap"



export const Dev = () => {

    return (
        
        <Container className="dev-container d-flex justify-content-left">
            <Row>
            <p className="intro-text">Endeavors was a challenge I decided to tackle one week. I had some major learning goals for this app. 
            </p>
            </Row>

            <Row>
                <h4>Learn React</h4>
                <p>I wanted to learn react</p>
            </Row>
            <Row>
                <h4>Fully Realize Inspiration</h4>
                <p>I wanted to learn react</p>

            </Row>
            <Row>
                <h4>Pursue Inspiration</h4>
                <p>I wanted to learn react</p>

            </Row>
            <Row>
                <h4>Explore New Tech</h4>
                <p>I wanted to learn react</p>

            </Row>
        </Container>
    )
}
