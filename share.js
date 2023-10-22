

let backdrop = document.querySelector(".backdrop");
let toggleButton = document.querySelector(".toggle-button");
let mobileNav = document.querySelector(".mobile-nav");

// console.dir(backdrop.style['background-image']);

backdrop.addEventListener("click", function() {
  mobileNav.style.display = 'none';
  backdrop.style.display = 'none';
  // mobileNav.classList.remove("open");
  // backdrop.classList.remove("open");
});


toggleButton.addEventListener("click", function() {
 
  mobileNav.style.display = 'block';
  backdrop.style.display = 'block';
  // mobileNav.classList.add("open");
  // backdrop.classList.add("open");
});
