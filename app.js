class Drumkit {
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.palaybtn = document.querySelector('.play');
        this.currentkick = "./beats/kick-classic.wav";
        this.currentsnare = "./beats/snare-acoustic01.wav";
        this.currenthihat = "./beats/hihat-acoustic01.wav";
        this.kickaudio = document.querySelector('.kick-sound');
        this.snareaudio = document.querySelector('.snare-sound');
        this.hihataudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
        this.isplaying = null;
        this.selects = document.querySelectorAll('select');
    }
    activepad(){
        this.classList.toggle('active');
    }
    repeat() {
        let step = this.index % 8;

        const activebars = document.querySelectorAll(`.b${step}`);
        activebars.forEach(bar => {
            bar.style.animation =`playtrack 0.3s alternate ease-in-out 2`;
            //check if pads are active 
            if(bar.classList.contains('active'))
            {
                if(bar.classList.contains('kick-pad')){
                    this.kickaudio.currentTime = 0;
                    this.kickaudio.play();
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareaudio.currentTime = 0;
                    this.snareaudio.play();
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihataudio.currentTime = 0;
                    this.hihataudio.play();
                }
            }
        });
        this.index++;
    }
    start(){
        const interval = (60 / this.bpm) * 1000;

        if(this.isplaying){
            clearInterval(this.isplaying);
            this.isplaying = null ;
        }
        else{
            this.isplaying = setInterval(() => {
                this.repeat();
            }, interval);
        }
    }
    updatebtn() {
        if(!this.isplaying){
            this.palaybtn.innerText = "Stop";
            this.palaybtn.classList.add("active");
        }
        else{
            this.palaybtn.innerText = "PLay";
            this.palaybtn.classList.remove("active");
        }
    }
changesound(e){
    const selectionName = e.target.name;
    const selectionValue = e.target.value;

    switch(selectionName) {
        case "kick-select":
            this.kickaudio.src = selectionValue;
            break;
        case "snare-select":
            this.snareaudio.src = selectionValue;
            break;
        case "hihat-select":
            this.hihataudio.src = selectionValue;
             break;
    }
}

}

const drumkit = new Drumkit();

drumkit.pads.forEach(pad => {
    pad.addEventListener('click', drumkit.activepad);
    pad.addEventListener('animationend' , function(){
        this.style.animation = "";
    });
});

drumkit.palaybtn.addEventListener('click', function(){
    drumkit.updatebtn();
    drumkit.start();
});

drumkit.selects.forEach(select => {
    select.addEventListener('change' , function(e){
        drumkit.changesound(e);
    });
});