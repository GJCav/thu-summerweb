function _API(name){
    return "/api/" + name
}

export const useUserProfile = () => useState("user_profile", () => {
    return {
        login: false,
        user_name: null,
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
    profile.login = profileJson.login;
    profile.user_name = profileJson.user_name;
    profile.flow_volume = profileJson.flow_volume;
    profile.duration = profileJson.duration;

    console.log("in useUserAction")
    console.log(useUserProfile().value)
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