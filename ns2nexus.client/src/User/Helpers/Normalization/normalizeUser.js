const normalizeUser = (user) => ({
    email: user.email,
    password: user.password,
    steamId: user.steamId,
});

export default normalizeUser;
