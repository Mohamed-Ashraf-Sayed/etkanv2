"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Link } from "@/i18n/navigation";
import {
  Calendar,
  Clock,
  User,
  ChevronLeft,
  Link2,
  Twitter,
  Linkedin,
  CheckCircle2,
  List,
} from "lucide-react";
import Container from "@/components/ui/Container";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SectionTitle from "@/components/ui/SectionTitle";
import type { BlogPost } from "@/data/blog";
import { formatDate } from "@/lib/utils";

interface BlogPostContentProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

interface TocItem {
  id: string;
  text: string;
  level: number;
}

function extractToc(content: string): TocItem[] {
  const items: TocItem[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();
    const h2Match = trimmed.match(/^## (.+)$/);
    const h3Match = trimmed.match(/^### (.+)$/);

    if (h2Match) {
      const text = h2Match[1];
      const id = text
        .replace(/\s+/g, "-")
        .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "");
      items.push({ id, text, level: 2 });
    } else if (h3Match) {
      const text = h3Match[1];
      const id = text
        .replace(/\s+/g, "-")
        .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "");
      items.push({ id, text, level: 3 });
    }
  }

  return items;
}

function renderMarkdown(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];
  let listKey = 0;

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul
          key={`list-${listKey++}`}
          className="list-disc list-inside space-y-2 text-text-secondary font-cairo leading-relaxed mr-4 my-4"
        >
          {listItems.map((item, i) => (
            <li key={i}>{renderInline(item)}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushList();
      continue;
    }

    // H2
    const h2Match = line.match(/^## (.+)$/);
    if (h2Match) {
      flushList();
      const text = h2Match[1];
      const id = text
        .replace(/\s+/g, "-")
        .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "");
      elements.push(
        <h2
          key={`h2-${i}`}
          id={id}
          className="text-h2 font-bold font-cairo text-text-primary mt-10 mb-4 scroll-mt-24"
        >
          {text}
        </h2>
      );
      continue;
    }

    // H3
    const h3Match = line.match(/^### (.+)$/);
    if (h3Match) {
      flushList();
      const text = h3Match[1];
      const id = text
        .replace(/\s+/g, "-")
        .replace(/[^\u0600-\u06FFa-zA-Z0-9-]/g, "");
      elements.push(
        <h3
          key={`h3-${i}`}
          id={id}
          className="text-xl sm:text-2xl font-bold font-cairo text-text-primary mt-8 mb-3 scroll-mt-24"
        >
          {text}
        </h3>
      );
      continue;
    }

    // List item
    if (line.startsWith("- ")) {
      listItems.push(line.slice(2));
      continue;
    }

    // Numbered list
    const numberedMatch = line.match(/^(\d+)\. (.+)$/);
    if (numberedMatch) {
      flushList();
      elements.push(
        <div
          key={`num-${i}`}
          className="flex gap-3 items-start text-text-secondary font-cairo leading-relaxed my-2"
        >
          <span className="text-accent font-bold shrink-0">
            {numberedMatch[1]}.
          </span>
          <span>{renderInline(numberedMatch[2])}</span>
        </div>
      );
      continue;
    }

    // Paragraph
    flushList();
    elements.push(
      <p
        key={`p-${i}`}
        className="text-text-secondary font-cairo leading-relaxed my-4"
      >
        {renderInline(line)}
      </p>
    );
  }

  flushList();
  return elements;
}

function renderInline(text: string): React.ReactNode {
  // Handle **bold** patterns
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, i) => {
    const boldMatch = part.match(/^\*\*(.+)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={i} className="text-text-primary font-semibold">
          {boldMatch[1]}
        </strong>
      );
    }
    return part;
  });
}

