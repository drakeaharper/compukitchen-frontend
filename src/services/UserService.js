import { http } from './HttpService'

export function getAllUsers() {
    return http().get(`/api/user/`);
}

export function getUserById(id) {
    return http().get(`/api/user/${id}`);
}