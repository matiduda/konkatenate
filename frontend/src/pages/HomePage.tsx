import { Container } from "@radix-ui/themes";
import { useEffect, useState } from "react"

export default function HomePage() {

    const [response, setResponse] = useState("Loading...");

    useEffect(() => {
        fetch("http://localhost:8080/test").then(result => {
            result.json().then(json => {
                console.log();
                setResponse(json.info);
            })
        })
    }, []);

    return (
        <Container>
            <h1>
                Homepage
            </h1>
            <p>{response}</p>
        </Container>
    )
}