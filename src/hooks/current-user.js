import { useEffect, useState } from "react"
import axios from "../configs/axios-configs";

const useCurrentUser = () => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                axios.get("/user/current-user")
                    .then(res => setCurrentUser(res?.data?.data))
            } catch (error) {
                console.log(error);

            }
        }

        fetchCurrentUser();
    }, [])

    return currentUser;
}

export { useCurrentUser }