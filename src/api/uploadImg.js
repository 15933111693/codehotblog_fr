import axios from '@/plugins/axios'
export default async function uploadImg(d) {
    const res = await axios({
        url:"api/uploadImg",
        method:"post",
        data: d,
        headers: {
            'Content-Type':'application/x-www-form-urlencoded'
        }
    })
    return res
}