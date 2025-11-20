import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  tagTypes: ["tasks"],
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
      providesTags: ["tasks"],
    }),
    createTask: builder.mutation({
      query: (newTask) => ({
        url: "/tasks/create",
        method: "POST",
        body: newTask,
      }),
      invalidatesTags: ["tasks"],
    }),
    updateTask: builder.mutation({
      query: ({ id, body }) => ({
        url: `/tasks/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["tasks"],
    }),
    getSingleTask: builder.query({
      query: (id) => `/tasks/${id}`,
      providesTags: ["tasks"],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["tasks"],
    }),
  }),
});

export const {
  useGetAllTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useGetSingleTaskQuery,
  useDeleteTaskMutation,
} = taskApi;
