"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { Calendar, Clock, User } from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionTitle from "@/components/ui/SectionTitle";
import { getBlogPosts } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import Breadcrumb from "@/components/shared/Breadcrumb";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
} as const;

export default function BlogPageContent() {
  const t = useTranslations("blog");
  const locale = useLocale();
  const posts = getBlogPosts(locale);

  return (
    <>
      {/* Hero Section */}
      <section className="section-navy pt-32 pb-20">
        <Container>
          <Breadcrumb items={[{ label: t("title") }]} />
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Badge variant="gold">{t("badge")}</Badge>
            <h1 className="text-h1 font-bold font-cairo text-white mt-6 mb-6">
              {t("title")}
            </h1>
            <div className="gold-line mx-auto mb-6" />
            <p className="text-xl sm:text-2xl text-white/70 font-cairo leading-relaxed">
              {t("subtitle")}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <Container>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {posts.map((post) => (
              <motion.div key={post.slug} variants={itemVariants}>
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <Card className="h-full flex flex-col" hover>
                    {/* Category */}
                    <div className="mb-4">
                      <Badge variant="gold">{post.category}</Badge>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-bold font-cairo text-text-primary mb-3 line-clamp-2 leading-relaxed">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-text-secondary text-sm font-cairo leading-relaxed mb-6 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-accent" />
                        <span className="text-xs text-text-secondary font-cairo">
                          {post.author}
                        </span>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                          <span className="text-xs text-text-secondary font-cairo">
                            {formatDate(post.date)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          <span className="text-xs text-text-secondary font-cairo">
                            {post.readingTime} {t("readingTime")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </>
  );
}
