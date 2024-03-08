
function add_article(article){
    ARTICLES_CONTAINER.appendChild(article)
}

function make_article(article){
    let article_box = document.createElement("article")
    
    let article_title = document.createElement("h1")
    article_title.innerText = article.title

    let article_date = document.createElement("p")
    article_date.innerText = article.date
    article_date.classList.add('date')

    let article_banner_box = document.createElement("div")
    let article_redirect_link = document.createElement("a")
    let click_on_me_span = document.createElement('span')
    article_redirect_link.href = `read.html?slug=${article.slug}`
    click_on_me_span.innerText = 'click on me !'

    let article_banner = document.createElement("img")
    article_banner.src = article.banner
    article_redirect_link.appendChild(article_banner)
    article_banner_box.appendChild(article_redirect_link)
    article_banner_box.appendChild(click_on_me_span)

    let article_plot = document.createElement("p")
    article_plot.innerHTML = article.plot

    article_box.appendChild(article_title)
    article_box.appendChild(article_date)
    article_box.appendChild(article_banner_box)
    article_box.appendChild(article_plot)

    return article_box
}

function initialize(articles){
    articles.forEach(function (article, index, array) {
       article = make_article(article)
       add_article(article)
    })
}

const ARTICLES_CONTAINER = document.getElementById("articles")
const ARTICLES_URL = "http://127.0.0.1:3000/datas/all-articles.json"
fetch(ARTICLES_URL)
    .then((response) => {
        if(!response.ok)
            throw new Error(`Erreur HTTP: ${response.status}`)
        return response.json()
    })

    .then((json) => initialize(json.reverse()))
    .catch((err) => console.error(`Problème avec Fetch: ${err.message}`))