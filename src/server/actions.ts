"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function getTasks() {
  const res = await fetch(
    `https://${process.env.MOCKAPI_KEY}.mockapi.io/api/tasks`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function getTasksByUser(userId: string) {
  const res = await fetch(
    `https://${process.env.MOCKAPI_KEY}.mockapi.io/api/users/${userId}/tasks`,
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export async function addTask(formData: FormData) {
  const schema = z.object({
    title: z.string().min(1),
  });

  const data = schema.parse({
    title: formData.get("title"),
    isCompleted: false,
  });

  try {
    const res = await fetch(
      `https://${process.env.MOCKAPI_KEY}.mockapi.io/api/tasks`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      throw new Error("Failed to create a task");
    }
  } catch (error) {
    throw new Error("Failed to create a task");
  }
}

export async function editTask(formData: FormData) {}

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
        body: JSON.stringify({ isCompleted: !isCompleted }),
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
