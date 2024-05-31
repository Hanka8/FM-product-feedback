
export type categoryType = "bug" | "feature" | "enhancement" | "ux" | "ui";

export type sortType =
  | "most-upvotes"
  | "least-upvotes"
  | "most-comments"
  | "least-comments";

export interface AddCommentProps {
  id: string;
}

export interface Comment {
  id: string;
  feedbackId: string;
  comment: string;
}

export interface Feedback {
  id: string;
  title: string;
  category: categoryType;
  detail: string;
  status: string;
  numberOfComments: number;
  upvotes: number;
}

export interface FeedbackProps {
  feedback: Feedback;
  status: string;
}

export interface FeedbackBoardProps {
  filter: FilterType[];
}

export interface FeedbacksListProps {
  setNumberOfFeedbacks: (num: number) => void;
  filter: FilterType[];
  sort: sortType;
}

export interface FilteringPanelProps {
  filter: FilterType[];
  handleFilterChange: (value: string) => void;
}

export interface NoFeedbacksProps {
  error: string | null;
}

export type FilterType = {
  isActive: boolean;
  label: string;
};
