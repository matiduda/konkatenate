import * as Form from '@radix-ui/react-form';
import { Button, Container } from '@radix-ui/themes';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { API_URL, MAX_USERNAME_LENGTH } from '../App';
import { Toast, ToastAction, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '@radix-ui/react-toast';
import { useNavigate } from 'react-router-dom';
import { RegisterFormElement } from '../utils/types';

export default function RegisterPage() {

    const [isWaitingForRegisterResponse, setIsWaitingForRegisterResponse] = useState<boolean>(false);

    // Popup
    const [open, setOpen] = useState(false);
    const eventDateRef = useRef("Some event msg");
    const timerRef = useRef(0);

    const [displayLoginButton, setDisplayLoginButton] = useState(false);

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    const handleSubmit = (event: FormEvent<RegisterFormElement>) => {
        event.preventDefault();
        setIsWaitingForRegisterResponse(true);

        const username = event.currentTarget.elements.username.value;
        const password = event.currentTarget.elements.password.value;
        const email = event.currentTarget.elements.email.value;

        const createUser = async () => {
            const registerEndpoint = API_URL + "/auth/register";

            const requestBody = {
                username: username,
                password: password,
                email: email,
            };


            const headers = new Headers({
                "Content-Type": "application/json"
            });

            const result = await fetch(registerEndpoint, {
                method: "POST",
                body: JSON.stringify(requestBody),
                headers: headers
            });

            const object = await result.json();

            setDisplayLoginButton(result.ok);

            return object.message;
        };

        createUser().then((message) => {
            setIsWaitingForRegisterResponse(false)
            openNotification(message);
        });
    }

    const openNotification = (message: string = "Error") => {
        setOpen(false);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            eventDateRef.current = message;
            setOpen(true);
        }, 100);
    }

    const repeatPasswordMatcher = (value: string, formData: FormData) => value !== formData.get("password");

    const navigate = useNavigate();

    return (
        <Container minHeight="70vh">
            <h1>Create an account</h1>
            <Form.Root className="FormRoot" onSubmit={handleSubmit} style={{ width: "400px" }}>
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
                        <input className="Input" maxLength={MAX_USERNAME_LENGTH} pattern={`[A-Za-z0-9_]{0,${MAX_USERNAME_LENGTH}}`} required />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="FormField" name="email">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: "10px" }}>
                        <Form.Label className="FormLabel">
                            Email
                        </Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Please enter your email
                        </Form.Message>
                        <Form.Message className="FormMessage" match="patternMismatch">
                            Please provide a valid email
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input type="email" className="Input" required />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="FormField" name="password">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel">
                            Password
                        </Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Please enter your password
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input className="Input" type="password" required />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="FormField" name="password-repeat">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel">
                            Repeat password
                        </Form.Label>
                        <Form.Message className="FormMessage" match={repeatPasswordMatcher}>
                            Password do not match
                        </Form.Message>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Please repeat your password
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input className="Input" type="password" required />
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

                    <ToastAction asChild className="ToastAction" altText="Goto schedule to undo">
                        {displayLoginButton && <button className="ToastActionButton small green" onClick={() => navigate("/login")}>
                            Login
                        </button>}
                    </ToastAction>
                </Toast>
                <ToastViewport className="ToastViewport" />
            </ToastProvider>
        </Container >
    )
}