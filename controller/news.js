const axios = require("axios")
const cheerio = require("cheerio")
const logger = require("../utils/logger")
const newsRouter = require("express").Router()

const purify = (string) => {
    string = string.replaceAll("\n", "").split("").join("")
    string = string.replaceAll("\t", "").split("").join("")
    return string
}
const articles = []
const specificArticles = []
const newspapers = [
    {
        base: "",
        publisher: "thetimes",
        address: "https://www.thetimes.co.uk/environment/climate-change"
    },
    {
        base: "",
        publisher: "cityam",
        address: "https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action"
    },
    {
        base: "",
        publisher: "theguardian",
        address: "https://www.theguardian.com/environment/climate-crisis"
    },
    {
        base: "https://www.telegraph.co.uk",
        publisher: "telegraph",
        address: "https://www.telegraph.co.uk/climate-change"
    },
    {
        base: "https://www.bbc.com",
        publisher: "bbc",
        address: "https://www.bbc.com/news/science-environment-56837908"
    },
    {
        base: "",
        publisher: "nyt",
        address: "https://www.nytimes.com/international/section/climate"
    },
    {
        base: "https://www.standford.co.uk",
        publisher: "es",
        address: "https://www.standford.co.uk/topic/climate-change"
    },
    {
        base: "",
        publisher: "sun",
        address: "https://www.thesun.co.uk/topic/climate-change-environment"
    },
    {
        base: "",
        publisher: "un",
        address: "https://www.un.org/climatechange"
    },
    {
        base: "",
        publisher: "nyp",
        address: "https://www.nypost.com/tag/climate-change"
    },
    {
        base: "https://www.smh.com.au",
        publisher: "smh",
        address: "https://www.smh.com.au/environment/climate-change"
    },
    {
        base: "",
        publisher: "latimes",
        address: "https://www.latimes.com/environment"
    },
    {
        base: "https://www.foxnews.com",
        publisher: "fox",
        address: "https://www.foxnews.com/category/us/environment/climate-change"
    },
    {
        base: "",
        publisher: "guardian",
        address: "https://guardian.ng/tag/climate-change"
    },
    {
        base: "",
        publisher: "climatechange",
        address: "https://climatechange.gov.ng/category/news"
    },
    {
        base: "",
        publisher: "environews",
        address: "https://www.environewsnigeria.com"
    },
    {
        base: "",
        publisher: "climatehomenews",
        address: "https://www.climatechangenews.com/news"
    }
]

newspapers.forEach(news => {
    axios.get(news.address).then((response) => {
                const html = response.data
                const $ = cheerio.load(html)

                $("a:contains('climate')", html).each(function () {
                    const title = $(this).text()
                    const url = $(this).attr("href")

                    articles.push({
                        publisher: news.publisher,
                        title,
                        url: news.base + url,
                        source: news.address,
                    })
                })
            }).catch(err => logger.error(err))
})

newsRouter.get("/", (req, res) => {
    res.send("<h1>Climate Change News API</h1>")
})

newsRouter.get("/news", (req, res) => {
    res.json(articles)
})

newsRouter.get("/news/:newspaperId",  (req, res) => {
    const newspaperId = req.params.newspaperId
    const newspaperPublisher = newspapers.filter(news => news.publisher === newspaperId)[0].publisher
    const newspaperAddress = newspapers.filter(news => news.publisher === newspaperId)[0].address
    const newspaperBase = newspapers.filter(news => news.publisher === newspaperId)[0].base

    axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)

            $("a:contains('climate')", html).each(function () {
                const title = $(this).text()
                const url = $(this).attr("href")

                specificArticles.push({
                    publisher: newspaperPublisher,
                    title,
                    url: newspaperBase + url,
                    source: newspaperAddress,
                })
            })

            res.json(specificArticles)
        }).catch(err => logger.error(err))
})

module.exports = newsRouter