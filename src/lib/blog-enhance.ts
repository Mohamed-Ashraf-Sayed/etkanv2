// Auto-link service mentions and detect HowTo schema in blog content

interface LinkRule {
  patterns: RegExp[];
  url: string;
}

const linkRules: LinkRule[] = [
  {
    patterns: [/\bتطوير المواقع\b/g, /\bتصميم المواقع\b/g, /\bتطوير الويب\b/g],
    url: "/services/web-dev",
  },
  {
    patterns: [/\bتطوير التطبيقات\b/g, /\bتطبيقات الموبايل\b/g, /\bتطبيقات الجوال\b/g],
    url: "/services/mobile-dev",
  },
  {
    patterns: [/\bأنظمة CRM\b/g, /\bنظام CRM\b/g, /\bإدارة العملاء\b/g],
    url: "/services/crm",
  },
  {
    patterns: [/\bأنظمة ERP\b/g, /\bنظام ERP\b/g, /\bتخطيط موارد المؤسسة\b/g],
    url: "/services/crm",
  },
  {
    patterns: [/\bالبنية التحتية\b/g, /\bالشبكات\b/g],
    url: "/services/networks",
  },
  {
    patterns: [/\bالدعم الفني\b/g, /\bدعم تقني\b/g],
    url: "/services/it-support",
  },
];

/**
 * Auto-link service mentions in markdown content.
 * Only links the FIRST occurrence of each pattern to avoid spam.
 */
export function autoLinkContent(content: string): string {
  let result = content;
  const linked = new Set<string>();

  for (const rule of linkRules) {
    for (const pattern of rule.patterns) {
      if (linked.has(rule.url)) break;
      pattern.lastIndex = 0;
      const match = pattern.exec(result);
      if (match) {
        const before = result.slice(0, match.index);
        const after = result.slice(match.index + match[0].length);
        // Skip if already in a link
        if (
          before.lastIndexOf("[") > before.lastIndexOf("]") ||
          before.endsWith("/") ||
          after.startsWith("(")
        ) {
          continue;
        }
        result = `${before}[${match[0]}](${rule.url})${after}`;
        linked.add(rule.url);
      }
    }
  }

  return result;
}

/**
 * Detect if article is a HowTo guide and extract steps.
 * Returns HowTo schema or null.
 */
export function detectHowToSchema(
  title: string,
  content: string,
  url: string
): object | null {
  // Heuristic: title contains "كيف" or "خطوات" or "دليل"
  const isHowTo = /^(كيف|خطوات|دليل|طريقة)\s/.test(title.trim()) ||
    /\bخطوات\b/.test(title);
  if (!isHowTo) return null;

  // Extract numbered or ## sections as steps
  const lines = content.split("\n");
  const steps: { name: string; text: string }[] = [];
  let currentStep: { name: string; text: string } | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    // Match "## 1. text" or "## الخطوة 1: text" or numbered "1. text"
    const numbered = trimmed.match(
      /^(?:##\s+)?(?:\d+[.)]\s+|الخطوة\s+\d+\s*[:.-]?\s*)(.+)/
    );
    const heading = trimmed.match(/^##\s+(.+)/);

    if (numbered) {
      if (currentStep) steps.push(currentStep);
      currentStep = { name: numbered[1].trim(), text: "" };
    } else if (heading && !currentStep) {
      // Skip generic headings - only count if they look like steps
      continue;
    } else if (currentStep && trimmed && !trimmed.startsWith("#")) {
      currentStep.text += (currentStep.text ? " " : "") + trimmed;
    } else if (currentStep && trimmed.startsWith("##")) {
      steps.push(currentStep);
      currentStep = null;
    }
  }
  if (currentStep) steps.push(currentStep);

  // Need at least 3 steps to qualify as HowTo
  if (steps.length < 3) return null;

  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    step: steps.slice(0, 12).map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text.slice(0, 500) || s.name,
      url: `${url}#step-${i + 1}`,
    })),
  };
}
