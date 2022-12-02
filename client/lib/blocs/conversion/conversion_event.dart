class ConversionEvent {}

class ConvertUrlConversionEvent extends ConversionEvent {
  ConvertUrlConversionEvent({required this.url});

  final String url;
}
