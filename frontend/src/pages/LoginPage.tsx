

import * as Form from '@radix-ui/react-form';
import { Button, Container } from '@radix-ui/themes';
import { FormEvent, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginFormElement } from '../utils/types';
import { API_URL, TOKEN_COOKIE_ID } from '../App';
import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from '@radix-ui/react-toast';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { isUserAuthenticated } from '../utils/isUserAuthenticated';

const WAIT_TIME_BEFORE_REDIRECT = 3000;

export default function LoginPage() {

    const navigate = useNavigate();

    const [isWaitingForRegisterResponse, setIsWaitingForRegisterResponse] = useState<boolean>(false);

    const cookies = new Cookies();

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

    const saveBearerTokenInCookies = (token: string, tokenType: string) => {
        const wholeToken = `${tokenType}${token}`;

        const decodedToken = jwtDecode(wholeToken);

        if (!decodedToken.exp) {
            throw new Error("Could not decode JWT token");
            return;
        }

        cookies.set(TOKEN_COOKIE_ID, decodedToken, {
            expires: new Date(decodedToken.exp * 1000)
        });
    };

    const handleSubmit = (event: FormEvent<LoginFormElement>) => {
        event.preventDefault();
        setIsWaitingForRegisterResponse(true);

        const usernameOrEmail = event.currentTarget.elements.usernameOrEmail.value;
        const password = event.currentTarget.elements.password.value;

        const createUser = async () => {
            const loginEndpoint = API_URL + "/auth/login";

            const requestBody = {
                usernameOrEmail: usernameOrEmail,
                password: password
            };

            const headers = new Headers({
                "Content-Type": "application/json"
            });

            let result: Response;

            try {
                result = await fetch(loginEndpoint, {
                    method: "POST",
                    body: JSON.stringify(requestBody),
                    headers: headers
                });
            } catch (e) {
                return "Failed to connect to server";
            }

            if (!result.ok) {
                return "An unexpected error happened";
            }

            const response = await result.json();

            saveBearerTokenInCookies(response.accessToken, response.tokenType);
            return response.message;
        };

        createUser().then((message) => {
            setIsWaitingForRegisterResponse(false)

            if (message?.length) {
                openNotification(message);
            }

            if (isUserAuthenticated()) {
                // Redirect to games page
                setTimeout(() => {
                    navigate("/games")
                    navigate(0);
                }, WAIT_TIME_BEFORE_REDIRECT);
            }
        });
    };

    return (
        <Container minHeight="70vh">
            <h1>Login</h1>
            <p>Don't have an account? You can <Link to="/register">create one here</Link></p>
            <Form.Root className="FormRoot" onSubmit={handleSubmit}>

                <Form.Field className="FormField" name="usernameOrEmail">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: "10px" }}>
                        <Form.Label className="FormLabel">
                            Username or email
                        </Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Please enter username or email
                        </Form.Message>
                        <Form.Message className="FormMessage" match={username => !username.length}>
                            Username cannot be empty
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input className="Input" required />
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
                <Form.Submit asChild>
                    <Button className="Button" style={{ marginTop: 10 }} loading={isWaitingForRegisterResponse}>
                        Submit
                    </Button>
                </Form.Submit>
            </Form.Root>
            <ToastProvider>
                <Toast className="ToastRoot" open={open} onOpenChange={setOpen}>
                    <ToastTitle className="ToastTitle">Login</ToastTitle>
                    <ToastDescription>
                        {eventDateRef.current}
                    </ToastDescription>
                </Toast>
                <ToastViewport className="ToastViewport" />
            </ToastProvider>
        </Container>
    );
}