import { useState } from "react";
import { Shield, Zap, Users, Search, Brain, Target, CheckCircle, AlertTriangle, Loader2, Sparkles, Globe, BarChart3, Eye, BookOpen, Share2 } from "lucide-react";
import { detectHeadline } from "../../backend/fakeNewsDetector";

const Index = () => {
  const [headline, setHeadline] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<{
    label: "fake" | "trustworthy" | null;
    confidence: number;
    explanation: string;
  } | null>(null);

  const exampleHeadline = "Scientists confirm drinking coffee makes you immortal, study claims";

  const handleAnalyze = () => {
  if (!headline.trim()) return;

  setIsLoading(true);
  setResult(null);

  setTimeout(() => {
    const analysis = detectHeadline(headline);
    setResult(analysis);
    setIsLoading(false);
  }, 800); // small delay for nicer UX
};

  const handleExample = () => {
    setHeadline(exampleHeadline);
    setResult(null);
  };

  const stats = [
    { value: "10K+", label: "Headlines Analyzed", icon: BarChart3 },
    { value: "92%", label: "Model Accuracy", icon: Target },
    { value: "3+", label: "Languages Supported", icon: Globe },
  ];

  const steps = [
    { icon: Search, title: "Paste Headline", description: "Enter any news headline or article URL you want to verify" },
    { icon: Brain, title: "AI Analysis", description: "TruthSense AI analyzes patterns, language, and sources" },
    { icon: CheckCircle, title: "Get Results", description: "Receive an instant fake vs trustworthy assessment" },
  ];

  const objectives = [
    { icon: Zap, title: "AI-Powered Detection", description: "Develop cutting-edge machine learning models for accurate headline analysis" },
    { icon: Eye, title: "Intuitive Interface", description: "Design a user-friendly experience accessible to everyone" },
    { icon: BookOpen, title: "Media Awareness", description: "Promote critical thinking and reliable information consumption" },
  ];

  const users = [
    { icon: BookOpen, label: "Students verifying sources" },
    { icon: Share2, label: "Journalists checking headlines" },
    { icon: Users, label: "Everyday users fact-checking" },
  ];


  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Gradient Blobs */}
      <div className="blob w-[600px] h-[600px] bg-gradient-to-br from-gradient-purple/30 to-gradient-blue/20 -top-40 -left-40 animate-blob" />
      <div className="blob w-[500px] h-[500px] bg-gradient-to-br from-gradient-pink/25 to-gradient-violet/15 top-1/4 -right-32 animate-blob-delay-2" />
      <div className="blob w-[400px] h-[400px] bg-gradient-to-br from-gradient-blue/20 to-gradient-pink/15 bottom-20 -left-20 animate-blob-delay-4" />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">TruthSense AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#stats" className="nav-link">Stats</a>
            <a href="#about" className="nav-link">About</a>
          </div>
          <div className="pill-badge bg-gradient-to-r from-gradient-purple/10 to-gradient-blue/10 text-primary border border-primary/20">
            <Sparkles className="w-3 h-3 mr-1.5" />
            University Prototype
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 relative">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-up">
              <div className="pill-badge bg-primary/10 text-primary border border-primary/20 w-fit">
                <Zap className="w-3 h-3 mr-1.5" />
                AI-Powered Fake News Detection
              </div>
              
              <h1 className="section-title leading-tight">
                Trust headlines again with{" "}
                <span className="gradient-text">TruthSense AI</span>
              </h1>
              
              <p className="section-subtitle">
                Fake headlines are everywhere. TruthSense AI analyzes news titles or article links and estimates whether they are likely misleading or trustworthy using artificial intelligence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                {["Paste headline or URL", "Instant AI analysis", "Helps reduce misinformation"].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-5 h-5 rounded-full gradient-bg flex items-center justify-center">
                      <CheckCircle className="w-3 h-3 text-primary-foreground" />
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Detection Card */}
            <div className="animate-fade-up-delay-2">
              <div className="glass-card rounded-3xl p-6 md:p-8 shadow-glow">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Try TruthSense AI</h2>
                    <p className="text-sm text-muted-foreground">
                      Paste a headline or article link and click Analyze. The result will appear below.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <textarea
                      id="headline-input"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="Paste a news headline or link here…"
                      className="w-full h-28 px-4 py-3 rounded-xl border border-border bg-background/50 resize-none focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm"
                    />

                    <div className="flex gap-3">
                      <button
                        id="analyze-button"
                        onClick={handleAnalyze}
                        disabled={!headline.trim() || isLoading}
                        className="flex-1 gradient-bg text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Analyzing...
                          </>
                        ) : (
                          <>
                            <Brain className="w-4 h-4" />
                            Analyze Headline
                          </>
                        )}
                      </button>
                      <button
                        id="example-button"
                        onClick={handleExample}
                        className="px-4 py-3 rounded-xl border border-border hover:bg-muted transition-all text-sm font-medium text-muted-foreground hover:text-foreground"
                      >
                        Use Example
                      </button>
                    </div>
                  </div>

                  {/* Result Area */}
                  <div className="relative">
                    <div
                      id="loading-indicator"
                      className={`absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl transition-opacity ${
                        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                        <span className="text-sm font-medium">Analyzing headline...</span>
                      </div>
                    </div>

                    <div className={`p-5 rounded-xl border transition-all ${
                      result
                        ? result.label === "fake"
                          ? "bg-destructive/5 border-destructive/20"
                          : "bg-success/5 border-success/20"
                        : "bg-muted/50 border-border"
                    }`}>
                      {result ? (
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            {result.label === "fake" ? (
                              <AlertTriangle className="w-6 h-6 text-destructive" />
                            ) : (
                              <CheckCircle className="w-6 h-6 text-success" />
                            )}
                            <span
                              id="result-label"
                              className={`text-lg font-bold ${
                                result.label === "fake" ? "text-destructive" : "text-success"
                              }`}
                            >
                              {result.label === "fake" ? "Likely Fake" : "Likely Trustworthy"}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Confidence: <span id="confidence-score" className="font-semibold text-foreground">{result.confidence}%</span>
                          </p>
                          <p id="result-explanation" className="text-sm text-muted-foreground leading-relaxed">
                            {result.explanation}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground text-center py-2">
                          Your analysis will appear here.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-16 relative">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <div key={i} className="stat-card text-center group">
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl gradient-bg/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="section-padding relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">How It Works</h2>
            <p className="section-subtitle mx-auto">
              Three simple steps to verify any headline
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={i} className="relative pt-5">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-sm font-bold text-primary-foreground z-10 shadow-lg">
                  {i + 1}
                </div>
                <div className="stat-card h-full text-center pt-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Problem */}
      <section id="about" className="section-padding bg-muted/30 relative">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="section-title mb-6">
              <span className="gradient-text">Rapid Spread of Misinformation</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              In today's digital age, fake news spreads faster than ever before. Misleading headlines can influence public opinion, distort facts, and erode trust in legitimate journalism. TruthSense AI aims to empower users with the tools they need to identify potentially deceptive content.
            </p>

            <div className="glass-card rounded-2xl p-8 text-left">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center flex-shrink-0">
                  <BarChart3 className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-lg font-semibold mb-2">"False news stories are 70% more likely to be retweeted than true stories."</p>
                  <p className="text-sm text-muted-foreground">— MIT Study on the Spread of False Information</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section-padding relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title mb-4">Why This Matters</h2>
            <p className="section-subtitle mx-auto">
              Our mission is to combat misinformation through technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {objectives.map((obj, i) => (
              <div key={i} className="stat-card h-full">
                <div className="w-14 h-14 mb-6 rounded-2xl gradient-bg flex items-center justify-center">
                  <obj.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-3">{obj.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{obj.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Users */}
      <section className="py-16 bg-muted/30 relative">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Who Is This For?</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {users.map((user, i) => (
              <div key={i} className="pill-badge bg-background border border-border px-5 py-2.5 text-sm font-medium">
                <user.icon className="w-4 h-4 mr-2 text-primary" />
                {user.label}
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="py-12 border-t border-border relative">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-bold">TruthSense AI</span>
          </div>
          <p className="text-muted-foreground text-sm mb-2">Fake News Headlines Detector</p>
          <p className="text-xs text-muted-foreground mb-4">
            Built as a university project. Prototype only – not for real-world decisions.
          </p>
          <p className="text-xs text-muted-foreground">© 2025 TruthSense AI Team</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
