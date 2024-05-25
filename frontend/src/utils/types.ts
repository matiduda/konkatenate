export interface LoginRegisterElements extends HTMLFormControlsCollection {
    username: HTMLInputElement
    password: HTMLInputElement
}

export interface LoginRegisterFormElement extends HTMLFormElement {
    readonly elements: LoginRegisterElements
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