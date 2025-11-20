import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000/api/v1",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => "/tasks",
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: "/tasks/create",
        method: "POST",
        body: newTask,
      }),
    }),
  }),
});

export const { useGetAllTasksQuery, useCreateTaskMutation } = taskApi;
