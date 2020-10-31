
function generate_buildings(){
    let categories = {"Administration": [], "Hospitals": []};

    const category_container = document.createElement("div");
    category_container.innerHTML = "<div class=\"d-flex align-items-center justify-content-between\">\n" +
        "                                    <h2 class=\"mb-0\">[NAME]</h2>\n" +
        "                                    <div class=\"badge badge-primary-soft text-primary badge-marketing\">[OPENINGS] Openings</div>\n" +
        "                                </div>";

    console.log(Object.entries(categories));
    for (const [key, value] of Object.entries(categories)){
        let current_category = category_container;
        current_category.innerHTML = category_container.innerHTML.replace("[NAME]", key);
        current_category.innerHTML = category_container.innerHTML.replace("[OPENINGS]", key);
        document.getElementById("buildings_categories").appendChild(current_category);
    }
}

generate_buildings();