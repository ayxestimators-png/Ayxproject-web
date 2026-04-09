ayxtool/
├── lib/
│   ├── main.dart
│   ├── constants/
│   │   ├── colors.dart
│   │   └── strings.dart
│   ├── secrets/
│   │   └── secrets_config.dart
│   ├── services/
│   │   ├── ai_estimator_service.dart
│   │   ├── image_service.dart
│   │   └── payment_service.dart
│   ├── theme/
│   │   └── app_theme.dart
│   ├── screens/
│   │   ├── home_screen.dart
│   │   ├── estimator_screen.dart
│   │   ├── pricing_screen.dart
│   │   └── about_screen.dart
│   └── widgets/
│       ├── hero_widget.dart
│       ├── how_it_works_widget.dart
│       ├── pricing_widget.dart
│       ├── footer_widget.dart
│       └── help_modal_widget.dart
├── android/
├── pubspec.yaml
├── .gitignore
├── README.md
└── LICENSEimport 'package:flutter/material.dart';
import 'theme/app_theme.dart';
import 'screens/home_screen.dart';
import 'screens/estimator_screen.dart';
import 'screens/pricing_screen.dart';
import 'screens/about_screen.dart';
import 'services/payment_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  final paymentService = PaymentService();
  await paymentService.initialize();

  runApp(const AyXToolApp());
}

class AyXToolApp extends StatelessWidget {
  const AyXToolApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AyXTool',
      theme: AppTheme.darkTheme(),
      home: const MainNavigation(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MainNavigation extends StatefulWidget {
  const MainNavigation({Key? key}) : super(key: key);

  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: [
        HomeScreen(),
        EstimatorScreen(),
        PricingScreen(),
        AboutScreen(),
      ][_currentIndex],
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _currentIndex,
        onTap: (index) => setState(() => _currentIndex = index),
        items: const [
          BottomNavigationBarItem(
            icon: Icon(Icons.home),
            label: 'Home',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.camera_alt),
            label: 'Estimator',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.card_giftcard),
            label: 'Pricing',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.info),
            label: 'About',
          ),
        ],
      ),
    );
  }
}import 'package:flutter/material.dart';

class AppColors {
  static const Color darkBlue = Color(0xFF0B2A4A);
  static const Color mediumBlue = Color(0xFF1E3A5F);
  static const Color lightBlue = Color(0xFF6EC1E4);
  static const Color brightBlue = Color(0xFF1E40AF);
  static const Color white = Colors.white;
  static const Color grayLight = Color(0xFFE5E7EB);
  static const Color grayMedium = Color(0xFF9CA3AF);
  static const Color grayDark = Color(0xFF374151);
}class AppStrings {
  static const String heroTitle = 'AyXTool – Home repair estimating made simple';
  static const String heroSubtitle = 'Take a photo of any problem in your home.
AyXTool shows you what it will cost, DIY vs Pro.';
  static const String heroButton = 'Open AyXTool Estimator';

  static const String howItWorksTitle = 'How AyXTool works';
  static const String step1Title = 'Take a photo';
  static const String step1Desc = 'Snap a picture of the problem in your home.';
  static const String step2Title = 'See your estimate';
  static const String step2Desc = 'AyXTool shows you what it will cost, DIY vs Pro.';
  static const String step3Title = 'Decide & upgrade';
  static const String step3Desc = 'Lock in your price, and upgrade to your next plan.';

  static const String pricingTitle = 'AyXTool Pricing – No hidden fees';
  static const String pricingSubtitle = 'All plans include a 2-week free trial. Upgrade or downgrade anytime.';
  static const String momPlan = 'Mom / Homeowner';
  static const String momPrice = '$15.00 / month';
  static const String momDesc = 'Perfect for moms, seniors, and DIYers.';
  static const String momButton = 'Start free trial (Mom)';
  
  static const String proPlan = 'Pro / Handyman';
  static const String proPrice = '$30.00 / month';
  static const String proDesc = 'For handymen and small contractors.';
  static const String proButton = 'Start free trial (Pro)';
  
  static const String companyPlan = 'Company / Corporation';
  static const String companyPrice = '$80.00 / month';
  static const String companyDesc = 'For companies and crews. 5% off if you prepay 3 months.';
  static const String companyButton = 'Start free trial (Company)';

  static const String needHelp = 'Need help?';
  static const String helpDesc = 'Our elderly-friendly help button is always here.';
  static const String helpButton = 'Call or Chat Help';
  static const String copyright = '© 2026 AyXTool. All rights reserved.';
  static const String builtBy = 'Built by: Joshua Mares (Sunizona, Arizona)';
  static const String estimatorStack = 'AyX Estimator Stack — Original product concept and design.';

  static const String aboutTitle = 'About AyXTool';
  static const String helpTitle = 'How to use AyXTool';
  static const String helpSteps = 'Follow these simple steps. Tap the big buttons!';
}import 'dart:io';

class SecretsConfig {
  static String get geminiApiKey {
    final key = Platform.environment['GEMINI_API_KEY'];
    if (key == null || key.isEmpty) {
      throw Exception(
        'GEMINI_API_KEY not set. '
        'Set it via: flutter run --dart-define=GEMINI_API_KEY=your_key_here'
      );
    }
    return key;
  }

  static String get revenueCatKey {
    final key = Platform.environment['REVENUECAT_GOOGLE_PLAY_KEY'];
    if (key == null || key.isEmpty) {
      throw Exception(
        'REVENUECAT_GOOGLE_PLAY_KEY not set. '
        'Set it via: flutter run --dart-define=REVENUECAT_GOOGLE_PLAY_KEY=your_key_here'
      );
    }
    return key;
  }
}import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../constants/colors.dart';

