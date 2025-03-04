import axios from "axios";

export const getToDo = async (page, limit) => {
  return await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`
  );
};

export const getOneToDo = async (id) => {
  return await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  ).then((response) => response.data);
};
