const emailTemplate = (email, subject, content, replyTo) => {
    return {
        Source: process.env.AWS_EMAIL_FROM,
        Destination: {
            ToAddresses: [email]
        },
        Message: {
            Subject: {
                Charset: "UTF-8",
                Data: subject
            },
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: `
                        <html>
                            <h1>Welcome to dreamHome!</h1>
                            ${content}
                            <p>&copy; ${new Date().getFullYear()}</p>
                        </html>
                    `
                }
            }
        }
    }
}

module.exports = emailTemplate