class AppTheme {
  static ThemeData darkTheme() {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppColors.darkBlue,
      appBarTheme: AppBarTheme(
        backgroundColor: AppColors.mediumBlue,
        elevation: 0,
        centerTitle: true,
        titleTextStyle: GoogleFonts.inter(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: AppColors.white,
        ),
      ),
      textTheme: TextTheme(
        displayLarge: GoogleFonts.inter(
          fontSize: 36,
          fontWeight: FontWeight.bold,
          color: AppColors.white,
        ),
        displayMedium: GoogleFonts.inter(
          fontSize: 28,
          fontWeight: FontWeight.bold,
          color: AppColors.white,
        ),
        titleLarge: GoogleFonts.inter(
          fontSize: 20,
          fontWeight: FontWeight.bold,
          color: AppColors.white,
        ),
        bodyLarge: GoogleFonts.inter(
          fontSize: 16,
          color: AppColors.white,
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: 14,
          color: AppColors.grayLight,
        ),
        bodySmall: GoogleFonts.inter(
          fontSize: 12,
          color: AppColors.grayMedium,
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: AppColors.brightBlue,
          foregroundColor: AppColors.white,
          padding: const EdgeInsets.symmetric(horizontal: 32, vertical: 16),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          textStyle: GoogleFonts.inter(
            fontSize: 16,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}import 'package:revenuecat_flutter/revenuecat_flutter.dart';
import '../secrets/secrets_config.dart';

class PaymentService {
  static final PaymentService _instance = PaymentService._internal();

  factory PaymentService() {
    return _instance;
  }

  PaymentService._internal();

  late Offering? _offerings;
  late CustomerInfo? _customerInfo;

  Future<void> initialize() async {
    try {
      await Purchases.configure(
        PurchasesConfiguration(SecretsConfig.revenueCatKey),
      );

      _offerings = await Purchases.getOfferings();
      _customerInfo = await Purchases.getCustomerInfo();
    } catch (e) {
      print('RevenueCat initialization error: $e');
    }
  }

  List<Package>? getAvailablePackages() {
    return _offerings?.current?.availablePackages;
  }

  Future<bool> purchasePackage(Package package) async {
    try {
      final purchaserInfo = await Purchases.purchasePackage(package);
      return purchaserInfo.entitlements.active.isNotEmpty;
    } catch (e) {
      print('Purchase error: $e');
      return false;
    }
  }

  Future<bool> hasActiveSubscription() async {
    try {
      _customerInfo = await Purchases.getCustomerInfo();
      return _customerInfo?.entitlements.active.isNotEmpty ?? false;
    } catch (e) {
      print('Error checking subscription: $e');
      return false;
    }
  }

  Future<bool> restorePurchases() async {
    try {
      _customerInfo = await Purchases.restoreTransactions();
      return _customerInfo?.entitlements.active.isNotEmpty ?? false;
    } catch (e) {
      print('Restore purchases error: $e');
      return false;
    }
  }
}import 'package:image_picker/image_picker.dart';
import 'dart:io';

class ImageService {
  final ImagePicker _picker = ImagePicker();

  Future<File?> pickImageFromGallery() async {
    try {
      final XFile? image = await _picker.pickImage(
        source: ImageSource.gallery,
        imageQuality: 80,
      );
      
      if (image != null) {
        return File(image.path);
      }
      return null;
    } catch (e) {
      throw Exception('Failed to pick image: $e');
    }
  }

  Future<File?> takePhotoWithCamera() async {
    try {
      final XFile? image = await _picker.pickImage(
        source: ImageSource.camera,
        imageQuality: 80,
      );
      
      if (image != null) {
        return File(image.path);
      }
      return null;
    } catch (e) {
      throw Exception('Failed to take photo: $e');
    }
  }
}import 'package:google_generative_ai/google_generative_ai.dart';
import 'dart:io';
import 'dart:convert';
import '../secrets/secrets_config.dart';

class AIEstimatorService {
  late GenerativeModel model;
  
  AIEstimatorService() {
    model = GenerativeModel(
      model: 'gemini-1.5-flash',
      apiKey: SecretsConfig.geminiApiKey,
    );
  }

  Future<EstimateResult> analyzePhotoForEstimate(File photoFile) async {
    try {
      final imageBytes = await photoFile.readAsBytes();

      final prompt = '''
You are an expert home repair estimator. Analyze this image of a home repair problem and provide:

1. Problem Identification: What is the problem?
2. DIY Difficulty: Easy (1-3), Medium (4-6), Hard (7-10)
3. DIY Cost Estimate: Low, Medium, High (with price range)
4. Professional Cost Estimate: Low, Medium, High (with price range)
5. Time to Fix (DIY): Hours/Days estimate
6. Recommendation: DIY or Professional?

Format the response as JSON with these keys:
{
  "problem": "...",
  "difficulty": 0,
  "diy_cost": "$...",
  "pro_cost": "$...",
  "diy_time": "...",
  "recommendation": "...",
  "details": "..."
}

Be realistic and practical in your estimates.
''';

      final response = await model.generateContent([
        Content.multi([
          TextPart(prompt),
          DataPart('image/jpeg', imageBytes),
        ])
      ]);

      final responseText = response.text;
      if (responseText == null) {
        throw Exception('No response from AI model');
      }

      final jsonString = _extractJson(responseText);
      final estimate = EstimateResult.fromJson(jsonString);

      return estimate;
    } catch (e) {
      throw Exception('Failed to analyze photo: $e');
    }
  }

  String _extractJson(String response) {
    final startIndex = response.indexOf('{');
    final endIndex = response.lastIndexOf('}') + 1;
    
    if (startIndex == -1 || endIndex == 0) {
      throw Exception('No JSON found in response');
    }
    
    return response.substring(startIndex, endIndex);
  }
}

class EstimateResult {
  final String problem;
  final int difficulty;
  final String diyCost;
  final String proCost;
  final String diyTime;
  final String recommendation;
  final String details;

  EstimateResult({
    required this.problem,
    required this.difficulty,
    required this.diyCost,
    required this.proCost,
    required this.diyTime,
    required this.recommendation,
    required this.details,
  });

  factory EstimateResult.fromJson(dynamic json) {
    if (json is String) {
      json = jsonDecode(json) as Map<String, dynamic>;
    }
    
    return EstimateResult(
      problem: json['problem'] ?? 'Unknown problem',
      difficulty: json['difficulty'] ?? 0,
      diyCost: json['diy_cost'] ?? 'N/A',
      proCost: json['pro_cost'] ?? 'N/A',
      diyTime: json['diy_time'] ?? 'N/A',
      recommendation: json['recommendation'] ?? 'Professional',
      details: json['details'] ?? '',
    );
  }
}import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../constants/strings.dart';

class HeroWidget extends StatelessWidget {
  const HeroWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final isLandscape = constraints.maxWidth > constraints.maxHeight;
        
        return Container(
          width: double.infinity,
          height: isLandscape 
              ? MediaQuery.of(context).size.height * 0.4
              : MediaQuery.of(context).size.height * 0.5,
          decoration: BoxDecoration(
            color: AppColors.darkBlue,
          ),
          child: Stack(
            children: [
              CustomPaint(
                painter: BlueprintPainter(),
                size: Size.infinite,
              ),
              Positioned(
                top: 16,
                left: 16,
                child: Container(
                  padding: EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppColors.mediumBlue.withOpacity(0.8),
                    border: Border.all(color: AppColors.brightBlue, width: 1),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        '© 2026 AyXTool',
                        style: TextStyle(
                          fontSize: 10,
                          color: AppColors.grayLight,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      SizedBox(height: 4),
                      Text(
                        'AyX Estimator Stack – Joshua Mares',
                        style: TextStyle(
                          fontSize: 8,
                          color: AppColors.grayMedium,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
              isLandscape
                  ? _buildLandscapeHero(context)
                  : _buildPortraitHero(context),
            ],
          ),
        );
      },
    );
  }

  Widget _buildPortraitHero(BuildContext context) {
    return Center(
      child: Padding(
        padding: EdgeInsets.symmetric(horizontal: 24),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              AppStrings.heroTitle,
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.displayMedium,
            ),
            SizedBox(height: 16),
            Text(
              AppStrings.heroSubtitle,
              textAlign: TextAlign.center,
              style: TextStyle(
                fontSize: 16,
                color: AppColors.grayLight,
                height: 1.6,
              ),
            ),
            SizedBox(height: 32),
            ElevatedButton(
              onPressed: () {},
              child: Text(AppStrings.heroButton),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildLandscapeHero(BuildContext context) {
    return Row(
      children: [
        Expanded(
          flex: 4,
          child: Container(
            color: AppColors.mediumBlue,
            child: Center(
              child: Icon(
                Icons.architecture,
                size: 80,
                color: Colors.white70,
              ),
            ),
          ),
        ),
        Expanded(
          flex: 6,
          child: Padding(
            padding: EdgeInsets.all(20),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  AppStrings.heroTitle,
                  style: Theme.of(context).textTheme.headlineSmall,
                ),
                SizedBox(height: 12),
                Text(
                  AppStrings.heroSubtitle,
                  style: TextStyle(fontSize: 14),
                ),
                SizedBox(height: 24),
                ElevatedButton(
                  onPressed: () {},
                  child: Text(AppStrings.heroButton),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class BlueprintPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final paint = Paint()
      ..color = AppColors.lightBlue.withOpacity(0.1)
      ..strokeWidth = 1;

    const gridSize = 16.0;

    for (double x = 0; x < size.width; x += gridSize) {
      canvas.drawLine(Offset(x, 0), Offset(x, size.height), paint);
    }

    for (double y = 0; y < size.height; y += gridSize) {
      canvas.drawLine(Offset(0, y), Offset(size.width, y), paint);
    }
  }

  @override
  bool shouldRepaint(BlueprintPainter oldDelegate) => false;
}import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../constants/strings.dart';

class HowItWorksWidget extends StatelessWidget {
  const HowItWorksWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColors.mediumBlue,
      padding: EdgeInsets.symmetric(vertical: 32, horizontal: 16),
      child: Column(
        children: [
          Text(
            AppStrings.howItWorksTitle,
            style: Theme.of(context).textTheme.displayMedium,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 32),
          LayoutBuilder(
            builder: (context, constraints) {
              final isLandscape = constraints.maxWidth > constraints.maxHeight;
              
              return isLandscape
                  ? Row(
                      mainAxisAlignment: MainAxisAlignment.spaceAround,
                      children: [
                        _StepCard(
                          number: '1',
                          title: AppStrings.step1Title,
                          description: AppStrings.step1Desc,
                        ),
                        _StepCard(
                          number: '2',
                          title: AppStrings.step2Title,
                          description: AppStrings.step2Desc,
                        ),
                        _StepCard(
                          number: '3',
                          title: AppStrings.step3Title,
                          description: AppStrings.step3Desc,
                        ),
                      ],
                    )
                  : Column(
                      children: [
                        _StepCard(
                          number: '1',
                          title: AppStrings.step1Title,
                          description: AppStrings.step1Desc,
                        ),
                        SizedBox(height: 24),
                        _StepCard(
                          number: '2',
                          title: AppStrings.step2Title,
                          description: AppStrings.step2Desc,
                        ),
                        SizedBox(height: 24),
                        _StepCard(
                          number: '3',
                          title: AppStrings.step3Title,
                          description: AppStrings.step3Desc,
                        ),
                      ],
                    );
            },
          ),
        ],
      ),
    );
  }
}

class _StepCard extends StatelessWidget {
  final String number;
  final String title;
  final String description;

  const _StepCard({
    required this.number,
    required this.title,
    required this.description,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          width: 48,
          height: 48,
          decoration: BoxDecoration(
            color: AppColors.brightBlue,
            shape: BoxShape.circle,
          ),
          child: Center(
            child: Text(
              number,
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
                color: AppColors.white,
              ),
            ),
          ),
        ),
        SizedBox(height: 12),
        Text(
          title,
          style: Theme.of(context).textTheme.titleLarge,
          textAlign: TextAlign.center,
        ),
        SizedBox(height: 8),
        Text(
          description,
          style: TextStyle(
            fontSize: 14,
            color: AppColors.grayLight,
          ),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }
}import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../constants/strings.dart';

class PricingWidget extends StatelessWidget {
  const PricingWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColors.mediumBlue,
      padding: EdgeInsets.symmetric(vertical: 32, horizontal: 16),
      child: Column(
        children: [
          Text(
            AppStrings.pricingTitle,
            style: Theme.of(context).textTheme.displayMedium,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 12),
          Text(
            AppStrings.pricingSubtitle,
            style: TextStyle(
              fontSize: 12,
              color: AppColors.grayLight,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 32),
          LayoutBuilder(
            builder: (context, constraints) {
              final isLandscape = constraints.maxWidth > constraints.maxHeight;
              
              return isLandscape
                  ? Row(
                      children: [
                        Expanded(
                          child: _PricingCard(
                            plan: AppStrings.momPlan,
                            price: AppStrings.momPrice,
                            description: AppStrings.momDesc,
                            buttonText: AppStrings.momButton,
                            backgroundColor: AppColors.darkBlue,
                          ),
                        ),
                        SizedBox(width: 16),
                        Expanded(
                          child: _PricingCard(
                            plan: AppStrings.proPlan,
                            price: AppStrings.proPrice,
                            description: AppStrings.proDesc,
                            buttonText: AppStrings.proButton,
                            backgroundColor: AppColors.brightBlue,
                          ),
                        ),
                        SizedBox(width: 16),
                        Expanded(
                          child: _PricingCard(
                            plan: AppStrings.companyPlan,
                            price: AppStrings.companyPrice,
                            description: AppStrings.companyDesc,
                            buttonText: AppStrings.companyButton,
                            backgroundColor: AppColors.darkBlue,
                            borderColor: AppColors.brightBlue,
                          ),
                        ),
                      ],
                    )
                  : Column(
                      children: [
                        _PricingCard(
                          plan: AppStrings.momPlan,
                          price: AppStrings.momPrice,
                          description: AppStrings.momDesc,
                          buttonText: AppStrings.momButton,
                          backgroundColor: AppColors.darkBlue,
                        ),
                        SizedBox(height: 16),
                        _PricingCard(
                          plan: AppStrings.proPlan,
                          price: AppStrings.proPrice,
                          description: AppStrings.proDesc,
                          buttonText: AppStrings.proButton,
                          backgroundColor: AppColors.brightBlue,
                        ),
                        SizedBox(height: 16),
                        _PricingCard(
                          plan: AppStrings.companyPlan,
                          price: AppStrings.companyPrice,
                          description: AppStrings.companyDesc,
                          buttonText: AppStrings.companyButton,
                          backgroundColor: AppColors.darkBlue,
                          borderColor: AppColors.brightBlue,
                        ),
                      ],
                    );
            },
          ),
        ],
      ),
    );
  }
}

class _PricingCard extends StatelessWidget {
  final String plan;
  final String price;
  final String description;
  final String buttonText;
  final Color backgroundColor;
  final Color? borderColor;

  const _PricingCard({
    required this.plan,
    required this.price,
    required this.description,
    required this.buttonText,
    required this.backgroundColor,
    this.borderColor,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: backgroundColor,
        border: borderColor != null ? Border.all(color: borderColor!, width: 2) : null,
        borderRadius: BorderRadius.circular(12),
      ),
      padding: EdgeInsets.all(24),
      child: Column(
        children: [
          Text(
            plan,
            style: Theme.of(context).textTheme.titleLarge,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 12),
          Text(
            price,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.bold,
              color: AppColors.white,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 12),
          Text(
            description,
            style: TextStyle(
              fontSize: 12,
              color: AppColors.grayLight,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {},
              child: Text(buttonText),
            ),
          ),
        ],
      ),
    );
  }
}import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../constants/strings.dart';
import 'help_modal_widget.dart';

class FooterWidget extends StatelessWidget {
  const FooterWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      color: AppColors.mediumBlue,
      padding: EdgeInsets.symmetric(vertical: 32, horizontal: 16),
      child: Column(
        children: [
          Text(
            AppStrings.needHelp,
            style: Theme.of(context).textTheme.titleLarge,
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 12),
          Text(
            AppStrings.helpDesc,
            style: TextStyle(
              fontSize: 12,
              color: AppColors.grayLight,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 24),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {
                showDialog(
                  context: context,
                  builder: (context) => HelpModalWidget(),
                );
              },
              child: Text(AppStrings.helpButton),
            ),
          ),
          SizedBox(height: 32),
          Divider(color: AppColors.brightBlue, height: 1),
          SizedBox(height: 16),
          Text(
            'AyXTool – Construction Estimator',
            style: TextStyle(
              fontSize: 10,
              color: AppColors.grayLight,
            ),
          ),
          SizedBox(height: 8),
          Text(
            AppStrings.copyright,
            style: TextStyle(
              fontSize: 10,
              color: AppColors.grayMedium,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 8),
          Text(
            AppStrings.builtBy,
            style: TextStyle(
              fontSize: 10,
              color: AppColors.grayMedium,
            ),
            textAlign: TextAlign.center,
          ),
          SizedBox(height: 8),
          Text(
            AppStrings.estimatorStack,
            style: TextStyle(
              fontSize: 9,
              color: AppColors.grayMedium,
            ),
            textAlign: TextAlign.center,
          ),
        ],
      ),
    );
  }
}import 'package:flutter/material.dart';
import '../constants/colors.dart';
import '../constants/strings.dart';

class HelpModalWidget extends StatelessWidget {
  const HelpModalWidget({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final steps = [
      'Step 1: Open the AyXTool app and find the camera button.',
      'Step 2: Point your phone at the problem (like a crack, stain, or broken part).',
      'Step 3: Press the big button that says Take a photo.',
      'Step 4: Wait a few seconds while AyXTool thinks and shows your estimate.',
      'Step 5: If you see something you dont like, tap the big button at the bottom that says Call or Chat Help.',
    ];

    return Dialog(
      backgroundColor: AppColors.white,
      child: Padding(
        padding: EdgeInsets.all(24),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Text(
              AppStrings.helpTitle,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppColors.darkBlue,
              ),
            ),
            SizedBox(height: 12),
            Text(
              AppStrings.helpSteps,
              style: TextStyle(
                fontSize: 12,
                color: AppColors.grayDark,
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 24),
            Expanded(
              child: ListView.builder(
                shrinkWrap: true,
                itemCount: steps.length,
                itemBuilder: (context, index) {
                  return Padding(
                    padding: EdgeInsets.only(bottom: 12),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          '${index + 1}. ',
                          style: TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.bold,
                            color: AppColors.darkBlue,
                          ),
                        ),
                        Expanded(
                          child: Text(
                            steps[index],
                            style: TextStyle(
                              fontSize: 12,
                              color: AppColors.grayDark,
                            ),
                          ),
                        ),
                      ],
                    ),
                  );
                },
              ),
            ),
            SizedBox(height: 24),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => Navigator.pop(context),
                child: Text('Close'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}import 'package:flutter/material.dart';
import '../widgets/hero_widget.dart';
import '../widgets/how_it_works_widget.dart';
import '../widgets/pricing_widget.dart';
import '../widgets/footer_widget.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('AyXTool'),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: [
            HeroWidget(),
            HowItWorksWidget(),
            PricingWidget(),
            FooterWidget(),
          ],
        ),
      ),
    );
  }
}import 'package:flutter/material.dart';
import 'dart:io';
import '../services/ai_estimator_service.dart';
import '../services/image_service.dart';
import '../constants/colors.dart';

class EstimatorScreen extends StatefulWidget {
  const EstimatorScreen({Key? key}) : super(key: key);

  @override
  State<EstimatorScreen> createState() => _EstimatorScreenState();
}

class _EstimatorScreenState extends State<EstimatorScreen> {
  File? _selectedImage;
  bool _isAnalyzing = false;
  EstimateResult? _estimateResult;
  String? _errorMessage;

  final ImageService _imageService = ImageService();
  final AIEstimatorService _aiService = AIEstimatorService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('AyXTool Estimator'),
      ),
      body: SingleChildScrollView(
        padimport 'package:flutter/material.dart';
import 'dart:io';
import '../services/ai_estimator_service.dart';
import '../services/image_service.dart';
import '../constants/colors.dart';

class EstimatorScreen extends StatefulWidget {
  const EstimatorScreen({Key? key}) : super(key: key);

  @override
  State<EstimatorScreen> createState() => _EstimatorScreenState();
}

class _EstimatorScreenState extends State<EstimatorScreen> {
  File? _selectedImage;
  bool _isAnalyzing = false;
  EstimateResult? _estimateResult;
  String? _errorMessage;

  final ImageService _imageService = ImageService();
  final AIEstimatorService _aiService = AIEstimatorService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('AyXTool Estimator'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Text(
              'Take a photo of your home repair problem',
              style: Theme.of(context).textTheme.titleLarge,
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 24),
            
            if (_selectedImage != null)
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.file(
                  _selectedImage!,
                  width: double.infinity,
                  height: 300,
                  fit: BoxFit.cover,
                ),
              )
            else
              Container(
                width: double.infinity,
                height: 300,
                decoration: BoxDecoration(
                  border: Border.all(color: AppColors.brightBlue, width: 2),
                  borderRadius: BorderRadius.circular(12),
                  color: AppColors.mediumBlue,
                ),
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.image_outlined, size: 64, color: AppColors.brightBlue),
                      SizedBox(height: 12),
                      Text(
                        'No photo selected',
                        style: TextStyle(color: AppColors.grayLight),
                      ),
                    ],
                  ),
                ),
              ),
            
            SizedBox(height: 24),
            
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _isAnalyzing ? null : _takePhoto,
                    icon: Icon(Icons.camera_alt),
                    label: Text('Take Photo'),
                  ),
                ),
                SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _isAnalyzing ? null : _pickFromGallery,
                    icon: Icon(Icons.image),
                    label: Text('From Gallery'),
                  ),
                ),
              ],
            ),
            
            SizedBox(height: 24),
            
            if (_selectedImage != null)
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _isAnalyzing ? null : _analyzePhoto,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.brightBlue,
                    padding: EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: _isAnalyzing
                      ? SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            valueColor: AlwaysStoppedAnimation(Colors.white),
                          ),
                        )
                      : Text(
                          'Analyze Photo & Get Estimate',
                          style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                ),
              ),
            
            SizedBox(height: 24),
            
            if (_errorMessage != null)
              Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.red.withOpacity(0.2),
                  border: Border.all(color: Colors.red),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  _errorMessage!,
                  style: TextStyle(color: Colors.red),
                ),
              ),
            
            if (_estimateResult != null)
              _buildEstimateResult(_estimateResult!),
          ],
        ),
      ),
    );
  }

  Future<void> _takePhoto() async {
    try {
      final image = await _imageService.takePhotoWithCamera();
      if (image != null) {
        setState(() {
          _selectedImage = image;
          _errorMessage = null;
        });
      }
    } catch (e) {
      setState(() {
        _errorMessage = 'Failed to take photo: $e';
      });
    }
  }

  Future<void> _pickFromGallery() async {
    try {
      final image = await _imageService.pickImageFromGallery();
      if (image != null) {
        setState(() {
          _selectedImage = image;
          _errorMessage = null;
        });
      }
    } catch (e) {
      setState(() {
        _errorMessage = 'Failed to pick image: $e';
      });
    }
  }

  Future<void> _analyzePhoto() async {
    if (_selectedImage == null) return;

    setState(() {
      _isAnalyzing = true;
      _errorMessage = null;
    });

    try {
      final result = await _aiService.analyzePhotoForEstimate(_selectedImage!);
      setState(() {
        _estimateResult = result;
        _isAnalyzing = false;
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'Analysis failed: $e';
        _isAnalyzing = false;
      });
    }
  }

  Widget _buildEstimateResult(EstimateResult result) {
    final difficultyColor = result.difficulty <= 3
        ? Colors.green
        : result.difficulty <= 6
            ? Colors.orange
            : Colors.red;

    return LayoutBuilder(
      builder: (context, constraints) {
        final isLandscape = constraints.maxWidth > constraints.maxHeight;
        
        return Container(
          margin: EdgeInsets.only(top: 24),
          padding: EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: AppColors.mediumBlue,
            border: Border.all(color: AppColors.brightBlue, width: 2),
            borderRadius: BorderRadius.circular(12),
          ),
          child: isLandscape
              ? _buildLandscapeEstimate(result, difficultyColor)
              : _buildPortraitEstimate(result, difficultyColor),
        );
      },
    );
  }

  Widget _buildPortraitEstimate(EstimateResult result, Color difficultyColor) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Estimate Results',
          style: Theme.of(context).textTheme.titleLarge,
        ),
        SizedBox(height: 16),
        _buildResultRow('Problem', result.problem),
        _buildResultRow('DIY Difficulty', '${result.difficulty}/10', difficultyColor),
        _buildResultRow('DIY Cost', result.diyCost),
        _buildResultRow('Pro Cost', result.proCost),
        _buildResultRow('DIY Time', result.diyTime),
        _buildResultRow('Recommendation', result.recommendation),
        SizedBox(height: 12),
        Text(
          'Details:',
          style: TextStyle(fontWeight: FontWeight.bold, color: AppColors.white),
        ),
        SizedBox(height: 8),
        Text(
          result.details,
          style: TextStyle(color: AppColors.grayLight),
        ),
      ],
    );
  }

  Widget _buildLandscapeEstimate(EstimateResult result, Color difficultyColor) {
    return Row(
      children: [
        Expanded(
          flex: 3,
          child: Column(
            children: [
              Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: difficultyColor.withOpacity(0.2),
                  border: Border.all(color: difficultyColor),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Column(
                  children: [
                    Text(
                      'Difficulty',
                      style: TextStyle(fontSize: 12, color: AppColors.grayLight),
                    ),
                    SizedBox(height: 8),
                    Text(
                      '${result.difficulty}/10',
                      style: TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: difficultyColor,
                      ),
                    ),
                  ],
                ),
              ),
              SizedBox(height: 16),
              Container(
                padding: EdgeInsets.all(12),
                decoration: BoxDecoration(
                  color: AppColors.brightBlue.withOpacity(0.2),
                  border: Border.all(color: AppColors.brightBlue),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Column(
                  children: [
                    Text(
                      'Recommendation',
                      style: TextStyle(fontSize: 10, color: AppColors.grayLight),
                    ),
                    SizedBox(height: 4),
                    Text(
                      result.recommendation,
                      style: TextStyle(
                        fontSize: 14,
                        fontWeight: FontWeight.bold,
                        color: AppColors.brightBlue,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
        SizedBox(width: 16),
        Expanded(
          flex: 7,
          child: SingleChildScrollView(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                _buildResultRow('Problem', result.problem),
                _buildResultRow('DIY Cost', result.diyCost),
                _buildResultRow('Pro Cost', result.proCost),
                _buildResultRow('DIY Time', result.diyTime),
                Divider(height: 24),
                Text(
                  'Details:',
                  style: TextStyle(fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 8),
                Text(
                  result.details,
                  style: TextStyle(fontSize: 12),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildResultRow(String label, String value, [Color? valueColor]) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(color: AppColors.grayLight),
          ),
          Text(
            value,
            style: TextStyle(
              color: valueColor ?? AppColors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }
}import 'package:flutter/material.dart';
import 'package:revenuecat_flutter/revenuecat_flutter.dart';
import '../services/payment_service.dart';
import '../constants/colors.dart';

class PricingScreen extends StatefulWidget {
  const PricingScreen({Key? key}) : super(key: key);

  @override
  State<PricingScreen> createState() => _PricingScreenState();
}

class _PricingScreenState extends State<PricingScreen> {
  final PaymentService _paymentService = PaymentService();
  List<Package>? _packages;
  bool _isLoading = true;
  String? _error;

  @override
  void initState() {
    super.initState();
    _initializePayments();
  }

  Future<void> _initializePayments() async {
    try {
      await _paymentService.initialize();
      
      setState(() {
        _packages = _paymentService.getAvailablePackages();
        _isLoading = false;
      });
    } catch (e) {
      setState(() {
        _error = 'Failed to load pricing: $e';
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('AyXTool Pricing'),
      ),
      body: _isLoading
          ? Center(child: CircularProgressIndicator())
          : _error != null
              ? Center(child: Text(_error!))
              : SingleChildScrollView(
                  padding: EdgeInsets.all(24),
                  child: Column(
                    children: [
                      Text(
                        'Choose Your Plan',
                        style: Theme.of(context).textTheme.displayMedium,
                        textAlign: TextAlign.center,
                      ),
                      SizedBox(height: 32),
                      ..._buildPricingCards(),
                      SizedBox(height: 32),
                      TextButton(
                        onPressed: _restorePurchases,
                        child: Text('Restore Purchases'),
                      ),
                    ],
                  ),
                ),
    );
  }

  List<Widget> _buildPricingCards() {
    if (_packages == null || _packages!.isEmpty) {
      return [Center(child: Text('No packages available'))];
    }

    return _packages!.map((package) {
      return Container(
        margin: EdgeInsets.only(bottom: 16),
        padding: EdgeInsets.all(20),
        decoration: BoxDecoration(
          color: AppColors.mediumBlue,
          border: Border.all(color: AppColors.brightBlue),
          borderRadius: BorderRadius.circular(12),
        ),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              package.storeProduct.title,
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
                color: AppColors.white,
              ),
            ),
            SizedBox(height: 8),
            Text(
              package.storeProduct.description,
              style: TextStyle(
                fontSize: 12,
                color: AppColors.grayLight,
              ),
            ),
            SizedBox(height: 12),
            Text(
              package.storeProduct.priceString,
              style: TextStyle(
                fontSize: 16,
                fontWeight: FontWeight.bold,
                color: AppColors.white,
              ),
            ),
            SizedBox(height: 12),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: () => _purchasePackage(package),
                child: Text('Start Free Trial'),
              ),
            ),
          ],
        ),
      );
    }).toList();
  }

  Future<void> _purchasePackage(Package package) async {
    try {
      final success = await _paymentService.purchasePackage(package);

      if (success) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Subscription activated! Enjoy AyXTool.')),
        );
      } else {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Purchase failed. Please try again.')),
        );
      }
    } catch (e) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Error: $e')),
      );
    }
  }

  Future<void> _restorePurchases() async {
    final success = await _paymentService.restorePurchases();

    if (success) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Purchases restored!')),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('No purchases to restore.')),
      );
    }
  }
}import 'package:flutter/material.dart';
import '../constants/colors.dart';

class AboutScreen extends StatelessWidget {
  const AboutScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('About AyXTool'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'About AyXTool',
              style: Theme.of(context).textTheme.displayMedium,
            ),
            SizedBox(height: 24),
            _SectionTitle('What is AyXTool?'),
            SizedBox(height: 8),
            _SectionContent(
              'AyXTool is an AI-powered home repair estimator built to help homeowners, moms, seniors, handymen, and contractors understand what their home repairs will cost before they call a professional.',
            ),
            SizedBox(height: 32),
            _SectionTitle('The Idea'),
            SizedBox(height: 8),
            _SectionContent(
              'Homeowners get overcharged because they do not know what a job should cost. Contractors estimate blindly. Moms and seniors are scared to ask for help.

AyXTool solves this: Take a photo or see your DIY vs Pro estimate or know your budget before you commit.',
            ),
            SizedBox(height: 32),
            _SectionTitle('Who Built This?'),
            SizedBox(height: 8),
            _SectionContent(
              'Joshua Mares, a mobile app developer based in Sunizona, Arizona.

Product concept: AyX Estimator Stack (original design, 2026)',
            ),
            SizedBox(height: 32),
            _SectionTitle('Copyright & Ownership'),
            SizedBox(height: 8),
            Container(
              padding: EdgeInsets.all(16),
              decoration: BoxDecoration(
                color: AppColors.mediumBlue,
                border: Border.all(color: AppColors.brightBlue),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                '© 2026 AyXTool

All rights reserved. AyXTool and the AyX Estimator Stack are original products designed and built by Joshua Mares. Unauthorized reproduction, distribution, or use without permission is prohibited.',
                style: TextStyle(
                  fontSize: 12,
                  color: AppColors.grayLight,
                  height: 1.6,
                ),
              ),
            ),
            SizedBox(height: 32),
            _SectionTitle('Pricing Plans'),
            SizedBox(height: 8),
            _SectionContent('Three transparent pricing tiers:'),
            SizedBox(height: 12),
            _PricingItem('Mom or Homeowner: $15 per month for individuals and DIYers'),
            _PricingItem('Pro or Handyman: $30 per month for small contractors'),
            _PricingItem('Company or Corporation: $80 per month for crews and businesses'),
          ],
        ),
      ),
    );
  }
}

