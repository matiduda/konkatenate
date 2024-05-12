import { Button, Container } from "@radix-ui/themes";
import { useEffect, useState } from "react"
import { useStomp } from "../useStomp";

export default function HomePage() {

    const [response, setResponse] = useState("Loading...");

    const { disconnect, subscribe, unsubscribe, subscriptions, send, isConnected } = useStomp();

    useEffect(() => {
        fetch("http://localhost:8080/test").then(result => {
            result.json().then(response => {
                setResponse(response.message);
            })
        })
    }, []);

    const onMessageReceived = (message: any) => {
        console.log("Message received", message);
    }

    const connect = () => {
        console.log(isConnected);

        subscribe("/topic/public", onMessageReceived);

        send("/app/chat.addUser", { sender: "zacugaming", type: "JOIN" }, { sender: "zacugaming", type: "JOIN" });
    }

    return (
        <Container>
            <h1>
                Homepage
            </h1>
            <Button onClick={connect}>Connect</Button>
            <p>{response}</p>
        </Container>
    )
}