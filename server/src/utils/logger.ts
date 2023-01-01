export class Logger {
  constructor(private readonly name: String) {}

  public i(message: any, ...optionalParameters: any[]) {
    console.info(`[${this.name}]`, message, ...optionalParameters)
  }

  public d(message: any, ...optionalParameters: any[]) {
    console.debug(`[${this.name}]`, message, ...optionalParameters)
  }

  public e(message: any, ...optionalParameters: any[]) {
    console.error(`[${this.name}]`, message, ...optionalParameters)
  }
}
