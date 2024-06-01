import { Container, Button, Flex, Card, Text, Box, Avatar, TextArea, TextField } from "@radix-ui/themes";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useStomp } from "../useStomp";
import * as Form from '@radix-ui/react-form';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { ChatFormElement } from "../utils/types";
import { ObjectType } from "../useStomp/hook";
import { isUserAuthenticated } from "../utils/isUserAuthenticated";
import { Link, useNavigate } from "react-router-dom";
import { getUsername } from "../utils/getUsername";

enum MessageType {
    JOIN = "JOIN",
    CHAT = "CHAT",
    LEAVE = "LEAVE",
}

type Message = {
    sender: string,
    type: MessageType,
    content: string,
    timestamp: number,
}


export default function Chat({ gameID }: { gameID: string }) {
    const { disconnect, subscribe, unsubscribe, subscriptions, send, isConnected } = useStomp();

    const [messages, setMessages] = useState<Message[]>([]);

    const [isChatInitialized, setIsChatInitialized] = useState<boolean>(false);

    const [userAuthenticated, setUserAuthenticated] = useState<boolean>(isUserAuthenticated());

    useEffect(() => {
        if (!userAuthenticated) {
            return;
        }

        connect();
        setIsChatInitialized(true);
    }, []);

    useEffect(() => {
        console.log("Connected: " + isConnected)
    }, [isConnected]);

    const onMessageReceived = (message: any) => {
        console.log("Message received", message);

        if (message.type === MessageType.CHAT.toString()) {
            setMessages(oldArray => [...oldArray, message]);

            console.log("Chat: " + message.content);
        }
    }

    const connect = () => {
        subscribe("/topic/public/" + gameID, onMessageReceived);
        send("/app/chat.addUser/" + gameID, { sender: getUsername(), type: "JOIN" }, { sender: getUsername(), type: "JOIN" });
    }

    const sendMessage = (event: FormEvent<ChatFormElement>) => {
        event.preventDefault();

        const message: Message = {
            sender: getUsername(),
            type: MessageType.CHAT,
            content: event.currentTarget.elements.message.value,
            timestamp: Date.now(),
        };


        send("/app/chat.sendMessage/" + gameID, message as unknown as ObjectType<string>, { sender: getUsername(), type: "JOIN" });
        event.currentTarget.elements.message.value = "";
    }

    const getUniqueMessages = (messageArray: Message[]) => {
        return messageArray.filter((message: Message, index: number, self: Message[]) =>
            index === self.findIndex((m: Message) => (
                m.timestamp === message.timestamp
            ))
        )
    }

    const renderMessage = (message: Message) => {
        return (
            <Box key={message.timestamp} width="350px">
                <Card size="1">
                    <Flex gap="3" align="center">
                        <Avatar size="3" radius="full" fallback={message.sender[0]} color="indigo" />
                        <Box>
                            <Text as="div" size="2" color="gray">
                                {message.sender}
                            </Text>
                            <Text as="div" size="2" style={{ maxWidth: "265px" }}>
                                {message.content}
                            </Text>
                        </Box>
                    </Flex>
                </Card>
            </Box>
        )
    }

    return (
        <Box>

            <ScrollArea.Root className="ScrollAreaRoot">
                <ScrollArea.Viewport className="ScrollAreaViewport">
                    <div style={{ padding: '15px 20px' }}>
                        <div className="Text">Chat</div>
                        {!userAuthenticated ? (<Flex width="100%" height="500px" align="center" justify="center">
                            <Flex direction="column" align="center">
                                <Text>
                                    Chat disabled because you're not logged in<br></br>
                                </Text>
                                <Link to="/login">Log in here</Link>
                            </Flex>
                        </Flex>) : (<></>)}

                        <Flex gap="3" direction="column">
                            {getUniqueMessages(messages).map(message => renderMessage(message))}
                        </Flex>
                    </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="vertical">
                    <ScrollArea.Thumb className="ScrollAreaThumb" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar className="ScrollAreaScrollbar" orientation="horizontal">
                    <ScrollArea.Thumb className="ScrollAreaThumb" />
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className="ScrollAreaCorner" />
            </ScrollArea.Root>

            <Form.Root onSubmit={sendMessage}>

                <Form.Field className="FormField" name="message">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: "10px", marginTop: "20px" }}>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Please enter message first
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <TextField.Root placeholder="Write a message" maxLength={100} disabled={!userAuthenticated} required>
                        </TextField.Root>
                    </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                    <Button className="Button" style={{ marginTop: 10 }} disabled={!userAuthenticated}>
                        Send
                    </Button>
                </Form.Submit>
            </Form.Root>
        </Box >
    )
}