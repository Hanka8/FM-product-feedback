export type categoryType = "bug" | "feature" | "enhancement" | "ux" | "ui";

export type statusType = "planned" | "in-progress" | "live" | "done";

export type sortType =
  | "most-upvotes"
  | "least-upvotes"
  | "most-comments"
  | "least-comments";

export type AddCommentProps = {
  id: string;
}

export type Comment = {
  id: string;
  feedbackId: string;
  comment: string;
  timestamp: any;
}

export type Feedback = {
  id: string;
  title: string;
  category: string;
  detail: string;
  status: string;
  numberOfComments: number;
  upvotes: number;
}

export type FeedbackProps = {
  feedback: Feedback;
  status: string;
  roadmap: boolean;
}

export type FeedbackBoardProps = {
  filters: Filters;
}

export type FeedbacksListProps = {
  setNumberOfFeedbacks: (num: number) => void;
  filters: Filters;
  sort: sortType;
}

export type Filters = {
  all: boolean;
  ui: boolean;
  ux: boolean;
  enhancement: boolean;
  bug: boolean;
  feature: boolean;
}

export type FilteringPanelProps = {
  filters: Filters;
  changeFilter: (filter: keyof Filters) => void;
}

export type NoFeedbacksProps = {
  error: string | null;
}

export type DropdownProps = {
  dropdownType: string;
  option: string;
  setOption: any;
}

export type FeedbackContextType = {
  feedbacks: Feedback[];
  error: string | null;
  loading: boolean;
}

export type CommentProps = {
  comment: Comment;
}

export type FeedbackAddedProps = {
  setFeedbackAdded: any;
}