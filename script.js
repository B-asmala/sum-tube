const apiURL = 'http://127.0.0.1:3000/';

//wake up the server(hosted on glitch and put to sleep by default)
//if successful change the UI to accept user input
checkAwake();

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