const express = require('express');
const app = express();
app.use(express.json());

let activeCampaigns = [{
    ad_id: "ad_001",
    ad_title: "Dream Cricket Academy",
    image_url: "https://yourdomain.com/assets/cricket_banner.png",
    target_url: "https://play.google.com/store/apps/details?id=com.example.cricket",
    ad_type: "banner",
    clicks: 0,
    impressions: 0
}];

app.get('/api/v1/fetch-ad', (req, res) => {
    const { ad_unit_id } = req.query;
    if (!ad_unit_id) return res.status(400).json({ success: false, message: "Ad Unit ID missing!" });
    activeCampaigns[0].impressions++;
    res.json({ success: true, ad_id: activeCampaigns[0].ad_id, image_url: activeCampaigns[0].image_url, click_url: `http://localhost:3000/api/v1/click-ad?ad_id=${activeCampaigns[0].ad_id}&unit_id=${ad_unit_id}` });
});

app.get('/api/v1/click-ad', (req, res) => {
    const { ad_id, unit_id } = req.query;
    const ad = activeCampaigns.find(item => item.ad_id === ad_id);
    if (ad) { ad.clicks++; res.redirect(ad.target_url); } else { res.status(404).send("Ad Not Found"); }
});

app.listen(3000, () => console.log(`🚀 Ad Network Server running on http://localhost:3000`));
