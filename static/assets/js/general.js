
function parse_dom(dom, key_rep){
    console.log(dom);
    for(const [key, value] of Object.entries(key_rep))
        dom.innerHTML = dom.innerHTML.replace("["+key+"]", value);
    return dom;
}

function generate_dom(str, inner = false){
    let dom = document.createElement("div");
    dom.innerHTML = str;
    if(inner)
        return dom.children[0];
    return dom;
}

function get_form_data(form_id){
    let form_data = {};
    let form = document.getElementById(form_id);
    let inputs = form.getElementsByTagName("input");
    for(var id=0;id<inputs.length;id++)
        form_data[inputs[id].name] = inputs[id].value;
    return form_data;
}

function generate_child_from_template(template, data){
    let outer_template = document.createElement("div");
    template.hidden = false;
    template.removeAttribute("id");
    outer_template.appendChild(template);
    for (const [key, value] of Object.entries(data))
        outer_template.innerHTML = outer_template.innerHTML.split("[["+key+"]]").join(value);
    return outer_template.childNodes[0];
}

function http_get(theUrl, callback, json_data = true) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
            if(!json_data) callback(xmlHttp.responseText);
            else callback(JSON.parse(xmlHttp.responseText));
        }
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.setRequestHeader("accepts", "application/json");
    xmlHttp.send(null);
}

async function http_get_async(theUrl, json_data = true){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // true for asynchronous
    xmlHttp.setRequestHeader("accepts", "application/json");
    xmlHttp.send(null);
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
        if(!json_data) return xmlHttp.responseText;
        else return JSON.parse(xmlHttp.responseText);
    }
}

function http_post(theUrl, data, callback, isFormData = false) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4)
            callback(xmlHttp);
    };
    xmlHttp.open("POST", theUrl);
    if(isFormData){
        var formData = new FormData();
        for(const [key, value] of Object.entries(data))
            formData.append(key, value);
        xmlHttp.send(formData);
    }else{
        xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlHttp.send(JSON.stringify(data));
    }
}

async function http_post_async(theUrl, data, isFormData = false){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("POST", theUrl, false);
    if(isFormData){
        var formData = new FormData();
        for(const [key, value] of Object.entries(data))
            formData.append(key, value);
        xmlHttp.send(formData);
    }else{
        xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlHttp.send(JSON.stringify(data));
    }
    if (xmlHttp.readyState === 4)
        return xmlHttp;
    return false;
}

function http_put(theUrl, data, callback, isFormData) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200){
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open("PUT", theUrl);
    if(isFormData){
        var formData = new FormData();
        for(const [key, value] of Object.entries(data))
            formData.append(key, value);
        xmlHttp.send(formData);
    }else{
        xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlHttp.send(JSON.stringify(data));
    }
}

function http_delete(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
            callback(xmlHttp.responseText);
        }
    };
    xmlHttp.open("DELETE", theUrl);
    xmlHttp.send();
}

function toggle_hide_by_class(className, hide = true){
    let el = document.getElementsByClassName(className);
    for(let i=0;i<el.length;i++)
        el[i].hidden= hide;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function toggle_if_exists(id, visibility){
    let item = document.getElementById(id);
    if(item)
        item.hidden = visibility;
}

function append_if_exists(id, html){
    let item = document.getElementById(id);
    if(item)
        item.innerHTML = html;
}

function set_value_by_id(id, value){
    document.getElementById(id).innerText = value;
}