export default function BlogPostContent({
  post,
  relatedPosts,
}: BlogPostContentProps) {
  const t = useTranslations("blogPost");
  const tn = useTranslations("nav");
  const tb = useTranslations("blog");
  const [copied, setCopied] = useState(false);

  const toc = useMemo(() => extractToc(post.content), [post.content]);
  const renderedContent = useMemo(
    () => renderMarkdown(post.content),
    [post.content]
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank"
    );
  };

  const handleShareLinkedin = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  return (
    <>
      {/* Hero / Header */}
      <section className="section-navy pt-32 pb-16">
        <Container>
          {/* Breadcrumb */}
          <motion.nav
            className="flex items-center gap-2 text-sm text-white/60 font-cairo mb-8"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Link
              href="/"
              className="hover:text-accent transition-colors"
            >
              {tn("home")}
            </Link>
            <ChevronLeft className="w-4 h-4" />
            <Link
              href="/blog"
              className="hover:text-accent transition-colors"
            >
              {tb("title")}
            </Link>
            <ChevronLeft className="w-4 h-4" />
            <span className="text-white/40 line-clamp-1 max-w-[200px]">
              {post.title}
            </span>
          </motion.nav>

          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="gold">{post.category}</Badge>
              {post.tags.map((tag) => (
                <Badge key={tag} variant="muted">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-h2 font-bold font-cairo text-white leading-tight mb-6">
              {post.title}
            </h1>

            <div className="gold-line mb-6" />

            <div className="flex flex-wrap items-center gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-accent" />
                <span className="font-cairo">{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="font-cairo">{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-accent" />
                <span className="font-cairo">
                  {post.readingTime} {tb("readingTime")}
                </span>
              </div>
            </div>
          </motion.div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-12">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">
            {/* Main Article */}
            <motion.article
              className="min-w-0"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Card className="p-6 sm:p-10">
                {renderedContent}
              </Card>

              {/* Share Buttons */}
              <motion.div
                className="mt-10"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Card className="p-6">
                  <h3 className="text-lg font-bold font-cairo text-text-primary mb-4">
                    {t("share")}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleCopyLink}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border hover:border-accent/30 hover:text-accent text-text-primary text-sm font-cairo transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                          {t("copied")}
                        </>
                      ) : (
                        <>
                          <Link2 className="w-4 h-4" />
                          {t("copyLink")}
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleShareTwitter}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border hover:border-accent/30 hover:text-accent text-text-primary text-sm font-cairo transition-colors cursor-pointer"
                    >
                      <Twitter className="w-4 h-4" />
                      {t("twitter")}
                    </button>

                    <button
                      onClick={handleShareLinkedin}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface border border-border hover:border-accent/30 hover:text-accent text-text-primary text-sm font-cairo transition-colors cursor-pointer"
                    >
                      <Linkedin className="w-4 h-4" />
                      {t("linkedin")}
                    </button>
                  </div>
                </Card>
              </motion.div>
            </motion.article>

            {/* Sidebar - Table of Contents */}
            <motion.aside
              className="hidden lg:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="sticky top-28">
                <Card className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <List className="w-5 h-5 text-accent" />
                    <h3 className="text-lg font-bold font-cairo text-text-primary">
                      {t("toc")}
                    </h3>
                  </div>
                  <div className="gold-line mb-4" />
                  <nav className="space-y-1">
                    {toc.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={`block py-1.5 text-sm font-cairo transition-colors hover:text-accent ${
                          item.level === 3
                            ? "text-text-muted pr-4"
                            : "text-text-secondary"
                        }`}
                      >
                        {item.text}
                      </a>
                    ))}
                  </nav>
                </Card>
              </div>
            </motion.aside>
          </div>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="section-padding section-navy">
          <Container>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <SectionTitle
                title={t("related")}
                light
              />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {relatedPosts.map((related, index) => (
                <motion.div
                  key={related.slug}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link
                    href={`/blog/${related.slug}`}
                    className="block h-full"
                  >
                    <Card className="h-full flex flex-col" hover>
                      <div className="mb-3">
                        <Badge variant="gold">{related.category}</Badge>
                      </div>
                      <h3 className="text-lg font-bold font-cairo text-text-primary mb-3 line-clamp-2 leading-relaxed">
                        {related.title}
                      </h3>
                      <p className="text-text-secondary text-sm font-cairo line-clamp-2 leading-relaxed flex-1 mb-4">
                        {related.excerpt}
                      </p>
                      <div className="flex items-center gap-4 pt-3 border-t border-border text-xs text-text-secondary font-cairo">
                        <span>{related.author}</span>
                        <span className="text-accent">{formatDate(related.date)}</span>
                        <span>{related.readingTime} {tb("readingTime")}</span>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button href="/blog" variant="outline" className="border-white text-white hover:border-accent hover:text-accent">
                {t("viewAll")}
              </Button>
            </motion.div>
          </Container>
        </section>
      )}
    </>
  );
}
