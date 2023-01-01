import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:toiki/blocs/conversion/conversion_event.dart';
import 'package:toiki/blocs/conversion/conversion_state.dart';
import 'package:toiki/repositories/conversion_repository.dart';

class ConversionBloc extends Bloc<ConversionEvent, ConversionState> {
  ConversionBloc({required this.conversionRepository})
      : super(InitialConversionState()) {
    on<ConvertUrlConversionEvent>(_convertUrl);
  }

  final ConversionRepository conversionRepository;

  Future<void> _convertUrl(
    ConvertUrlConversionEvent event,
    Emitter<ConversionState> emit,
  ) async {
    try {
      emit(ConvertUrlLoadingState());

      final res = await conversionRepository.convertUrl(url: event.url);

      emit(ConvertUrlDoneState(url: res.data.url));
    } catch (e) {
      emit(ConvertUrlErrorState());
    }
  }
}
