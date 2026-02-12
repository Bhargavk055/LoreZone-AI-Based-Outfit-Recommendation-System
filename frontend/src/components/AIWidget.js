import React, { useState } from 'react';
import axios from 'axios';
import { FaRobot, FaTimes, FaPaperPlane, FaMagic } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";

const AIWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'match'

    // Chat State
    const [messages, setMessages] = useState([
        { role: 'stylist', text: 'Hi! I am your AI Stylist. Need outfit advice?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    // Recommendation State
    const [preferences, setPreferences] = useState({
        skin_tone: 'Fair',
        body_type: 'Slim',
        gender: 'Select',
        occasion: 'Casual'
    });
    const [recommendations, setRecommendations] = useState([]);
    const [recLoading, setRecLoading] = useState(false);

    const toggleOpen = () => setIsOpen(!isOpen);

    // --- CHAT LOGIC ---
    const sendChat = async () => {
        if (!input.trim()) return;
        const newMsg = { role: 'user', text: input };
        setMessages([...messages, newMsg]);
        setInput('');
        setLoading(true);

        try {
            const res = await axios.post('http://localhost:8081/api/ai/chat', { message: newMsg.text });
            setMessages(prev => [...prev, { role: 'stylist', text: res.data.response }]);
        } catch (err) {
            setMessages(prev => [...prev, { role: 'stylist', text: "Sorry, I'm offline right now." }]);
        }
        setLoading(false);
    };

    // --- RECOMMENDATION LOGIC ---
    const getRecommendations = async () => {
        setRecLoading(true);
        try {
            const res = await axios.post('http://localhost:8081/api/ai/recommend', preferences);
            setRecommendations(res.data);
        } catch (err) {
            console.error(err);
        }
        setRecLoading(false);
    };

    return (
        <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}>
            {/* TOGGLE BUTTON */}
            {!isOpen && (
                <button
                    onClick={toggleOpen}
                    className="btn btn-warning rounded-circle shadow-lg p-3"
                    style={{ width: '60px', height: '60px', backgroundColor: '#D4AF37', border: 'none' }}
                >
                    <FaRobot size={30} color="#fff" />
                </button>
            )}

            {/* WIDGET WINDOW */}
            {isOpen && (
                <div className="card shadow-lg" style={{ width: '350px', height: '500px', borderRadius: '15px', overflow: 'hidden' }}>
                    {/* Header */}
                    <div className="card-header text-white d-flex justify-content-between align-items-center" style={{ backgroundColor: '#D4AF37' }}>
                        <h6 className="mb-0 fw-bold">LoreZone AI Stylist</h6>
                        <button onClick={toggleOpen} className="btn btn-sm text-white"><FaTimes /></button>
                    </div>

                    {/* Tabs */}
                    <div className="d-flex border-bottom">
                        <button
                            className={`btn flex-fill rounded-0 ${activeTab === 'chat' ? 'btn-light fw-bold' : 'btn-white'}`}
                            onClick={() => setActiveTab('chat')}
                        >
                            <FaRobot className="me-1" /> Chat
                        </button>
                        <button
                            className={`btn flex-fill rounded-0 ${activeTab === 'match' ? 'btn-light fw-bold' : 'btn-white'}`}
                            onClick={() => setActiveTab('match')}
                        >
                            <FaMagic className="me-1" /> Smart Match
                        </button>
                    </div>

                    {/* Content Body */}
                    <div className="card-body p-0 d-flex flex-column" style={{ height: 'calc(100% - 90px)', backgroundColor: '#fff' }}>

                        {/* 1. CHAT TAB */}
                        {activeTab === 'chat' && (
                            <div className="d-flex flex-column h-100">
                                <div className="flex-grow-1 overflow-auto p-3" style={{ backgroundColor: '#f8f9fa' }}>
                                    {messages.map((msg, i) => (
                                        <div key={i} className={`d-flex mb-2 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                                            <div
                                                className={`p-2 rounded ${msg.role === 'user' ? 'bg-warning text-dark' : 'bg-white border text-dark'}`}
                                                style={{ maxWidth: '80%', fontSize: '0.9rem' }}
                                            >
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {loading && <div className="text-muted small ps-2">Stylist is typing...</div>}
                                </div>
                                <div className="p-2 border-top bg-white d-flex">
                                    <input
                                        type="text"
                                        className="form-control form-control-sm me-1"
                                        placeholder="Ask about fashion..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && sendChat()}
                                    />
                                    <button className="btn btn-warning btn-sm text-white" onClick={sendChat}><FaPaperPlane /></button>
                                </div>
                            </div>
                        )}

                        {/* 2. MATCH TAB */}
                        {activeTab === 'match' && (
                            <div className="h-100 overflow-auto p-3">
                                <p className="small text-muted mb-2">Select your preferences:</p>
                                <select className="form-select form-select-sm mb-2" value={preferences.skin_tone} onChange={(e) => setPreferences({ ...preferences, skin_tone: e.target.value })}>
                                    <option value="Fair">Fair Skin</option>
                                    <option value="Medium">Medium Skin</option>
                                    <option value="Olive">Olive Skin</option>
                                    <option value="Dark">Dark Skin</option>
                                </select>
                                <select className="form-select form-select-sm mb-2" value={preferences.body_type} onChange={(e) => setPreferences({ ...preferences, body_type: e.target.value })}>
                                    <option value="Slim">Slim</option>
                                    <option value="Athletic">Athletic</option>
                                    <option value="Hourglass">Hourglass</option>
                                    <option value="Pear">Pear Shape</option>
                                </select>
                                <select className="form-select form-select-sm mb-2" value={preferences.gender} onChange={(e) => setPreferences({ ...preferences, gender: e.target.value })}>
                                    <option value="Select">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Unisex">Unisex</option>
                                </select>
                                <select className="form-select form-select-sm mb-2" value={preferences.occasion} onChange={(e) => setPreferences({ ...preferences, occasion: e.target.value })}>
                                    <option value="Casual">Casual</option>
                                    <option value="Party">Party</option>
                                    <option value="Wedding">Wedding</option>
                                    <option value="Work">Work</option>
                                </select>
                                <button className="btn btn-warning btn-sm w-100 mb-3 text-white" onClick={getRecommendations} disabled={recLoading}>
                                    {recLoading ? "Analyzing..." : "Find My Match"}
                                </button>

                                {/* Results */}
                                {recommendations.map((item, idx) => (
                                    <div className="card mb-2 border-warning" key={idx}>
                                        <div className="row g-0">
                                            <div className="col-4">
                                                <img src={item.pic_url} className="img-fluid rounded-start h-100" style={{ objectFit: 'cover' }} alt="Match"
                                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150" }} />
                                            </div>
                                            <div className="col-8">
                                                <div className="card-body p-2">
                                                    <h6 className="card-title text-warning small mb-1">Match: {(item.match_score * 100).toFixed(0)}%</h6>
                                                    <p className="card-text small mb-0 text-truncate">{item.post_description}</p>
                                                    <p className="card-text"><small className="text-muted smaller">${item.price}</small></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIWidget;
