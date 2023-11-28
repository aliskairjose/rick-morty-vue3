import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  params: {},
});

export const characters = async ({ ...filter }) => {
  const params = {};
  Object.entries(filter).forEach(([k, v]) => v && (params[k] = v));
  return instance
    .get("/character", { params })
    .then((res) => res.data)
    .catch(console.error);
};

export const episodes = async () => {
  return instance
    .get("/episode")
    .then((res) => res.data)
    .catch(console.error);
};

export const locations = async () => {
  return instance
    .get("/location")
    .then((res) => res.data)
    .catch(console.error);
};
