// Simple AI Chat Engine (Simulation Mode)
// This mimics an LLM by using keyword analysis to give "intelligent" fashion advice.

const getChatResponse = async (userMessage) => {
    const msg = userMessage.toLowerCase();

    // 1. Analyze Intent
    let response = "I'm not sure about that style. Can you try asking about 'wedding', 'casual', or 'summer' outfits?";

    if (msg.includes('wedding') || msg.includes('marriage')) {
        response = "For a wedding, I recommend our 'GlamCouture' collection. Go for Gold or Red tones with intricate embroidery. A 'Pear' body type looks stunning in a lehenga!";
    }
    else if (msg.includes('casual') || msg.includes('daily')) {
        response = "Keep it simple! A floral dress or denim combo is perfect. Check out 'NatureTrek' for breathable fabrics.";
    }
    else if (msg.includes('party') || msg.includes('night')) {
        response = "Time to shine! A Retro style with bold colors (Black/Red) works best. Don't forget accessories!";
    }
    else if (msg.includes('work') || msg.includes('office')) {
        response = "Professionalism is key. A 'Navy Blue' suit or a structured blazer from 'FormLine' commands respect.";
    }
    else if (msg.includes('summer') || msg.includes('hot')) {
        response = "Stay cool with light pastels and cotton fabrics. Our 'Summer' trend collection is live!";
    }

    // Simulate "Thinking" delay if this were a real LLM
    // await new Promise(r => setTimeout(r, 500)); 

    return { response, role: "stylist" };
};

module.exports = { getChatResponse };
