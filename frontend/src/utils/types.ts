export interface FormElements extends HTMLFormControlsCollection {
    username: HTMLInputElement
    password: HTMLInputElement
}

export interface UsernameFormElement extends HTMLFormElement {
    readonly elements: FormElements
}