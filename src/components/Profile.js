import React, { useEffect, useState } from 'react';
import './Profile.css';
import Navigation from './Navigation';

const Profile = () => {
    const [userPosts, setUserPosts] = useState([]);

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const username = currentUser?.username;
    const [profile, setProfile] = useState(null);
    const [profileError, setProfileError] = useState('');

    useEffect(() => {
    if (!username) return;

    let active = true;

    async function loadProfile() {
        try {
        const response = await fetch(
            `http://localhost:8080/api/users/profile/${encodeURIComponent(username)}`
        );

        if (!response.ok) {
            throw new Error(`Could not load profile (HTTP ${response.status}).`);
        }

        const data = await response.json();
        if (active) setProfile(data);
        } catch (error) {
        if (active) setProfileError(error.message);
        }
    }

    loadProfile();
    return () => { active = false; };
    }, [username]);
    useEffect(() => {
        const fetchUserPosts = async () => {
            try {
                const response = await fetch(`http://localhost:5000/user-posts/${currentUser.username}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUserPosts(data);
            } catch (error) {
                console.error('Error fetching user posts:', error);
            }
        };

        if (currentUser?.username) {
            fetchUserPosts();
        }
    }, [currentUser]);

    return (
        <div>
            <Navigation />
            <div className="profile">
                {!username ? (
                <p>Please log in to view your profile.</p>
                ) : profileError ? (
                <p role="alert">{profileError}</p>
                ) : !profile ? (
                <p>Loading profile...</p>
                ) : (
                <>
                    <div id="user">
                    <strong>{profile.username}</strong>
                    <p>{profile.email}</p>
                    </div>
                    <div id="bio">
                    <p>{profile.bio || 'No bio yet.'}</p>
                    </div>
                </>
                )}
                <div className="posts">
                    {userPosts.length > 0 ? (
                        userPosts.map((post, index) => (
                            <img
                                key={index}
                                src={post.image}
                                alt={`Post ${index + 1}`}
                            />
                        ))
                    ) : (
                        <p><i>No posts yet.</i></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
