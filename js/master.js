// Element Selected 
let landingPage = document.querySelector(".landing-page");
let imgContainer = document.querySelectorAll(".image-box .images-list img");
let startBtn = document.querySelector(".image-box .buttons .start");
console.log(startBtn)
let stopBtn = document.querySelector(".image-box .buttons .stop");


//CHeck On Local Storage Color Option
if (localStorage.getItem("color") !== null) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color")
  );
  document
    .querySelectorAll(".settings-box .color-box .color-list li")
    .forEach((el) => {
      el.classList.remove("active");
      if (el.getAttribute("color") === localStorage.getItem("color")) {
        el.classList.add("active");
      }
    });
    startBtn.style.backgroundColor = localStorage.getItem("color");
    stopBtn.style.backgroundColor = localStorage.getItem("color");
}

if(localStorage.getItem("image") !== null) {
  document.querySelector(".landing-page").style.backgroundImage = `url(../${localStorage.getItem("image")})`;
  document.querySelectorAll(".image-box .images-list img").forEach(img=> {
    img.classList.remove("active");
    if(img.getAttribute("src") === localStorage.getItem("image")) {
      img.classList.add("active")
    }
  })
}


//Settings Box
// Toggle Classes
document.querySelector(".settings-box .fa-gear").onclick = function () {
  // Toggle Fa-spin Class To Icon
  this.classList.toggle("fa-spin");

  // Toggle Open Class To The Main Element
  document.querySelector(".settings-box").classList.toggle("open");
};

//Color Changing
let colorLi = document.querySelectorAll(".settings-box .color-list li");
colorLi.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.getAttribute("color")
    );
    localStorage.setItem("color", e.target.getAttribute("color"));
    startBtn.style.backgroundColor = e.target.getAttribute("color");
    stopBtn.style.backgroundColor = e.target.getAttribute("color");
    e.target.parentElement.querySelectorAll(".active").forEach((el) => {
      el.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});


//Image Changing

imgContainer.forEach(img => {
  img.addEventListener("click", (e)=> {
    e.target.parentElement.querySelectorAll(".active").forEach(el=> {
      el.classList.remove("active")
    })
    e.target.classList.add("active");
    landingPage.style.backgroundImage = `url(../${e.target.getAttribute("src")})`;
    localStorage.setItem("image", e.target.getAttribute("src"));
  }) 

})




// Landing Page Backgorund
let counter = setInterval(() => {
  let randomNum = Math.ceil(Math.random() * 5);
  landingPage.style.backgroundImage = `url(../images/0${randomNum}.webp)`;
}, 5000);


// Remove And Add Class Active To Button 
document.querySelectorAll(".settings-box .buttons button").forEach(btn=> {
  btn.addEventListener('click', (e)=> {
    e.target.parentElement.querySelectorAll(".active").forEach(actBtn=> {
      actBtn.classList.remove("active");
    })
    e.target.classList.add("active");
  })
})






//Click On Stop Changing Bottom
if(document.querySelectorAll(".settings-box .buttons button")[0].classList[1] )
stopBtn.addEventListener("click", function() {
  clearInterval(counter);
  document.querySelectorAll(".image-box .images-list img").forEach(img=> {
    img.classList.remove("active")
  })
})