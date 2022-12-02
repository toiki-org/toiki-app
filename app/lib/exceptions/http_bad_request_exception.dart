class HttpBadRequestException implements Exception {
  const HttpBadRequestException({required this.message});

  final String? message;

  @override
  String toString() {
    return '$runtimeType ($message)';
  }
}
