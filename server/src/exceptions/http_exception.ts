class HttpException extends Error {
  public status: number
  public message: string
  public data?: any
  constructor(status?: number | null, message?: string | null, data?: any) {
    super(message!)
    this.status = status || 500
    this.message = message || 'Internal Server Error'
    this.data = data
    Object.setPrototypeOf(this, HttpException.prototype)
  }
}

export default HttpException
