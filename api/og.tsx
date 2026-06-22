import { ImageResponse } from '@vercel/og';

export const config = {
  runtime: 'edge',
};

// Prefetch font data outside of handler to cache across requests on the same edge container instance
const fontRegularPromise = fetch(
  'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-400-normal.woff'
).then((res) => res.arrayBuffer());

const fontBoldPromise = fetch(
  'https://cdn.jsdelivr.net/npm/@fontsource/inter/files/inter-latin-700-normal.woff'
).then((res) => res.arrayBuffer());

export default async function handler(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters with fallbacks
    const title = searchParams.get('title') || 'NPPAvalia';
    const desc = searchParams.get('desc') || 'Organize pacientes, anamneses, prontuários, testes e relatórios psicopedagógicos em uma única plataforma.';
    const badge = searchParams.get('badge') || 'Gestão Clínica Inteligente';

    // Await font data fetching
    const [fontRegular, fontBold] = await Promise.all([
      fontRegularPromise,
      fontBoldPromise,
    ]);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            backgroundColor: '#0f172a',
            backgroundImage: 'radial-gradient(circle at 0% 0%, #1e1b4b 0%, #0f172a 100%)',
            padding: '70px 80px',
            fontFamily: 'Inter',
          }}
        >
          {/* Top Brand Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '14px',
                backgroundColor: '#3B82F6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* HeartPulse brand icon path (Lucide equivalent) */}
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4a5.4 0 0 0-7.65 0 5.4 5.4 0 0 0 0 7.65L12 20l8.42-8.42a5.4 5.4 0 0 0 0-7.65Z" />
                <path d="M2 10h3l1.5-3 1.5 6 1.5-4 1.5 2 1 1h8" />
              </svg>
            </div>
            <span
              style={{
                fontSize: '34px',
                fontWeight: 800,
                color: 'white',
                letterSpacing: '-0.04em',
              }}
            >
              NPPAvalia
            </span>
          </div>

          {/* Central Area: Badge, Title & Description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
            {/* Styled Badge */}
            <div
              style={{
                display: 'flex',
                alignSelf: 'flex-start',
                alignItems: 'center',
                backgroundColor: 'rgba(59, 130, 246, 0.12)',
                border: '1px solid rgba(59, 130, 246, 0.25)',
                borderRadius: '9999px',
                padding: '8px 18px',
              }}
            >
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 700,
                  color: '#60A5FA',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                }}
              >
                {badge}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontSize: '60px',
                fontWeight: 800,
                color: 'white',
                lineHeight: 1.15,
                margin: 0,
                padding: 0,
                letterSpacing: '-0.02em',
                display: 'flex',
                flexWrap: 'wrap',
              }}
            >
              {title}
            </h1>

            {/* Description */}
            <p
              style={{
                fontSize: '22px',
                fontWeight: 400,
                color: '#94a3b8',
                lineHeight: 1.5,
                margin: 0,
                padding: 0,
                maxWidth: '960px',
              }}
            >
              {desc}
            </p>
          </div>

          {/* Footer Area */}
          <div
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '28px',
            }}
          >
            <span style={{ fontSize: '18px', color: '#64748b', fontWeight: 500 }}>
              nppavalia.com.br
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Accent element: dot and description */}
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#14B8A6' }} />
              <span style={{ fontSize: '16px', color: '#475569', fontWeight: 500 }}>
                Plataforma Psicopedagógica
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontRegular,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: fontBold,
            style: 'normal',
            weight: 800,
          },
        ],
      }
    );
  } catch (e: any) {
    console.error(e);
    return new Response(`Failed to generate Open Graph image: ${e.message}`, {
      status: 500,
    });
  }
}
