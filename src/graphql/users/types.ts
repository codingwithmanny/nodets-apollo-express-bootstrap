/**
 *
 */
export interface Filters {
  id?: string;
  query?: string;
  take?: number;
  from?: number;
  order?: 'first_name' | 'last_name' | 'email';
  sort?: 'asc' | 'desc';
}

/**
 *
 */
export interface User {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at?: string;
  updated_at?: string;
}
