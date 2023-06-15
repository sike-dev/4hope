import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:resume_builder/apis/auth.dart';
import 'package:resume_builder/apis/resume.dart';
import 'package:resume_builder/global/models/pdf_model.dart';

final resumeController = StateNotifierProvider.family<UserResumeList,
    AsyncValue<List<PdfModel>>, String>((ref, uid) {
  return UserResumeList(ref, uid);
});

class UserResumeList extends StateNotifier<AsyncValue<List<PdfModel>>> {
  final String uid;
  UserResumeList(this.ref, this.uid) : super(const AsyncLoading()) {
    _getResume();
  }

  final Ref ref;

  Future<void> _getResume() async {
    try {
      final List<PdfModel> pdfModels =
          await PdfModelApi(uid, ref.read(firebaseFirestoreProvider))
              .retrievePdfModel();
      state = AsyncData(pdfModels);
    } catch (e, st) {
      throw AsyncError<Exception>(e);
    }
  }

  Future<bool> addToResume({required PdfModel pdfModel}) async {
    try {
      await PdfModelApi(uid, ref.read(firebaseFirestoreProvider))
          .setPdfModel(pdfModel.pdfId, pdfModel);
      final List<PdfModel> pdfModels =
          await PdfModelApi(uid, ref.read(firebaseFirestoreProvider))
              .retrievePdfModel();
      state = AsyncData(pdfModels);
      return true;
    } catch (e, st) {
      throw AsyncError<Exception>(e);
    }
  }

  Future<bool> deleteFromResume({required PdfModel pdfModel}) async {
    try {
      await PdfModelApi(uid, ref.read(firebaseFirestoreProvider))
          .deletePdfModel(pdfModel.pdfId);
      final List<PdfModel> pdfModels =
          await PdfModelApi(uid, ref.read(firebaseFirestoreProvider))
              .retrievePdfModel();
      state = AsyncData(pdfModels);
      return true;
    } catch (e, st) {
      throw AsyncError<Exception>(e);
    }
  }
}
