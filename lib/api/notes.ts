import axios from 'axios';

const API_URL = 'https://notehub.net.ua/api/notes';
const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;


const api = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});


export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}



export async function fetchNotes(tag?: string) {
  try {
    const response = await api.get('', {
      params: tag ? { tag } : undefined,
    });
    return response.data;
  } catch (error: any) {
    console.error('fetchNotes error:', error);
    throw new Error('Не вдалося завантажити нотатки.');
  }
}


export async function fetchNoteById(id: string) {
  try {
    const response = await api.get(`/${id}`);
    return response.data;
  } catch (error: any) {
    console.error('fetchNoteById error:', error);
    throw new Error('Не вдалося завантажити нотатку.');
  }
}


export async function createNote(payload: CreateNotePayload) {
  try {
    const response = await api.post('', payload);
    return response.data;
  } catch (error: any) {
    console.error('createNote error:', error);
    throw new Error('Не вдалося створити нотатку.');
  }
}