"use server";

import { TaskType, UserType } from "@/lib/AppTypes";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

export async function getTasksByUser(): Promise<{
  success?: TaskType[];
  error?: string;
}> {
  try {
    const userId = cookies().get("userId");
    if (!userId) {
      return { error: "User not found. Please login" };
    }

    const res = await fetch(
      `https://${process.env.MOCKAPI_KEY}.mockapi.io/api/users/${userId.value}/tasks`,
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

export async function register(formData: FormData) {
  // TODO: use hashed password with a salt instead of plain text

  const schema = z.object({
    username: z.string().min(5),
    password: z.string().min(5),
  });

  const data = schema.parse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  try {
    const res = await fetch(
      `https://${process.env.MOCKAPI_KEY}.mockapi.io/api/users`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      },
    );
    if (!res.ok) {
      throw new Error("Error while creating user");
    }
    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to create a task");
  }
}

export async function login(formData: FormData) {
  const schema = z.object({
    username: z.string().min(5),
    password: z.string().min(5),
  });

  const data = schema.parse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  try {
    const res = await fetch(
      `https://${process.env.MOCKAPI_KEY}.mockapi.io/api/users`,
    );

    if (!res.ok) {
      return { error: "Error while logging in" };
    }

    const users: UserType[] = await res.json();
    const foundUser = users.find(
      ({ name, password }) =>
        name === data.username && password === data.password,
    );

    if (!foundUser) {
      return { error: "Credentials does not match any user" };
    }

    const expires = new Date(Date.now() + 3600 * 1000);

    cookies().set({
      name: "userId",
      value: foundUser.id,
      expires: expires,
      path: "/",
      httpOnly: true,
    });

    revalidatePath("/");
  } catch (error) {
    throw new Error("Failed to log in");
  }
}
