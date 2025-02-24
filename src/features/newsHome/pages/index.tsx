import { useMemo, useState } from "react";
import {
  useGetAllGuardianArticles,
  useGetNewsAPIArticles,
  useGetNewsOrgArticles,
} from "../../../shared/services/";
import NewsCard from "../../../shared/components/newsCard";
import { Categories } from "../../userPreferences/config/categories";
import FiltersBar from "../../../shared/components/filtersBar";
import { ArticleModel } from "../../../shared/types/articleModel";
import { normalizeArticles } from "../../../shared/helpers/normalizeArticles";
import AppLayout from "../../../shared/components/appLayout";
import { useSearchStore } from "../../../shared/store/searchStore";
import Loader from "../../../shared/components/loader";
import NoData from "../../../shared/components/noData";

const NewsHomePage = () => {
  const { searchValue } = useSearchStore();
  const [activeCategory, setActiveCategory] = useState(Categories[0].key);
  const [activeSource, setActiveSource] = useState("");
  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });

  const { data: newsOrgArticles, isLoading: isNewsOrgArticlesLoading } =
    useGetNewsOrgArticles({
      params: {
        q: searchValue,
        category: activeCategory,
      },
    });

  const { data: guardianArticles, isLoading: isGuardianArticlesLoading } =
    useGetAllGuardianArticles({
      params: {
        q: searchValue,
        categories: activeCategory,
        "from-date": dateRange.start,
        "to-date": dateRange.end,
      },
    });

  const { data: newsApiArticles, isLoading: isNewsApiArticlesLoading } =
    useGetNewsAPIArticles({
      params: {
        q: searchValue,
        categories: activeCategory,
      },
    });

  const articles = useMemo(() => {
    const allArticles = normalizeArticles(
      newsOrgArticles,
      newsApiArticles,
      guardianArticles
    );

    if (activeSource === "news-api-org") {
      return allArticles.filter((article) => article.dataSource === "news-org");
    } else if (activeSource === "guardian-api") {
      return allArticles.filter((article) => article.dataSource === "guardian");
    } else if (activeSource === "news-api") {
      return allArticles.filter((article) => article.dataSource === "news-api");
    } else {
      return allArticles;
    }
  }, [newsOrgArticles, newsApiArticles, guardianArticles, activeSource]);

  const isLoading =
    isNewsOrgArticlesLoading ||
    isNewsApiArticlesLoading ||
    isGuardianArticlesLoading;

  return (
    <AppLayout showUpdatePreferences={false}>
      <FiltersBar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        setActiveSource={setActiveSource}
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
      />
      {isLoading && <Loader />}
      {!isLoading && articles.length === 0 && <NoData />}
      {!isLoading && (
        <div className="grid md:grid-cols-3 gap-16 mt-24 px-12">
          {articles?.map((article: ArticleModel) => (
            <NewsCard key={article.url} article={article} />
          ))}
        </div>
      )}
    </AppLayout>
  );
};

export default NewsHomePage;
