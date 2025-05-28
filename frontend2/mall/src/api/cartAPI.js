import jwtAxios from "../util/JWTUtil"


const host = `http://localhost:8080/api/cart`

export const getCartItems = async ( ) => {

    const res = await jwtAxios.get(`${host}/items`)
    return res.data
}

export const postChangeCart = async(cartItem) => {
    const res = await jwtAxios.post(`${host}/change`, cartItem)
    return res.data
}
