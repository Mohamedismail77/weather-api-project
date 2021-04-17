/* Global Variables */
const appId = "3e15e3ed3633b0ac40ef1c8d5945a468";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";
const uniteQuery = '&units=imperial';
const generateButton = document.querySelector('#generate');
const userReponseInput = document.querySelector('#feelings');
const output = document.querySelector('#entryHolder');
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


const getWeatherData = async (url = '',zipCode,apiKey)=>{

    const response = await fetch(`${url}?zip=${zipCode}&${uniteQuery}&appid=${apiKey}`, {
        method:'GET',
        credentials: 'same-origin',
    });

    try{
        const data = await response.json();
        return data;
    }catch(error){
       console.log(error);
    }
}


const saveUserResponse = async (url='/projectData',body={})=> {


    const response = await fetch(url,{
        method:'POST',
        credentials: 'same-origin',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(body)
    });

    try{
        const data = await response.json();
        return data;
    } catch(error) {
        console.log(error);
    }

}

generateButton.addEventListener('click',()=>{
    const zipCode = document.querySelector('#zip');
    getWeatherData(baseUrl,zipCode.value,appId)
    .then((data)=>{
        let body = {
            temperature:data.main.temp,
            date:Date(),
            user_response:userReponseInput.value
        };
        saveUserResponse('/projectData',body)
        .then(updateUi);
    });
    
});


const updateUi = async ()=>{
       const request =  await fetch('/projectData');
        try{
            const allData = await request.json();
            console.log(allData)
            document.getElementById('date').innerHTML = `Date:${allData.date}`;
            document.getElementById('temp').innerHTML = `Temperature:${allData.temperature}`;
            document.getElementById('content').innerHTML = `I feel:${allData.user_response}`;
        }catch(err){
            console.log('error',err);
        }
}

updateUi();
