import React, { useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";


const Stylist = () => {
    // Chat State
    const [messages, setMessages] = useState([
        { role: 'stylist', text: 'Hello! I am your AI Stylist. Ask me anything about fashion, or what should you wear for an event!' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    // Recommendation State (same as before)
    const [preferences, setPreferences] = useState({
        skin_tone: 'Fair',
        body_type: 'Slim',
        occasion: 'Casual'
    });
    const [recommendations, setRecommendations] = useState([]);
    const [recLoading, setRecLoading] = useState(false);

    // (Keeping Logic same)
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

    const cardStyle = {
        background: "#1a1a1a",
        color: "#fff",
        border: "1px solid #333"
    };

    const inputStyle = {
        background: "#333",
        color: "#fff",
        border: "1px solid #555"
    };

    return (
        <div style={{ backgroundColor: "#000", minHeight: "100vh", color: "#fff", transition: "all 0.3s ease" }}>
            <Navbar />
            <br /><br /><br />
            <div className="container py-5">
                <div className="row g-5">

                    {/* LEFT COLUMN: AI CHATBOT */}
                    <div className="col-md-5">
                        <div className="card shadow-sm h-100" style={cardStyle}>
                            <div className="card-header text-white" style={{ background: "#D4AF37" }}>
                                <h5 className="mb-0" style={{ color: "#000" }}>💬 Ask the Stylist</h5>
                            </div>
                            <div className="card-body d-flex flex-column" style={{ height: '500px' }}>
                                <div className="flex-grow-1 overflow-auto mb-3 p-2 border rounded" style={{ background: '#2c2c2c' }}>
                                    {messages.map((msg, i) => (
                                        <div key={i} className={`d-flex mb-2 ${msg.role === 'user' ? 'justify-content-end' : 'justify-content-start'}`}>
                                            <div className={`p-2 rounded`}
                                                style={{
                                                    maxWidth: '80%',
                                                    background: msg.role === 'user' ? "#D4AF37" : '#444',
                                                    color: msg.role === 'user' ? "#000" : "#fff"
                                                }}>
                                                {msg.text}
                                            </div>
                                        </div>
                                    ))}
                                    {loading && <div className="text-muted small">Stylist is typing...</div>}
                                </div>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Type a message..."
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && sendChat()}
                                        style={inputStyle}
                                    />
                                    <button className="btn" style={{ background: "#D4AF37", color: "#000" }} onClick={sendChat}>Send</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: SMART MATCH */}
                    <div className="col-md-7">
                        <div className="card shadow-sm" style={cardStyle}>
                            <div className="card-header text-white" style={{ background: "#28a745" }}>
                                <h5 className="mb-0">✨ Smart Outfit Match (Vector AI)</h5>
                            </div>
                            <div className="card-body">
                                <p>Select your preferences and let our AI calculate your perfect match!</p>
                                <div className="row g-2 mb-3">
                                    {/* Selects */}
                                    {['skin_tone', 'body_type', 'occasion'].map((field) => (
                                        <div className="col-md-4" key={field}>
                                            <select className="form-select" style={inputStyle} value={preferences[field]} onChange={(e) => setPreferences({ ...preferences, [field]: e.target.value })}>
                                                {field === 'skin_tone' && ['Fair', 'Medium', 'Olive', 'Dark'].map(o => <option key={o} value={o}>{o} Skin</option>)}
                                                {field === 'body_type' && ['Slim', 'Athletic', 'Hourglass', 'Pear', 'Apple'].map(o => <option key={o} value={o}>{o}</option>)}
                                                {field === 'occasion' && ['Casual', 'Party', 'Wedding', 'Work', 'Vacation'].map(o => <option key={o} value={o}>{o}</option>)}
                                            </select>
                                        </div>
                                    ))}
                                </div>
                                <button className="btn w-100" style={{ background: "#28a745", color: "#fff" }} onClick={getRecommendations} disabled={recLoading}>
                                    {recLoading ? "Analyzing..." : "Find My Match"}
                                </button>
                            </div>
                        </div>

                        {/* RESULTS GRID */}
                        <div className="row row-cols-1 row-cols-md-2 g-3 mt-3">
                            {recommendations.map((item, idx) => (
                                <div className="col" key={idx}>
                                    <div className="card h-100" style={cardStyle}>
                                        <div className="row g-0">
                                            <div className="col-md-4">
                                                <img src={item.pic_url} className="img-fluid rounded-start h-100" style={{ objectFit: 'cover' }} alt="Match"
                                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/150" }} />
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h6 className="card-title text-success">Match Score: {(item.match_score * 100).toFixed(0)}%</h6>
                                                    <p className="card-text small">{item.post_description}</p>
                                                    <p className="card-text"><small style={{ color: "#aaa" }}>Price: ${item.price}</small></p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Stylist;
