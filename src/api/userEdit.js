import axios from "@/plugins/axios"

// _id, avatar
const editAvatar_api = async function(data) {
    const res = await axios.post('/api/changeAvatar', {data})
    return res
}

// _id, password
const editUsername_api = async function(data) {
    const res = await axios.post('/api/changeUserName', {data})
    return res
}

// _id, username
const editPwd_api = async function(data) {
    const res = await axios.post('/api/changePwd', {data})
    return res
}

export {editAvatar_api, editUsername_api, editPwd_api}