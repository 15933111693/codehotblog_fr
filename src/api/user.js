import axios from "@/plugins/axios"

// _id
export async function getArticleList_api(_id) {
    const res = await axios.get(`/api/getArticleList?id=${_id}`)
    let ans = []
    for(let id of res.data) {
        const article = await axios.get(`/api/article?id=${id}`)
        if(article.code === 200 && article.data) ans.push(article.data)
    }
    for(let article of ans) {
        const res1 = await axios.post('/api/getUserNameAndAvatar', {data:{_id: article.authorId}})
        const {code, data} = res1
        if(code === 200 && data) {
            article.username = data.username
        }
    }
    return ans
}

// _id, _userid
export async function articleAddlike_api(_id, _userid) {
    const data = {_id, _userid}
    const res = await axios.post("/api/addlike", {data})
    return res
}

export async function getMyComment(_id) {
    const res = await axios.post('/api/getMycomment', {data:{_id}})
    return res
}