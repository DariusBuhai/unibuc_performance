async function generate_buildings(){
    let categories = ["Hospitals", "Administrations"];

    let buildings = await http_get_async("/api/buildings", true);

    let view_buildings_and_categories = document.getElementById("buildings_and_categories");
    const category_container = generate_dom("<div class=\"d-flex align-items-center justify-content-between\">\n" +
        "                                    <h2 class=\"mb-0\">[NAME]</h2>\n" +
        "                                    <div class=\"badge badge-primary-soft text-primary badge-marketing\">[STATUS] buildings</div>\n" +
        "                                </div>");

    for (const category of categories){
        let category_buildings = buildings.filter((e) => e.category===category);
        if(category_buildings.length===0) continue;
        let current_category = parse_dom(category_container.cloneNode(true), {
            NAME: category,
            STATUS: buildings.length,
        });
        view_buildings_and_categories.appendChild(current_category);
        view_buildings_and_categories.appendChild(generate_dom("<hr class=\"mb-0\" />"));
        let view_buildings = generate_dom("<ul class=\"list-group list-group-flush list-group-careers\"></ul>", true);
        for(let i=0;i<category_buildings.length;i++){
            let view_building = generate_dom("<li class=\"list-group-item\">\n" +
                "                                    <a href=\"model?id=[ID]\" target=\"_blank\">[NAME]</a>\n" +
                "                                    <div class=\"small\">[STATUS]</div>\n" +
                "                                </li>");
            view_building = parse_dom(view_building.cloneNode(true), {
                NAME: category_buildings[i].name,
                STATUS: category_buildings[i].status,
                ID: category_buildings[i].id,
            });
            view_buildings.appendChild(view_building);
        }
        view_buildings_and_categories.appendChild(view_buildings);
    }
}

async function generate_index_logged_user_functionalities() {
    let logged_user = await check_logged_user();
    toggle_if_exists("add_location", logged_user);
}

generate_buildings();