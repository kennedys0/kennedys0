'use client';

import * as React from 'react';
import Script from 'next/script';
import { Box, Typography, Button, Tooltip } from '@mui/material';
import { ShieldCheck, RefreshCw, AlertCircle } from 'lucide-react';
import { clayColors } from '@/lib/theme';

export interface TurnstileWidgetHandle {
  reset: () => void;
}

interface TurnstileWidgetProps {
  onVerify: (token: string) => void;
  onExpire?: () => void;
  onError?: (errorCode?: string) => void;
  siteKey?: string;
  theme?: 'dark' | 'light' | 'auto';
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        params: {
          sitekey: string;
          theme?: 'dark' | 'light' | 'auto';
          callback?: (token: string) => void;
          'expired-callback'?: () => void;
          'error-callback'?: (errorCode?: string) => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

export const TurnstileWidget = React.forwardRef<TurnstileWidgetHandle, TurnstileWidgetProps>(
  function TurnstileWidget(
    { onVerify, onExpire, onError, siteKey, theme = 'dark' },
    ref
  ) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const widgetIdRef = React.useRef<string | null>(null);
    const [scriptLoaded, setScriptLoaded] = React.useState(false);
    const [isVerified, setIsVerified] = React.useState(false);
    const [scriptError, setScriptError] = React.useState(false);

    const activeSiteKey =
      siteKey ||
      process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY ||
      '1x00000000000000000000AA'; // Official Cloudflare always-passes test sitekey

    const renderWidget = React.useCallback(() => {
      if (typeof window === 'undefined' || !window.turnstile || !containerRef.current) {
        return;
      }

      if (widgetIdRef.current) {
        try {
          window.turnstile.remove(widgetIdRef.current);
        } catch {
          // ignore
        }
        widgetIdRef.current = null;
      }

      try {
        const id = window.turnstile.render(containerRef.current, {
          sitekey: activeSiteKey,
          theme: theme,
          callback: (token: string) => {
            setIsVerified(true);
            onVerify(token);
          },
          'expired-callback': () => {
            setIsVerified(false);
            onExpire?.();
          },
          'error-callback': (code?: string) => {
            setIsVerified(false);
            onError?.(code);
          },
        });
        widgetIdRef.current = id;
      } catch (err) {
        console.error('Failed to render Turnstile widget:', err);
      }
    }, [activeSiteKey, theme, onVerify, onExpire, onError]);

    React.useImperativeHandle(ref, () => ({
      reset: () => {
        setIsVerified(false);
        if (typeof window !== 'undefined' && window.turnstile && widgetIdRef.current) {
          try {
            window.turnstile.reset(widgetIdRef.current);
          } catch {
            // ignore
          }
        }
      },
    }));

    React.useEffect(() => {
      if (typeof window !== 'undefined' && window.turnstile) {
        renderWidget();
      }
    }, [scriptLoaded, renderWidget]);

    // Timeout fallback for offline or restricted environments
    React.useEffect(() => {
      const timer = setTimeout(() => {
        if (!scriptLoaded && typeof window !== 'undefined' && !window.turnstile) {
          setScriptError(true);
        }
      }, 3000);
      return () => clearTimeout(timer);
    }, [scriptLoaded]);

    React.useEffect(() => {
      return () => {
        if (widgetIdRef.current && typeof window !== 'undefined' && window.turnstile) {
          try {
            window.turnstile.remove(widgetIdRef.current);
          } catch {
            // ignore
          }
        }
      };
    }, []);

    const handleDevBypass = () => {
      const dummyToken = `XXXX.DUMMY.TOKEN.${Date.now()}`;
      setIsVerified(true);
      onVerify(dummyToken);
    };

    return (
      <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => {
            setScriptLoaded(true);
            setScriptError(false);
          }}
          onError={() => setScriptError(true)}
        />

        <Box
          ref={containerRef}
          sx={{
            minHeight: 65,
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />

        {/* Local Dev / Offline Fallback helper */}
        {scriptError && !isVerified && (
          <Box
            sx={{
              p: 1.5,
              mt: 1,
              borderRadius: '8px',
              backgroundColor: 'rgba(251, 146, 60, 0.1)',
              border: '1px solid rgba(251, 146, 60, 0.3)',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: clayColors.severityHigh }}>
              <AlertCircle size={14} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                Cloudflare CDN offline or unreachable
              </Typography>
            </Box>
            <Button
              size="small"
              variant="outlined"
              onClick={handleDevBypass}
              sx={{
                fontSize: '0.72rem',
                py: 0.4,
                px: 1.5,
                borderColor: 'rgba(251, 146, 60, 0.4)',
                color: clayColors.severityHigh,
              }}
            >
              Simulate Verified Captcha (Dev Mode)
            </Button>
          </Box>
        )}

        {/* Security attestation banner */}
        <Typography
          variant="caption"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.6,
            color: clayColors.textMuted,
            fontSize: '0.73rem',
            mt: 0.8,
            letterSpacing: '0.02em',
          }}
        >
          <ShieldCheck size={13} color={isVerified ? clayColors.success : clayColors.accentPrimary} />
          {isVerified ? 'CAPTCHA Verified by Cloudflare' : 'Protected by Cloudflare Turnstile'}
        </Typography>
      </Box>
    );
  }
);
