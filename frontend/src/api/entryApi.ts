import axios from "axios";

const API_URL = "http://localhost:8000";

const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
});

export interface Entry {
    id: string;
    content: string;
    type: "gratitude" | "journal";
    entry_date: string;
    created_at: string;
}

export interface CreateEntryRequest {
    entry_type: "gratitude" | "journal";
    content: string;
}

export interface UpdateEntryRequest {
    content: string;
}

export async function createEntry(
    data: CreateEntryRequest
): Promise<Entry> {

    const response = await axios.post<Entry>(
        `${API_URL}/entries`,
        data,
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
}

export async function getEntries(
    entryType: "gratitude" | "journal",
    date?: string
): Promise<Entry[]> {

    const response = await axios.get<Entry[]>(
        `${API_URL}/entries`,
        {
            headers: getAuthHeaders(),
            params: {
                type: entryType,
                ...(date && { date }),
            },
        }
    );
    return response.data;
}

export async function updateEntry(
    id: string,
    data: UpdateEntryRequest
): Promise<Entry> {

    const response = await axios.patch<Entry>(
        `${API_URL}/entries/${id}`,
        data,
        {
            headers: getAuthHeaders(),
        }
    );

    return response.data;
}

export async function deleteEntry(
    id: string
): Promise<void> {

    await axios.delete(
        `${API_URL}/entries/${id}`,
        {
            headers: getAuthHeaders(),
        }
    );

}