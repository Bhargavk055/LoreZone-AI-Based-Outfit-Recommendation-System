import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


function PaymentPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { plan, price } = location.state || { plan: "Starter", price: "$49" }; // Default for testing

    const [paymentMethod, setPaymentMethod] = useState("card");
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState(1); // 1: Method, 2: Details, 3: Pin/Success

    const handlePayment = async () => {
        setProcessing(true);

        try {
            const userInfo = JSON.parse(localStorage.getItem("userInfo"));
            const token = userInfo ? userInfo.token : null;

            if (!token) {
                alert("Please log in first!");
                navigate("/loginpage");
                return;
            }

            const response = await fetch("http://localhost:8081/api/user/upgrade", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ plan: plan })
            });

            const data = await response.json();

            if (response.ok) {
                // Update local storage with new user data
                userInfo.subscription_plan = data.user.subscription_plan;
                userInfo.is_verified = data.user.is_verified;
                localStorage.setItem("userInfo", JSON.stringify(userInfo));

                alert(`✅ Payment Successful! \n\nWelcome to ${plan} Plan!`);
                navigate("/profile");
            } else {
                alert(data.message || "Payment verification failed.");
            }
        } catch (error) {
            console.error("Payment Error:", error);
            alert("Payment failed. Please try again.");
        } finally {
            setProcessing(false);
        }
    };

    const dynamicStyles = {
        container: {
            minHeight: "100vh",
            background: "#000",
            color: "#fff",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: "'Segoe UI', sans-serif",
            transition: "all 0.3s ease"
        },
        card: {
            background: "#1a1a1a",
            padding: "30px",
            borderRadius: "10px",
            width: "400px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
            border: "1px solid #333"
        },
        title: { borderBottom: "1px solid #333", paddingBottom: "15px", marginBottom: "20px", color: "#D4AF37" },
        row: { display: "flex", justifyContent: "space-between", marginBottom: "15px" },
        input: { width: "100%", padding: "10px", margin: "10px 0", borderRadius: "5px", border: "1px solid #333", background: "#000", color: "#fff" },
        button: { width: "100%", padding: "12px", background: "#D4AF37", color: "#000", fontWeight: "bold", border: "none", borderRadius: "5px", cursor: "pointer", marginTop: "20px" },
        method: { padding: "10px", border: "1px solid #333", borderRadius: "5px", marginBottom: "10px", cursor: "pointer", display: "flex", justifyContent: "space-between", color: "#fff" },
        activeMethod: { border: `1px solid #D4AF37`, background: "rgba(212, 175, 55, 0.1)" }
    };

    return (
        <div style={dynamicStyles.container}>
            <div style={dynamicStyles.card}>
                <h2 style={dynamicStyles.title}>Secure Payment</h2>

                <div style={dynamicStyles.row}>
                    <span>Plan:</span>
                    <span style={{ fontWeight: "bold" }}>{plan}</span>
                </div>
                <div style={dynamicStyles.row}>
                    <span>Total:</span>
                    <span style={{ fontSize: "1.5rem", color: "#D4AF37" }}>{price}</span>
                </div>

                {/* STEP 1: SELECT METHOD */}
                {step === 1 && (
                    <>
                        <h4 style={{ marginTop: "20px", color: "#aaa" }}>Select Payment Method</h4>

                        <div
                            style={{ ...dynamicStyles.method, ...(paymentMethod === 'card' ? dynamicStyles.activeMethod : {}) }}
                            onClick={() => setPaymentMethod('card')}
                        >
                            <span>💳 Credit/Debit Card</span>
                            {paymentMethod === 'card' && <span>●</span>}
                        </div>

                        <div
                            style={{ ...dynamicStyles.method, ...(paymentMethod === 'upi' ? dynamicStyles.activeMethod : {}) }}
                            onClick={() => setPaymentMethod('upi')}
                        >
                            <span>📱 UPI (GPay/PhonePe)</span>
                            {paymentMethod === 'upi' && <span>●</span>}
                        </div>

                        <div
                            style={{ ...dynamicStyles.method, ...(paymentMethod === 'netbanking' ? dynamicStyles.activeMethod : {}) }}
                            onClick={() => setPaymentMethod('netbanking')}
                        >
                            <span>🏦 Net Banking</span>
                            {paymentMethod === 'netbanking' && <span>●</span>}
                        </div>

                        <button style={dynamicStyles.button} onClick={() => setStep(2)}>
                            Proceed to Pay {price}
                        </button>
                    </>
                )}

                {/* STEP 2: ENTER DETAILS */}
                {step === 2 && (
                    <>
                        {paymentMethod === 'card' && (
                            <>
                                <h4 style={{ marginTop: "20px", color: "#aaa" }}>Enter Card Details</h4>
                                <input style={dynamicStyles.input} placeholder="Card Number (XXXX XXXX XXXX XXXX)" />
                                <div style={{ display: "flex", gap: "10px" }}>
                                    <input style={dynamicStyles.input} placeholder="MM/YY" />
                                    <input style={dynamicStyles.input} placeholder="CVV" />
                                </div>
                                <input style={dynamicStyles.input} placeholder="Cardholder Name" />
                            </>
                        )}

                        {paymentMethod === 'upi' && (
                            <>
                                <h4 style={{ marginTop: "20px", color: "#aaa" }}>Enter UPI ID</h4>
                                <input style={dynamicStyles.input} placeholder="username@upi" />
                            </>
                        )}

                        {paymentMethod === 'netbanking' && (
                            <>
                                <h4 style={{ marginTop: "20px", color: "#aaa" }}>Select Bank</h4>
                                <select style={dynamicStyles.input}>
                                    <option>HDFC Bank</option>
                                    <option>SBI</option>
                                    <option>ICICI Bank</option>
                                    <option>Axis Bank</option>
                                </select>
                            </>
                        )}

                        <button style={dynamicStyles.button} onClick={() => setStep(3)}>
                            Continue Securely
                        </button>
                        <div style={{ marginTop: "10px", textAlign: "center", fontSize: "0.8rem", cursor: "pointer", color: "#aaa" }} onClick={() => setStep(1)}>← Change Method</div>
                    </>
                )}

                {/* STEP 3: SECURITY PIN / PROCESSING */}
                {step === 3 && (
                    <>
                        <h4 style={{ marginTop: "20px", color: "#aaa" }}>Enter Security PIN</h4>
                        <p style={{ fontSize: "0.8rem", color: "#aaa" }}>An OTP/Pin has been sent to your mobile.</p>
                        <input style={{ ...dynamicStyles.input, textAlign: "center", fontSize: "1.5rem", letterSpacing: "10px" }} type="password" placeholder="••••" maxLength="4" />

                        <button style={dynamicStyles.button} onClick={handlePayment} disabled={processing}>
                            {processing ? "Processing..." : `Confirm Payment`}
                        </button>
                    </>
                )}

            </div>
        </div>
    );
}

export default PaymentPage;
