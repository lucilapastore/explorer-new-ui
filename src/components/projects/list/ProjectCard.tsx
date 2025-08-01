import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getEcosystems } from "@/queries/ecosystems.queries";
import { Project } from "@/types/project";
import Link from "next/link";
import { ProjectRating } from "../detail/ProjectRating";

interface ProjectCardProps {
  project: Project;
}

export async function ProjectCard({ project }: ProjectCardProps) {
  // Extract project properties as constants
  const { id, name, description, logos, ecosystem, categories, usecases } =
    project;

  const ecosystems = await getEcosystems();

  const getEcosystemIcon = (ecosystemId: string) => {
    const ecosystem = ecosystems.find((eco) => eco.id === ecosystemId);
    return ecosystem?.icon;
  };

  return (
    <Link href={`/project/${id}`} className="block h-full">
      <Card className="h-full transition-colors hover:bg-accent/50 hover:shadow-md">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-1 items-center gap-4 overflow-hidden">
              <Avatar className="mt-1 size-10 flex-shrink-0">
                <AvatarImage src={logos ? logos[0].url : ""} alt={name} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle className="truncate">{name}</CardTitle>
            </div>
            <div className="flex-shrink-0">
              <ProjectRating project={project} />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="line-clamp-2">
            {description || "No description available"}
          </CardDescription>
          <div className="flex items-center justify-between gap-2">
            {/* Ecosystems */}
            {ecosystem && ecosystem.length > 0 && (
              <div className="flex items-center gap-2">
                <div className="flex -space-x-[0.4rem]">
                  {ecosystem.map((eco, index) => {
                    const icon = getEcosystemIcon(eco);
                    return (
                      <Avatar
                        key={index}
                        className="size-6 border-2 border-card bg-white"
                      >
                        <AvatarImage
                          src={icon}
                          alt={eco}
                          className="object-contain bg-white"
                        />
                        <AvatarFallback className="bg-secondary/50 text-secondary-foreground text-xs">
                          {eco[0].toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col items-end gap-2">
              {/* Categories */}
              {categories && categories.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-end">
                  {categories.map((category, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-[10px]"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Usecases */}
              {usecases && usecases.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-end">
                  {usecases.map((usecase, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-[10px]"
                    >
                      {usecase}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
