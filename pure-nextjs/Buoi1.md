Mục tiêu

Xây dựng một mini-project Movie List — cấu trúc kiến trúc tương tự màn hình ADM002 (Danh sách nhân viên) — để hiểu bản chất Next.js, không copy nguyên xi mà tự tay làm lại với chủ đề khác.

Kiến trúc đã dựng (theo đúng luồng dữ liệu)
types/movie.ts               → Định nghĩa dữ liệu Movie
lib/data/movies.data.ts      → Mock data (18 phim)
app/api/movies/route.ts      → Route Handler giả lập backend
lib/api/movie.api.ts         → API Client (gọi fetch tới route trên)
hooks/useMovieList.ts        → Custom Hook (đang làm dở — Phần 1)
Các khái niệm đã học

1. Server Component vs Client Component

Mặc định mọi component là Server Component (chạy trên server, không gửi JS xuống client)
'use client' bắt buộc khi dùng useState, useEffect, onClick...
Ví dụ minh họa: ServerClock.tsx (server) vs Counter.tsx (client)

2. TypeScript — chọn kiểu dữ liệu đúng bản chất

releaseYear, rating phải là number chứ không phải string
Lý do: string so sánh theo ký tự ("9" > "10" → true, sai về số học), số so sánh đúng giá trị

3. Route Handler (app/api/movies/route.ts)

Tên hàm GET là quy ước bắt buộc, Next.js tự map theo HTTP method (giống @GetMapping trong Spring Boot)
request.nextUrl.searchParams để đọc query params
Thứ tự xử lý chuẩn: Filter → Sort → Paginate (giống WHERE → ORDER BY → LIMIT/OFFSET trong SQL)
[...filtered].sort() thay vì filtered.sort() để tránh mutate mảng gốc
Quy tắc hàm so sánh trong .sort(): trả âm → a trước b; đảo dấu (-diff) để đổi ASC/DESC

4. API Client (lib/api/movie.api.ts)

Dùng fetch + URLSearchParams (tự động encode ký tự đặc biệt)
fetch không tự throw lỗi khi status 4xx/5xx như Axios → phải tự kiểm tra response.ok
Phân tầng: type nghiệp vụ (Movie) tách khỏi type của một API call cụ thể (GetMoviesParams)

5. Custom Hook — Phần 1 (state cơ bản, chưa xong)

Đã tạo: movies, loading, errorMessage, title, genre, currentPage, totalRecords
Khái niệm derived state: totalPages không cần useState riêng, tính trực tiếp từ totalRecords — tránh phải tự đồng bộ 2 state liên quan
Việc còn dang dở — làm tiếp lần sau

👉 Phần 2 của useMovieList.ts: viết hàm fetchMovies dùng useEffect + useCallback để gọi API, cập nhật movies/totalRecords/loading

Sau đó còn lại theo lộ trình:

Phần 3: handleSearch, handleSort, handlePageChange
Đồng bộ URL bằng useRouter/useSearchParams (giống ADM002)
Viết UI components: MovieSearchForm.tsx, MovieTable.tsx
Ghép MovieList.tsx (container) + page.tsx