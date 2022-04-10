export default function configuration() {
  return {
    server: {
      port: process.env.PORT || '3000',
    },
    database: {
      uri: process.env.DATABASE || '',
    },
    security: {
      accessToken: {
        secret: 'protected',
        expiresIn: 60 * 60 * 1000,
      },
    },
  };
}
