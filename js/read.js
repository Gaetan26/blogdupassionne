
function search(articles, slug){
    let found_article = null
    articles.forEach(function (article, index, array) {
        if (slug === article.slug)
            found_article = article
    })
    return found_article
}

function create_article(markdown_content){
    const converter = new showdown.Converter()
    let html = converter.makeHtml(markdown_content)
    ARTICLE_BOX.innerHTML = html
}

function initialize(articles, slug){
    const article = search(articles, slug)
    fetch(MARKDOWN_FILES_ENDPOINT+article.content)
    .then((response) => {
        if(!response.ok)
            throw new Error(`Erreur HTTP: ${response.status}`)
        return response.text()
    })

    .then((text) => create_article(text))
    .catch((err) => console.error(`Problème avec Fetch: ${err.message}`))    

}

const ARTICLE_BOX = document.getElementById("article")
const current_page_url = new URL(window.location.href)
const slug = current_page_url.searchParams.get("slug")
const MARKDOWN_FILES_ENDPOINT = `https://gaetan26.github.io/blogdupassionne/datas/markdown/`
const ARTICLES_URL = "https://gaetan26.github.io/blogdupassionne/datas/all-articles.json"

fetch(ARTICLES_URL)
    .then((response) => {
        if(!response.ok)
            throw new Error(`Erreur HTTP: ${response.status}`)
        return response.json()
    })

    .then((json) => initialize(json,slug))
    .catch((err) => console.error(`Problème avec Fetch: ${err.message}`))
