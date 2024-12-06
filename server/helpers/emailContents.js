const activateAccount = (token) => {
    return `
        <p>We are glad to have you with us.</p>
        <p>Click on the link below to activate your account and start looking for your dream home.</p>
        <a href="${process.env.CLIENT_URL}/auth/account-activate/${token}">Activate my account</a>
    `
}

const forgotPassword = (token) => {
    return `
        <p>Reset your password now.</p>
        <p>Click on the link below and reset you password</p>
        <a href="${process.env.CLIENT_URL}/auth/access-account/${token}">Reset my password</a>
    `
}

module.exports = {
    activateAccount,
    forgotPassword
}