import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from "@radix-ui/react-toast";
import { Button, Container } from "@radix-ui/themes";
import { API_URL, MAX_USERNAME_LENGTH } from "../App";
import { FormEvent, useRef, useState } from "react";
import { isUserAuthenticated } from "../utils/isUserAuthenticated";
import { UsernameFormElement } from "../utils/types";
import { useNavigate } from "react-router-dom";
import * as Form from '@radix-ui/react-form';

const WAIT_TIME_BEFORE_REDIRECT = 3000;

// https://uploadcare.com/blog/how-to-upload-file-in-react/

export default function UploadPage() {
    const [isWaitingForRegisterResponse, setIsWaitingForRegisterResponse] = useState<boolean>(false);

    const navigate = useNavigate();

    // Popup
    const [open, setOpen] = useState(false);
    const eventDateRef = useRef("Some event msg");
    const timerRef = useRef(0);

    const openNotification = (message: string = "Error") => {
        setOpen(false);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            eventDateRef.current = message;
            setOpen(true);
        }, 100);
    };

    const handleSubmit = (event: FormEvent<UsernameFormElement>) => {
        event.preventDefault();
        setIsWaitingForRegisterResponse(true);

        const username = event.currentTarget.elements.username.value;

        const createUser = async () => {
            const loginEndpoint = API_URL + "/upload";

            const requestBody = {
                title: username,
            };

            console.log(requestBody);

            const headers = new Headers({
                "Content-Type": "application/json"
            });

            const result = await fetch(loginEndpoint, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: headers
            });

            if (!result.ok) {
                return "An unexpected error happened. Please try again";
            }

            const response = await result.json();

            console.log(response);

        };

        createUser().then((message) => {
            setIsWaitingForRegisterResponse(false)

            if (message?.length) {
                openNotification(message);
            }

            if (isUserAuthenticated()) {
                // Redirect to games page
                setTimeout(() => navigate("/games"), WAIT_TIME_BEFORE_REDIRECT);
            }
        });
    };

    return (
        <Container>
            <h1>Add game</h1>
            <Form.Root className="FormRoot" onSubmit={handleSubmit}>
                <Form.Field className="FormField" name="username">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: "10px" }}>
                        <Form.Label className="FormLabel">
                            Username
                        </Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Please enter your username
                        </Form.Message>
                        <Form.Message className="FormMessage" match={username => !username.length}>
                            Username cannot be empty
                        </Form.Message>
                        <Form.Message className="FormMessage" match="tooLong">
                            Username cannot be longer than 10 characters
                        </Form.Message>
                        <Form.Message className="FormMessage" match="patternMismatch">
                            Username must only contain alphanumeric characters or underscore
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input className="Input" maxLength={20} pattern={`[A-Za-z0-9_]{0,${MAX_USERNAME_LENGTH}}`} required />
                    </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                    <Button className="Button" style={{ marginTop: 10 }} loading={isWaitingForRegisterResponse}>
                        Submit
                    </Button>
                </Form.Submit>
            </Form.Root>
            <ToastProvider>
                <Toast className="ToastRoot" open={open} onOpenChange={setOpen}>
                    <ToastTitle className="ToastTitle">Register</ToastTitle>
                    <ToastDescription>
                        {eventDateRef.current}
                    </ToastDescription>
                </Toast>
                <ToastViewport className="ToastViewport" />
            </ToastProvider>
        </Container>
    )
}