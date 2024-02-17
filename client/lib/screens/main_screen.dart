import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:toiki/blocs/conversion/conversion_bloc.dart';
import 'package:toiki/blocs/conversion/conversion_event.dart';
import 'package:toiki/blocs/conversion/conversion_state.dart';
import 'package:toiki/utils/constants.dart';
import 'package:url_launcher/url_launcher.dart';

class MainScreen extends StatelessWidget {
  MainScreen({
    super.key,
  });

  static const route = '/';

  final _focusNode = FocusNode();
  final _controller = TextEditingController();

  Future<void> _copy({
    required String text,
    required BuildContext context,
  }) async {
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('YouTube url copied to clipboard.')),
    );

    await Clipboard.setData(ClipboardData(text: text));
  }

  Widget _getContent(BuildContext context) {
    return BlocConsumer<ConversionBloc, ConversionState>(
      listener: (context, state) {
        if (state is ConvertUrlDoneState) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Url converted.')),
          );
        } else if (state is ConvertUrlErrorState) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Something went wrong.')),
          );
        }
      },
      builder: (context, state) {
        final isLoading = state is ConvertUrlLoadingState;

        return Padding(
          padding: const EdgeInsets.all(32),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              Center(
                child: ConstrainedBox(
                  constraints: BoxConstraints.loose(const Size.fromWidth(480)),
                  child: TextFormField(
                    enabled: !isLoading,
                    focusNode: _focusNode,
                    controller: _controller,
                    decoration: const InputDecoration(
                      labelText: 'Url',
                      alignLabelWithHint: true,
                    ),
                    onFieldSubmitted: (value) {
                      BlocProvider.of<ConversionBloc>(context)
                          .add(ConvertUrlConversionEvent(url: value));
                    },
                  ),
                ),
              ),
              Builder(
                builder: (context) {
                  if (isLoading) {
                    return const Padding(
                      padding: EdgeInsets.only(top: 64),
                      child: Center(
                        child: SizedBox(
                          width: 24,
                          height: 24,
                          child: CircularProgressIndicator(),
                        ),
                      ),
                    );
                  }

                  if (state is ConvertUrlDoneState) {
                    return Padding(
                      padding: const EdgeInsets.only(top: 64),
                      child: Column(children: [
                        InkWell(
                          onTap: () => launchUrl(Uri.parse(state.url)),
                          child: Text(state.url),
                        ),
                        Center(
                          child: IconButton(
                            tooltip: 'Copy',
                            icon: const Icon(Icons.copy),
                            onPressed: () {
                              _copy(text: state.url, context: context);
                            },
                          ),
                        ),
                      ]),
                    );
                  }

                  return Container();
                },
              ),
            ],
          ),
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text(Constants.appName)),
      body: _getContent(context),
    );
  }
}
