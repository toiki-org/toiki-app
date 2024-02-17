import 'dart:async';
import 'dart:convert';

import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:toiki/exceptions/http_bad_request_exception.dart';
import 'package:toiki/exceptions/http_entity_not_found_exception.dart';
import 'package:toiki/exceptions/http_missing_authorization_exception.dart';
import 'package:toiki/utils/env.dart';

class Api {
  final _client = http.Client();

  Uri Function(String, String, [Map<String, dynamic>?]) get _getUri {
    return kDebugMode ? Uri.http : Uri.https;
  }

  Future<Map<String, dynamic>> get({
    required String path,
    Map<String, dynamic>? queryParameters,
  }) async {
    final request = _client.get(
      _getUri(Env.apiAuthority, path, queryParameters),
    );

    final response = await request;

    await _validateResponseCode(request);

    return jsonDecode(utf8.decode(response.bodyBytes)) as Map<String, dynamic>;
  }

  Future<void> _validateResponseCode(FutureOr<http.Response> request) async {
    final awaitedReq = await request;

    if (kDebugMode) {
      print(awaitedReq.request.toString());
      print(awaitedReq.body);
    }

    String? message;

    try {
      final map = jsonDecode(utf8.decode(awaitedReq.bodyBytes));

      message = map['message'];
    } catch (e) {
      if (kDebugMode) print(e);
    }

    if ([401, 403].contains(awaitedReq.statusCode)) {
      throw HttpMissingAuthorizationException(message: message);
    } else if (awaitedReq.statusCode == 404) {
      throw HttpEntityNotFoundException(message: message);
    } else if (awaitedReq.statusCode >= 400 && awaitedReq.statusCode < 600) {
      throw HttpBadRequestException(message: message);
    }
  }
}
