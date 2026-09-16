import { Movie } from "@/types/movie";
import { NextRequest, NextResponse } from "next/server";
import { moviesData } from "@/lib/data/movies.data";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;

    const title = searchParams.get('title') || '';
    const genre = searchParams.get('genre') || '';
    const sortField = searchParams.get('sortField') || '';
    const sortDirection = searchParams.get('sortDirection') || '';
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const limit = parseInt(searchParams.get('limit') || '5', 10);
    
    // 1. Loc du lieu (gia lap WHERE trong SQL)
    let filtered: Movie[] = moviesData.filter((movie) => {
        const matchTitle = title 
            ? movie.title.toLowerCase().includes(title.toLowerCase())
            : true;
        const matchGenre = genre ? movie.genre === genre : true;
        return matchTitle && matchGenre;
    })

    // 2. Sap xep (gia lap ORDER BY trong SQL)
    if (sortField === 'releaseYear' || sortField === 'rating') {
        filtered = [...filtered].sort((a, b) => {
            const diff = a[sortField] - b[sortField];
            return sortDirection === 'asc' ? diff : -diff;
        });
    } else if (sortField === 'title') {
        filtered = [...filtered].sort((a, b) => {
            const diff = a.title.localeCompare(b.title);
            return sortDirection === 'asc' ? diff : -diff;
        });
    }

    // 3. Phan trang (gia lap LIMIT/OFFSET trong SQL)
    const totalRecords = filtered.length;
    const paginated = filtered.slice(offset, offset + limit);

    return NextResponse.json({
        code: 200,
        totalRecords,
        movies: paginated,
    });
}