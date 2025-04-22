let botao = document.getElementById("botao")
let resetar = document.getElementById("resetar")
let pontosTexto = document.getElementById("pontos")
let resetsTexo = document.getElementById("resets")
let pontosParaResetText = document.getElementById("pontosresets")
let upgrade1 = document.getElementById("botaoupgrade1")
let upgrade2 = document.getElementById("botaoupgrade2")
let audio = document.getElementById("audio")

let debounce = false
let x2resets = localStorage.getItem("x2resets") || false

let pontos = localStorage.getItem("pontos") || 0
pontos = parseInt(pontos)
pontosTexto.textContent = "Pontos: " + pontos;

let resets = localStorage.getItem("resets") || 0
resets = parseInt(resets)
resetsTexo.textContent = "Resets: " + resets;

let pontosParaReset = localStorage.getItem("Pontosreset") || 25
pontosParaReset = parseInt(pontosParaReset)
pontosParaResetText.textContent = "Pontos para resetar: "
+ pontosParaReset;

let quantUpgrade = localStorage.getItem("quantupgrade") || 0
quantUpgrade = parseInt(quantUpgrade);

let precoUpgrade1 = localStorage.getItem("precoupgrade1") || 100
precoUpgrade1 = parseInt(precoUpgrade1)
upgrade1.textContent = "Pontos por segundos | " + precoUpgrade1 + " pontos " + "(" + quantUpgrade + "X)";

let precoUpgrade2 = 500

let pontosPorSecundo = quantUpgrade


setInterval(function() {
    pontos += pontosPorSecundo;
    pontosTexto.textContent = "Pontos: " + pontos;
    localStorage.setItem("pontos", pontos);
}, 1000);



let pontosPorClique
if (resets == 0)
{
    pontosPorClique = 1
}
else
{
    pontosPorClique = resets * 2
}

function playAudio() {
    audio.play();
}

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


botao.addEventListener("click", async function() 
{   
    if (debounce)
    {   
        return
    }
 
    pontos += pontosPorClique
    pontosTexto.textContent = "Pontos: " + pontos
    playAudio()

    localStorage.setItem("pontos", pontos)
    debounce = true
    await wait(300)
    debounce = false
})

resetar.addEventListener("click", function() 
{
    if (pontos >= pontosParaReset) 
    {
        pontos = 0;
        if (x2resets)
        {
            resets += 2;
        }
        else
        {
            resets += 1;
        }
        
        pontosParaReset *= 2;
        pontosPorClique = resets * 2;

        playAudio()

        pontosTexto.textContent = "Pontos: " + pontos;
        resetsTexo.textContent = "Resets: " + resets;
        pontosParaResetText.textContent = "Pontos para resetar: " + pontosParaReset;

        localStorage.setItem("pontos", pontos);
        localStorage.setItem("resets", resets);
        localStorage.setItem("Pontosreset", pontosParaReset);
    }
    else
    {
        console.log("Não possui pontos suficientes");
        alert("Não possui pontos suficientes")
    }
});

upgrade1.addEventListener("click", function() {
    if (pontos >= precoUpgrade1) {
        pontos -= precoUpgrade1;
        precoUpgrade1 *= 2;
        quantUpgrade += 1;

        pontosPorSecundo = quantUpgrade

        pontosTexto.textContent = "Pontos: " + pontos;
        upgrade1.textContent = "Pontos por segundos | " + precoUpgrade1 + " pontos " + "(" + quantUpgrade + "X)";
        
        playAudio()

        localStorage.setItem("precoupgrade1", precoUpgrade1);
        localStorage.setItem("quantupgrade", quantUpgrade);
        localStorage.setItem("pontos", pontos);
    }
});

upgrade2.addEventListener("click", function() 
{
    if (pontos >= precoUpgrade2 && !x2resets)
    {
        pontos -= precoUpgrade2
        x2resets = true

        pontosTexto.textContent = "Pontos: " + pontos;
        
        playAudio()

        localStorage.setItem("pontos", pontos);
        localStorage.setItem("x2resets", x2resets)
        
        upgrade2.disabled = true
    }
    else
    {
        upgrade2.disabled = true
    }

})