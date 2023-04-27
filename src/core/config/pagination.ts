import { registerAs } from "@nestjs/config"

export default registerAs(`pagination`, () => {
  const limit = process.env.LIMIT_PAGINATION || 15
  const offset = process.env.OFFSET_PAGINATION || 15

  return {
    limit,
    offset,
  }
})
