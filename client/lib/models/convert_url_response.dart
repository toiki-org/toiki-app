import 'package:json_annotation/json_annotation.dart';

part 'convert_url_response.g.dart';

@JsonSerializable(fieldRename: FieldRename.none, explicitToJson: true)
class ConvertUrlResponse {
  ConvertUrlResponse({
    required this.url,
  });

  final String url;

  factory ConvertUrlResponse.fromJson(Map<String, dynamic> json) =>
      _$ConvertUrlResponseFromJson(json);

  Map<String, dynamic> toJson() => _$ConvertUrlResponseToJson(this);
}
