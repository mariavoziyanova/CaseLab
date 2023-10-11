window.addEventListener('load', function() {
    function buttonClick() {
        let opentext = document.querySelector(".closed");
        let styleDisplay = getComputedStyle(opentext);
        if(styleDisplay.display == 'none'){
            opentext.style.display ='block';
        } else {
            opentext.style.display='none';
        }
    }
    
    function esc(e){
        let opentext = document.querySelector(".closed");
        let styleDisplay = getComputedStyle(opentext);
        if (styleDisplay.display == 'block' && e.code == 'Escape') {
            opentext.style.display ='none';
        }
    }
    
    let button = document.querySelector("#myBtn");
    button.addEventListener("click", buttonClick);
    button.addEventListener('keydown', esc)
 }, false);
