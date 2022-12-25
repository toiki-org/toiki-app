import axios from "axios";

const API_URL = process.env.API_URL + '/api/convert-url?url=';

export const convertUrl = async (url: string): Promise<string> => {
  const result = await axios.get(API_URL + url);
  return result.data.url as string;
}
