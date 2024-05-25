import Cookies from "universal-cookie";
import { TOKEN_COOKIE_ID } from "../App";

export const getUsername = (): string => {
    const cookies = new Cookies();
    const token = cookies.get(TOKEN_COOKIE_ID);
    if (!token) {
        return "";
    }
    return token.sub;
}