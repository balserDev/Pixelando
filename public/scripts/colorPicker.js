

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
    if(data.width <= 100 && data.width > 0 && data.height <= 100 && data.height > 0){
      let containerWidth = data.width * 10;
      let containereHeight = data.height * 10;
      $(".container").css("grid-template-rows", "repeat("+data.height+", 1fr)")
      $(".container").css("grid-template-columns", "repeat("+data.width+", 1fr)")
      $(".container").css("width", containerWidth);
      $(".container").css("height", containereHeight);
    }else if(data.width && data.height > 100){
      alert("Max canvas size is 100")
    }
    else(
      alert("min canvas size is 100")
    )
   
  })
}

getCanvas();

let colorpicker = $(".colorpicker");

$(".container").mousedown(function(){
console.log("entering")
  let color = colorpicker.val();
  $(".block").mouseenter(function(){
  $(this).css("background-color", color)
  })
})
$(".container").mouseup(function(){
  $(".block").off("mouseenter");
  console.log("exiting")
})
  
$(".container").mouseleave(function(){
  $(".block").off("mouseenter");
})


$(".block").click(function(){
 // console.log("hit");
  let color = colorpicker.val();
  $(this).css("background-color", color)
  // $(".block").mouseenter(function(){
  //   $(this).css("background-color", color)
  // })
})


$("#clear-button").click(function(){
  var result = confirm("you are about to clear the canvas")
  if(result){
    $(".block").css("background-color", "white")
  }else{
    event.preventDefault();
  }
  
})
// $("body").mouseup(function(){
//   $()
// })

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
    

         