var init_val = Math.random() * 10;

function randOp(){
    var men = Math.random() * 10;
    men -= 5;
    return men;
}

const maxVal = 50;

setInterval(function(){

    init_val = init_val + randOp();
    if(init_val < 0) init_val = 0;
    if(init_val > maxVal) init_val = maxVal;

    }, 2000);
