
// emailVerification.js
const emailverification = (url, email) => {
  return `
    <!DOCTYPE html>
    <html>
    
    <head>
        <meta charset="UTF-8">
        <title>Please verify your email...</title>
        <style>
             body {
                 background-color: #ffffff;
                 font-family: Arial, sans-serif;
                 font-size: 16px;
                 line-height: 1.4;
                 color: #333333;
                 margin: 0;
                 padding: 0;
             }

             .container {
                 max-width: 600px;
                 margin: 0 auto;
                 padding: 20px;
                 text-align: center;
             }

             .logo {
                 max-width: 200px;
                 margin-bottom: 20px;
             }

             .message {
                 font-size: 18px;
                 font-weight: bold;
                 margin-bottom: 20px;
             }

             .body {
                 font-size: 16px;
                 margin-bottom: 20px;
             }

             .cta {
                 display: inline-block;
                 padding: 10px 20px;
                 background-color: #FFD60A;
                 color: #000000;
                 text-decoration: none;
                 border-radius: 5px;
                 font-size: 16px;
                 font-weight: bold;
                 margin-top: 20px;
             }

             .support {
                 font-size: 14px;
                 color: #999999;
                 margin-top: 20px;
             }
             .highlight {
                 font-weight: bold;
             }
             .highlight-yellow {
                color: yellow;
            }
         </style>
    
    </head>
    
    <body>
        <div class="container">
            
            <div class="message">Please verify your email...</div>
            <div>
            <div>
                             <img src="data:image/png;base64,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" alt="">
                         </div>
            </div>
            <div class="body">
                <p>Please verify your email address. We've sent a confirmation email to:</p>
                <p>${email}</p>
                <p>Click the confirmation link in that email to begin using Dribbble.</p>
                <a href="${url}" class="cta">Verify Email</a>
                <p>Didn't receive the email? Check your Spam folder, it may have been caught by a filter. If you still don't see it, you can <span>resend the confirmation email.</span></p>
                <p>Wrong email address? <a href="https://aquamarine-choux-e4af92.netlify.app/auth/signup" class="highlight-yellow">Change it.</a></p>


                <p>Wrong email address? <a href="https://www.flipkart.com/all/~cs-89a4af89beda2604cb8435b235dee6f1/pr?sid=clo,ash,ank,edy&marketplace=FLIPKART&restrictLocale=true" class="highlight-yellow">Change it.</a></p>

</div>
        </div>
    </body>
    
    </html>
    `;
};

module.exports = emailverification;
