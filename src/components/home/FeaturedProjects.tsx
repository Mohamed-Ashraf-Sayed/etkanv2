import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import ProjectThumbnail from "@/components/shared/ProjectThumbnail";
import { projects } from "@/data/projects";

export default function FeaturedProjects() {
  const featuredProjects = projects.slice(0, 3);

  return (
    <section className="section-padding relative">
      <Container>
        <SectionTitle
          title="مشاريع مميزة"
          subtitle="نماذج من أعمالنا التي نفتخر بها"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <Link
              key={project.slug}
              href={"/portfolio/" + project.slug}
              className="block group"
            >
              <div className="card-premium rounded-2xl overflow-hidden h-full flex flex-col">
                {/* Thumbnail */}
                <ProjectThumbnail
                  category={project.category}
                  title={project.title}
                />

                <div className="p-6 flex flex-col flex-1">
                {/* Top: Category badge + year */}
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="accent">{project.categoryLabel}</Badge>
                  <span className="text-text-muted text-xs font-tajawal">
                    {project.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold font-cairo text-text-primary group-hover:text-primary-light transition-colors mb-2">
                  {project.title}
                </h3>

                {/* Client */}
                <p className="text-sm text-accent font-tajawal mb-3">
                  {project.client}
                </p>

                {/* Summary */}
                <p className="text-sm text-text-secondary leading-relaxed font-tajawal mb-5 flex-1">
                  {project.summary}
                </p>

                {/* Result metric (first one) */}
                {project.results[0] && (
                  <div className="mb-5">
                    <span className="text-2xl font-black font-cairo gradient-text">
                      {project.results[0].value}
                    </span>
                    <span className="text-text-secondary text-sm font-tajawal mr-2">
                      {project.results[0].metric}
                    </span>
                  </div>
                )}

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-light/50 text-text-muted text-[11px] px-2 py-0.5 rounded-md border border-border font-tajawal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center mt-14">
          <Button variant="outline" size="lg" href="/portfolio">
            شاهد كل أعمالنا
          </Button>
        </div>
      </Container>
    </section>
  );
}
