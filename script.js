const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//Loadin Spinner Shown
const loading = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


//Remove Loading Spinner Loading
function complete() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}


// Get Quote From API
async function getQuote(){
    loading();
    //We need to use a Proxy URL to make our API call in order to avoid a CORS error
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/corsdemo'; //created a proxy in heroku
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';//Forismatic API
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // If Author is blank, add 'Unknown'
        (data.quoteAuthor === '') ? authorText.innerText = 'Unknown' : authorText.innerText = data.quoteAuthor;


        //Reduce font size for long quotes
        if (data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;

        //Stop Loader, Show Quote
        complete();
    } catch(error){
        getQuote();
    }

}


// Tweet Quote
function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener("click" , getQuote);
twitterBtn.addEventListener('click' , tweetQuote);

// On Load
getQuote();


