export interface ApiErrorBody {
  code: string;
  message: string;
  details?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: ApiErrorBody;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface ContactInquiryInput {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  projectType: string;
  message: string;
}

export interface ContactInquiryResult {
  id: string;
  receivedAt: string;
}
