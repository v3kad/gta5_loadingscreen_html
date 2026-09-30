const SLIDE_INTERVAL = 13000;

const TIPS = [
    "Server created by v3kad & sveo",
    "GTA5 IN GMOD WOW OMG!!!!",
    "Join our Discord community for rules and updates."
];

let currentSlide = 0;
let currentTip = 0;

function forcePlayMusic() {
    const audio = document.getElementById('bg-music');
    if (!audio) return;
    
    audio.volume = 0.3;
    
    const playPromise = audio.play();
    
    if (playPromise !== undefined) {
        playPromise.then(() => {}).catch(() => {
            setTimeout(forcePlayMusic, 500);
        });
    }
}

forcePlayMusic();

document.addEventListener('DOMContentLoaded', () => {
    forcePlayMusic();

    const slides = document.querySelectorAll('.slide');
    
    if (slides.length > 1) {
        setInterval(() => {
            let prevSlide = currentSlide;
            currentSlide = (currentSlide + 1) % slides.length;
            
            slides[prevSlide].classList.remove('active');
            slides[prevSlide].classList.add('exit');
            
            slides[currentSlide].classList.remove('exit');
            slides[currentSlide].classList.add('active', 'is-moving');
            
            setTimeout(() => {
                slides[prevSlide].classList.remove('exit', 'is-moving');
            }, 1500);

        }, SLIDE_INTERVAL);
    }

    const tipText = document.getElementById('tip-text');
    setInterval(() => {
        currentTip = (currentTip + 1) % TIPS.length;
        tipText.style.opacity = '0';
        setTimeout(() => {
            tipText.textContent = TIPS[currentTip];
            tipText.style.opacity = '1';
        }, 300);
    }, 6000);
});

window.GameDetails = function(servername, serverurl, mapname, maxplayers, steamid, gamemode) {
    forcePlayMusic();
};

window.SetStatusChanged = function(status) {
    const el = document.getElementById('loading-text');
    if (el) el.textContent = status;
    forcePlayMusic();
};

window.DownloadingFile = function(fileName) {
    const el = document.getElementById('loading-text');
    if (el) el.textContent = "Downloading " + fileName;
    forcePlayMusic();
};

window.onload = forcePlayMusic;
