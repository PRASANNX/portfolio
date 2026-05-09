import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get('title') || 'PRX Startup OS';
    const subtitle = searchParams.get('subtitle') || 'Executive Infrastructure for Indian Startups';
    const accent = searchParams.get('accent') || '#FF5F1F';
    const category = (searchParams.get('category') || 'SYSTEM').toUpperCase();
    const badge = searchParams.get('badge') || 'VERIFIED';

    // Determine if light or dark based on accent brightness
    const bgColor = '#121212';
    const textColor = '#FFFFFF';
    const mutedColor = '#9CA3AF';
    const borderColor = '#333333';
    const dimColor = '#6B7280';

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: bgColor,
            color: textColor,
            fontFamily: 'system-ui, sans-serif',
            padding: '0',
          }}
        >
          {/* Accent Top Bar */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              height: '8px',
              backgroundColor: accent,
            }}
          />

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              padding: '48px 60px',
              justifyContent: 'space-between',
            }}
          >
            {/* Top Navigation Row */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: `1px solid ${borderColor}`,
                paddingBottom: '24px',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  letterSpacing: '0.15em',
                  fontSize: 18,
                  color: mutedColor,
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ color: accent, fontSize: 14 }}>▸</span>
                {category}_PORTAL
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: '#22C55E',
                  }}
                />
                <span
                  style={{
                    display: 'flex',
                    color: accent,
                    fontSize: 18,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                  }}
                >
                  {badge}
                </span>
              </div>
            </div>

            {/* Title Block */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 'auto',
                marginBottom: 'auto',
                gap: '16px',
              }}
            >
              <h1
                style={{
                  fontSize: 72,
                  fontWeight: 900,
                  letterSpacing: '-0.04em',
                  lineHeight: 1.05,
                  margin: 0,
                  maxWidth: '90%',
                }}
              >
                {title}
              </h1>
              <p
                style={{
                  fontSize: 26,
                  color: mutedColor,
                  margin: 0,
                  maxWidth: '75%',
                  lineHeight: 1.4,
                }}
              >
                {subtitle}
              </p>
            </div>

            {/* Bottom Data Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderTop: `1px solid ${borderColor}`,
                paddingTop: '24px',
                width: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  gap: '24px',
                  fontSize: 16,
                  color: dimColor,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ display: 'flex' }}>RAZORPAY ENABLED</span>
                <span style={{ display: 'flex', color: borderColor }}>•</span>
                <span style={{ display: 'flex' }}>GST COMPLIANT</span>
                <span style={{ display: 'flex', color: borderColor }}>•</span>
                <span style={{ display: 'flex' }}>ENCRYPTED</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: 16,
                  fontWeight: 700,
                  color: dimColor,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: '16px',
                    height: '3px',
                    backgroundColor: accent,
                  }}
                />
                POWERED BY PRX
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error('OG image generation failed:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}