class _SectionTitle extends StatelessWidget {
  final String title;

  const _SectionTitle(this.title);

  @override
  Widget build(BuildContext context) {
    return Text(
      title,
      style: TextStyle(
        fontSize: 18,
        fontWeight: FontWeight.bold,
        color: AppColors.white,
      ),
    );
  }
}

class _SectionContent extends StatelessWidget {
  final String content;

  const _SectionContent(this.content);

  @override
  Widget build(BuildContext context) {
    return Text(
      content,
      style: TextStyle(
        fontSize: 14,
        color: AppColors.grayLight,
        height: 1.6,
      ),
    );
  }
}

class _PricingItem extends StatelessWidget {
  final String text;

  const _PricingItem(this.text);

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 8),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            '• ',
            style: TextStyle(color: AppColors.brightBlue, fontSize: 16),
          ),
          Expanded(
            child: Text(
              text,
              style: TextStyle(
                fontSize: 12,
                color: AppColors.grayLight,
              ),
            ),
          ),
        ],
      ),
    );
  }
}name: ayxtool
description: AyXTool - AI-Powered Construction Estimator
publish_to: 'none'

version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2
  google_fonts: ^6.0.0
  image_picker: ^1.0.0
  google_generative_ai: ^0.4.0
  http: ^1.1.0
  dio: ^5.3.0
  revenuecat_flutter: ^7.0.0
  path_provider: ^2.1.0
  intl: ^0.19.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_linter: ^2.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/animations/
