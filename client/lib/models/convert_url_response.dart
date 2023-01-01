import 'package:json_annotation/json_annotation.dart';

part 'convert_url_response.g.dart';

@JsonSerializable(fieldRename: FieldRename.none, explicitToJson: true)
class ConvertUrlResponse {
  ConvertUrlResponse({
    required this.data,
  });

  final ConvertUrlResponseData data;

  factory ConvertUrlResponse.fromJson(Map<String, dynamic> json) =>
      _$ConvertUrlResponseFromJson(json);

  Map<String, dynamic> toJson() => _$ConvertUrlResponseToJson(this);
}

@JsonSerializable(fieldRename: FieldRename.none, explicitToJson: true)
class ConvertUrlResponseData {
  ConvertUrlResponseData({
    required this.url,
  });

  final String url;

  factory ConvertUrlResponseData.fromJson(Map<String, dynamic> json) =>
      _$ConvertUrlResponseDataFromJson(json);

  Map<String, dynamic> toJson() => _$ConvertUrlResponseDataToJson(this);
}
