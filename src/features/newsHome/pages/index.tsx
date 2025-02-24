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
import { DateRangeType } from "../../../shared/components/dateRange";

const NewsHomePage = () => {
  const { searchValue } = useSearchStore();
  const [activeCategory, setActiveCategory] = useState(Categories[0].key);
  const [activeSource, setActiveSource] = useState("");
  const [dateRange, setDateRange] = useState<DateRangeType>({
    start: new Date("2022-02-24T00:00:00Z"),
    end: new Date("2024-02-24T23:59:59Z"),
  });

  const { data: newsOrgArticles, isFetching: isNewsOrgArticlesLoading } =
    useGetNewsOrgArticles({
      params: {
        q: searchValue,
        category: activeCategory,
      },
    });

  const { data: guardianArticles, isFetching: isGuardianArticlesLoading } =
    useGetAllGuardianArticles({
      params: {
        q: searchValue,
        categories: activeCategory,
        "from-date": dateRange.start,
        "to-date": dateRange.end,
      },
    });

  const { data: newsApiArticles, isFetching: isNewsApiArticlesLoading } =
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
        activeSource={activeSource}
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
