export function validateName(name: string): string | null {
    if (!name.trim()) return "Ce champ est requis.";
    if (name.length < 3) return "Le nom doit contenir au moins 3 caractères.";
    return null;
}

export function validateEmail(email: string): string | null {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return "L'email est requis.";
    if (!emailRegex.test(email)) return "Veuillez entrer une adresse email valide.";
    return null;
}

export function validatePhone(phone: string): string | null {
    const phoneRegex = /^[0-9\-\+\s]{8,15}$/;
    if (phone && !phoneRegex.test(phone)) return "Numéro de téléphone invalide.";
    return null;
}

export function validateMessage(message: string): string | null {
    if (!message.trim()) return "Le message ne peut pas être vide.";
    if (message.length < 10) return "Le message doit contenir au moins 10 caractères.";
    return null;
}
