const production = process.env.NODE_ENV === 'production';

export const serverAddress = production ? "" : "http://localhost:8000"

