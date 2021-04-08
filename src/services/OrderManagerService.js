import { http } from './HttpService'

export function checkout(shopping_cart, user_id, total_cost) {
    return http().post(`api/checkout`, {shopping_cart: shopping_cart, user_id: user_id, total_cost: total_cost})
}

export function getUserOrders(user_id) {
    return http().get(`api/order/user/${user_id}`)
}