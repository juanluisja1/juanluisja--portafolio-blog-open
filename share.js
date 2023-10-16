let skills_desc_hard  = document.querySelectorAll('.hard');

let skills_desc_soft = document.querySelectorAll('.soft');

let skills_desc__container = document.querySelectorAll('.hero__skills');

let skills_desc = document = document.querySelectorAll('.section_border');



skills_desc_hard.forEach(span => {
 
    setTimeout(() => {
        span.classList.remove("hard");
        span.classList.add("stress");
        
    }, 5000);
   
});

skills_desc_soft.forEach(span => {
 
    setTimeout(() => {
        span.classList.remove("soft");
        span.classList.add("stress");
    }, 1500);
   
});





