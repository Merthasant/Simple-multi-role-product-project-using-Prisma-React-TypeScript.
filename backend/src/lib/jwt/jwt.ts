const JWT_REFRESH_SECRET = `${process.env.JWT_REFRESH_SECRET}`;
const JWT_ACCESS_SECRET = `${process.env.JWT_ACCESS_SECRET}`;
if (!JWT_REFRESH_SECRET || !JWT_ACCESS_SECRET)
  throw new Error("jwt secret is undefined");

const refreshTokenExpired = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); //7 days or 1week

export { JWT_ACCESS_SECRET, JWT_REFRESH_SECRET, refreshTokenExpired };
