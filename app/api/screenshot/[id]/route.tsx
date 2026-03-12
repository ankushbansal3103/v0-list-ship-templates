import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Map prototype IDs to their routes for capturing
const prototypeRoutes: Record<string, string> = {
  'us-shelby-ag': '/prototype/us-shelby-ag',
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  
  // For active prototypes, we render a visual representation
  // This creates a consistent preview image showing the prototype UI
  
  const isActive = id in prototypeRoutes
  
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
          padding: '20px',
        }}
      >
        {/* iPhone Frame */}
        <div
          style={{
            width: '180px',
            height: '380px',
            backgroundColor: '#000',
            borderRadius: '36px',
            padding: '8px',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Dynamic Island */}
          <div
            style={{
              width: '60px',
              height: '18px',
              backgroundColor: '#000',
              borderRadius: '10px',
              alignSelf: 'center',
              marginTop: '4px',
              position: 'absolute',
              top: '12px',
              zIndex: '10',
            }}
          />
          
          {/* Screen */}
          <div
            style={{
              flex: 1,
              backgroundColor: '#fff',
              borderRadius: '28px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Status Bar */}
            <div
              style={{
                height: '28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 16px',
                paddingTop: '8px',
              }}
            >
              <span style={{ fontSize: '10px', fontWeight: 600, color: '#191919' }}>9:41</span>
              <div style={{ display: 'flex', gap: '3px' }}>
                <div style={{ width: '12px', height: '8px', backgroundColor: '#191919', borderRadius: '2px' }} />
              </div>
            </div>
            
            {/* Header */}
            <div
              style={{
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <div style={{ fontSize: '12px', color: '#191919' }}>{'<'}</div>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#191919' }}>Shipping</span>
            </div>
            
            {/* Content Cards */}
            <div
              style={{
                padding: '8px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
              }}
            >
              {/* Package Details Card */}
              <div
                style={{
                  backgroundColor: '#F7F7F7',
                  borderRadius: '12px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#191919' }}>Package details</span>
                <span style={{ fontSize: '8px', color: '#707070' }}>Weight: 1 lb 8 oz</span>
                <span style={{ fontSize: '8px', color: '#707070' }}>Dimensions: 12 x 8 x 4 in</span>
              </div>
              
              {/* Services Card */}
              <div
                style={{
                  backgroundColor: '#F7F7F7',
                  borderRadius: '12px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#191919' }}>Services</span>
                <span style={{ fontSize: '8px', color: '#707070' }}>Economy: $4.50</span>
                <span style={{ fontSize: '8px', color: '#707070' }}>Standard: $6.99</span>
              </div>
              
              {/* Delivery Details Card */}
              <div
                style={{
                  backgroundColor: '#F7F7F7',
                  borderRadius: '12px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span style={{ fontSize: '10px', fontWeight: 600, color: '#191919' }}>Delivery details</span>
                <span style={{ fontSize: '8px', color: '#707070' }}>Handling: 2 business days</span>
              </div>
            </div>
            
            {/* Bottom CTA */}
            <div style={{ marginTop: 'auto', padding: '12px' }}>
              <div
                style={{
                  backgroundColor: '#3665F3',
                  borderRadius: '25px',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <span style={{ fontSize: '11px', fontWeight: 600, color: '#fff' }}>Continue</span>
              </div>
            </div>
            
            {/* Home Indicator */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                paddingBottom: '6px',
              }}
            >
              <div
                style={{
                  width: '60px',
                  height: '3px',
                  backgroundColor: '#191919',
                  borderRadius: '2px',
                }}
              />
            </div>
          </div>
        </div>
        
        {/* Label */}
        <div
          style={{
            marginTop: '16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#fff' }}>
            {id.toUpperCase().replace(/-/g, ' ')}
          </span>
          {isActive && (
            <span style={{ fontSize: '10px', color: '#22c55e' }}>Active</span>
          )}
        </div>
      </div>
    ),
    {
      width: 400,
      height: 600,
    }
  )
}
