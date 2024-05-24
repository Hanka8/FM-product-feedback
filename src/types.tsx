export type categoryType = 'bug' | 'feature' | 'enhancement' | 'ux' | 'ui';

export type Sort = 'most-upvotes' | 'least-upvotes' | 'most-comments' | 'least-comments';

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
    category: string;
    detail: string;
    status: string;
    numberOfComments: number;
    upvotes: number;
}

export interface FeedbackBoardProps {
    all: boolean;
    ui: boolean;
    ux: boolean;
    enhancement: boolean;
    bug: boolean;
    feature: boolean;
}

export interface FeedbacksProps {
    setNumberOfFeedbacks: (num: number) => void;
    all: boolean;
    ui: boolean;
    ux: boolean;
    enhancement: boolean;
    bug: boolean;
    feature: boolean;
}

export interface FilteringPanelProps {
    all: boolean;
    setAll: (value: boolean) => void;
    ui: boolean;
    setUi: (value: boolean) => void;
    ux: boolean;
    setUx: (value: boolean) => void;
    enhancement: boolean;
    setEnhancement: (value: boolean) => void;
    bug: boolean;
    setBug: (value: boolean) => void;
    feature: boolean;
    setFeature: (value: boolean) => void;
}
