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

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'janisgaudreault.jg@gmail.com', // Replace with your actual email
            subject: `Nouveau message de ${prenom} ${nom}`,
            text: `
                📩 Nouveau message reçu !
                🏷️ Nom: ${nom}
                🏷️ Prénom: ${prenom}
                📧 Email: ${email}
                📞 Téléphone: ${telephone ? telephone : 'Non fourni'}
                🖼️ Souhaite acheter: ${acheter ? 'Oui' : 'Non'}
                🖼️ Œuvres sélectionnées: ${oeuvres.length > 0 ? oeuvres.map((o: { titre: any; }) => o.titre).join(', ') : 'Aucune'}
                
                ✉️ Message:
                ${message}
            `
        };

        await transporter.sendMail(mailOptions);

        return new Response('Message envoyé avec succès!', { status: 200 });
    } catch (error) {
        console.error('❌ Erreur serveur:', error);
        return new Response('Erreur serveur.', { status: 500 });
    }
};
