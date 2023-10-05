
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
      alert("min canvas size is 0")
    )
   
  })
}

function toolSelectionEfect(tool){
  $(".tool").addClass("cliked")
  $(tool).toggleClass("cliked")
}

function RGBToHex(rgb) {
  // Choose correct separator
  let sep = rgb.indexOf(",") > -1 ? "," : " ";
  // Turn "rgb(r,g,b)" into [r,g,b]
  rgb = rgb.substr(4).split(")")[0].split(sep);

  let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}


getCanvas();

const colorpicker = $(".colorpicker");

const tools = {
  brush : "brush",
  erraser : "erraser",
  colorP : "colorP"

}

var currentTool = tools.brush;

$("body").keypress(function(event){
  if(event.key === "b"){
    currentTool = tools.brush;
    toolSelectionEfect("#brush");
  }else if(event.key === "e"){
    currentTool = tools.erraser;
    toolSelectionEfect("#erraser");
  }else if(event.key === "i"){
    currentTool = tools.colorP;
    toolSelectionEfect("#colorP");
  }
})

$(".gridSelector").change(function(){
  $(".block").toggleClass("grid");
})


$(".container").mousedown(function(){
console.log("entering")
  let color = colorpicker.val();
  $(".block").mouseenter(function(){
    if(currentTool === tools.brush){
      $(this).css("background-color", color)
    }else if(currentTool == tools.erraser){
      $(this).css("background-color", "white")
    }
  
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
 
  if(currentTool === tools.brush){
    let color = colorpicker.val();
  $(this).css("background-color", color)
  }else if (currentTool === tools.erraser){
    $(this).css("background-color", "white")
  }else if(currentTool == tools.colorP){
    let currentColor = $(this).css("background-color")
    colorpicker.val(RGBToHex(currentColor)) 
  }
  
 
})


$("#clear-button").click(function(){
  var result = confirm("you are about to clear the canvas")
  if(result){
    $(".block").css("background-color", "white")
  }else{
    event.preventDefault();
  }
  
})



$("#erraser").click(function(){
  toolSelectionEfect(this);
  currentTool = tools.erraser
  

})

$("#brush").click(function(){
  toolSelectionEfect(this);
  currentTool = tools.brush;
})

$("#colorP").click(function(){
  toolSelectionEfect(this);
  currentTool = tools.colorP
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
    

         