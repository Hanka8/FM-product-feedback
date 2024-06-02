export type categoryType = "bug" | "feature" | "enhancement" | "ux" | "ui";

export type statusType = "planned" | "in-progress" | "live" | "done";

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
  timestamp: any;
}

export interface Feedback {
  id: string;
  title: string;
  category: string;
  detail: string;
  status: string;
  numberOfComments: number;
  upvotes: number;
}

export interface FeedbackProps {
  feedback: Feedback;
  status: string;
  roadmap: boolean;
}

export interface FeedbackBoardProps {
  filters: Filters;
}

export interface FeedbacksListProps {
  setNumberOfFeedbacks: (num: number) => void;
  filters: Filters;
  sort: sortType;
}

export interface Filters {
  all: boolean;
  ui: boolean;
  ux: boolean;
  enhancement: boolean;
  bug: boolean;
  feature: boolean;
}

export interface FilteringPanelProps {
  filters: Filters;
  changeFilter: (filter: keyof Filters) => void;
}

export interface NoFeedbacksProps {
  error: string | null;
}

export interface DropdownProps {
  dropdownType: string;
  option: string;
  setOption: any;
}