name: ayxtool
description: AyXTool - Advanced Home Project Estimator & Designer
publish_to: 'none'

version: 2.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  cupertino_icons: ^1.0.2
  google_fonts: ^6.0.0
  image_picker: ^1.0.0
  google_generative_ai: ^0.4.0
  http: ^1.1.0
  dio: ^5.3.0
  revenuecat_flutter: ^7.0.0
  path_provider: ^2.1.0
  intl: ^0.19.0
  
  # NEW DEPENDENCIES
  geolocator: ^9.0.0              # GPS & location services
  google_maps_flutter: ^2.5.0     # Maps for contractor location
  flutter_map: ^4.0.0             # Alternative to Google Maps
  cached_network_image: ^3.3.0    # Cache blueprint/contractor images
  flutter_rating_bar: ^4.0.0      # Contractor ratings
  url_launcher: ^6.1.0            # Open store/contractor websites
  maps_launcher: ^2.1.0           # Open maps to contractor
  permission_handler: ^11.4.0      # Request camera/location permissions
  pdf: ^3.10.0                    # Generate PDF estimates
  printing: ^5.10.0               # Print estimates
  excel: ^2.0.0                   # Export materials to Excel

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_linter: ^2.0.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/
    - assets/animations/
    - assets/native_plants/       # NEW: Plant database
    - assets/contractor_icons/    # NEW: Contractor logosimport 'package:flutter/material.dart';
