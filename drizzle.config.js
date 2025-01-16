/** @type {import('drizzle-kit').Config}  */

export default {
  schema: './utils/schema.js',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://neondb_owner:XgNaQ6Jt9jUx@ep-dark-frog-a5t5zhok.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require',
  },
};
