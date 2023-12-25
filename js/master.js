// Element Selected 
let landingPage = document.querySelector(".landing-page");
let imgContainer = document.querySelectorAll(".image-box .images-list img");
let startBtn = document.querySelector(".image-box .buttons .start");
let stopBtn = document.querySelector(".image-box .buttons .stop");
let change = true;
let intervalValue;


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

  // Check IF Random In Local Storage 
  let randomImage = localStorage.getItem("random");
  if(randomImage !== null) {
    landingPage.style.backgroundImage = `url(../images/0${randomImage}.webp)`;
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

// Check in Local Storage Buttons And Add Class Transparent 
let backgroundChange = localStorage.getItem("change");
if(backgroundChange !== null) {
  if(backgroundChange === 'true') {
    change = true;
  }else {
    change =  false;
  }
  document.querySelectorAll(".image-box .buttons button").forEach(btn=> {
    btn.classList.remove("transparent")
  })
  if(backgroundChange === 'true') {
    startBtn.classList.add("transparent");
  }else {
    stopBtn.classList.add("transparent");
  }
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



// Remove And Add Class Active From Button 
document.querySelectorAll(".settings-box .buttons button").forEach(btn=> {
  btn.addEventListener('click', (e)=> {
    e.target.parentElement.querySelectorAll(".transparent").forEach(actBtn=> {
      actBtn.classList.remove("transparent");
    })
    e.target.classList.add("transparent");
    if(e.target.dataset.background === "yes") {
      change = true;
      randomBackground();
      localStorage.setItem("change", change);
    }else {
      change = false;
      clearInterval(intervalValue);
      localStorage.setItem("change", change);
    }
  })
})



  // Changing Random Background Function
  function randomBackground() {
   if(change) {
    intervalValue = setInterval(() => {
      let randomNum = Math.ceil(Math.random() * 5);
      landingPage.style.backgroundImage = `url(../images/0${randomNum}.webp)`;
      localStorage.setItem("random", randomNum);
    }, 2000);
   }
  }
  
  
  
  //Click On Stop Changing Bottom
  if(document.querySelectorAll(".settings-box .buttons button")[0].classList[1] )
stopBtn.addEventListener("click", function() {
  document.querySelectorAll(".image-box .images-list img").forEach(img=> {
    img.classList.removeo("active");
  })
})
randomBackground();



// Visibl THe Text When Scroll 

//Select About Us Section
let about = document.querySelector(".about");
console.log(about);

window.onscroll = function() {
let aboutOffset = about.offsetTop;
let aboutOutter = about.offsetHeight;
let widowHeight = this.innerHeight;
let scrolly = this.pageYOffset;
console.log(aboutOutter)
if(scrolly > (aboutOffset + aboutOutter - (widowHeight +50))) {
  console.log("You Reached");
  document.querySelector(".about .content .text p").className = "visible"
  document.querySelector(".about  h2").className = "visible"
}

// console.log(scrolly)
}