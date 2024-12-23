const User = require("../models/News");
const xml2js = require('xml2js');
const axios = require("axios");
const News = require("../models/News");

const rssDataFetch = async (rssUrl) => {
        try {
            const { data } = await axios.get(rssUrl);
            const parser = new xml2js.Parser({ explicitArray: false });
            const parsed = await parser.parseStringPromise(data);
            const items = parsed.rss.channel.item; // RSS items
            // console.log(items);
            return items;
        } catch (error) {
            console.error('Error fetching RSS feed:', error);
            return [];
        }
      };

exports.storeNews = async (req,res) => {
    try {
        const feedData = await rssDataFetch("https://www.espncricinfo.com/rss/content/story/feeds/2.xml");
        console.log("feedData>>><>><<", feedData);

        const newsData = feedData.map((item) => ({
            title: item.title,
            mainImage: item.coverImages || '',
            newsLink: item.link,
            description: item.description || '', 
            status: 1,
        }));

        await News.insertMany(newsData, { ordered: false });

        res.status(200).json({ message: 'News feed stored successfully.' });
    } catch (error) {
        console.error("Error storing news:", error);

        if (error.code === 11000) {
            res.status(200).json({ message: 'Some duplicate entries were skipped.' });
        } else {
            res.status(500).json({ error: "An error occurred while storing the news feed." });
        }
    }
}