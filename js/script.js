let modalBtn = document.querySelectorAll("button[data-modal]");

let modal = document.querySelector(".modal");

let modalClose = document.querySelector(".modal__close");

modalBtn.forEach((btn) => {

  btn.onclick = () => modal.classList.add("show", "fade");

  modalClose.onclick = () => modal.classList.remove("show");

});

let slides = document.querySelectorAll(".offer__slide");

let prev = document.querySelector(".offer__slider-prev");

let next = document.querySelector(".offer__slider-next");

let current = document.querySelector("#current")

let total = document.querySelector("#total")

total.textContent = String(slides.length).padStart(2,0)

let slideIndex = 0;

slideShow()

next.onclick = () => {

slideIndex++;

slideShow()

}

prev.onclick = () => {

    slideIndex--;

    slideShow()

    }

function slideShow() {

    if (slideIndex > slides.length - 1) {

        slideIndex = 0
        
    }else if (slideIndex < 0) {

        slideIndex = slides.length -1

    } 

    slides.forEach((slide) => slide.classList.add("hide" , "fade"));

    slides[slideIndex].classList.remove("hide");

    current.textContent = String(slideIndex + 1).padStart(2 ,0)
    
}

let tabheader__item = document.querySelectorAll(".tabheader__item")

let tabContent = document.querySelectorAll(".tabcontent")

tabShow(0)

function tabShow(idx) {

    tabContent.forEach(tab => tab.classList.add("hide", "fade"))

    tabContent[idx].classList.remove("hide")

}

tabheader__item.forEach((btn, idx) => {

    btn.onclick = () => {

        tabShow(idx)

        tabheader__item.forEach(el => el.classList.remove("tabheader__item_active"))

        btn.classList.add("tabheader__item_active")

    }

})

let minutes = document.querySelector("#minutes")

let seconds = document.querySelector("#seconds")

let interval = setInterval(() => {
    seconds.textContent--

    if (seconds.textContent < 0) {
        seconds.textContent = "59"
        minutes.textContent--
    }
    if (seconds.textContent < 10) {
        seconds.textContent = "0" + seconds.textContent--
    }
    if (minutes.textContent < 10) {
        minutes.textContent = "0" + minutes.textContent--
    }
    if (minutes.textContent <= 0 && seconds.textContent <= 0) {
        clearInterval(interval)
    }
},100)


//timer
let deadline = "2025-04-08 11:52"

/*Получаем дату */ 
function getTimer (endTime) {
    let t = Date.parse(endTime) - Date.parse(new Date())
    let days = Math.floor(t / 1000 / 60 / 60 / 24)
    let hours = Math.floor(t / 1000 / 60 / 60 % 24)
    let minutes = Math.floor(t / 1000 / 60 % 60)
    let seconds = Math.floor(t / 1000 % 60)

    return {t , days , hours , minutes , seconds};

}
//console.log(getTimer(deadline));

/*Меняем дату в HTML*/
function setTimer (endTime , selector) {
    let t = document.querySelector(selector)

    let days = t.querySelector("#days")
    let hours = t.querySelector("#hours")
    let minutes = t.querySelector("#minutes")
    let seconds = t.querySelector("#seconds")

 

    let interval = setInterval(updateTime , 1000)// вызов функции updateTime

    const container = document.querySelector('.fireworks')
    const fireworks = new Fireworks.default(container)

    /*Обновление даты*/
    function updateTime() {
        let t = getTimer(endTime)

        days.textContent = String(t.days).padStart(2,0)
        hours.textContent = String(t.hours).padStart(2,0)
        minutes.textContent = String(t.minutes).padStart(2,0)
        seconds.textContent = String(t.seconds).padStart(2,0)

        if (t.t < 0) {
            clearInterval(interval)

            let arr = [days , hours , minutes , seconds]
            for (const count of arr) {
                count.textContent = "00"
            }
            
            //fireworks
            fireworks.start()
            
            //Останавливаем фейерверк через 5 секунд
            setTimeout(() => fireworks.stop(), 5000)
        }
    }
}
/*Вызов функции setTimer()*/ 
setTimer(deadline , ".timer")
