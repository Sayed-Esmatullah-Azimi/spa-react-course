import axios from "axios";

export const getToDo = async (page , limit) => {
    return await axios.get(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=${limit}`);
  };