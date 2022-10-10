import {httpHook} from "@/hooks/http.hook";

export const authService = () => {
    const { httpPost, httpPatch } = httpHook();

    const register = (credentials) => {
        return httpPost('/register', credentials).then((response) => {
            return response;
        });
    }

    const login = (credentials) => {
        return httpPost('/login', credentials).then((response) => {
            return response;
        });
    }

    const logout = () => {
        return httpPost('/logout').then((response) => {
            return response;
        });
    }

    const forgotPassword = (data) => {
        return httpPost('/forgot_password', data).then((response) => {
            return response;
        });
    }

    const resetPassword = (data) => {
        return httpPatch('/reset_password', data).then((response) => {
            return response;
        });
    }

    return { register, login, logout, forgotPassword, resetPassword }
}