import cors from 'cors';

const corsMiddleware = cors({
  origin: [
    'http://localhost:4000',
    'https://libra-staging.containerlabs.io',
    'https://libra-alpha.containerlabs.io',
    'https://libra.containerlabs.io',
  ],
  methods: [
    'GET',
    'POST',
    'PUT',
    'DELETE',
    'HEAD',
    'OPTIONS',
  ],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Origin',
    'X-Requested-With',
    'Accept',
  ],
});

export default corsMiddleware;
