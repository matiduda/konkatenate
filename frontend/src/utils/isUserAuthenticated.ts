import Cookies from "universal-cookie"
import { TOKEN_COOKIE_ID } from "../App";

export const isUserAuthenticated = (): boolean => {
    const cookies = new Cookies();
    return !!cookies.get(TOKEN_COOKIE_ID);
}