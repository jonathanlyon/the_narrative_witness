import { Excerpt } from "../types";

type ExcerptContent = Partial<Excerpt>;

const excerptFiles = import.meta.glob<ExcerptContent>(
  "../../content/excerpts/*.json",
  {
    eager: true,
    import: "default"
  }
);

const isExcerptType = (
  value: unknown
): value is Excerpt["type"] =>
  value === "Essay" || value === "Reflection" || value === "Poem";

const normalizeExcerpt = (
  content: ExcerptContent,
  sourcePath: string
): Excerpt => {
  const requiredStrings = [
    "id",
    "title",
    "body",
    "readTime"
  ] as const;

  for (const field of requiredStrings) {
    if (!content[field]?.trim()) {
      throw new Error(`${sourcePath} needs a ${field}.`);
    }
  }

  if (!isExcerptType(content.type)) {
    throw new Error(`${sourcePath} has an unsupported excerpt type.`);
  }

  if (!Array.isArray(content.tags) || content.tags.length === 0) {
    throw new Error(`${sourcePath} needs at least one tag.`);
  }

  return {
    id: content.id!.trim(),
    title: content.title!.trim(),
    type: content.type,
    caption: content.caption?.trim(),
    readTime: content.readTime!.trim(),
    tags: content.tags.map((tag) => String(tag).trim()).filter(Boolean),
    artwork: content.artwork?.trim(),
    artworkAlt: content.artworkAlt?.trim(),
    thumbnail: content.thumbnail?.trim(),
    body: content.body!.trim(),
    order:
      typeof content.order === "number" && Number.isFinite(content.order)
        ? content.order
        : 999,
    published: content.published !== false
  };
};

export const EXCERPTS: Excerpt[] = Object.entries(excerptFiles)
  .map(([sourcePath, content]) => normalizeExcerpt(content, sourcePath))
  .filter((excerpt) => excerpt.published)
  .sort(
    (left, right) =>
      left.order - right.order || left.title.localeCompare(right.title)
  );
