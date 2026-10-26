import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Mail,
  Wifi,
  Cpu,
  Volume2,
  RefreshCw,
  ChevronDown,
  MessageSquare,
  Tv,
  Terminal,
  Send,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

interface HealthData {
  status: string;
  service: string;
  timestamp: string;
}

export const StreamDiagnostics: React.FC = () => {
  const [bandwidth, setBandwidth] = useState('84.2 Mbps');
  const [latency, setLatency] = useState('14ms');
  const [isProbing, setIsProbing] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  // Backend API Live State
  const [apiHealth, setApiHealth] = useState<HealthData | null>(null);
  const [apiLatency, setApiLatency] = useState<number | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Echo Test State
  const [echoMessage, setEchoMessage] = useState('SPBR 4K AV1 Stream Master Verification');
  const [echoResponse, setEchoResponse] = useState<any>(null);
  const [echoStatus, setEchoStatus] = useState<number | null>(null);
  const [isEchoing, setIsEchoing] = useState(false);
  const [showApiConsole, setShowApiConsole] = useState(false);

  // Fetch real /api/health endpoint
  const checkHealth = async () => {
    const start = performance.now();
    try {
      const res = await fetch('/api/health');
      const data = await res.json();
      const end = performance.now();
      setApiLatency(Math.round(end - start));
      if (res.ok) {
        setApiHealth(data);
        setApiError(null);
      } else {
        setApiError(data.error || 'Health check failed');
      }
    } catch (err: any) {
      setApiError(err.message || 'Network error reaching /api/health');
    }
  };

  useEffect(() => {
    checkHealth();
  }, []);

  const runDiagnostics = () => {
    setIsProbing(true);
    checkHealth();
    setTimeout(() => {
      const randomBw = (78 + Math.random() * 18).toFixed(1);
      const randomLat = (11 + Math.floor(Math.random() * 6));
      setBandwidth(`${randomBw} Mbps`);
      setLatency(`${randomLat}ms`);
      setIsProbing(false);
    }, 700);
  };

  const handleSendEcho = async (overridePayload?: any, customContentType?: string) => {
    setIsEchoing(true);
    setEchoResponse(null);
    setEchoStatus(null);
    try {
      const headers: Record<string, string> = {};
      if (customContentType !== undefined) {
        if (customContentType) headers['Content-Type'] = customContentType;
      } else {
        headers['Content-Type'] = 'application/json';
      }

      const body = overridePayload !== undefined ? overridePayload : JSON.stringify({ message: echoMessage });
      const res = await fetch('/api/echo', {
        method: 'POST',
        headers,
        body,
      });

      setEchoStatus(res.status);
      const data = await res.json().catch(() => ({ raw: 'Non-JSON response' }));
      setEchoResponse(data);
    } catch (err: any) {
      setEchoResponse({ error: err.message });
      setEchoStatus(500);
    } finally {
      setIsEchoing(false);
    }
  };

  const toggleFaq = (id: number) => {
    setOpenFaq(prev => (prev === id ? null : id));
  };

  return (
    <section className="w-full bg-surface-container-lowest py-8 border-t border-surface-container-highest/60" id="stream-diagnostics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12" id="founder-desk">
        <div className="bg-surface-container rounded-2xl p-6 shadow-2xl border border-surface-container-highest/80 flex flex-col gap-6">
          {/* Executive Top Bar */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-surface-container-highest/50">
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="font-headline-md text-base sm:text-lg font-bold text-on-surface">
                  Executive Console &amp; Stream Lab
                </span>
              </div>
              <span className="px-2 py-0.5 rounded bg-primary-container/20 text-primary font-badge-spec text-[10px] font-bold border border-primary/30">
                &lt; 2 HOUR SLA GUARANTEED
              </span>
              <span className="px-2 py-0.5 rounded bg-surface-container-high text-emerald-400 font-badge-spec text-[10px] flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {apiHealth ? `API: ${apiHealth.status.toUpperCase()} (${apiLatency}ms)` : 'MONITORED LIVE'}
              </span>
            </div>

            {/* Founders Badges */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-primary-container/20 text-primary border border-primary/40 flex items-center justify-center font-bold text-xs">
                  RK
                </div>
                <div>
                  <span className="font-title-card text-xs text-on-surface font-semibold block">Rishav Krishn Sharma</span>
                  <span className="text-[10px] text-primary block leading-none font-label-caps font-bold">CO-FOUNDER &amp; CEO</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-secondary-container/20 text-secondary border border-secondary/40 flex items-center justify-center font-bold text-xs">
                  BS
                </div>
                <div>
                  <span className="font-title-card text-xs text-on-surface font-semibold block">Balmukund Sharma</span>
                  <span className="text-[10px] text-secondary block leading-none font-label-caps font-bold">CO-FOUNDER &amp; CCO</span>
                </div>
              </div>

              <a
                href="mailto:b43698051@gmail.com"
                className="px-3.5 py-1.5 rounded-lg bg-primary-container text-on-primary-container font-badge-spec text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(229,9,20,0.5)] hover:bg-primary-container/90 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>b43698051@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Telemetry Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container-highest/40">
              <div className="flex flex-col">
                <span className="font-label-caps text-[9px] text-on-surface-variant font-bold">BANDWIDTH</span>
                <span className="font-headline-md text-sm font-mono text-on-surface font-bold">{bandwidth}</span>
              </div>
              <Wifi className="w-4 h-4 text-emerald-400" />
            </div>

            <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container-highest/40">
              <div className="flex flex-col">
                <span className="font-label-caps text-[9px] text-on-surface-variant font-bold">BACKEND SERVICE</span>
                <span className="font-headline-md text-sm font-mono text-secondary font-bold">
                  {apiHealth?.service || 'website-api'}
                </span>
              </div>
              <Cpu className="w-4 h-4 text-secondary" />
            </div>

            <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container-highest/40">
              <div className="flex flex-col">
                <span className="font-label-caps text-[9px] text-on-surface-variant font-bold">SPATIAL ENGINE</span>
                <span className="font-headline-md text-sm font-mono text-on-surface font-bold">Dolby Atmos 9.1</span>
              </div>
              <Volume2 className="w-4 h-4 text-on-surface-variant" />
            </div>

            <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between border border-surface-container-highest/40">
              <div className="flex flex-col">
                <span className="font-label-caps text-[9px] text-on-surface-variant font-bold">SERVER API LATENCY</span>
                <span className="font-headline-md text-sm font-mono text-primary font-bold">
                  {apiLatency !== null ? `${apiLatency}ms (Real)` : `${latency} • 0 Drops`}
                </span>
              </div>
              <button
                onClick={runDiagnostics}
                disabled={isProbing}
                className="p-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-primary transition-all"
                title="Rerun Diagnostics & Check API Health"
              >
                <RefreshCw className={`w-4 h-4 ${isProbing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {/* Interactive Backend API Test Console Card */}
          <div className="rounded-xl bg-surface-container-low p-4 border border-surface-container-highest/60 flex flex-col gap-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-primary" />
                <span className="font-title-card text-xs font-bold text-on-surface">
                  Backend API Integration Console (GET /api/health &amp; POST /api/echo)
                </span>
              </div>
              <button
                onClick={() => setShowApiConsole(!showApiConsole)}
                className="px-2.5 py-1 rounded-md bg-surface-container-high hover:bg-surface-container-highest text-[11px] font-badge-spec text-primary font-bold transition-colors"
              >
                {showApiConsole ? 'Hide Console' : 'Open Interactive API Tester'}
              </button>
            </div>

            {showApiConsole && (
              <div className="flex flex-col gap-3 pt-2 border-t border-surface-container-highest/40 text-xs animate-in fade-in duration-150">
                {/* Endpoint 1: GET /api/health */}
                <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-2 border border-surface-container-highest/30">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold">
                        GET
                      </span>
                      <code className="text-on-surface font-mono text-xs">/api/health</code>
                    </div>
                    <button
                      onClick={checkHealth}
                      className="px-2.5 py-1 rounded bg-surface-container-high hover:bg-surface-container-highest text-[10px] font-bold text-on-surface flex items-center gap-1 transition-colors"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Ping Health</span>
                    </button>
                  </div>

                  <pre className="p-2 rounded bg-surface-container-lowest font-mono text-[11px] text-emerald-400 overflow-x-auto">
                    {apiHealth ? JSON.stringify(apiHealth, null, 2) : apiError ? `Error: ${apiError}` : 'Loading...'}
                  </pre>
                </div>

                {/* Endpoint 2: POST /api/echo */}
                <div className="p-3 rounded-lg bg-surface-container flex flex-col gap-2 border border-surface-container-highest/30">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-primary-container text-white font-mono text-[10px] font-bold">
                        POST
                      </span>
                      <code className="text-on-surface font-mono text-xs">/api/echo</code>
                    </div>

                    {/* Quick validation presets */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <button
                        onClick={() => handleSendEcho(JSON.stringify({ message: 'Valid 4K AV1 Test' }))}
                        className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-[10px] text-emerald-400"
                        title="Test Valid Payload"
                      >
                        Valid
                      </button>
                      <button
                        onClick={() => handleSendEcho(JSON.stringify({}))}
                        className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-[10px] text-amber-400"
                        title="Test Missing Field"
                      >
                        Missing Field (400)
                      </button>
                      <button
                        onClick={() => handleSendEcho(JSON.stringify({ message: '' }))}
                        className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-[10px] text-amber-400"
                        title="Test Empty Message"
                      >
                        Empty (400)
                      </button>
                      <button
                        onClick={() => handleSendEcho('invalid-json', 'application/json')}
                        className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-[10px] text-red-400"
                        title="Test Malformed JSON"
                      >
                        Malformed JSON (400)
                      </button>
                      <button
                        onClick={() => handleSendEcho('message=hello', 'text/plain')}
                        className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-surface-container-highest text-[10px] text-purple-400"
                        title="Test Unsupported Media Type"
                      >
                        Bad Content-Type (415)
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={echoMessage}
                      onChange={(e) => setEchoMessage(e.target.value)}
                      placeholder='Enter JSON message e.g. "Tokyo Stream Ready"'
                      className="flex-1 bg-surface-container-lowest px-3 py-1.5 rounded text-xs font-mono text-on-surface border border-surface-container-highest/60 focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      onClick={() => handleSendEcho()}
                      disabled={isEchoing}
                      className="px-3 py-1.5 rounded bg-primary-container text-white font-bold text-xs flex items-center gap-1.5 shadow-sm hover:scale-105 active:scale-95 transition-all"
                    >
                      <Send className="w-3 h-3" />
                      <span>{isEchoing ? 'Sending...' : 'Echo POST'}</span>
                    </button>
                  </div>

                  {echoResponse && (
                    <div className="flex flex-col gap-1 pt-1">
                      <div className="flex items-center gap-2">
                        <span className="font-badge-spec text-[10px] text-on-surface-variant font-bold">RESPONSE STATUS:</span>
                        <span
                          className={`font-mono text-xs font-bold ${
                            echoStatus === 200 ? 'text-emerald-400' : 'text-amber-400'
                          }`}
                        >
                          {echoStatus} {echoStatus === 200 ? 'OK' : echoStatus === 415 ? 'Unsupported Media Type' : 'Bad Request'}
                        </span>
                      </div>
                      <pre className="p-2 rounded bg-surface-container-lowest font-mono text-[11px] text-on-surface overflow-x-auto">
                        {JSON.stringify(echoResponse, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Accordion FAQ & Direct Desk Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            <div className="lg:col-span-8 flex flex-col gap-2">
              {/* FAQ 1 */}
              <div className="rounded-lg bg-surface-container-low overflow-hidden border border-surface-container-highest/40">
                <button
                  onClick={() => toggleFaq(1)}
                  className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-surface-container-high transition-colors"
                >
                  <span className="font-title-card text-xs font-bold text-on-surface flex items-center gap-2">
                    <span className="text-primary font-bold">?</span>
                    How do I unlock uncompressed 65 Mbps 4K UHD masters?
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-primary transition-transform duration-200 ${
                      openFaq === 1 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === 1 && (
                  <div className="px-3.5 pb-3 text-on-surface-variant font-body-sm text-xs leading-relaxed border-t border-surface-container-highest/30 pt-2">
                    SPBR automatically detects HDCP 2.2 compliant 4K displays and connection speeds above 45 Mbps. When matched, switch the bitrate toggle on any Master title to "65 Mbps Studio Master" for uncompressed 10-bit HDR video and lossless Atmos audio.
                  </div>
                )}
              </div>

              {/* FAQ 2 */}
              <div className="rounded-lg bg-surface-container-low overflow-hidden border border-surface-container-highest/40">
                <button
                  onClick={() => toggleFaq(2)}
                  className="w-full px-3.5 py-2.5 flex items-center justify-between text-left hover:bg-surface-container-high transition-colors"
                >
                  <span className="font-title-card text-xs font-bold text-on-surface flex items-center gap-2">
                    <span className="text-secondary font-bold">?</span>
                    What is the broadcast delay for Tokyo anime simulcasts?
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-secondary transition-transform duration-200 ${
                      openFaq === 2 ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {openFaq === 2 && (
                  <div className="px-3.5 pb-3 text-on-surface-variant font-body-sm text-xs leading-relaxed border-t border-surface-container-highest/30 pt-2">
                    Day-and-Date simulcasts stream within zero to 30 minutes of official Japanese terrestrial transmission (Tokyo MX, BS11, TV Tokyo). Subtitles in English, Japanese CC, Spanish, and French are styled natively by localization directors.
                  </div>
                )}
              </div>
            </div>

            {/* Quick Action Channels */}
            <div className="lg:col-span-4 flex items-center gap-3">
              <a
                href="mailto:b43698051@gmail.com"
                className="flex-1 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container-high flex items-center gap-2.5 transition-all group border border-surface-container-highest/40"
              >
                <div className="p-2 rounded-md bg-primary-container/20 text-primary group-hover:scale-105 transition-transform">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-title-card text-xs text-on-surface font-bold group-hover:text-primary transition-colors">
                    Direct Founder Desk
                  </span>
                  <span className="font-badge-spec text-[10px] text-on-surface-variant">&lt; 45s response</span>
                </div>
              </a>

              <div className="flex-1 p-3 rounded-lg bg-surface-container-low flex items-center gap-2.5 border border-surface-container-highest/40">
                <div className="p-2 rounded-md bg-secondary-container/20 text-secondary">
                  <Tv className="w-4 h-4" />
                </div>
                <div className="flex flex-col">
                  <span className="font-title-card text-xs text-on-surface font-bold">4,200+ Calibrations</span>
                  <span className="font-badge-spec text-[10px] text-on-surface-variant">LG, Sony, Apple TV</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
