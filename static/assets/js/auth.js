function register(){
    let form_data = get_form_data("register");
    console.log(form_data);
    http_post("/api/register", form_data, function(result){
        console.log(result);
    });
}

function login(){
    let form_data = get_form_data("login");
    http_post("/api/login", form_data, function(result){
        console.log(result);
        if(result){
            let cookie = btoa(form_data.username+"&"+form_data.password);
            setCookie("auth", cookie, 90);
        }
    });
}

async function get_logged_user(){
    let auth_cookie = getCookie("auth");
    if(auth_cookie){
        auth_cookie = atob(auth_cookie).split("&");
        if(auth_cookie.length!==2) return false;
        let result = await http_post_async("/api/login", {username: auth_cookie[0], password: auth_cookie[1]});
        return result;
    }
    return false;
}