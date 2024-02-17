import 'package:toiki/exceptions/http_bad_request_exception.dart';

class HttpEntityNotFoundException extends HttpBadRequestException {
  const HttpEntityNotFoundException({
    super.message,
  });
}
