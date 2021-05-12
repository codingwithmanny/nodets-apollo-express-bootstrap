/**
 *
 */
export interface Filters {
  id?: string;
  query?: string;
  take?: number;
  from?: number;
  order?: 'name' | 'user_id';
  sort?: 'asc' | 'desc';
}

/**
 *
 */
export interface Book {
  id?: string;
  name: string;
  user_id: string;
  created_at?: string;
  updated_at?: string;
}
