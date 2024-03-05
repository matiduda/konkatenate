import { Container } from "@radix-ui/themes";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <Container>
            <h1>Oops, this page doesn't seem to exist</h1>
            <p>Website encountered an 404 error, which means that there is nothing at <i>{location.pathname}</i>.</p>
            <p><Link to="/">Click here</Link> to return to home page.</p>
        </Container >
    )
}