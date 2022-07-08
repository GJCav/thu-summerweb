import { number } from 'echarts'
import sprintf from 'voca/sprintf.js'

function _API(name){
    return "/api/" + name
}

export const useUserProfile = () => useState("user_profile", () => {
    return {
        login: false,
        user_name: "null",
        flow_volume: 0,
        duration: 0
    }
})


function fetchJson(...rest:any){
    return fetch.apply(null, arguments).then((res) => {
        if(res.status == 200){
            return res.json()
        }else{
            throw `http error ${res.status}`
        }
    })
}


function updateProfile(profileJson){
    let profile = useUserProfile().value;
    // profile.login = profileJson.login;
    // profile.user_name = profileJson.user_name;
    // profile.flow_volume = profileJson.flow_volume;
    // profile.duration = profileJson.duration;
    for(let k in profileJson){
        profile[k] = profileJson[k]
    }

    // console.log("in useUserAction")
    // console.log(useUserProfile().value)
}


export const fetchUserProfile = () => {
    return fetchJson(_API("profile"))
        .then((j) => {
            updateProfile(j);
            return j;
        });
}

export const userLogin = (name, passwd) => {
    return fetch(_API("login"), {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({name: name, passwd: passwd})
    }).then((res) => {
        if(res.status == 200) return res.json()
        else{ throw res.status; }
    }).then((j) => {
        updateProfile(j);
        return j;
    })
}


export const userLogout = () => {
    return fetch(_API("logout")).then((r) => {
        if(r.status != 200) throw `http error ${r.status}`
        return true;
    })
}


export const bytesToString = (bytes: number) => {
    let unit = ["B", "K", "M", "G"];
    let i = 0;
    for(;i < unit.length-1 && bytes >= 100;i++, bytes /= 1024);
    return sprintf("%.2f %s", bytes, unit[i]);
}

export const durationToString = (duration: number) => {
    let sec = duration
    let hour = Math.floor(sec / 60 / 60)
    sec -= hour * 60 * 60
    let min = Math.floor(sec / 60)
    sec -= min * 60
    sec = Math.floor(sec)
    return sprintf("%02d:%02d:%02d", hour, min, sec)
}

export const fetchFlowUpdate = (inc: number = null) => {
    if(!inc){
        inc = Math.floor(Math.random() * 200 * 1024 * 1024)
    }
    return fetch(_API("flow?inc=" + inc))
    .then((res) => {
        if(res.status == 200) return res.json()
        else{ throw res.status; }
    }).then((j) => {
        updateProfile(j);
        return j;
    })
}