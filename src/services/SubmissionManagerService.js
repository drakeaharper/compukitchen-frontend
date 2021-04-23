import { http } from './HttpService'

export function userSubmit(user_id, month, month_cost, full_name) {
    return http().post('api/user_submit', { user_id: user_id, submission: month, month_total: month_cost, full_name: full_name })
}

export function getUserSubmissions(user_id) {
    return http().get(`api/user_submissions/${user_id}`)
}

export function getSubmissionsForProcessing() {
    return http().get('api/submissions_to_process')
}

export function processSubmission(id, sub) {
    return http().put(`/api/process/${id}`, { submission: sub })
}

export function getProcessedSubmissions() {
    return http().get(`/api/past_submissions`)
}