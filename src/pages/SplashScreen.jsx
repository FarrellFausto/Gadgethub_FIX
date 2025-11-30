function SplashScreen() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999
    }}>
      {/* Logo */}
      <div style={{
        width: '120px',
        height: '120px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '64px',
        marginBottom: '2rem',
        animation: 'bounce 2s infinite'
      }}>
        📱
      </div>

      {/* Title */}
      <h1 style={{
        fontSize: '3rem',
        fontWeight: '900',
        color: 'white',
        marginBottom: '0.5rem',
        letterSpacing: '-1px'
      }}>
        GadgetHub
      </h1>

      <p style={{
        fontSize: '1.125rem',
        color: 'rgba(255, 255, 255, 0.8)',
        marginBottom: '3rem'
      }}>
        Smart Shopping for Smart People
      </p>

      {/* Loading Animation */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1rem'
      }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: '12px',
              height: '12px',
              background: 'white',
              borderRadius: '50%',
              animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite`
            }}
          />
        ))}
      </div>

      <p style={{
        fontSize: '0.875rem',
        color: 'rgba(255, 255, 255, 0.6)',
        marginTop: '2rem'
      }}>
        Loading your experience...
      </p>

      <style>{`
        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0%, 80%, 100% {
            opacity: 0.3;
            transform: scale(0.8);
          }
          40% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}

export default SplashScreen;