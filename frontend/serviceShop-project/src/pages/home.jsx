import './home.css'
export default function Home() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <img
          src="https://cdn.smarcomms.com/wp-content/uploads/2022/05/9-Top-Social-Media-Tips-for-Auto-Repair-Companies.jpg?strip=all&lossy=1&sharp=1&ssl=1"
          alt="Auto Repair Tips"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        <p>Welcome to ServiceBay Solutions! Our platform empowers vehicle service shops to operate efficiently by managing work orders, inventory, customers, and vehicle information all in one place.</p>
      </div>
    );
  }
  