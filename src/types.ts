// Define types for Outline API
export type Collection = {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  permission?: string;
  private?: boolean;
};

export type Document = {
  id: string;
  title: string;
  text: string;
  emoji?: string;
  collectionId: string;
  parentDocumentId?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  url: string;
};

export type Team = {
  id: string;
  name: string;
  avatarUrl?: string;
};

// Define argument types for tools
export type ListDocumentsArgs = {
  collectionId?: string;
  query?: string;
  limit?: number;
};

export type GetDocumentArgs = {
  id: string;
};

export type CreateDocumentArgs = {
  title: string;
  text: string;
  collectionId: string;
  parentDocumentId?: string;
  publish?: boolean;
  template?: boolean;
};

export type UpdateDocumentArgs = {
  documentId: string;
  title?: string;
  text?: string;
  publish?: boolean;
  done?: boolean;
};

export type DeleteDocumentArgs = {
  id: string;
};

export type ListCollectionsArgs = {
  limit?: number;
};

export type GetCollectionArgs = {
  id: string;
};

export type ListTeamsArgs = {
  limit?: number;
};

export type SearchDocumentsArgs = {
  query: string;
  collectionId?: string;
  limit?: number;
};

export type CreateCollectionArgs = {
  name: string;
  description?: string;
  permission?: string;
  color?: string;
  private?: boolean;
};

export type UpdateCollectionArgs = {
  id: string;
  name?: string;
  description?: string;
  permission?: string;
  color?: string;
};

export type CreateCommentArgs = {
  documentId: string;
  text: string;
  parentCommentId?: string;
  data?: Record<string, any>;
};

export type UpdateCommentArgs = {
  id: string;
  text?: string;
  data?: Record<string, any>;
};

export type DeleteCommentArgs = {
  id: string;
};
