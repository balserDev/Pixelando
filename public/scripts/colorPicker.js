

$(".gridSelector").change(function(){
  $(".block").toggleClass("grid");
})



function getCanvas(){
  const url = "http://localhost:3000/canvas"
  fetch(url)
  .then(function(response){
    return response.json();
  })
  .then(function(data){

    $(".container").css("grid-template-rows", "repeat("+data.height+", 1fr)")
    $(".container").css("grid-template-columns", "repeat("+data.width+", 1fr)")
  })
}

getCanvas();

let colorpicker = $(".colorpicker");

$(".block").click(function(){
  console.log("hit");
  let color = colorpicker.val();
  $(this).css("background-color", color)
})


$("#download").click(function(){
  const screenshot = document.querySelector("#capture");
  html2canvas(screenshot).then((canvas)=>{
    const image = canvas.toDataURL("image/png");
    let anchor = document.createElement('a');
    anchor.setAttribute("href", image);
    anchor.setAttribute("download", "my-art.png");
    anchor.click();
    anchor.remove()

  })
})
    

         