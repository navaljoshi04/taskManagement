import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1/tasks" }),
  prepareHeader: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  endpoints: (builder) => ({
    getAllTasks: builder.query({
      query: () => "/",
    }),
  }),
});

export const { useGetAllTasksQuery } = taskApi;