import 'theme/app_theme.dart';
import 'screens/home_screen.dart';
import 'screens/project_analyzer_screen.dart';
import 'screens/yard_designer_screen.dart';
import 'screens/materials_list_screen.dart';
import 'screens/blueprint_screen.dart';
import 'screens/contractors_screen.dart';
import 'screens/pricing_screen.dart';
import 'screens/about_screen.dart';
import 'services/payment_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  
  final paymentService = PaymentService();
  await paymentService.initialize();

  runApp(const AyXToolApp());
}

class AyXToolApp extends StatelessWidget {
  const AyXToolApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AyXTool 2.0',
      theme: AppTheme.darkTheme(),
      home: const MainNavigation(),
      debugShowCheckedModeBanner: false,
    );
  }
}

class MainNavigation extends StatefulWidget {
  const MainNavigation({Key? key}) : super(key: key);

  @override
  State<MainNavigation> createState() => _MainNavigationState();
}

class _MainNavigationState extends State<MainNavigation> {
  int _currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: [
        HomeScreen(),
        ProjectAnalyzerScreen(),
        YardDesignerScreen(),
        MaterialsListScreen(),
        BlueprintScreen(),
        ContractorsScreen(),
        PricingScreen(),
        AboutScreen(),
      ][_currentIndex],
      bottomNavigationBar: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: BottomNavigationBar(
          currentIndex: _currentIndex,
          type: BottomNavigationBarType.scrollable,
          onTap: (index) => setState(() => _currentIndex = index),
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.analytics),
              label: 'Analyze',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.yard),
              label: 'Yard',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.shopping_cart),
              label: 'Materials',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.architecture),
              label: 'Blueprint',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              label: 'Contractors',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.card_giftcard),
              label: 'Pricing',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.info),
              label: 'About',
            ),
          ],
        ),
      ),
    );
  }
}class MaterialItem {
  final String name;
  final String description;
  final double quantity;
  final String unit; // "piece", "gallon", "sq ft", etc.
  final double unitPrice;
  final String nearestStore; // "Home Depot", "Lowes", etc.
  final double storePrice;
  final String storeAddress;
  final double distanceToStore; // miles or km
  final int inventoryAtStore;
  final String storeUrl;

  MaterialItem({
    required this.name,
    required this.description,
    required this.quantity,
    required this.unit,
    required this.unitPrice,
    required this.nearestStore,
    required this.storePrice,
    required this.storeAddress,
    required this.distanceToStore,
    required this.inventoryAtStore,
    required this.storeUrl,
  });

  double get totalCost => quantity * storePrice;

  factory MaterialItem.fromJson(Map<String, dynamic> json) {
    return MaterialItem(
      name: json['name'] ?? '',
      description: json['description'] ?? '',
      quantity: (json['quantity'] ?? 0).toDouble(),
      unit: json['unit'] ?? 'piece',
      unitPrice: (json['unit_price'] ?? 0).toDouble(),
      nearestStore: json['nearest_store'] ?? 'Home Depot',
      storePrice: (json['store_price'] ?? 0).toDouble(),
      storeAddress: json['store_address'] ?? '',
      distanceToStore: (json['distance_to_store'] ?? 0).toDouble(),
      inventoryAtStore: json['inventory_at_store'] ?? 0,
      storeUrl: json['store_url'] ?? '',
    );
  }
}class Contractor {
  final String id;
  final String name;
  final String company;
  final double rating; // 1-5 stars
  final int reviewCount;
  final String specialization; // "Plumbing", "Drywall", etc.
  final List<String> certifications;
  final String phoneNumber;
  final String email;
  final String website;
  final double distanceAway; // miles
  final double averageProjectCost;
  final String availability;
  final List<String> portfolioImages;
  final bool insured;
  final bool licensed;

  Contractor({
    required this.id,
    required this.name,
    required this.company,
    required this.rating,
    required this.reviewCount,
    required this.specialization,
    required this.certifications,
    required this.phoneNumber,
    required this.email,
    required this.website,
    required this.distanceAway,
    required this.averageProjectCost,
    required this.availability,
    required this.portfolioImages,
    required this.insured,
    required this.licensed,
  });

  factory Contractor.fromJson(Map<String, dynamic> json) {
    return Contractor(
      id: json['id'] ?? '',
      name: json['name'] ?? '',
      company: json['company'] ?? '',
      rating: (json['rating'] ?? 0).toDouble(),
      reviewCount: json['review_count'] ?? 0,
      specialization: json['specialization'] ?? '',
      certifications: List<String>.from(json['certifications'] ?? []),
      phoneNumber: json['phone_number'] ?? '',
      email: json['email'] ?? '',
      website: json['website'] ?? '',
      distanceAway: (json['distance_away'] ?? 0).toDouble(),
      averageProjectCost: (json['average_project_cost'] ?? 0).toDouble(),
      availability: json['availability'] ?? 'Available',
      portfolioImages: List<String>.from(json['portfolio_images'] ?? []),
      insured: json['insured'] ?? false,
      licensed: json['licensed'] ?? false,
    );
  }
}class YardDesign {
  final String plantName;
  final String scientificName;
  final String nativeRegion;
  final List<String> climateZones;
  final String waterNeeds; // "Low", "Medium", "High"
  final String sunExposure; // "Full Sun", "Partial Shade", "Full Shade"
  final double matureHeight;
  final double matureWidth;
  final String bloomSeason;
  final String color;
  final double estimatedCost;
  final String sourceLocation; // "Local nursery", "Online", etc.
  final String imageUrl;

  YardDesign({
    required this.plantName,
    required this.scientificName,
    required this.nativeRegion,
    required this.climateZones,
    required this.waterNeeds,
    required this.sunExposure,
    required this.matureHeight,
    required this.matureWidth,
    required this.bloomSeason,
    required this.color,
    required this.estimatedCost,
    required this.sourceLocation,
    required this.imageUrl,
  });

  factory YardDesign.fromJson(Map<String, dynamic> json) {
    return YardDesign(
      plantName: json['plant_name'] ?? '',
      scientificName: json['scientific_name'] ?? '',
      nativeRegion: json['native_region'] ?? '',
      climateZones: List<String>.from(json['climate_zones'] ?? []),
      waterNeeds: json['water_needs'] ?? 'Medium',
      sunExposure: json['sun_exposure'] ?? 'Full Sun',
      matureHeight: (json['mature_height'] ?? 0).toDouble(),
      matureWidth: (json['mature_width'] ?? 0).toDouble(),
      bloomSeason: json['bloom_season'] ?? 'Summer',
      color: json['color'] ?? 'Green',
      estimatedCost: (json['estimated_cost'] ?? 0).toDouble(),
      sourceLocation: json['source_location'] ?? 'Local nursery',
      imageUrl: json['image_url'] ?? '',
    );
  }
}import 'package:google_generative_ai/google_generative_ai.dart';
import 'dart:io';
import 'dart:convert';
import '../secrets/secrets_config.dart';
import '../models/project.dart';
import '../models/material_item.dart';

class AIEstimatorService {
  late GenerativeModel model;
  
  AIEstimatorService() {
    model = GenerativeModel(
      model: 'gemini-1.5-flash',
      apiKey: SecretsConfig.geminiApiKey,
    );
  }

  // FEATURE 1: Detailed Project Analysis
  Future<ProjectAnalysis> analyzeProjectFromPhoto(File photoFile) async {
    try {
      final imageBytes = await photoFile.readAsBytes();

      final prompt = '''
You are an expert home contractor with 20+ years experience. Analyze this photo and provide a DETAILED project analysis in JSON format:

{
  "project_name": "Name of project",
  "description": "Detailed description of what needs to be done",
  "difficulty": "Easy/Medium/Hard",
  "estimated_hours": 0,
  "estimated_diy_cost": 0,
  "estimated_pro_cost": 0,
  "skills_required": ["skill1", "skill2"],
  "tools_needed": ["tool1", "tool2"],
  "materials": [
    {
      "name": "Material Name",
      "description": "Brief description",
      "quantity": 10,
      "unit": "piece/gallon/sq ft",
      "unit_price": 10.00,
      "nearest_store": "Home Depot",
      "store_price": 10.50,
      "store_address": "123 Main St",
      "distance_to_store": 2.5,
      "inventory_at_store": 50,
      "store_url": "https://..."
    }
  ],
  "step_by_step": [
    "Step 1: Prepare the surface",
    "Step 2: Apply first coat",
    "Step 3: Apply second coat"
  ],
  "instruction_images": [
    "URL to step 1 image",
    "URL to step 2 image"
  ],
  "before_after_visualization": "URL to before/after image",
  "recommend_professional": false,
  "reason_for_professional": "Only if recommend_professional is true"
}

Be realistic with costs based on current 2026 prices. Include local store information.
''';

      final response = await model.generateContent([
        Content.multi([
          TextPart(prompt),
          DataPart('image/jpeg', imageBytes),
        ])
      ]);

      final responseText = response.text;
      if (responseText == null) {
        throw Exception('No response from AI model');
      }

      final jsonString = _extractJson(responseText);
      final analysis = ProjectAnalysis.fromJson(jsonDecode(jsonString));

      return analysis;
    } catch (e) {
      throw Exception('Failed to analyze project: $e');
    }
  }

  // FEATURE 2: Analyze Project from Text Description
  Future<ProjectAnalysis> analyzeProjectFromText(String description) async {
    try {
      final prompt = '''
You are an expert home contractor. The user describes a home project:
"$description"

Provide a detailed project analysis in JSON format (same structure as photo analysis):
{
  "project_name": "...",
  "description": "...",
  "difficulty": "...",
  "estimated_hours": 0,
  "estimated_diy_cost": 0,
  "estimated_pro_cost": 0,
  "skills_required": [...],
  "tools_needed": [...],
  "materials": [...],
  "step_by_step": [...],
  "instruction_images": [],
  "before_after_visualization": "",
  "recommend_professional": false,
  "reason_for_professional": ""
}

For instruction images, suggest what type of images would be helpful.
''';

      final response = await model.generateContent([
        Content.multi([
          TextPart(prompt),
        ])
      ]);

      final responseText = response.text;
      if (responseText == null) {
        throw Exception('No response from AI');
      }

      final jsonString = _extractJson(responseText);
      final analysis = ProjectAnalysis.fromJson(jsonDecode(jsonString));

      return analysis;
    } catch (e) {
      throw Exception('Failed to analyze project: $e');
    }
  }

