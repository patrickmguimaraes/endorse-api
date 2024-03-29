import { config } from "../config/db.config";
import Article from "../models/article.model";
import File from "../models/file.model";
import Post from "../models/post.model";

const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(config.NEWS_API_KEY);

class NewsFeed {
    constructor() {
        newsapi.v2.topHeadlines({
            country: 'us'
        }).then((response: any) => {
            if (response.articles.length > 0) {
                response.articles.forEach(async (article: any) => {
                    if (article.title != "[Removed]") {
                        try {
                            var check = await Article.findOne({ where: { title: article.title } });

                            if (!check) {

                                console.log(article.title, "checked")
                                var newArticle = await Article.create({
                                    date: new Date(article.publishedAt),
                                    text: article.content,
                                    title: article.title,
                                    subject: article.description,
                                    author: article.author
                                });

                                var post = await Post.create({
                                    articleId: newArticle.id,
                                    date: new Date(),
                                    powers: 0,
                                    endorsements: 0,
                                    link: this.decode(article.title),
                                    status: 'Posted',
                                    userId: 1
                                });

                                await File.create({
                                    path: article.urlToImage,
                                    type: "png",
                                    postId: post.id
                                })
                            }
                        } catch (error) {

                        }
                    }
                });
            }
        });

          newsapi.v2.everything({
            sources: 'the-american-conservative,the-irish-times,the-wall-street-journal,cnn,espn,bbc-news,abc-news,axios,bbc-sport,bloomberg,business-insider,cbc-news,cbs-news',
          }).then((response: any) => {
            if(response.articles.length>0) {
                response.articles.forEach(async (article: any) => {
                    if(article.title!="[Removed]") {
                        try {
                        var check = await Article.findOne({where: {title: article.title}});
                    
                        if(!check) {
                            var newArticle = await Article.create({
                                date: new Date(article.publishedAt),
                                text: article.content,
                                title: article.title,
                                subject: article.description,
                                author: article.author
                            });
    
                            var post = await Post.create({
                                articleId: newArticle.id,
                                date: new Date(),
                                powers: 0,
                                endorsements: 0,
                                link: this.decode(article.title),
                                status: 'Posted',
                                userId: 1
                            });
    
                            await File.create({
                                path: article.urlToImage,
                                type: "png",
                                postId: post.id
                            })
                        }
                        } catch (error) {

                        }
                    }
                });
            }
          });
    }

    decode(title: string) {
        if(!title) {
            return new Date().valueOf().toString(36).toLowerCase();
        }

        while(title.includes(" ")) {
            title = title.replace(" ", "-");
        }

        while(title.includes(".")) {
            title = title.replace(".", "-");
        }

        if(title.length > 50) {
            return title.substring(0, 49).toLowerCase();
        }
        else {
            return title.toLowerCase();
        }
    }
}

export default NewsFeed;