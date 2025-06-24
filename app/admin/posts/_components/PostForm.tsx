import React from "react";
import Input from "@/app/_components/Input";
import Label from "@/app/_components/Label";
import Textarea from "@/app/_components/Textarea";

interface Category {
  id: number;
  name: string;
}

interface PostFormProps {
  title: string;
  content: string;
  thumbnailUrl: string;
  categories: Category[];
  selectedCategoryIds: number[];
  onChangeTitle: (value: string) => void;
  onChangeContent: (value: string) => void;
  onChangeThumbnailUrl: (value: string) => void;
  onChangeCategory: (ids: number[]) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  submitLabel: string;
  showDeleteButton?: boolean;
  onDelete?: () => void;
}

const PostForm: React.FC<PostFormProps> = ({
  title,
  content,
  thumbnailUrl,
  categories,
  selectedCategoryIds,
  onChangeTitle,
  onChangeContent,
  onChangeThumbnailUrl,
  onChangeCategory,
  onSubmit,
  submitLabel,
  showDeleteButton = false,
  onDelete,
}) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const categoryId = Number(e.target.value);
    if (e.target.checked) {
      onChangeCategory([...selectedCategoryIds, categoryId]);
    } else {
      onChangeCategory(selectedCategoryIds.filter((id) => id !== categoryId));
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <Label htmlFor="title">タイトル</Label>
        <Input
          id="title"
          type="text"
          value={title}
          onChange={(e) => onChangeTitle(e.target.value)}
          className="w-full"
          showValidation={false}
        />
      </div>
      <div>
        <Label htmlFor="content">内容</Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => onChangeContent(e.target.value)}
          className="w-full h-48"
          showValidation={false}
        />
      </div>
      <div>
        <Label htmlFor="thumbnailUrl">サムネイルURL</Label>
        <Input
          id="thumbnailUrl"
          type="text"
          value={thumbnailUrl}
          onChange={(e) => onChangeThumbnailUrl(e.target.value)}
          className="w-full"
          showValidation={false}
        />
      </div>
      <div>
        <Label htmlFor="category">カテゴリー</Label>
        <div className="mt-2 space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <input
                id={`category-${category.id}`}
                type="checkbox"
                value={category.id}
                checked={selectedCategoryIds.includes(category.id)}
                onChange={handleCategoryChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor={`category-${category.id}`}
                className="ml-2 text-sm text-gray-900"
              >
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {submitLabel}
        </button>
        {showDeleteButton && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
          >
            削除
          </button>
        )}
      </div>
    </form>
  );
};

export default PostForm;
