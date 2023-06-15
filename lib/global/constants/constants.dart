import 'package:flutterfire_ui/auth.dart';
import 'package:intl/intl.dart';
import 'package:uuid/uuid.dart';

const gConfig = GoogleProviderConfiguration(clientId: clientId);

// const logo =
    // "https://firebasestorage.googleapis.com/v0/b/hope-5479b.appspot.com/o/in.png?alt=media&token=5158f13d-1579-495d-9c63-dfcae211464c";
const exampleImage =
    "https://firebasestorage.googleapis.com/v0/b/fresume-app.appspot.com/o/Screenshot%202022-01-14%20at%207.07.21%20PM.png?alt=media&token=aab16e72-be29-4792-8e04-f0bb07ec3458";

const clientId =
    "457342149062-ae3mlo4ntu8dfcfilasr0oqv49qp7ac9.apps.googleusercontent.com";

Uuid uuid = const Uuid();

DateFormat dateFormat = DateFormat("dd MMMM yyyy");
