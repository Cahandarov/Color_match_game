var counter;

$("#btn_start").click(() => {
    $("#start").hide();
    $("#color_game").css("display", "flex");
    var time = $('#select').find(":selected").val();  // secilen deqiqe
    color_generate()
    setTimeout(() => {
        start_game()
        $("#end").css("display", "flex");         //oyun sonunda end-i cixarir
        $("#result").text($("#score").text());    // neticeni end-deki hisseye cixarir
        $("#minute").text(`${time}`);             //deqiqeni end-deki hisseye cixarir
        $("#color_game").css("display", "none");  
    }, 1000 * 60 * `${time}`)                      //secilen deqiqeye gore setTimeout
   
})

function color_generate() {
    var arr = [];
    for (let i = 0; i < 18; i++) {
        var rgb = Math.floor(Math.random() * 256);
        arr.push(rgb);
    }
    console.log(arr)
    const boxes = [[], [], [], [], [], []];   
    for (let i = 0; i < arr.length; i++) {
        const box_index = Math.floor(Math.random() * boxes.length);
        if (boxes[box_index].length < 3) {           //random ededleri 3lu qruplara bolur
            boxes[box_index].push(arr[i]);
        }
        else {
            i--;
        }
    }
    console.log(boxes)
    
    var random_box_index_for_head = Math.floor(Math.random() * boxes.length);  // box-lardan (arr) 1-ni random secirik
    $("#color_code").html(`RGB(${(boxes[random_box_index_for_head].join(', '))})`)
    for (let i = 0; i < boxes.length; i++) {
        var rgbValues = boxes[i].join(', ');
        $(`.boxes:eq(${i})`).css("background-color", `rgb(${rgbValues})`);
        //qutulari (div) eq(index) gore secirem
    }
}

function start_game(){
    counter = 0;
    $(".boxes").click((e) => {
        console.log(e.target);
        const backgroundColor = $(e.target).css("background-color");  //  click-lenen box-un backround-colorunu secir
        if (backgroundColor === $("#color_code").html().toLowerCase()) { //head-daki rengi lowercase edib qarsilasdirir
            counter = counter + 1;
            $("#score").text(`${counter}`); //counteri yazdirir
            $("#success").fadeIn();
            $("#success").fadeOut();
        }
        else {
            $("#fail").fadeIn();
            $("#fail").fadeOut();
        }
        color_generate()
    });
}
start_game()

$("#play_again_btn").click(()=>{
    $("#start").css("display", "flex");
    $("#end").hide();
})



