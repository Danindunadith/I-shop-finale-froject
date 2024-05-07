class LocalStore {
    storeToken(data) {
        localStorage.setItem("galleToken", JSON.stringify(data));
    }

    getToken() {
        const tokenData = localStorage.getItem("galleToken");
        return tokenData ? JSON.parse(tokenData) : null;
    }

    removeToken() {
        localStorage.removeItem("galleToken");
    }
}

export default LocalStore = new LocalStore()