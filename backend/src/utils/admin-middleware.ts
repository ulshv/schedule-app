export const adminWriteMiddleware = (req, res, next) => {
  const isAllowed = req.method === 'GET' ? true : req.headers['x-admin-token'] == process.env.ADMIN_TOKEN

  if (isAllowed) {
    next()
  } else {
    res.status(403).json({ error: 'Only Admins can perform write operations on this route.' })
  }
}
