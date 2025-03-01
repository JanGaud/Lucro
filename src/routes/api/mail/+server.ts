import type { RequestHandler } from '@sveltejs/kit';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const POST: RequestHandler = async ({ request }) => {
    try {
        const { prenom, nom, email, telephone, acheter, oeuvres, message } = await request.json();

        if (!prenom || !nom || !email || !message) {
            return new Response('Veuillez remplir tous les champs obligatoires.', { status: 400 });
        }

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT || '465'),
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        // Verify SMTP Connection
        try {
            await transporter.verify();
            console.log('✅ SMTP Connection Successful');
        } catch (smtpError) {
            console.error('❌ SMTP Connection Failed:', smtpError);
            return new Response('Erreur SMTP.', { status: 500 });
        }

        // Define the HTML email
        const htmlContent = `
            <html>
                <body>
                    <h1 style="color: #333;">Nouveau Message de ${prenom} ${nom}</h1>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Téléphone:</strong> ${telephone || 'Non fourni'}</p>
                    <p><strong>Souhaite acheter:</strong> ${acheter ? 'Oui' : 'Non'}</p>
                    <p><strong>Œuvres sélectionnées:</strong> ${oeuvres.length > 0 ? oeuvres.map(o => o.titre).join(', ') : 'Aucune'}</p>
                    <h2>Message:</h2>
                    <p>${message.replace(/\n/g, '<br>')}</p>
                </body>
            </html>
        `;

        // Email options with HTML content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Nouveau message de ${prenom} ${nom}`,
            html: htmlContent
        };

        await transporter.sendMail(mailOptions);

        return new Response('Message envoyé avec succès!', { status: 200 });
    } catch (error) {
        console.error('❌ Erreur serveur:', error);
        return new Response('Erreur serveur.', { status: 500 });
    }
};
