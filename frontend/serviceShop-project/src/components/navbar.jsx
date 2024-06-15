import './navbar.css';

export default function Navbar() {
    return(
        <>
        <nav className="nav"> 
            <a href='/' className="site-title">ServiceBay Solutions</a>         
                <ul>
                <li>
                    <a className="workOrders" href="/workOrders">WorkOrders</a>
                </li>
                <li>
                    <a className="customers" href="/customers">Customers</a>
                </li>
                <li>
                    <a className="vehicles" href="/vehicles">Vehicles</a>
                </li>
                <li>
                    <a className="service" href="/services">Services</a>
                </li>
                </ul>
                {/* <a className="inventory" href="">Inventory</a> */}
        </nav>
        </>
    );
}