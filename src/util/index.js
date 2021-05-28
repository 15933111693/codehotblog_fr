export function isRegisterUserName(s)  
{  
    var patrn=/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){4,19}$/;  
    if (!patrn.exec(s)) return false
    return true
}

export function isPasswd(s)  
{  
    var patrn=/^(\w){6,20}$/;  
    if (!patrn.exec(s)) return false
    return true
} 

export function transdate(timing) {
    const cur = new Date().getTime()
    const year = new Date(cur).getFullYear() - new Date(timing).getFullYear()
    if(year > 0) return `${year}年前`
    const month = new Date(cur).getMonth() - new Date(timing).getMonth()
    if(month > 0) return `${month}月前`
    const time = cur - timing
    const day = (time / (1000 * 60 * 60 * 24)) >> 0
    if(day > 0) return `${day}天前`
    const hours = (time / (1000 * 60 * 60)) >> 0
    if(hours > 0) return `${hours}小时前`
    const min = (time / (1000 * 60)) >> 0
    if(min > 0) return `${min}分钟前`
    const sec = (time / 1000) >> 0
    if(sec > 0) return `${sec}秒前`
    return '刚刚'
}