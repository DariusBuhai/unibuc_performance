function register(){
    let form_data = get_form_data("register");
    http_post("/api/register", form_data, function(result){
        if(result.status==200){
            let cookie = btoa(form_data.username+"&"+form_data.password);
            setCookie("auth", cookie, 90);
            window.location = "/";
        }else if(result.status==401){
            alert("Invalid license key!");
        }else if(result.status==400){
            alert("Username already exists!");
        }
    });
}

function login(){
    let form_data = get_form_data("login");
    http_post("/api/login", form_data, function(result){
        if(result.status==200){
            let cookie = btoa(form_data.username+"&"+form_data.password);
            setCookie("auth", cookie, 90);
            window.location = "/";
        }else if(result.status==400){
            alert("User not found!");
        } else if(result.status==401){
            alert("Incorect username or password");
        }
    });
}

function logout(){
    setCookie("auth", "", -10);
    generate_logged_user_functionalities();
}

async function check_logged_user(){
    let auth_cookie = getCookie("auth");
    if(auth_cookie){
        auth_cookie = atob(auth_cookie).split("&");
        if(auth_cookie.length!==2) return false;
        let result = await http_post_async("/api/login", {username: auth_cookie[0], password: auth_cookie[1]});
        if(result.status===200)
            return true;
    }
    return false;
}

async function generate_logged_user_functionalities() {
    let logged_user = await check_logged_user();
    toggle_if_exists("login_action", logged_user);
    toggle_if_exists("logout_action", !logged_user);
    toggle_if_exists("register_action", logged_user);
}

generate_logged_user_functionalities();