import 'package:flutter/material.dart';
import 'package:toiki/core/bloc_providers.dart';
import 'package:toiki/core/repository_providers.dart';
import 'package:toiki/screens/main_screen.dart';
import 'package:toiki/utils/constants.dart';

class App extends StatelessWidget {
  const App({
    super.key,
  });

  @override
  Widget build(BuildContext context) {
    return RepositoryProviders(
      child: BlocProviders(
        child: MaterialApp(
          title: Constants.appName,
          debugShowCheckedModeBanner: false,
          theme: ThemeData(primarySwatch: Colors.red),
          routes: {
            MainScreen.route: (context) => MainScreen(),
          },
        ),
      ),
    );
  }
}
