import { User, Hash, Users, MapPin, Calendar, Mail, Camera, Edit2, Save, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

function ProfilePage() {
    const [profileData, setProfileData] = useState(() => {
        const saved = localStorage.getItem('profileData');
        return saved ? JSON.parse(saved) : {
            name: "Farrell Farros Fausto",
            nim: "21120123120002",
            kelompok: "Kelompok 42",
            prodi: "Teknik Komputer",
            universitas: "Universitas Diponegoro",
            angkatan: "2023",
            email: "farrellfausto@gmail.com",
            bio: "Mahasiswa Teknik Komputer angkatan 2023."
        };
    });

    const [profileImage, setProfileImage] = useState(() => {
        return localStorage.getItem('profileImage') || null;
    });

    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({ ...profileData });

    useEffect(() => {
        localStorage.setItem('profileData', JSON.stringify(profileData));
    }, [profileData]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                localStorage.setItem('profileImage', reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
        localStorage.removeItem('profileImage');
    };

    const handleSave = () => {
        setProfileData(editedData);
        setIsEditing(false);
        alert('✅ Profil berhasil diupdate!');
    };

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)', paddingBottom: '2rem' }}>
            <div className="container" style={{ padding: '3rem 1rem', maxWidth: '900px' }}>
                <div style={{
                    background: 'white',
                    borderRadius: '2rem',
                    overflow: 'hidden',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)'
                }}>
                    {/* Header */}
                    <div style={{
                        background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                        padding: '3rem 2rem',
                        textAlign: 'center',
                        position: 'relative'
                    }}>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                borderRadius: '50%',
                                margin: '0 auto 1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                                border: '4px solid white',
                                overflow: 'hidden',
                                background: 'white'
                            }}>
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt="Profile"
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
                                    />
                                ) : (
                                    <User size={60} style={{ color: '#7c3aed' }} />
                                )}
                            </div>

                            {/* Upload Button */}
                            <label style={{
                                position: 'absolute',
                                bottom: '1.5rem',
                                right: '0',
                                width: '40px',
                                height: '40px',
                                background: 'white',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                transition: 'all 0.3s'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            >
                                <Camera size={20} style={{ color: '#7c3aed' }} />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    style={{ display: 'none' }}
                                />
                            </label>

                            {/* Remove Photo Button */}
                            {profileImage && (
                                <button
                                    onClick={handleRemoveImage}
                                    style={{
                                        position: 'absolute',
                                        bottom: '1.5rem',
                                        left: '0',
                                        width: '40px',
                                        height: '40px',
                                        background: '#dc2626',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                                        transition: 'all 0.3s'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>

                        {isEditing ? (
                            <input
                                type="text"
                                value={editedData.name}
                                onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                                style={{
                                    fontSize: '2rem',
                                    fontWeight: '800',
                                    color: 'white',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: '2px solid white',
                                    borderRadius: '0.5rem',
                                    padding: '0.5rem 1rem',
                                    textAlign: 'center',
                                    width: '100%',
                                    maxWidth: '400px',
                                    marginBottom: '0.5rem'
                                }}
                            />
                        ) : (
                            <h1 style={{
                                fontSize: '2rem',
                                fontWeight: '800',
                                color: 'white',
                                marginBottom: '0.5rem'
                            }}>
                                {profileData.name}
                            </h1>
                        )}

                        <p style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontSize: '1.125rem',
                            marginBottom: '1rem'
                        }}>
                            {profileData.prodi}
                        </p>

                        {isEditing ? (
                            <textarea
                                value={editedData.bio}
                                onChange={(e) => setEditedData({ ...editedData, bio: e.target.value })}
                                style={{
                                    width: '100%',
                                    maxWidth: '500px',
                                    background: 'rgba(255, 255, 255, 0.2)',
                                    border: '2px solid white',
                                    borderRadius: '0.5rem',
                                    padding: '0.75rem',
                                    color: 'white',
                                    fontSize: '0.875rem',
                                    resize: 'vertical',
                                    minHeight: '60px'
                                }}
                            />
                        ) : (
                            <p style={{
                                color: 'rgba(255, 255, 255, 0.8)',
                                fontSize: '0.875rem',
                                maxWidth: '500px',
                                margin: '0 auto',
                                fontStyle: 'italic'
                            }}>
                                "{profileData.bio}"
                            </p>
                        )}

                        <button
                            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                            style={{
                                marginTop: '1rem',
                                background: 'white',
                                color: '#7c3aed',
                                border: 'none',
                                padding: '0.75rem 2rem',
                                borderRadius: '0.75rem',
                                fontWeight: '700',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                margin: '1rem auto 0'
                            }}
                        >
                            {isEditing ? (
                                <>
                                    <Save size={18} />
                                    Simpan Perubahan
                                </>
                            ) : (
                                <>
                                    <Edit2 size={18} />
                                    Edit Profil
                                </>
                            )}
                        </button>
                    </div>

                    {/* Info */}
                    <div style={{ padding: '2rem' }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            fontWeight: '800',
                            color: '#1e293b',
                            marginBottom: '1.5rem'
                        }}>
                            Informasi Mahasiswa
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {/* NIM */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: '#f8fafc',
                                borderRadius: '0.75rem',
                                border: '2px solid #e2e8f0'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
                                    borderRadius: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}>
                                    <Hash size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginBottom: '0.25rem' }}>
                                        NIM
                                    </div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedData.nim}
                                            onChange={(e) => setEditedData({ ...editedData, nim: e.target.value })}
                                            style={{
                                                fontSize: '1rem',
                                                fontWeight: '700',
                                                color: '#1e293b',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '0.25rem',
                                                padding: '0.25rem 0.5rem',
                                                width: '100%'
                                            }}
                                        />
                                    ) : (
                                        <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>
                                            {profileData.nim}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Kelompok */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: '#f8fafc',
                                borderRadius: '0.75rem',
                                border: '2px solid #e2e8f0'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                                    borderRadius: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}>
                                    <Users size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginBottom: '0.25rem' }}>
                                        Kelompok
                                    </div>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            value={editedData.kelompok}
                                            onChange={(e) => setEditedData({ ...editedData, kelompok: e.target.value })}
                                            style={{
                                                fontSize: '1rem',
                                                fontWeight: '700',
                                                color: '#1e293b',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '0.25rem',
                                                padding: '0.25rem 0.5rem',
                                                width: '100%'
                                            }}
                                        />
                                    ) : (
                                        <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>
                                            {profileData.kelompok}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Angkatan */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: '#f8fafc',
                                borderRadius: '0.75rem',
                                border: '2px solid #e2e8f0'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
                                    borderRadius: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}>
                                    <Calendar size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginBottom: '0.25rem' }}>
                                        Angkatan
                                    </div>
                                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>
                                        {profileData.angkatan}
                                    </div>
                                </div>
                            </div>

                            {/* Universitas */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: '#f8fafc',
                                borderRadius: '0.75rem',
                                border: '2px solid #e2e8f0'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                                    borderRadius: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}>
                                    <MapPin size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginBottom: '0.25rem' }}>
                                        Universitas
                                    </div>
                                    <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>
                                        {profileData.universitas}
                                    </div>
                                </div>
                            </div>

                            {/* Email */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                                padding: '1rem',
                                background: '#f8fafc',
                                borderRadius: '0.75rem',
                                border: '2px solid #e2e8f0'
                            }}>
                                <div style={{
                                    width: '48px',
                                    height: '48px',
                                    background: 'linear-gradient(135deg, #ea580c 0%, #f97316 100%)',
                                    borderRadius: '0.75rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: 'white'
                                }}>
                                    <Mail size={24} />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '0.75rem', color: '#64748b', fontWeight: '600', marginBottom: '0.25rem' }}>
                                        Email
                                    </div>
                                    {isEditing ? (
                                        <input
                                            type="email"
                                            value={editedData.email}
                                            onChange={(e) => setEditedData({ ...editedData, email: e.target.value })}
                                            style={{
                                                fontSize: '1rem',
                                                fontWeight: '700',
                                                color: '#1e293b',
                                                border: '1px solid #e2e8f0',
                                                borderRadius: '0.25rem',
                                                padding: '0.25rem 0.5rem',
                                                width: '100%'
                                            }}
                                        />
                                    ) : (
                                        <div style={{ fontSize: '1rem', fontWeight: '700', color: '#1e293b' }}>
                                            {profileData.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;