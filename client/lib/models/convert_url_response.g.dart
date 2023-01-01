// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'convert_url_response.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

ConvertUrlResponse _$ConvertUrlResponseFromJson(Map<String, dynamic> json) =>
    ConvertUrlResponse(
      data:
          ConvertUrlResponseData.fromJson(json['data'] as Map<String, dynamic>),
    );

Map<String, dynamic> _$ConvertUrlResponseToJson(ConvertUrlResponse instance) =>
    <String, dynamic>{
      'data': instance.data.toJson(),
    };

ConvertUrlResponseData _$ConvertUrlResponseDataFromJson(
        Map<String, dynamic> json) =>
    ConvertUrlResponseData(
      url: json['url'] as String,
    );

Map<String, dynamic> _$ConvertUrlResponseDataToJson(
        ConvertUrlResponseData instance) =>
    <String, dynamic>{
      'url': instance.url,
    };
