const apiURL = 'http://127.0.0.1:3000/';

//wake up the server(hosted on glitch and put to sleep by default)
//if successful change the UI to accept user input
checkAwake();

document.getElementById('form').onsubmit = async (event) => {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    //remove red border from last invalid input
    const textInput = document.getElementById('text-input');
    textInput.classList.remove('red-border');
    textInput.classList.add('colorful-border');

    const div = document.getElementById('sum-container');
    div.innerHTML = "...";
    try {
        let URL = document.getElementById('text-input').value;

        //check if input is valid
        if(URL.includes('youtu.be') || URL.includes('youtube')){ 
            if(URL.includes('youtu.be')){
                //https://youtu.be/iiiiiiiiiii
                URL = URL.slice(17, 28);
    
            }else if(URL.includes('youtube')){
                //https://www.youtube.com/watch?v=iiiiiiiiiii
                URL = URL.slice(32, 43);
            }


            //make API call
            const subs = await (await fetch(apiURL + 'sum/' + URL)).json();
            //display in div
            div.innerHTML = subs.data;
        }else{//invalid input

            textInput.classList.remove('colorful-border');
            textInput.classList.add('red-border');
            alert("Invalid Input");

        }
        
    } catch (err) {
        console.log(err);
        alert("Error with server, try again later");
    }
    
}


async function checkAwake (){
    try{
        const wakeUpResponse = await (await fetch(apiURL + 'wake')).json();

        if(wakeUpResponse.message == 'awake'){//server woke up, change ui to accept input
            changeUI();
        }else{
            throw new Error('Couldn\'t wake server');
        }
    }catch(err){
        console.log(err);
        alert("Error with server, try again later");
    }
    
}




function changeUI(){
    //change header text
    const h1 = document.getElementById('header');
    h1.innerHTML = "Enter video URL";

    //show the form
    const form = document.getElementById('form');
    form.classList.remove('hidden');
}