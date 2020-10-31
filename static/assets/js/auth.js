function register(){
    let form_data = get_form_data("register");
    console.log(form_data);
    http_post("/api/register", form_data, function(result){
        console.log(result);
    });
}

function login(){
    let form_data = get_form_data("login");
    console.log(form_data);
    http_post("/api/login", form_data, function(result){
        console.log(result);
    });
}