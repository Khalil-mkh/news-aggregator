import {
  GetGuardianArticlesResponse,
  GetNewsApiArticlesReponse,
  GetNewsOrgArticlesResponse,
} from "../services/types";
import { NewsOrgArticleModel } from "../types/newsOrgArticleModel";

export const normalizeArticles = (
  newsOrgResponse?: GetNewsOrgArticlesResponse | null,
  newsApiResponse?: GetNewsApiArticlesReponse | null,
  guardianResponse?: GetGuardianArticlesResponse | null
): NewsOrgArticleModel[] => {
  const normalizedArticles: NewsOrgArticleModel[] = [];

  // Normalize NewsOrg articles
  newsOrgResponse?.articles?.forEach((article) => {
    normalizedArticles.push({
      author: article.author,
      content: article.content,
      description: article.description,
      publishedAt: article.publishedAt,
      source: { name: article.source.name },
      title: article.title,
      url: article.url,
      urlToImage: article.urlToImage,
      dataSource: "news-org",
    });
  });

  // Normalize NewsAPI articles
  newsApiResponse?.data?.forEach((article) => {
    normalizedArticles.push({
      author: "Unknown", // No author provided
      content: article.snippet || "", // Using snippet as content
      description: article.description,
      publishedAt: article.publishedAt,
      source: { name: article.source },
      title: article.title,
      url: article.url,
      urlToImage: article.image_url,
      dataSource: "news-api",
    });
  });

  // Normalize Guardian articles
  guardianResponse?.response?.results.forEach((article) => {
    normalizedArticles.push({
      author: "Unknown",
      content: "",
      description: "",
      publishedAt: article.publishedAt,
      source: { name: "The Guardian" },
      title: article.webTitle,
      url: article.webUrl,
      urlToImage: "",
      dataSource: "guardian",
    });
  });

  return normalizedArticles;
};
