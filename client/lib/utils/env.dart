class Env {
  static const apiAuthority =
      String.fromEnvironment('API_AUTHORITY', defaultValue: 'localhost:8000');
}
