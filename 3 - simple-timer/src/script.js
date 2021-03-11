'use strict'
let input_hour = document.querySelector('.input-hour');
let input_minute = document.querySelector('.input-minute');
let input_second = document.querySelector('.input-second');

input_second.addEventListener('change' , event => {
    
    if(event.target.valueAsNumber >= 60)
    {
        let add_minute = event.target.valueAsNumber / 60;
        event.target.valueAsNumber %= 60;
        input_minute.value += Math.floor(add_minute);
    }
    else if(event.target.valueAsNumber < 0)
    {
        input_second.value = 0;
    }
    
});


input_minute.addEventListener('change' , event => {
    
    if(event.target.valueAsNumber >= 60)
    {
        let add_hour = event.target.valueAsNumber / 60;
        event.target.valueAsNumber %= 60;
        input_hour.value += Math.floor(add_hour);
    }
    else if(event.target.valueAsNumber < 0)
    {
        input_minute.value = 0;
    }
});


input_hour.addEventListener('change' , event => {

    if(event.target.valueAsNumber < 0)
    {
        input_hour.value = 0;
    }
})

input_hour.placeholder = 'ساعت';
input_minute.placeholder = 'دقیقه';
input_second.placeholder = 'ثانیه';

let timer_hour = document.querySelector('.number.hour');
let timer_minute = document.querySelector('.number.minute');
let timer_second = document.querySelector('.number.second');





let start_btn = document.querySelector('.submit-btn-start');
let stop_btn = document.querySelector('.submit-btn-stop');


let total_time = 0;
let timer_interval = 0;



start_btn.addEventListener('click', event => {
    
    if(start_btn.classList.contains('fa-play'))
    {
        start_btn.classList.value = 'submit-btn-start fas fa-pause';

        if(total_time == 0)
        {
            timer_hour.textContent = input_hour.value == "" ? 0 : input_hour.value;
            timer_minute.textContent = input_minute.value == "" ? 0 : input_minute.value;
            timer_second.textContent = input_second.value == "" ? 0 : input_second.value;
            total_time = (parseInt(timer_hour.textContent) * 3600) + (parseInt(timer_minute.textContent) * 60) + parseInt(timer_second.textContent);
        }
        

        console.log(total_time);
        
         

        timer_interval = setInterval(() => {

            if(total_time <= 0)
            {
                start_btn.classList.value = 'submit-btn-start fas fa-play';
                clearInterval(timer_interval);
                let audio = new Audio('alarm.mp3');
                audio.play();
                return;
            }

            total_time--;
            console.log(total_time);
            
            let new_hour = Math.floor(total_time / 3600);
            let new_minute = Math.floor( (total_time % 3600) / 60 );
            let new_second = (total_time % 3600) % 60;

            timer_hour.textContent = new_hour;
            timer_minute.textContent = new_minute;
            timer_second.textContent = new_second;

        }, 1000);

    }
    else
    {
        clearInterval(timer_interval);
        start_btn.classList.value = 'submit-btn-start fas fa-play';
        
    }

});

stop_btn.addEventListener('click' , event => {

    clearInterval(timer_interval);
    start_btn.classList.value = 'submit-btn-start fas fa-play';
    total_time = 0;
    timer_hour.textContent = 0;
    timer_minute.textContent = 0;
    timer_second.textContent = 0;

});
