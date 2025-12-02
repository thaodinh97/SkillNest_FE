import axiosClient from "../../services/axiosClient.js";

const orderApi = {
    getOrderByUserId: async () => {
        const res = await axiosClient.get("/order")
        return res
    }
}

export default orderApi