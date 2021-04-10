import { http } from './HttpService'

export function createItem(item) {
    return http().post('/api/food_item', item)
}

export function listFoodItems() {
    return http().get('/api/food_item')
}

export function getItem(id) {
    return http().get(`/api/food_item/${id}`, {id: id})
}

export function updateItem(updated_item, id) {
    return http().put(`/api/food_item/${id}`, {id: id, updated_item: updated_item})
}

export function deleteItem(id) {
    return http().delete(`/api/food_item/${id}`)
}