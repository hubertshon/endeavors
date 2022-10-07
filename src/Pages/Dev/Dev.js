import './Dev.css';
import { Row, Container} from "react-bootstrap"



export const Dev = () => {

    return (
        
        <Container className="dev-container d-flex justify-content-left">
            <div className="quote-area align-self-center">
                <Row>
                    <h1 className="quote">A journey of a thousand miles begins with a single step.</h1>
                </Row>
                <Row>
                    <h5 className="author">Chinese Proverb</h5>
                </Row>
            </div>
            <Row>
            <p className="dev-text">Endeavors was a challenge I used to hit a few learning goals. 
            </p>
            </Row>
            <Row>
                <h3>Learn React</h3>
                <p className="dev-text">While I had used React to contribute to a professional project a couple of years ago, it had remained the framework I was least familiar with. I wanted to build something with it to discover just why the framework is popular among developers today.</p>
            </Row>
            <Row>
                <h3>Fully Realize Inspiration</h3>
                <p className="dev-text">Believe it or not, a major influence for this app was the masterful presentational touches from Red Dead Redemption 2. The first loading screen made me forget I was sitting in front of a computer and instantly transports the player into a rugged, barely-tamed American landscape. </p>
            </Row>
            <Row>
                <h3>Explore New Tech</h3>
                <p className="dev-text">Alongside learnig react, building the app gave me the opportunity to explore Google Maps API, and use some tools that went beyond my normal day to day.</p>
            </Row>
        </Container>
    )
}
