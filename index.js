document.addEventListener("DOMContentLoaded", () => {
    let quotesId = document.querySelector(".quotes-id");
    let quotesAuthor = document.querySelector(".quotes-author");
    let quotesDiv = document.querySelector(".quotes-display");
    let generateBtn = document.querySelector(".generate");
    let autoBtn = document.querySelector(".auto");
    let stopBtn = document.querySelector(".stop");
    let copyBtn = document.querySelector(".copy");
    let autoStatus = document.querySelector(".auto-status");

    let intervalId;
    generateBtn.onclick = () => {
        generateQuote();
        autoStatus.innerHTML = "Generate";
    };
    autoBtn.onclick = startAutoPlay;
    stopBtn.onclick = stopAutoPlay;
    copyBtn.onclick = copyQuote;

    async function getQuotes() {
        const response = await fetch("quotes.json");
        const data = await response.json();
        return data;
    }

    async function generateQuote() {
        const quotes = await getQuotes();
        const quote = quotes[Math.floor(Math.random() * quotes.length)];
        quotesDiv.innerHTML = quote.text;
        quotesId.innerHTML = quote.id;
        quotesAuthor.textContent = quote.author;
    }

    function startAutoPlay() {
        intervalId = setInterval(generateQuote, 5000);
        autoStatus.innerHTML = "Auto: ON";
    }

    function stopAutoPlay() {
        clearInterval(intervalId);
        autoStatus.innerHTML = "Auto: OFF";
    }

    function copyQuote() {
        const quoteText = quotesDiv.textContent + " - " + quotesAuthor.textContent;
        navigator.clipboard.writeText(quoteText).then(() => {
            autoStatus.innerHTML = "Copied!";
        }).catch(err => {
            console.error("Failed to copy: ", err);
        });
    }
});
