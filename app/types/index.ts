// 日付を表す型
export type DateType = Date | string;

// 記事データの型
export interface Post {
  id: number;
  title: string;
  thumbnailUrl: string;
  createdAt: DateType;
  categories: string[];
  content: string;
}
