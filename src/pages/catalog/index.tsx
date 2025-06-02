import AllCourses from '../../components/initialPage/allCourses/allCourses';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import LogoutButton from '../../components/logout/logoutButton';
import InitialBar from '../../components/initialBar/initialBar';
import NavBar from '../../components/navigation/navBar';

function Catalog() {
    const isLogged = useAppSelector(state => state.user.isAuthenticated);
    const courses = useAppSelector(state => state.course.list);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogged) {
            navigate('/');
        }
    }, [isLogged, navigate]);

    return (
        <div>
            <NavBar />
            <InitialBar />
            <AllCourses courses={courses} />
        </div>
    );
}

export default Catalog;