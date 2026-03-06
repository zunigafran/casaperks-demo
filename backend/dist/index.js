"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const residents_1 = __importDefault(require("./routes/residents"));
const giftcards_1 = __importDefault(require("./routes/giftcards"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middleware
app.use((0, cors_1.default)({ origin: 'http://localhost:5173' }));
app.use(express_1.default.json());
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/residents', residents_1.default);
app.use('/api/giftcards', giftcards_1.default);
// Health check
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
app.listen(PORT, () => {
    console.log(`\n🏠 CasaPerks API running on http://localhost:${PORT}`);
    console.log(`📋 Demo credentials: alex@casaperks.com / demo123\n`);
});
exports.default = app;
