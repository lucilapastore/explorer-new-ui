import ProjectsFilters from "@/components/projects/ProjectsFilters";
import { ProjectsList } from "@/components/projects/ProjectsList";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  const searchParamsKey = JSON.stringify(await searchParams);
  return (
    <div className="container px-4 md:px-6 lg:px-8">
      <div className="space-y-8">
        <ProjectsFilters />

        <Suspense key={searchParamsKey} fallback={ProjectsList.fallback()}>
          <ProjectsList searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
