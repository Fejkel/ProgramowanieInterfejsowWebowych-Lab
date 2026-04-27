"use server";

import { updateGame, addGame } from './component/lib'
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function handleGameForm(formData) {
    const id = formData.get('id');
    const rawDescription = formData.get('description') || "";
    const descriptionArray = rawDescription
        .split('\n')
        .map(s => s.trim())
        .filter(s => s.length > 0); 

    const gameData = {
        title: formData.get('title'),
        price_pln: parseFloat(formData.get('price_pln')) || 0,
        type: formData.get('type'),
        publisher: formData.get('publisher'),
        description: descriptionArray,
        min_players: parseInt(formData.get('min_players')) || 0,
        max_players: parseInt(formData.get('max_players')) || 0,
        avg_play_time_minutes: parseInt(formData.get('avg_play_time_minutes')) || 0,
        is_expansion: formData.get('is_expansion') === 'on',

        images: JSON.parse(formData.get('current_images') || '["img/placeholder.webp"]')
    };

    if (id) {
        await updateGame(id.toString(), gameData);
    } else {
        await addGame(gameData);
    }

    revalidatePath('/'); 
    redirect('/');
}