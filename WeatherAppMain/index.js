// Initialising all elements constants...........................................
const temperatureField = document.querySelector(".weather1");
const cityField = document.querySelector(".weather2 p");
const dateField = document.querySelector(".weather2 span");

const weatherField = document.querySelector(".weather3 span");

const searchField = document.querySelector(".searchField");
const form = document.querySelector("form");

// adding event listener to the form ...................................
form.addEventListener("submit",search);


// Default Location.................................................
let target = "delhi";

//  function to fetch the data from weather API ............................................
const fetchData = async(target) => {
    // here we used backTick................
   try {

    const url = `http://api.weatherapi.com/v1/current.json?key=6070d2398ea24dcf909115756221007&q=${target}`
      
    const response = await fetch(url);
    
    const data = await response.json();
    console.log(data);



//    Used for Destructuring..............................................
     const{
       current :{temp_c , condition : {text} },
       location : {name,localtime}

     } = data; 
     
     // calling update DOM function...........................................
     updateDOM(temp_c,name,text,localtime);
    
   } catch (error) {

         alert("Location Not Found");
    
   }

};

// Function to update the DOM.....................................................
function updateDOM(temperate,city,text,time) {

    temperatureField.innerText = temperate;
    // console.log(time);
    
    const exactTime = time.split(" ")[1];
    const exactDate = time.split(" ")[0];

    const exactDay = new Date(exactDate).getDay();
  //  console.log(exactDate);
  //  console.log(exactTime);

    // console.log(getDayFullName(exactDay));
    cityField.innerText = city;
   
    weatherField.innerText = text;
    dateField.innerText = `${exactTime} - ${getDayFullName(exactDay)} - ${exactDate} `;


}


fetchData(target);

// funtion to search the location ..............................
function search  (e){
     
  e.preventDefault();
  target = searchField.value;
  // console.log(target);
  fetchData(target);

}

// function to get the name of the day.....................................
function getDayFullName(num){

  switch(num){
    case 0:
        
       return "Sunday";
    
    case 1:
        
      return "Monday";
    case 2:
        
      return "Tuesday";
    case 3:
        
      return "Wednesday";
    case 4:
        
      return "Thursday";
    case 5:
        
      return "Friday";
    case 6:
        
      return "Saturday";  
    default:

       return "Don't Know";   
  }

}
