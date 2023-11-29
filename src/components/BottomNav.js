import { Link } from 'react-router-dom'; 
export const BottomNav = () => {
  return (
    <nav className="bottomNavBar">
        <ul>
            <li className="active">
                <a href="/">
                    <i className="bi bi-house-door"></i>
                </a>
            </li>
            <li>
                <a href="/alerts">
                    <i className="bi bi-search"></i>
                </a>
            </li>
            <li>
                <Link to ="/newAlert">
                    <i className="bi bi-plus"></i>
                </Link>
              
            </li>
            <li>
                <a href="/">
                    <i className="bi bi-shield-exclamation"></i>
                </a>
            </li>
            <li>
                <a href="/">
                    <i className="bi bi-person"></i>
                </a>
            </li>
        </ul>
    </nav>

  )
}
