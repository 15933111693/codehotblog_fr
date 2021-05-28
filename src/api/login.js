import axios from '@/plugins/axios'

export async function login_api(admin, password) {
    const res = await axios.post('/api/login', {data: {admin, password}})
    return res
}

export async function registor_api(admin, password) {
    const res = await axios.post('/api/registor', {data: {admin, password}})
    return res
}

export async function getUserInfo() {
    const res = await axios.post('/api/getUserInfo')
    return res
}