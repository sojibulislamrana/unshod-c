export const getApiUrl = () => {
    // 1. Prioritize Environment Variable (Set in Vercel/Firebase Dashboard)
    if (process.env.NEXT_PUBLIC_API_URL) {
        return process.env.NEXT_PUBLIC_API_URL;
    }

    // 2. Smart Default for Production (If env var is missing)
    if (process.env.NODE_ENV === 'production') {
        return 'https://unishop-server.vercel.app';
    }

    // 3. Default for Local Development
    return 'http://127.0.0.1:5001';
};
