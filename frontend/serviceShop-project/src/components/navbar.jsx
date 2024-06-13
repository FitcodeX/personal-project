

export default function Navbar() {
    return(
        <>
        <nav className="topNav">
            <a className="active" href="">Home</a>
            <a className="workOrders" href="">WorkOrders</a>
            <a className="customers" href="">Customers</a>
            <a className="vehicles" href="">Vehicles</a>
            <a className="inventory" href="">Inventory</a>
        </nav>
        </>
    );
}