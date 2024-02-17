import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:toiki/repositories/conversion_repository.dart';
import 'package:toiki/utils/api.dart';

class RepositoryProviders extends StatelessWidget {
  const RepositoryProviders({
    super.key,
    required this.child,
  });

  final Widget child;

  @override
  Widget build(BuildContext context) {
    final api = Api();

    return MultiRepositoryProvider(
      providers: [
        RepositoryProvider(create: (context) => ConversionRepository(api: api)),
      ],
      child: child,
    );
  }
}
