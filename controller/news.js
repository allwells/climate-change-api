const axios = require("axios")
const cheerio = require("cheerio")
const express = require("express")
const app = express()

const articles = []
const newspapers = [
    {
        base: "",
        name: "thetimes",
        address: "https://www.thetimes.co.uk/environment/climate-change"
    },
    {
        base: "",
        name: "theguardian",
        address: "https://www.theguardian.com/environment/climate-crisis"
    },
    {
        base: "https://www.telegraph.co.uk",
        name: "telegraph",
        address: "https://www.telegraph.co.uk/climate-change"
    },
    {
        base: "https://www.bbc.com",
        name: "bbc",
        address: "https://www.bbc.com/news/science-environment-56837908"
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
                        publication: news.name,
                        title: title.replaceAll(" ", "\d").split("").join(""),
                        url: news.base + url,
                        source: news.address,
                    })
                })
            }).catch(err => console.log(err))
})

app.get("/", (req, res) => {
    res.send("<h1>Climate Change News API</h1>")
})

app.get("/news", (req, res) => {
    res.json(articles)
})

app.get("/news/:newspaperId", async (req, res) => {
    const newspaperId = req.params.newspaperId
    const newspaperPublication = newspapers.filter(news => news.name === newspaperId)[0].name
    const newspaperAddress = newspapers.filter(news => news.name === newspaperId)[0].address
    const newspaperBase = newspapers.filter(news => news.name === newspaperId)[0].base

    await axios.get(newspaperAddress)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const specificArticles = []

            $("a:contains('climate')", html).each(function () {
                const title = $(this).text()
                const url = $(this).attr("href")

                specificArticles.push({
                    publication: newspaperPublication,
                    title: title.replaceAll("\n", "").split("").join(""),
                    url: newspaperBase + url,
                    source: newspaperAddress,
                })
            })

            res.json(specificArticles)
        }).catch(err => console.log(err))
})

module.exports = app