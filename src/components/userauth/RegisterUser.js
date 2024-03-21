import React, { useState, useEffect } from "react";
import apiUrl from '../../apiConfig';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function RegisterUser() {
    const [signIn, setSignIn] = useState(true);
    const [departments, setDepartments] = useState([]);
    const [gender, setGender] = useState("");
    const [user_role, setUser_role] = useState("");
    const navigate = useNavigate();
    axios.defaults.baseURL = apiUrl;
    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = () => {
        axios
            .get(`${apiUrl}/api/department/index`,
                {
                    headers: {
                        'Accept': 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                    }
                })
            .then((response) => {
                console.log(response.data);
                setDepartments(response.data);
            })
            .catch((error) => {
                console.error("Error fetching departments:", error);
            });
    };

    const toggleSignIn = () => {
        setSignIn(!signIn);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleRoleChange = (event) => {
        setUser_role(event.target.value);
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const userData = {
            name: formData.get("username"),
            email: formData.get("email"),
            password: formData.get("password"),
            gender: formData.get("gender"),
            department_name: formData.get("department"),
            user_role: formData.get("user_role"),
            password_confirmation: formData.get("password_confirmation"),
        };

        axios
            .post('/api/register', userData,
                {
                    headers: {
                        'Accept': 'application/vnd.api+json',
                        'Content-Type': 'application/vnd.api+json',
                    }
                })
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem("token", token);
                navigate('/');
                // Redirect the user to the dashboard or perform other actions after successful registration
                // Example: history.push('/dashboard');
            })
            .catch((error) => {
                console.error("Error registering user:", error);
            });
    };

    const containerClass = signIn ? "" : "sign-up-mode";

    return (
        <form className={`sign-up-form ${containerClass}`} onSubmit={handleSignUp}>
            <h2 className="title">Sign up</h2>
            {/* Input fields */}
            {/* Select options */}
            {/* Submit button */}
        </form>
    );
}

export default RegisterUser;
