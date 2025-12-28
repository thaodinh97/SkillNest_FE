import {jwtDecode} from "jwt-decode"
export function getRoleFromToken(token) {
    try {
        const decoded = jwtDecode(token)
        if (decoded.scope) {
            const scopes = decoded.scope.split(" ");
            const role = scopes.find(s => s.startsWith("ROLE_"));
            return role || null;
        }
        return null
    } catch (error) {
        console.log(error);
        return null
    }
}