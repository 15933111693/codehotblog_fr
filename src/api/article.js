import axios from "@/plugins/axios"
export async function getArticle_api(_id) {
    const res = await axios.get(`/api/article?id=${_id}`)
    const res1 = await axios.post('/api/getUserNameAndAvatar', {data:{_id: res.data.authorId}})
    const {code, data} = res1
    if(code === 200 && data) {
        res.data.username = data.username
        res.data.avatar = data.avatar
    }
    const recommentlist = []
    for(let i of res.data.commentList) {
        const res3 = await axios.post('/api/getOneComment', {data: {_id: i}})
        if(res3.code === 200) recommentlist.push(res3.data)
    }
    recommentlist.sort((a,b) => b.timing - a.timing)
    res.data.commentList = recommentlist
    return res
}

export async function getAllArticle_api() {
    const res = await axios.get("/api/getArticle")
    const {data, code} = res
    if(code === 200) {
        for(let article of data) {
            const res2 = await axios.post('/api/getUserNameAndAvatar', {data:{_id: article.authorId}})
            if(res2.code === 200 && res2.data) {
                article.username = res2.data.username
            }
        }
    }
    return res
}

export async function search_api(content) {
    const res = await axios.get(`/api/search?content=${content}`)
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