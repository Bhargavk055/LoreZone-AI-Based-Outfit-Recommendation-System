// Vector-based Recommendation Engine "Smart Match"
// This service implements a content-based filtering algorithm from scratch.

const calculateCosineSimilarity = (vecA, vecB) => {
    const dotProduct = vecA.reduce((acc, val, i) => acc + val * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((acc, val) => acc + val * val, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((acc, val) => acc + val * val, 0));

    if (magnitudeA === 0 || magnitudeB === 0) return 0;
    return dotProduct / (magnitudeA * magnitudeB);
};

// Convert categorical data to numerical vector representation
// Vector Schema: [SkinToneIndex, BodyTypeIndex, HeightNorm, OccasionIndex, ThemeIndex]
const getVector = (data) => {
    // Encoders (Mapping string values to numbers)
    const skinTones = { 'Fair': 0.2, 'Medium': 0.5, 'Olive': 0.7, 'Dark': 1.0 };
    const bodyTypes = { 'Slim': 0.2, 'Athletic': 0.4, 'Hourglass': 0.6, 'Pear': 0.8, 'Apple': 1.0 };
    const occasions = { 'Casual': 0.1, 'Work': 0.3, 'Party': 0.5, 'Wedding': 0.8, 'Vacation': 0.9 };
    const themes = { 'Nature': 0.1, 'City': 0.3, 'Retro': 0.5, 'Vintage': 0.7, 'Classic': 0.9 };

    return [
        skinTones[data.skin_tone] || 0.5, // Default to medium
        bodyTypes[data.body_type] || 0.5, // Default to average
        (parseFloat(data.height) || 170) / 200, // Normalize height (assuming max 200cm)
        occasions[data.occasion] || 0.5,
        themes[data.theme] || 0.5
    ];
};

const getRecommendations = (userPreferences, allOutfits) => {
    const userVector = getVector(userPreferences);

    // Filter by Gender first (Hard Filter)
    console.log("Filtering for Gender:", userPreferences.gender);

    const filteredOutfits = allOutfits.filter(outfit => {
        const userGender = (userPreferences.gender || '').trim().toLowerCase();
        const outfitGender = (outfit.gender || '').trim().toLowerCase();

        // If no gender selected, show all
        if (!userGender || userGender === 'select') return true;

        const isMatch = outfitGender === userGender || outfitGender === 'unisex';
        // console.log(`Comparing [${outfitGender}] with [${userGender}] -> ${isMatch}`);
        return isMatch;
    });

    const scoredOutfits = filteredOutfits.map(outfit => {
        const outfitVector = getVector(outfit);
        const similarityScore = calculateCosineSimilarity(userVector, outfitVector);
        return { ...outfit, match_score: similarityScore };
    });

    // Return top 5 matches sorted by score
    return scoredOutfits.sort((a, b) => b.match_score - a.match_score).slice(0, 5);
};

module.exports = { getRecommendations };
