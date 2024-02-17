import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:toiki/blocs/conversion/conversion_bloc.dart';
import 'package:toiki/repositories/conversion_repository.dart';

class BlocProviders extends StatelessWidget {
  const BlocProviders({
    super.key,
    required this.child,
  });

  final Widget child;

  @override
  Widget build(BuildContext context) {
    return MultiBlocProvider(
      providers: [
        BlocProvider(
          create: (context) => ConversionBloc(
            conversionRepository:
                RepositoryProvider.of<ConversionRepository>(context),
          ),
        )
      ],
      child: child,
    );
  }
}
