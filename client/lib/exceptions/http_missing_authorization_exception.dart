import 'package:toiki/exceptions/http_bad_request_exception.dart';

class HttpMissingAuthorizationException extends HttpBadRequestException {
  const HttpMissingAuthorizationException({
    super.message,
  });
}
