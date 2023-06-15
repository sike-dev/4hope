import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resume_builder/apis/resume.dart';

final firebaseFirestoreProvider =
    Provider<FirebaseFirestore>((ref) => FirebaseFirestore.instance);
final authApiProvider = Provider<AuthApi>((ref) {
  AuthApi authApi = AuthApi();
  return authApi;
});

final authStateChangeProvider = StreamProvider<User?>((ref) {
  AuthApi authApi = ref.watch(authApiProvider);
  return authApi.authChanges();
});

final firebaseChangeProvider =
    StreamProvider<DocumentSnapshot<Map<String, dynamic>>>((ref) {
  var authApi = ref.watch(authStateChangeProvider);
  var _firebaseFirestoreProvider = ref.watch(firebaseFirestoreProvider);
  return _firebaseFirestoreProvider
      .collection(USER_COLLECTION)
      .doc(authApi.asData!.value!.uid)
      .snapshots();
});

class AuthApi {
  final FirebaseAuth firebaseAuth = FirebaseAuth.instance;

  ///[authChanges] streams the user change and is essential in keeping check if the user is logged in or not
  Stream<User?> authChanges() {
    return firebaseAuth.authStateChanges();
  }

  ///[signOut] the user is signed out from the application
  Future<void> signOut() async {
    try {
      await firebaseAuth.signOut();
    } catch (e) {
      throw UnimplementedError(e.toString());
    }
  }
}
