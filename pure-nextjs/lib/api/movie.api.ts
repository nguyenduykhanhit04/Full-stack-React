import { Movie } from "@/types/movie";

export interface GetMoviesParams {
    title?: string;
    genre?: string;
    sortField?: 'title' | 'releaseYear' | 'rating' | '';
    sortDirection?: 'asc' | 'desc';
    offset?: number;
    limit?: number;
}

export interface MovieListApiResponse {
    code: number;
    totalRecords: number;
    movies: Movie[];
}

export const getMovies = async (params: GetMoviesParams): Promise<MovieListApiResponse> => {
    const query = new URLSearchParams();

    if (params.title) query.set('title', params.title);
    if (params.genre) query.set('title', params.genre);
    if (params.sortField) query.set('title', params.sortField);
    if (params.sortDirection) query.set('title', params.sortDirection);
    query.set('offset', String(params.offset ?? 0));
    query.set('limit', String(params.limit ?? 5));

    const response = await fetch(`/api/movies?${query.toString}`);

    if (!response.ok) {
        throw new Error('Khong the tai danh sach phim');
    }

    return response.json();
}