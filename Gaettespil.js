let btn = document.getElementById("btn");
let output = document.getElementById("outputtext");
let number = [Math.floor(Math.random()*1000)]

btn.addEventListener("click", function(){
    let input = document.getElementById("userinput").value;
    if (input == number){
        output.innerHTML = `Du gættede rigtigt, dit nummer var ${number}`
    } else if (input < number){
        output.innerHTML = "Du gættede for lav!"
    };
    if (input > number){
        output.innerHTML = "Du gættede for højt!"
    }
});