import {useEffect, useState} from "react";
import {userApi} from "@/apis/user.js";

export const useAccountProfile = () => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            setLoading(true)
            setError(null)
            try {
                const response = await userApi.getInfo()
                if (response.code === 1000) {
                    setData(response.result);
                } else {
                    throw new Error(response.message || 'Lỗi không xác định');
                }
            }
            catch (err)
            {
                setError(err.message)
            }
            finally {
                setLoading(false);
            }
        }

        fetchProfile().catch(console.error);
    }, []);

    return { data, loading, error };
}