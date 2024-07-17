"use server";

import { TaskType } from "@/lib/AppTypes";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getTasksByUser(userId: string): Promise<{
  success?: TaskType[];
  error?: string;
}> {
  try {
    const res = await fetch(
      `https://${process.env.MOCKAPI_KEY}.mockapi.io/api/users/${userId}/tasks`,
    );

    if (!res.ok) {
      return { error: "No tasks were found." };
    }

    const tasks: TaskType[] = await res.json();
    return { success: tasks };
  } catch (err) {
    return { error: "No tasks were found." };
  }
}

export async function addTask(formData: FormData) {
  const userId = formData.get("userId");

  if (!userId) {
    throw new Error("User not found");
  }

  const schema = z.object({
    title: z.string().min(1),
    isCompleted: z.boolean(),
  });

  const data = schema.parse({
    title: formData.get("title"),
    isCompleted: false,
  });

  try {
    const res = await fetch(
      `https://${process.env.MOCKAPI_KEY}.mockapi.io/api/users/${userId}/tasks`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    if (!res.ok) {
      throw new Error("Task not found");
    }
    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to create a task");
  }
}

export async function editTask(formData: FormData) {
  const taskId = formData.get("taskId");
  const userId = formData.get("userId");

  if (!taskId) {
    throw new Error("Task not found");
  }

  if (!userId) {
    throw new Error("User not found");
  }

  const schema = z.object({
    title: z.string().min(1),
    isCompleted: z.boolean(),
  });

  const data = schema.parse({
    title: formData.get("title"),
    isCompleted: false,
  });

  try {
    const res = await fetch(
      `https://${process.env.MOCKAPI_KEY}.mockapi.io/api/users/${userId}/tasks/${taskId}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    if (!res.ok) {
      throw new Error("Task not found");
    }
    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to create a task");
  }
}

export async function deleteTask(formData: FormData) {
  const taskId = formData.get("taskId");
  const userId = formData.get("userId");

  if (!taskId) {
    throw new Error("Task not found");
  }

  if (!userId) {
    throw new Error("User not found");
  }

  try {
    const res = await fetch(
      `https://${process.env.MOCKAPI_KEY}.mockapi.io/api/users/${userId}/tasks/${taskId}`,
      {
        method: "DELETE",
      },
    );

    if (!res.ok) {
      throw new Error("Failed to delete a task");
    }

    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to delete a task");
  }
}

export async function toggleCompleted(formData: FormData) {
  const taskId = formData.get("taskId");
  const userId = formData.get("userId");
  const isCompleted = formData.get("isCompleted");

  if (!taskId) {
    throw new Error("Task not found");
  }

  if (!userId) {
    throw new Error("User not found");
  }

  try {
    const res = await fetch(
      `https://${process.env.MOCKAPI_KEY}.mockapi.io/api/users/${userId}/tasks/${taskId}`,
      {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          isCompleted: !(isCompleted === "checked"),
        }),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to update a task");
    }

    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to update a task");
  }
}

export async function register(formData: FormData) {}

export async function login(formData: FormData) {}
