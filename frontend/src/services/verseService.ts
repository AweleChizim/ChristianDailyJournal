import axios from "axios";
import { type Verse } from "../types/verse";

const API_URL = import.meta.env.VITE_API_URL;

export async function getTodayVerse(): Promise<Verse> {
    const token = localStorage.getItem("access_token");

    const response = await axios.get<Verse>(
        `${API_URL}/verse/today`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
}