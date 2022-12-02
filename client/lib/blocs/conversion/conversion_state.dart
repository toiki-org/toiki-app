class ConversionState {}

class InitialConversionState extends ConversionState {}

// ConvertUrl

class ConvertUrlLoadingState extends ConversionState {}

class ConvertUrlDoneState extends ConversionState {
  ConvertUrlDoneState({required this.url});

  final String url;
}

class ConvertUrlErrorState extends ConversionState {}
