import axiosClient from "../../services/axiosClient.js";

const cartApi = {
    addToCart: async (payload) => {
        const res = await axiosClient.post("/cart/item", payload)
        return res
    },

    getCart: async () => {
        const res = await axiosClient.get("/cart")
        return res
    },

    deleteItem: async (itemId) => {
        const res = await axiosClient.delete(`/cart/item/${itemId}`)
        return res
    }
}

export default cartApi