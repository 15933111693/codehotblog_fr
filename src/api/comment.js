import axios from "@/plugins/axios"

export async function postComment(authorId, content, timing) {
    const data = {authorId, content, timing}
    const res = await axios.post("/api/postComment", {data})
    return res
}

export async function getAllComment_api() {
    const res = await axios.get('/api/getCommentList')
    const {code, data} = res
    if(code === 200) {
        for(let article of data) {
            const res2 = await axios.post('/api/getUserNameAndAvatar', {data:{_id: article.authorId}})
            if(res2.code === 200 && res2.data) {
                article.username = res2.data.username
                article.avatar = res2.data.avatar
            }
        }
    }
    return res
}

export async function addCommentLike_api(_id, _userId) {
    const data = {_id, _userId}
    const res = await axios.post("/api/likeComment", {data})
    return res
}

export async function searchRecomment_api(_id) {
    const data = {_id}
    const res = await axios.post("/api/getRecomment", {data})
    return res
}

export async function replyComment_api(authorId, content, timing, _id) {
    const data = {authorId, content, timing, _id}
    const res = await axios.post("/api/addComment", {data})
    return res
}

export async function getReply_api(_id) {
    const data = {_id}
    const res = await axios.post('/api/getRecommentReply', {data})
    return res
}

export async function addComment_api(_id, authorId, content, timing) {
    const data = {_id, authorId, content, timing}
    const res = await axios.post("/api/addcomment_article", {data})
    return res
}