import { Navbar, Nav, Button, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


const Navigation = ({ web3Handler, account }) => {

    const handleConnectWallet = (event) => {
        event.preventDefault();
        web3Handler();
    };
    return (
        <Navbar  style={{ backgroundColor: "#e3f2fd" }}>
            <Container >
                <Navbar.Brand>Staking Token</Navbar.Brand>
                <form className="d-flex" role="search">
                    {account ? (
                        <Button variant="outline-success" type="submit">
                            {`${account.slice(0, 5)}...${account.slice(38, 42)}`}
                        </Button>
                    ) : (
                        <Button onClick={handleConnectWallet} variant="outline-success" type="submit">
                            Connect Wallet
                        </Button>
                    )}
                </form>
            </Container>
        </Navbar>
    );
};

export default Navigation;
