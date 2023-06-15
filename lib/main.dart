import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:get/get.dart';
import 'package:responsive_framework/responsive_framework.dart';
import 'package:resume_builder/apis/auth.dart';
import 'package:resume_builder/firebase_options.dart';
import 'package:resume_builder/global/routes/routes.dart';
import 'package:resume_builder/global/theme/theme.dart';
import 'package:resume_builder/global/widgets/loading.dart';
import 'package:resume_builder/pages/home/view/home_view.dart';
import 'package:resume_builder/pages/unknown/unknown_route.dart';

Future<void> main() async {
  // setPathUrlStrategy();
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);

  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: "4HOPE",
      debugShowCheckedModeBanner: false,
      builder: (context, widget) => ResponsiveBreakpoints.builder(
        child: widget!,
        // backgroundColor: Container(
        //   color: Colors.grey.shade50,
        // ),
        // defaultScale: true,
        breakpoints: const [
          Breakpoint(start: 0, end: 450, name: MOBILE),
          Breakpoint(start: 0, end: 800, name: TABLET),
          Breakpoint(start: 0, end: 1000, name: TABLET),
          Breakpoint(start: 0, end: 1200, name: DESKTOP),
          Breakpoint(start: 0, end: 2460, name: "4K"),
        ],
      ),
      theme: lightThemeDta,
      initialRoute: '/',
      unknownRoute: GetPage(name: '/error', page: () => const UnknownRoute()),
      getPages: getPages,
    );
  }
}

class AuthGate extends ConsumerWidget {
  const AuthGate({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context, ref) {
    return ref.watch(authStateChangeProvider).when(data: (snapshot) {
      WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
        if (snapshot != null) {
          Get.offAndToNamed('/home');
        }
      });

      if (snapshot == null) {
        return const HomeAuthView();
      }

      // Render your application if authenticated
      return progressWidget(context);
    }, loading: () {
      return Container();
    }, error: (e, s) {
      throw (e);
    });
  }
}
