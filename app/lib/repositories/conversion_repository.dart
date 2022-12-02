import 'package:toiki/models/convert_url_response.dart';
import 'package:toiki/utls/api.dart';

class ConversionRepository {
  ConversionRepository({required this.api});

  final Api api;

  Future<ConvertUrlResponse> convertUrl({required String url}) async {
    final res = await api.get(
      path: '/api/convert-url',
      queryParameters: {
        'url': url,
      },
    );

    return ConvertUrlResponse.fromJson(res);
  }
}
