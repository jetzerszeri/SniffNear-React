import { Link } from 'react-router-dom'; 
export const BottomNav = ( {activeLink} ) => {
  return (
    <nav className="bottomNavBar">
        <ul>
            <li className={activeLink === 'home' ? 'active' : ''}>
                <a href="/">
                    <i className="bi bi-house-door"></i>
                </a>
            </li>

            <li className={activeLink === 'newAlert' ? 'active' : ''}>
                <Link to ="/newAlert">
                    <i className="bi bi-plus"></i>
                </Link>
              
            </li>
            <li className={activeLink === 'alerts' ? 'active' : ''}>
                <a href="/alerts">
                    <i className="bi bi-search"></i>
                </a>
            </li>

        </ul>
    </nav>

  )
}
