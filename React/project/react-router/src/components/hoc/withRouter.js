import { useParams, useLocation, useNavigate } from 'react-router-dom';
import React from 'react'
export default function withRouter(Child) {
    return (props) => {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        return <Child {...props} navigate={navigate} location={location} params={params} />;
    }
}