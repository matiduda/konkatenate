import { ToastProvider, Toast, ToastTitle, ToastDescription, ToastViewport } from "@radix-ui/react-toast";
import { Button, Container, TextArea } from "@radix-ui/themes";
import { API_URL } from "../App";
import { FormEvent, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Form from '@radix-ui/react-form';
import { UploadFormElement } from "../utils/types";
import { getUsername } from "../utils/getUsername";

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

    const handleSubmit = (event: FormEvent<UploadFormElement>) => {
        event.preventDefault();
        setIsWaitingForRegisterResponse(true);

        const title = event.currentTarget.elements.title.value;
        const description = event.currentTarget.elements.description.value;
        const game = event.currentTarget.elements.game.files?.[0];
        const cover = event.currentTarget.elements.cover.files?.[0];

        if (!game) {
            throw new Error("Game is undefined");
            return;
        }

        if (!cover) {
            throw new Error("Cover image is undefined");
            return;
        }

        const createUser = async () => {
            const uploadEndpoint = API_URL + "/games";

            const formData = new FormData();

            formData.append("title", title);
            formData.append("description", description);
            formData.append("game", game);
            formData.append("cover", cover);
            formData.append("uploader", getUsername());

            const result = await fetch(uploadEndpoint, {
                method: "POST",
                body: formData,
            });

            const response = await result.json();

            return response.message || "An unexpected error happened";
        };

        createUser().then((message) => {
            setIsWaitingForRegisterResponse(false)

            if (message?.length) {
                openNotification(message);
            }

            if (message === "Successfully uploaded game") {
                // Redirect to games page
                setTimeout(() => navigate("/games"), WAIT_TIME_BEFORE_REDIRECT);
            }
        });
    };

    return (
        <Container minHeight="70vh">
            <h1>Add game</h1>
            <Form.Root className="FormRoot" onSubmit={handleSubmit}>
                <Form.Field className="FormField" name="title">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: "10px" }}>
                        <Form.Label className="FormLabel">
                            Game title
                        </Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Please enter game title
                        </Form.Message>
                        <Form.Message className="FormMessage" match={input => !input.match(/^[\w\-\s]+$/)}>
                            Title must only contain alphanumeric characters or space
                        </Form.Message>
                        <Form.Message className="FormMessage" match="tooLong">
                            Title cannot be longer than 20 characters
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input className="Input" maxLength={20} required />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="FormField" name="description">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: "10px" }}>
                        <Form.Label className="FormLabel">
                            Description
                        </Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Please enter game description
                        </Form.Message>
                        <Form.Message className="FormMessage" match={input => !input.length}>
                            Description cannot be empty
                        </Form.Message>
                        <Form.Message className="FormMessage" match="tooLong">
                            Description cannot be longer than 120 characters
                        </Form.Message>
                        <Form.Message className="FormMessage" match="patternMismatch">
                            Description must only contain alphanumeric characters
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <TextArea className="Input" maxLength={120} required />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="FormFileField" name="game">
                    <div style={{ display: 'flex', flexDirection: "column", alignItems: 'baseline', justifyContent: 'space-between', gap: "10px" }}>
                        <Form.Label className="FormLabel">
                            Game - with <code>index.html</code> as entry
                        </Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Game file not loaded
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input type="file" accept=".zip" className="FileInput" required />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="FormFileField" name="cover">
                    <div style={{ display: 'flex', flexDirection: "column", alignItems: 'baseline', justifyContent: 'space-between', gap: "10px" }}>
                        <Form.Label className="FormLabel">
                            Cover image
                        </Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Cover image not loaded
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input type="file" accept=".jpg" className="FileInput" required />
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