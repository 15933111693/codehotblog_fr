import axios from "@/plugins/axios"
// title, titleImg, content, authorId, timing
async function publish_api(data) {
    const res = await axios.post('/api/postArticle', {data})
    return res
}
export {publish_api}