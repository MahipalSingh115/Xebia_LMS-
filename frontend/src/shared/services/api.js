import axios from "axios";

const getBaseUrl = () => {
    let raw = (import.meta.env.VITE_API_URL || "https://xebia-lms-r0cg.onrender.com/api").trim();
    raw = raw.replace(/\/+$/, "");
    if (!raw.endsWith("/api")) {
        raw = `${raw}/api`;
    }
    return raw;
};

const api = axios.create({
    baseURL: getBaseUrl(),
    headers: {
        "Content-Type": "application/json"
    },
    timeout: 30000,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (!error.response) {
            const message = `${error.message ?? ""}`.toLowerCase();
            const code = error.code ?? "";

            if (
                code === "ERR_BLOCKED_BY_CLIENT" ||
                code === "ERR_NETWORK" ||
                message.includes("network error") ||
                message.includes("blocked by client")
            ) {
                error.isBlockedOrNetwork = true;
            }
        }

        return Promise.reject(error);
    }
);

export default api;