import Axios, { type AxiosResponse } from 'axios';

const axios = Axios.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

export const fetcher = {
  get: <R = unknown>(url: string, query?: { [key: string]: unknown }): Promise<R> =>
    axios<R>(url, { method: 'GET', params: { query } }).then(handleResponse),
  post: <R = unknown>(url: string, body: Record<string, unknown>): Promise<R> =>
    axios<R>(url, { method: 'POST', params: { body } }).then(handleResponse),
};

async function handleResponse(res: AxiosResponse) {
  const result = res.data;
  return result;
}
