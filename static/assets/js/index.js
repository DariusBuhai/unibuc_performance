function generate_buildings(){
    let categories = {Hospitals: [
            {id: 1, name:"Sfanta Maria", status: "crowded"},
            {id: 2, name:"Sfantul Usu", status: "empty"}
        ], Administrations: [
            {id: 3, name:"Primaria Brasov", status: "crowded"},
            {id: 4, name:"Primaria Bucuresti", status: "clear"},
            {id: 5, name:"Primaria Gorj", status: "clear"},
        ]};

    let buildings_and_categories = document.getElementById("buildings_and_categories");
    const category_container = generate_dom("<div class=\"d-flex align-items-center justify-content-between\">\n" +
        "                                    <h2 class=\"mb-0\">[NAME]</h2>\n" +
        "                                    <div class=\"badge badge-primary-soft text-primary badge-marketing\">[STATUS] buildings</div>\n" +
        "                                </div>");

    for (const [key, value] of Object.entries(categories)){
        let current_category = parse_dom(category_container.cloneNode(true), {
            NAME: key,
            STATUS: value.length,
        });
        buildings_and_categories.appendChild(current_category);
        buildings_and_categories.appendChild(generate_dom("<hr class=\"mb-0\" />"));
        let buildings = generate_dom("<ul class=\"list-group list-group-flush list-group-careers\"></ul>", true);
        for(let i=0;i<value.length;i++){
            let building = generate_dom("<li class=\"list-group-item\">\n" +
                "                                    <a href=\"model.html\" target=\"_blank\">[NAME]</a>\n" +
                "                                    <div class=\"small\">[STATUS]</div>\n" +
                "                                </li>");
            building = parse_dom(building.cloneNode(true), {
                NAME: value[i].name,
                STATUS: value[i].status,
                ID: value[i].id,
            });
            buildings.appendChild(building);
        }
        buildings_and_categories.appendChild(buildings);
    }
}

generate_buildings();