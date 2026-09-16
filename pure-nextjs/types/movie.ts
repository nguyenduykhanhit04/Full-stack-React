export interface Movie {
    id: number;
    title: string;
    genre: string;
    releaseYear: number; // De sort dung theo nam. Nếu để string, bạn sẽ không sort được bằng phép so sánh số (>, <) một cách chính xác
    rating: number; // De sort dung theo diem
    director: string;
}