  String _extractJson(String response) {
    final startIndex = response.indexOf('{');
    final endIndex = response.lastIndexOf('}') + 1;
    
    if (startIndex == -1 || endIndex == 0) {
      throw Exception('No JSON found in response');
    }
    
    return response.substring(startIndex, endIndex);
  }
}import 'package:geolocator/geolocator.dart';

class LocationService {
  static final LocationService _instance = LocationService._internal();

  factory LocationService() {
    return _instance;
  }

  LocationService._internal();

  Future<Position?> getCurrentLocation() async {
    try {
      // Request permission
      final permission = await Geolocator.requestPermission();
      
      if (permission == LocationPermission.denied) {
        throw Exception('Location permission denied');
      }

      // Get current position
      final position = await Geolocator.getCurrentPosition(
        desiredAccuracy: LocationAccuracy.high,
      );

      return position;
    } catch (e) {
      print('Location error: $e');
      return null;
    }
  }

  Future<double> calculateDistance(
    double lat1,
    double lon1,
    double lat2,
    double lon2,
  ) async {
    return await Geolocator.distanceBetween(lat1, lon1, lat2, lon2) / 1000; // Convert to km
  }
}import 'package:http/http.dart' as http;
import 'dart:convert';
import '../models/material_item.dart';

class MaterialsService {
  static final MaterialsService _instance = MaterialsService._internal();

  factory MaterialsService() {
    return _instance;
  }

  MaterialsService._internal();

  // Integration with Home Depot / Lowes API
  // (You would need to set up actual API credentials)
  
  Future<List<MaterialItem>> findMaterialsNearby(
    String materialName,
    double latitude,
    double longitude,
  ) async {
    try {
      // Mock implementation - replace with real API calls
      // This would call Home Depot API, Lowes API, or local store APIs
      
      final mockMaterials = [
        MaterialItem(
          name: materialName,
          description: 'High quality $materialName',
          quantity: 1,
          unit: 'piece',
          unitPrice: 29.99,
          nearestStore: 'Home Depot',
          storePrice: 29.99,
          storeAddress: '123 Main St, Your City',
          distanceToStore: 2.5,
          inventoryAtStore: 45,
          storeUrl: 'https://homedepot.com',
        ),
      ];

      return mockMaterials;
    } catch (e) {
      print('Materials error: $e');
      return [];
    }
  }

  Future<double> getTotalMaterialsCost(List<MaterialItem> materials) async {
    double total = 0;
    for (var material in materials) {
      total += material.totalCost;
    }
    return total;
  }
}import 'package:geolocator/geolocator.dart';
import '../models/contractor.dart';

class ContractorService {
  static final ContractorService _instance = ContractorService._internal();

  factory ContractorService() {
    return _instance;
  }

  ContractorService._internal();

  // Integration with contractor databases
  // (Google Maps API, Yelp API, HomeAdvisor, etc.)
  
  Future<List<Contractor>> findContractorsNearby(
    String specialization,
    double latitude,
    double longitude,
    double radiusMiles,
  ) async {
    try {
      // Mock implementation - replace with real API calls
      
      final mockContractors = [
        Contractor(
          id: '1',
          name: 'John Smith',
          company: 'Smith Construction',
          rating: 4.8,
          reviewCount: 127,
          specialization: specialization,
          certifications: ['Licensed Contractor', 'Insured'],
          phoneNumber: '555-1234',
          email: 'john@smithconstruction.com',
          website: 'https://smithconstruction.com',
          distanceAway: 2.3,
          averageProjectCost: 3500,
          availability: 'Available next week',
          portfolioImages: [
            'https://example.com/portfolio1.jpg',
            'https://example.com/portfolio2.jpg',
          ],
          insured: true,
          licensed: true,
        ),
      ];

      return mockContractors;
    } catch (e) {
      print('Contractor error: $e');
      return [];
    }
  }

  Future<void> contactContractor(Contractor contractor, String message) async {
    // Implementation for contacting contractor
    // Could send email, SMS, or open contact form
  }
}import '../models/yard_design.dart';

class LandscapeService {
  static final LandscapeService _instance = LandscapeService._internal();

  factory LandscapeService() {
    return _instance;
  }

  LandscapeService._internal();

  // Native plants database by climate zone
  // USDA Hardiness Zones: 1-13
  
  Future<List<YardDesign>> getNativePlantsForClimate(String climateZone) async {
    try {
      // Mock implementation - replace with real database
      
      final nativePlants = [
        YardDesign(
          plantName: 'Desert Marigold',
          scientificName: 'Baileya multiradiata',
          nativeRegion: 'Southwest USA',
          climateZones: ['USDA 6-11'],
          waterNeeds: 'Low',
          sunExposure: 'Full Sun',
          matureHeight: 1.5,
          matureWidth: 1.0,
          bloomSeason: 'March-October',
          color: 'Golden Yellow',
          estimatedCost: 25.00,
          sourceLocation: 'Local native plant nursery',
          imageUrl: 'https://example.com/desert-marigold.jpg',
        ),
        YardDesign(
          plantName: 'Prickly Pear Cactus',
          scientificName: 'Opuntia ficus-indica',
          nativeRegion: 'Southwest USA',
          climateZones: ['USDA 5-11'],
          waterNeeds: 'Low',
          sunExposure: 'Full Sun',
          matureHeight: 1.8,
          matureWidth: 1.5,
          bloomSeason: 'May-June',
          color: 'Yellow Flowers',
          estimatedCost: 15.00,
          sourceLocation: 'Local nursery',
          imageUrl: 'https://example.com/prickly-pear.jpg',
        ),
      ];

      return nativePlants;
    } catch (e) {
      print('Landscape error: $e');
      return [];
    }
  }

  Future<double> calculateLandscapeProjectCost(List<YardDesign> plants) async {
    double total = 0;
    for (var plant in plants) {
      total += plant.estimatedCost;
    }
    return total;
  }
}import 'package:flutter/material.dart';
import 'dart:io';
import '../services/ai_estimator_service.dart';
import '../services/image_service.dart';
import '../models/project.dart';
import '../constants/colors.dart';

class ProjectAnalyzerScreen extends StatefulWidget {
  const ProjectAnalyzerScreen({Key? key}) : super(key: key);

  @override
  State<ProjectAnalyzerScreen> createState() => _ProjectAnalyzerScreenState();
}

class _ProjectAnalyzerScreenState extends State<ProjectAnalyzerScreen> {
  File? _selectedImage;
  TextEditingController _descriptionController = TextEditingController();
  bool _isAnalyzing = false;
  ProjectAnalysis? _projectAnalysis;
  String? _errorMessage;
  int _analysisMethod = 0; // 0 = photo, 1 = text

  final ImageService _imageService = ImageService();
  final AIEstimatorService _aiService = AIEstimatorService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Project Analyzer'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'How would you like to analyze your project?',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            SizedBox(height: 24),

