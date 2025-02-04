function loadMap(map){
    Objects = [];
    map.forEach(element => {
        switch(element["type"]){
            case "wall":

                var n_wall = new Obj(element["points"]);
                n_wall.type = "wall";
                n_wall.setColor(element["color"][0],element["color"][1],element["color"][2]);
                Objects.push(n_wall);

                break;

            case "texture":
                var n_texture = new Obj(element["points"]);
                var n_img = new Image();
                n_img.src = element["texture"];
                n_texture.type = "texture";
                n_texture.texture = n_img;
                Objects.push(n_texture);
                break;
        }
    });
}