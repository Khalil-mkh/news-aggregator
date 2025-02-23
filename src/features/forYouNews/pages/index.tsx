import { isNull } from "lodash";
import {
  useGetAllGuardianArticles,
  useGetNewsAPIArticles,
  useGetNewsOrgArticles,
} from "../../../shared/services";
import { useSearchStore } from "../../../shared/store/searchStore";
import { normalizeArticles } from "../../../shared/helpers/normalizeArticles";
import { useMemo, useState } from "react";
import { usePreferencesStore } from "../../userPreferences/store/preferencesStore";
import { ArticleModel } from "../../../shared/types/articleModel";
import NewsCard from "../../../shared/components/newsCard";
import AppLayout from "../../../shared/components/appLayout";
import Modal from "../../../shared/components/modal";
import { usePreferencesModalStore } from "../../../shared/store/preferencesModalStore";
import { Categories } from "../../userPreferences/config/categories";
import { Sources } from "../../userPreferences/config/sources";
import Loader from "../../../shared/components/loader";
import NoData from "../../../shared/components/noData";

const ForYouNewsPage = () => {
  const { preferences, setPreferences } = usePreferencesStore();
  const { searchValue } = useSearchStore();
  const { open, setOpen } = usePreferencesModalStore();

  const [activeTab, setActiveTab] = useState("categories");

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    preferences?.categories || []
  );
  const [selectedSources, setSelectedSources] = useState<string[]>(
    preferences?.sources || []
  );

  const handleCategoriesChange = (option: string) => {
    if (selectedCategories === null) {
      setSelectedCategories([option]);
    } else {
      const newValues = selectedCategories.includes(option)
        ? selectedCategories.filter((c) => c !== option)
        : [...selectedCategories, option];

      setSelectedCategories(newValues);
    }
  };

  const handleSourcesChange = (option: string) => {
    if (selectedSources === null) {
      setSelectedSources([option]);
    } else {
      const newValues = selectedSources.includes(option)
        ? selectedSources.filter((c) => c !== option)
        : [...selectedSources, option];

      setSelectedSources(newValues);
    }
  };

  const handleSubmitPreferences = () => {
    setPreferences({
      categories: selectedCategories,
      sources: selectedSources,
    });
    setOpen(false);
  };

  const { data: newsOrgArticles, isLoading: isNewsOrgArticlesLoading } =
    useGetNewsOrgArticles(
      {
        params: {
          category: preferences?.categories?.[0],
          q: searchValue,
        },
      },
      {
        enabled:
          isNull(preferences?.sources) ||
          preferences.sources?.includes("news-api-org"),
      }
    );

  const { data: newsApiArticles, isLoading: isNewsAPIArticlesLoading } =
    useGetNewsAPIArticles(
      {
        params: {
          q: searchValue,
          categories: preferences?.categories?.join(","),
        },
      },
      {
        queryKey: [{ url: "1" }],
        enabled:
          isNull(preferences?.sources) ||
          preferences.sources?.includes("news-api"),
      }
    );

  const { data: guardianArticles, isLoading: isGuardianArticlesLoading } =
    useGetAllGuardianArticles(
      {
        params: {
          q: searchValue,
          categories: preferences?.categories?.join(","),
        },
      },
      {
        enabled:
          isNull(preferences?.sources) ||
          preferences.sources?.includes("guardian-api"),
      }
    );

  const articles = useMemo(() => {
    const allArticles = normalizeArticles(
      newsOrgArticles,
      newsApiArticles,
      guardianArticles
    );

    if (preferences?.sources?.includes("news-api-org")) {
      return allArticles.filter((article) => article.dataSource === "news-org");
    } else if (preferences?.sources?.includes("guardian-api")) {
      return allArticles.filter((article) => article.dataSource === "guardian");
    } else if (preferences?.sources?.includes("news-api")) {
      return allArticles.filter((article) => article.dataSource === "news-api");
    } else {
      return allArticles;
    }
  }, [
    newsOrgArticles,
    newsApiArticles,
    guardianArticles,
    preferences?.sources,
  ]);

  const isLoading =
    isNewsOrgArticlesLoading ||
    isNewsAPIArticlesLoading ||
    isGuardianArticlesLoading;

  return (
    <AppLayout showUpdatePreferences>
      {isLoading && <Loader />}
      {!isLoading && articles.length === 0 && <NoData />}
      {!isLoading && (
        <div className="grid md:grid-cols-3 gap-16 mt-24 px-12">
          {articles?.map((article: ArticleModel) => {
            return <NewsCard article={article} />;
          })}
        </div>
      )}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Your Preferences"
        onSubmit={handleSubmitPreferences}
      >
        <div className="flex mb-4">
          {["categories", "sources"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 w-1/3 text-center ${
                activeTab === tab
                  ? "border-b-1 border-tarawera-500 text-tarawera-600"
                  : "text-gray-500"
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>
        <div className="text-gray-700">
          {activeTab === "categories" &&
            Categories.map((option) => (
              <label key={option.key} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedCategories?.includes(option.key) || false}
                  onChange={() => handleCategoriesChange(option.key)}
                />
                <span>{option.name}</span>
              </label>
            ))}
          {activeTab === "sources" &&
            Sources.map((option) => (
              <label key={option.key} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedSources?.includes(option.key) || false}
                  onChange={() => handleSourcesChange(option.key)}
                />
                <span>{option.name}</span>
              </label>
            ))}
        </div>
      </Modal>
    </AppLayout>
  );
};

export default ForYouNewsPage;
