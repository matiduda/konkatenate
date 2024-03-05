

import * as Form from '@radix-ui/react-form';
import { Container } from '@radix-ui/themes';
import { Link } from 'react-router-dom';

export default function SignInPage() {
    return (
        <Container>
            <h1>Sign in</h1>
            <p>Don't have an account? You can <Link to="/register">create one here</Link></p>
            <Form.Root className="FormRoot">
                <Form.Field className="FormField" name="email">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel">Email</Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Please enter your email
                        </Form.Message>
                        <Form.Message className="FormMessage" match="typeMismatch">
                            Please provide a valid email
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input className="Input" type="email" required />
                    </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                    <button className="Button" style={{ marginTop: 10 }}>
                        Post question
                    </button>
                </Form.Submit>
            </Form.Root>
        </Container>
    );
}