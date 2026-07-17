export default function formatEntryDate(date: string) {
    const today = new Date();
    const entryDate = new Date(date);

    if (today.toDateString() === entryDate.toDateString()) {
        return "Today";
    }
    
    const day = String(entryDate.getDate()).padStart(2, "0");
    const month = String(entryDate.getMonth() + 1).padStart(2, "0");
    const year = entryDate.getFullYear();
    
    return `${day}-${month}-${year}`;
}