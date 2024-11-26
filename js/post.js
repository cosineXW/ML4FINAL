let uploadedImage;
let userInput = ""
let openai_api_proxy = "https://zest-quiet-phalange.glitch.me/";
let message;
let commentArray = [];

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("#post");
  background(0);
  fill(255);

  select("#submit").mouseClicked(sendMessage);
    select("#file-input").elt.addEventListener('change', handleFileSelect);

}
function handleFileSelect(event) {
  let file = event.target.files[0];
  if (file && file.type.startsWith('image')) {
    // Load the selected image into p5.js
    uploadedImage = loadImage(URL.createObjectURL(file));
  }
}

function sendMessage() {
  let content = select("#input-text").value();
  // if (content == "") {
  //   return;
  // }
  userInput = content;
  if (uploadedImage) {
    let file=select("#file-input");
  }
  
  
  messages = [{
    role: "user",
    content: "I'm doing a project to let user upload text and one image like what they will do on social media,and let you to give comment on it like real people do. now I need a list of 20 netizen's ID(not random and can with or without numbers) and comment . Be very humorous and the content can be positive or negative. Format is [netizen ID,{comment}]. each comment should in {comment} .Must separate different notification arrays with semicolons. Do not include space or anything other than the formatted list.Here are the user's blog: "+ select("#file-input").value() + select("#input-text").value(),
  }];
  
  select("#input-text").value("");
  
  let params = {
    model: "gpt-4o-mini",
    messages: messages,
    temperature: 0.7,
  };
  requestOAI("POST", "/v1/chat/completions", params, gotResults);

  
}

function gotResults(results) {
  // console.log(results);

  let message = results.choices[0].message.content;
  console.log(message);
  
  pushInputToArray(message);
  console.log(commentArray)
}

function draw() {
 background(0);
  textSize(16);
  fill(255);
  textAlign(LEFT, TOP);
  text(userInput, 10, 10, width - 20, height - 20);
  if (uploadedImage) {
    image(uploadedImage, 10, 50, uploadedImage.width / 2, uploadedImage.height / 2);
  }
}
function pushInputToArray(input) {
  let formatted = input.replace(/\[|\]|/g, '').replace(/\n/g, '').split(";");
  for (let i = 0; i < formatted.length; i ++) {
    // console.log(formatted[i].split(',"'))
    let sth = formatted[i].split(",{");
    let final = [sth[0], sth[1].slice(0, -1)]
    // console.log(final)
    commentArray.push(final);
  }
  console.log(commentArray)
 
}
