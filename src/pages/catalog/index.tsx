import AllTests from '../../components/initialPage/allTests/allTests';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import NavBar from '../../components/navigation/navBar';

function Catalog() {
    const isLogged = useAppSelector(state => state.user.isAuthenticated);
    const tests = useAppSelector(state => state.test.list);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) {
            navigate('/');
        }
    }, [isLogged, navigate]);

    return (
        <div>
            <NavBar />
            <AllTests tests={tests} />
        </div>
    );
}

export default Catalog;