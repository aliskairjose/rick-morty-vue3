import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  params: {},
});

export const characterList = async ({ ids = [], filter = {} }) => {
  const params = {};
  Object.entries(filter).forEach(([k, v]) => v && (params[k] = v));
  return instance
    .get(`/character/${ids}`, { params })
    .then((res) => res.data)
    .catch(console.error);
};

export const episodeList = async ({ filter = {} }) => {
  const params = {};
  Object.entries(filter).forEach(([k, v]) => v && (params[k] = v));

  return instance
    .get("/episode", { params })
    .then((res) => res.data)
    .catch(console.error);
};

export const locationList = async ({ filter = {} }) => {
  const params = {};
  Object.entries(filter).forEach(([k, v]) => v && (params[k] = v));

  return instance
    .get("/location", { params })
    .then((res) => res.data)
    .catch(console.error);
};
