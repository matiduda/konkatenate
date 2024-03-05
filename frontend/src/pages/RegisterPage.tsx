import * as Form from '@radix-ui/react-form';
import { Container } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement
    password: HTMLInputElement
}

interface UsernameFormElement extends HTMLFormElement {
    readonly elements: FormElements
}

export default function RegisterPage() {

    const handleSubmit = (event: React.FormEvent<UsernameFormElement>) => {
        event.preventDefault();
        console.log("User: " + event.currentTarget.elements.username.value);
        console.log("Password: " + event.currentTarget.elements.password.value);
    }

    return (
        <Container>
            <h1>Create an account</h1>
            <Form.Root className="FormRoot" onSubmit={handleSubmit}>
                <Form.Field className="FormField" name="username">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: "10px" }}>
                        <Form.Label className="FormLabel">Username</Form.Label>
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
                        <input className="Input" maxLength={10} pattern="[A-Za-z0-9_]+" required />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="FormField" name="email">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel">Email</Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Please enter an email address
                        </Form.Message>
                        <Form.Message className="FormMessage" match="typeMismatch">
                            Please enter a valid email address
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input className="Input" type="email" required />
                    </Form.Control>
                </Form.Field>
                <Form.Field className="FormField" name="password">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel">Password</Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Please enter your password
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input className="Input" type="password" required />
                    </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                    <button className="Button" style={{ marginTop: 10 }}>
                        Submit
                    </button>
                </Form.Submit>
            </Form.Root>
        </Container>
    )
}