            // Tab selection
            Row(
              children: [
                Expanded(
                  child: ElevatedButton(
                    onPressed: () => setState(() => _analysisMethod = 0),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _analysisMethod == 0
                          ? AppColors.brightBlue
                          : AppColors.mediumBlue,
                    ),
                    child: Text('📸 Photo'),
                  ),
                ),
                SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton(
                    onPressed: () => setState(() => _analysisMethod = 1),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: _analysisMethod == 1
                          ? AppColors.brightBlue
                          : AppColors.mediumBlue,
                    ),
                    child: Text('📝 Description'),
                  ),
                ),
              ],
            ),

            SizedBox(height: 32),

            // Photo method
            if (_analysisMethod == 0) ...[
              if (_selectedImage != null)
                ClipRRect(
                  borderRadius: BorderRadius.circular(12),
                  child: Image.file(
                    _selectedImage!,
                    width: double.infinity,
                    height: 300,
                    fit: BoxFit.cover,
                  ),
                )
              else
                Container(
                  width: double.infinity,
                  height: 300,
                  decoration: BoxDecoration(
                    border: Border.all(color: AppColors.brightBlue, width: 2),
                    borderRadius: BorderRadius.circular(12),
                    color: AppColors.mediumBlue,
                  ),
                  child: Center(
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Icon(Icons.image_outlined,
                            size: 64, color: AppColors.brightBlue),
                        SizedBox(height: 12),
                        Text(
                          'No photo selected',
                          style: TextStyle(color: AppColors.grayLight),
                        ),
                      ],
                    ),
                  ),
                ),
              SizedBox(height: 24),
              Row(
                children: [
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: _isAnalyzing ? null : _takePhoto,
                      icon: Icon(Icons.camera_alt),
                      label: Text('Take Photo'),
                    ),
                  ),
                  SizedBox(width: 12),
                  Expanded(
                    child: ElevatedButton.icon(
                      onPressed: _isAnalyzing ? null : _pickFromGallery,
                      icon: Icon(Icons.image),
                      label: Text('From Gallery'),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 24),
              if (_selectedImage != null)
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: _isAnalyzing ? null : _analyzePhoto,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: AppColors.brightBlue,
                      padding: EdgeInsets.symmetric(vertical: 16),
                    ),
                    child: _isAnalyzing
                        ? SizedBox(
                            height: 20,
                            width: 20,
                            child: CircularProgressIndicator(
                              strokeWidth: 2,
                              valueColor:
                                  AlwaysStoppedAnimation(Colors.white),
                            ),
                          )
                        : Text(
                            'Analyze Project from Photo',
                            style: TextStyle(
                                fontSize: 16, fontWeight: FontWeight.bold),
                          ),
                  ),
                ),
            ],

            // Text method
            if (_analysisMethod == 1) ...[
              TextField(
                controller: _descriptionController,
                maxLines: 8,
                decoration: InputDecoration(
                  hintText:
                      'Describe your home project in detail...

Example: I want to repair a leaking faucet in my kitchen sink...',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(12),
                  ),
                  filled: true,
                  fillColor: AppColors.mediumBlue,
                ),
              ),
              SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: ElevatedButton(
                  onPressed: _isAnalyzing ? null : _analyzeText,
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.brightBlue,
                    padding: EdgeInsets.symmetric(vertical: 16),
                  ),
                  child: _isAnalyzing
                      ? SizedBox(
                          height: 20,
                          width: 20,
                          child: CircularProgressIndicator(
                            strokeWidth: 2,
                            valueColor:
                                AlwaysStoppedAnimation(Colors.white),
                          ),
                        )
                      : Text(
                          'Analyze Project',
                          style: TextStyle(
                              fontSize: 16, fontWeight: FontWeight.bold),
                        ),
                ),
              ),
            ],

            SizedBox(height: 24),

            // Error message
            if (_errorMessage != null)
              Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  color: Colors.red.withOpacity(0.2),
                  border: Border.all(color: Colors.red),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Text(
                  _errorMessage!,
                  style: TextStyle(color: Colors.red),
                ),
              ),

            // Results
            if (_projectAnalysis != null)
              _buildProjectAnalysisResults(_projectAnalysis!),
          ],
        ),
      ),
    );
  }

  Future<void> _takePhoto() async {
    try {
      final image = await _imageService.takePhotoWithCamera();
      if (image != null) {
        setState(() {
          _selectedImage = image;
          _errorMessage = null;
        });
      }
    } catch (e) {
      setState(() {
        _errorMessage = 'Failed to take photo: $e';
      });
    }
  }

  Future<void> _pickFromGallery() async {
    try {
      final image = await _imageService.pickImageFromGallery();
      if (image != null) {
        setState(() {
          _selectedImage = image;
          _errorMessage = null;
        });
      }
    } catch (e) {
      setState(() {
        _errorMessage = 'Failed to pick image: $e';
      });
    }
  }

  Future<void> _analyzePhoto() async {
    if (_selectedImage == null) return;

    setState(() {
      _isAnalyzing = true;
      _errorMessage = null;
    });

    try {
      final result = await _aiService.analyzeProjectFromPhoto(_selectedImage!);
      setState(() {
        _projectAnalysis = result;
        _isAnalyzing = false;
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'Analysis failed: $e';
        _isAnalyzing = false;
      });
    }
  }

  Future<void> _analyzeText() async {
    if (_descriptionController.text.isEmpty) {
      setState(() {
        _errorMessage = 'Please describe your project';
      });
      return;
    }

    setState(() {
      _isAnalyzing = true;
      _errorMessage = null;
    });

    try {
      final result =
          await _aiService.analyzeProjectFromText(_descriptionController.text);
      setState(() {
        _projectAnalysis = result;
        _isAnalyzing = false;
      });
    } catch (e) {
      setState(() {
        _errorMessage = 'Analysis failed: $e';
        _isAnalyzing = false;
      });
    }
  }

  Widget _buildProjectAnalysisResults(ProjectAnalysis project) {
    return Container(
      margin: EdgeInsets.only(top: 24),
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.mediumBlue,
        border: Border.all(color: AppColors.brightBlue, width: 2),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            project.projectName,
            style: Theme.of(context).textTheme.titleLarge,
          ),
          SizedBox(height: 16),
          _buildResultRow('Difficulty', project.difficulty),
          _buildResultRow('Estimated Hours', '${project.estimatedHours} hrs'),
          _buildResultRow('DIY Cost', '$${project.estimatedDIYCost.toStringAsFixed(2)}'),
          _buildResultRow('Professional Cost', '$${project.estimatedProCost.toStringAsFixed(2)}'),
          SizedBox(height: 16),
          Text(
            'Skills Required:',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          ...project.skillsRequired.map((skill) => Text('• $skill')),
          SizedBox(height: 16),
          Text(
            'Tools Needed:',
            style: TextStyle(fontWeight: FontWeight.bold),
          ),
          ...project.toolsNeeded.map((tool) => Text('• $tool')),
          SizedBox(height: 16),
          if (project.recommendProfessional)
            Container(
              padding: EdgeInsets.all(12),
              decoration: BoxDecoration(
                color: Colors.orange.withOpacity(0.2),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                '⚠️ ${project.reasonForProfessional}',
                style: TextStyle(color: Colors.orange),
              ),
            ),
        ],
      ),
    );
  }

  Widget _buildResultRow(String label, String value) {
    return Padding(
      padding: EdgeInsets.symmetric(vertical: 8),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(
            label,
            style: TextStyle(color: AppColors.grayLight),
          ),
          Text(
            value,
            style: TextStyle(
              color: AppColors.white,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _descriptionController.dispose();
    super.dispose();
  }
}import 'package:flutter/material.dart';
import 'dart:io';
import 'dart:ui' as ui;
import '../services/image_service.dart';
import '../services/landscape_service.dart';
import '../models/yard_design.dart';
import '../constants/colors.dart';
import '../widgets/paint_canvas_widget.dart';

class YardDesignerScreen extends StatefulWidget {
  const YardDesignerScreen({Key? key}) : super(key: key);

  @override
  State<YardDesignerScreen> createState() => _YardDesignerScreenState();
}

class _YardDesignerScreenState extends State<YardDesignerScreen> {
  File? _yardPhoto;
  List<YardDesign> _selectedPlants = [];
  List<YardDesign> _availablePlants = [];
  bool _isLoading = false;
  String _climateZone = 'USDA 6-11'; // Default Arizona

  final ImageService _imageService = ImageService();
  final LandscapeService _landscapeService = LandscapeService();

  @override
  void initState() {
    super.initState();
    _loadNativePlants();
  }

  Future<void> _loadNativePlants() async {
    setState(() => _isLoading = true);
    try {
      final plants = await _landscapeService.getNativePlantsForClimate(_climateZone);
      setState(() {
        _availablePlants = plants;
        _isLoading = false;
      });
    } catch (e) {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Yard Designer'),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              'Redesign Your Yard with Native Plants',
              style: Theme.of(context).textTheme.titleLarge,
            ),
            SizedBox(height: 24),

            // Take yard photo
            if (_yardPhoto == null)
              Container(
                width: double.infinity,
                height: 300,
                decoration: BoxDecoration(
                  border: Border.all(color: AppColors.brightBlue, width: 2),
                  borderRadius: BorderRadius.circular(12),
                  color: AppColors.mediumBlue,
                ),
                child: Center(
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(Icons.image_outlined,
                          size: 64, color: AppColors.brightBlue),
                      SizedBox(height: 12),
                      Text('No yard photo'),
                    ],
                  ),
                ),
              )
            else
              Stack(
                children: [
                  ClipRRect(
                    borderRadius: BorderRadius.circular(12),
                    child: Image.file(
                      _yardPhoto!,
                      width: double.infinity,
                      height: 300,
                      fit: BoxFit.cover,
                    ),
                  ),
                  // Paint canvas overlay (see next section)
                  // This is where user would paint colors
                ],
              ),
            SizedBox(height: 24),

            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _takeYardPhoto,
                    icon: Icon(Icons.camera_alt),
                    label: Text('Take Yard Photo'),
                  ),
                ),
                SizedBox(width: 12),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: _pickYardPhoto,
                    icon: Icon(Icons.image),
                    label: Text('From Gallery'),
                  ),
                ),
              ],
            ),

            SizedBox(height: 32),

            // Climate zone selector
            Text('Your Climate Zone:', style: TextStyle(fontWeight: FontWeight.bold)),
            SizedBox(height: 12),
            DropdownButton<String>(
              value: _climateZone,
              isExpanded: true,
              dropdownColor: AppColors.mediumBlue,
              items: [
                'USDA 1-3 (Very Cold)',
                'USDA 4-5 (Cold)',
                'USDA 6-7 (Cool)',
                'USDA 8-9 (Warm)',
                'USDA 10-11 (Hot/Tropical)',
              ].map((zone) {
                return DropdownMenuItem(
                  value: zone,
                  child: Text(zone),
                );
              }).toList(),
              onChanged: (value) {
                if (value != null) {
                  setState(() => _climateZone = value);
                  _loadNativePlants();
                }
              },
            ),

            SizedBox(height: 32),

            // Available native plants
            Text('Native Plants for Your Climate:',
                style: TextStyle(fontWeight: FontWeight.bold)),
            SizedBox(height: 16),
            if (_isLoading)
              Center(child: CircularProgressIndicator())
            else
              Column(
                children: _availablePlants.map((plant) {
                  final isSelected = _selectedPlants.contains(plant);
                  return Container(
                    margin: EdgeInsets.only(bottom: 12),
                    padding: EdgeInsets.all(16),
                    decoration: BoxDecoration(
                      color: isSelected
                          ? AppColors.brightBlue.withOpacity(0.2)
                          : AppColors.mediumBlue,
                      border: Border.all(
                        color: isSelected
                            ? AppColors.brightBlue
                            : AppColors.grayMedium,
                      ),
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    plant.plantName,
                                    style:
                                        TextStyle(fontWeight: FontWeight.bold),
                                  ),
                                  Text(
                                    plant.scientificName,
                                    style: TextStyle(
                                        fontSize: 12,
                                        color: AppColors.grayMedium),
                                  ),
                                ],
                              ),
                            ),
                            ElevatedButton(
                              onPressed: () {
                                setState(() {
                                  if (isSelected) {
                                    _selectedPlants.remove(plant);
                                  } else {
                                    _selectedPlants.add(plant);
                                  }
                                });
                              },
                              child: Text(isSelected ? '✓ Selected' : 'Add'),
                            ),
                          ],
                        ),
                        SizedBox(height: 12),
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Text('💧 ${plant.waterNeeds}'),
                            Text('☀️ ${plant.sunExposure}'),
                            Text('$${plant.estimatedCost}'),
                          ],
                        ),
                      ],
                    ),
                  );
                }).toList(),
              ),

            SizedBox(height: 32),

            // Selected plants summary
            if (_selectedPlants.isNotEmpty)
              _buildSelectedPlantsSummary(),
          ],
        ),
      ),
    );
  }

  Future<void> _takeYardPhoto() async {
    try {
      final image = await _imageService.takePhotoWithCamera();
      if (image != null) {
        setState(() => _yardPhoto = image);
      }
    } catch (e) {
      print('Error: $e');
    }
  }

  Future<void> _pickYardPhoto() async {
    try {
      final image = await _imageService.pickImageFromGallery();
      if (image != null) {
        setState(() => _yardPhoto = image);
      }
    } catch (e) {
      print('Error: $e');
    }
  }

  Widget _buildSelectedPlantsSummary() {
    double totalCost = _selectedPlants.fold(
        0, (sum, plant) => sum + plant.estimatedCost);

    return Container(
      padding: EdgeInsets.all(20),
      decoration: BoxDecoration(
        color: AppColors.brightBlue.withOpacity(0.1),
        border: Border.all(color: AppColors.brightBlue),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Your Yard Design',
            style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
          ),
          SizedBox(height: 16),
          ..._selectedPlants.map((plant) => Padding(
                padding: EdgeInsets.symmetric(vertical: 8),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Text(plant.plantName),
                    Text('$${plant.estimatedCost}',
                        style: TextStyle(fontWeight: FontWeight.bold)),
                  ],
                ),
              )),
          Divider(height: 24),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text('Total Cost:', style: TextStyle(fontWeight: FontWeight.bold)),
              Text('$${totalCost.toStringAsFixed(2)}',
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
            ],
          ),
          SizedBox(height: 16),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton(
              onPressed: () {
                // Generate quote / save design
              },
              child: Text('Generate Design Proposal'),
            ),
          ),
        ],
      ),
    );
  }
}import 'package:flutter/material.dart';
import 'dart:ui' as ui;

