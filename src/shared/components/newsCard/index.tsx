import { FC } from "react";
import { ArticleModel } from "../../types/articleModel";
import defaultNewsImage from "../../../assets/default-article-image.webp"; // Adjust path based on file location

interface NewsCardProps {
  article: ArticleModel;
}

const NewsCard: FC<NewsCardProps> = ({ article }) => {
  return (
    <div className="bg-white max-w-sm rounded-xl shadow-sm border-2 border-gray-200 p-4">
      <p className="mb-3 font-bold text-gray-700 dark:text-neutral-400">
        {article.source?.name}
      </p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">
        <img
          className="rounded-t-lg w-full object-cover"
          src={article.urlToImage || defaultNewsImage}
          alt={article.title || "News Image"}
        />
      </a>
      <div className="pt-4">
        <p className="mb-3 font-normal text-gray-700 dark:text-neutral-400">
          {article.publishedAt}
        </p>
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            {article.title}
          </h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {article.description}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {`${article.source.name} - ${article.author}`}
        </p>
      </div>
    </div>
  );
};

export default NewsCard;
