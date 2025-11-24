// src/services/fastapiClient.js
import axios from "axios";

export async function askRag(question, history) {
  const url = `${process.env.FASTAPI_URL}/rag/query`;
  const response = await axios.post(url, { question, history });
  return response.data;
}
