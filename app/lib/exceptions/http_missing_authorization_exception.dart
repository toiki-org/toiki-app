import 'package:toiki/exceptions/http_bad_request_exception.dart';

class HttpMissingAuthorizationException extends HttpBadRequestException {
  const HttpMissingAuthorizationException({required String? message})
      : super(message: message);
}
