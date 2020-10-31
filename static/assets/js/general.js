
function parse_dom(dom, key_rep){
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