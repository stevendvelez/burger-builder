import axios from "axios";

const instance = axios.create({
    baseURL: "https://burger-builder-a109c.firebaseio.com/"
});

export default instance;