class PaintCanvasWidget extends StatefulWidget {
  final String imagePath;

  const PaintCanvasWidget({Key? key, required this.imagePath})
      : super(key: key);

  @override
  State<PaintCanvasWidget> createState() => _PaintCanvasWidgetState();
}

class _PaintCanvasWidgetState extends State<PaintCanvasWidget> {
  late ui.Image _image;
  List<PaintStroke> _strokes = [];
  Color _selectedColor = Colors.green;
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadImage();
  }

  Future<void> _loadImage() async {
    final imageBytes = await Future.delayed(Duration.zero);
    // Load image implementation
    setState(() => _isLoading = false);
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return Center(child: CircularProgressIndicator());
    }

    return Column(
      children: [
        // Color palette
        Wrap(
          spacing: 12,
          children: [
            Colors.green,
            Colors.blue,
            Colors.orange,
            Colors.purple,
            Colors.red,
            Colors.yellow,
          ]
              .map((color) {
                return GestureDetector(
                  onTap: () => setState(() => _selectedColor = color),
                  child: Container(
                    width: 50,
                    height: 50,
                    decoration: BoxDecoration(
                      color: color,
                      shape: BoxShape.circle,
                      border: Border.all(
                        color: _selectedColor == color
                            ? Colors.white
                            : Colors.transparent,
                        width: 3,
                      ),
                    ),
                  ),
                );
              })
              .toList(),
        ),
        SizedBox(height: 24),
        // Canvas
        GestureDetector(
          onPanUpdate: (details) {
            setState(() {
              _strokes.add(PaintStroke(
                offset: details.localPosition,
                color: _selectedColor,
              ));
            });
          },
          child: Container(
            width: double.infinity,
            height: 300,
            decoration: BoxDecoration(
              border: Border.all(color: Colors.grey),
              borderRadius: BorderRadius.circular(12),
            ),
            child: CustomPaint(
              painter: PaintCanvasPainter(_strokes),
            ),
          ),
        ),
      ],
    );
  }
}

class PaintStroke {
  final Offset offset;
  final Color color;

  PaintStroke({required this.offset, required this.color});
}

class PaintCanvasPainter extends CustomPainter {
  final List<PaintStroke> strokes;

  PaintCanvasPainter(this.strokes);

  @override
  void paint(Canvas canvas, Size size) {
    for (var stroke in strokes) {
      final paint = Paint()
        ..color = stroke.color.withOpacity(0.6)
        ..strokeWidth = 20
        ..strokeCap = StrokeCap.round;

      canvas.drawCircle(stroke.offset, 20, paint);
    }
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => true;
}import 'package:flutter/material.dart';
import '../models/material_item.dart';
import '../constants/colors.dart';

class MaterialsListScreen extends StatefulWidget {
  const MaterialsListScreen({Key? key}) : super(key: key);

  @override
  State<MaterialsListScreen> createState() => _MaterialsListScreenState();
}

class _MaterialsListScreenState extends State<MaterialsListScreen> {
  List<MaterialItem> _materials = [];
  double _totalCost = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Materials List'),
        actions: [
          Padding(
            padding: EdgeInsets.all(16),
            child: Center(
              child: Text(
                'Total: $${_totalCost.toStringAsFixed(2)}',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
      body: _materials.isEmpty
          ? Center(
              child: Text('Run a project analysis to see materials needed'),
            )
          : ListView.builder(
              padding: EdgeInsets.all(16),
              itemCount: _materials.length,
              itemBuilder: (context, index) {
                final material = _materials[index];
                return _buildMaterialCard(material);
              },
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: _generatePDF,
        child: Icon(Icons.file_download),
        tooltip: 'Export as PDF',
      ),
    );
  }

  Widget _buildMaterialCard(MaterialItem material) {
    return Card(
      margin: EdgeInsets.only(bottom: 16),
      color: AppColors.mediumBlue,
      child: ExpansionTile(
        title: Text(material.name),
        subtitle: Text('${material.quantity} ${material.unit}'),
        children: [
          Padding(
            padding: EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text('Description: ${material.description}'),
                SizedBox(height: 12),
                Text('Store: ${material.nearestStore}'),
                Text('Distance: ${material.distanceToStore.toStringAsFixed(1)} miles'),
                SizedBox(height: 12),
                Text('Unit Price: $${material.unitPrice.toStringAsFixed(2)}'),
                Text('Store Price: $${material.storePrice.toStringAsFixed(2)}'),
                Text('Total: $${material.totalCost.toStringAsFixed(2)}'),
                SizedBox(height: 12),
                Text('In Stock: ${material.inventoryAtStore} units'),
                SizedBox(height: 16),
                SizedBox(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      // Open store link
                      print('Opening: ${material.storeUrl}');
                    },
                    child: Text('View at ${material.nearestStore}'),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  void _generatePDF() {
    // Implementation for PDF export
    print('Generating PDF...');
  }
}import 'package:flutter/material.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import '../models/contractor.dart';
import '../constants/colors.dart';

class ContractorsScreen extends StatefulWidget {
  const ContractorsScreen({Key? key}) : super(key: key);

  @override
  State<ContractorsScreen> createState() => _ContractorsScreenState();
}

class _ContractorsScreenState extends State<ContractorsScreen> {
  List<Contractor> _contractors = [];
  bool _isLoading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Local Contractors'),
      ),
      body: _contractors.isEmpty
          ? Center(
              child: Text('Run a project analysis to see nearby contractors'),
            )
          : ListView.builder(
              padding: EdgeInsets.all(16),
              itemCount: _contractors.length,
              itemBuilder: (context, index) {
                final contractor = _contractors[index];
                return _buildContractorCard(contractor);
              },
            ),
    );
  }

  Widget _buildContractorCard(Contractor contractor) {
    return Card(
      margin: EdgeInsets.only(bottom: 16),
      color: AppColors.mediumBlue,
      child: Padding(
        padding: EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        contractor.name,
                        style: TextStyle(
                            fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      Text(contractor.company,
                          style: TextStyle(color: AppColors.grayLight)),
                    ],
                  ),
                ),
                Container(
                  padding: EdgeInsets.all(8),
                  decoration: BoxDecoration(
                    color: AppColors.brightBlue,
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    '${contractor.rating}⭐',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
            SizedBox(height: 12),
            Row(
              children: [
                if (contractor.licensed)
                  Chip(label: Text('Licensed'),
                      backgroundColor: Colors.green.withOpacity(0.2)),
                SizedBox(width: 8),
                if (contractor.insured)
                  Chip(label: Text('Insured'),
                      backgroundColor: Colors.blue.withOpacity(0.2)),
              ],
            ),
            SizedBox(height: 12),
            Text('${contractor.specialization} Specialist'),
            Text('${contractor.reviewCount} reviews',
                style: TextStyle(fontSize: 12, color: AppColors.grayMedium)),
            SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text('${contractor.distanceAway.toStringAsFixed(1)} miles away'),
                Text('$${contractor.averageProjectCost.toStringAsFixed(0)} avg'),
              ],
            ),
            SizedBox(height: 12),
            Text('Availability: ${contractor.availability}'),
            SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () {
                      // Call contractor
                      print('Calling ${contractor.phoneNumber}');
                    },
                    icon: Icon(Icons.call),
                    label: Text('Call'),
                  ),
                ),
                SizedBox(width: 8),
                Expanded(
                  child: ElevatedButton.icon(
                    onPressed: () {
                      // Email contractor
                      print('Emailing ${contractor.email}');
                    },
                    icon: Icon(Icons.email),
                    label: Text('Email'),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}import 'package:flutter/material.dart';
import '../constants/colors.dart';

class BlueprintScreen extends StatelessWidget {
  const BlueprintScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Project Blueprint'),
      ),
      body: Center(
        child: Padding(
          padding: EdgeInsets.all(24),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(Icons.architecture, size: 64, color: AppColors.brightBlue),
              SizedBox(height: 24),
              Text(
                'Blueprint & Instructions',
                style: Theme.of(context).textTheme.titleLarge,
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 12),
              Text(
                'Run a project analysis to generate detailed blueprints and step-by-step instructions with images',
                textAlign: TextAlign.center,
                style: TextStyle(color: AppColors.grayLight),
              ),
            ],
          ),
        ),
      ),
    );
  }
}1. User opens app → Home screen

2. User selects "Analyze" tab
   ↓
3. User chooses: Photo OR Description
   ↓
4. AI analyzes project
   ↓
5. Results show:
   - Project name & description
   - Difficulty level
   - DIY vs Pro cost
   - Skills needed
   - Tools required
   - Step-by-step instructions
   - Before/after visualization
   - Nearby contractors (if recommended)
   ↓
6. User can view:
   - Materials List (with nearest store locations)
   - Blueprint & Instructions
   - Local Contractors
   - Yard Designer (for landscape projects)
   ↓
7. User can:
   - Download PDF estimate
   - Contact contractors
   - Go to store to buy materials
   - Subscribe for premium features
