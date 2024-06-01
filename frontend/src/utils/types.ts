export interface LoginElements extends HTMLFormControlsCollection {
    usernameOrEmail: HTMLInputElement
    password: HTMLInputElement
}

export interface LoginFormElement extends HTMLFormElement {
    readonly elements: LoginElements
}

export interface RegisterElements extends HTMLFormControlsCollection {
    username: HTMLInputElement
    email: HTMLInputElement
    password: HTMLInputElement
}

export interface RegisterFormElement extends HTMLFormElement {
    readonly elements: RegisterElements
}

export interface ChatFormElements extends HTMLFormControlsCollection {
    message: HTMLInputElement
}

export interface ChatFormElement extends HTMLFormElement {
    readonly elements: ChatFormElements
}


export interface UploadFormElements extends HTMLFormControlsCollection {
    title: HTMLInputElement,
    description: HTMLInputElement,
    game: HTMLInputElement,
    cover: HTMLInputElement,
}

export interface UploadFormElement extends HTMLFormElement {
    readonly elements: UploadFormElements
}