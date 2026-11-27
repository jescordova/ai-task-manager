// const API_URL = "http://localhost:4000";
const API_URL = import.meta.env.PUBLIC_API_URL || "http://localhost:4000";

export interface Task {
  _id: string;
  title: string;
  description?: string;
  completed: boolean;
  user: string
}

interface TasksResponse {
  message?: string;
  tasks: Task[];
}

interface CreateTaskResponse {
  message?: string;
  task: Task;
} 

export const loginUser = async (email: string, password: string) => {
  try {
    // server routes do not include `/api` prefix
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }
    const data = await response.json();
    return data; // Return the entire response data (including token and userId)
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
}

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error;
  }
}

export const getTasks = async (token: string): Promise<TasksResponse> => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      headers: { 
        Authorization: `Bearer ${token}`, 
        "Content-Type": "application/json" 
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch tasks");
    }

    const data: TasksResponse = await response.json();
    return data;

  } catch (error) {
    console.error("Error during fetch tasks:", error);
    throw error;
  }
}

export const createTask = async (token: string, title: string, description?: string): Promise<CreateTaskResponse> => {
  try {

    const response = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create task");
    }

    const data: CreateTaskResponse = await response.json();
    return data;

  } catch (error) {
    console.error("Error during create task:", error);
    throw error;
  }
}

export const deleteTask = async (token: string, taskId: string): Promise<{ message: string, id: string }> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete task");
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error("Error during delete task:", error);
    throw error;
  }
}

export const updateTask = async (token: string, taskId: string, updates: Partial<{ title: string; description: string; completed: boolean }>): Promise<{ message: string, task: Task }> => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: "PUT",  
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update task");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error during update task:", error);
    throw error;
  }
}
