export interface User {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'manager' | 'employee';
  department: string;
  created_at: string;
}

export interface Schedule {
  id: string;
  user_id: string;
  start_time: string;
  end_time: string;
  title: string;
  description?: string;
  created_at: string;
}

export interface TimeEntry {
  id: string;
  user_id: string;
  start_time: string;
  end_time?: string;
  notes?: string;
  created_at: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assigned_to: string;
  status: 'pending' | 'in_progress' | 'completed';
  due_date?: string;
  created_at: string;
}