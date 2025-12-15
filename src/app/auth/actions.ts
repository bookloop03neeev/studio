
'use server';

import { initializeFirebase, setDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type CreateUserProfilePayload = {
    userId: string;
    firstName: string;
    lastName: string;
    displayName: string;
    email: string;
}

export async function createUserProfile(payload: CreateUserProfilePayload) {
    const { firestore } = initializeFirebase();
    const userRef = doc(firestore, 'users', payload.userId);

    const userAvatar = PlaceHolderImages.find(p => p.id === 'user-1');

    const userData = {
        id: payload.userId,
        firstName: payload.firstName,
        lastName: payload.lastName,
        displayName: payload.displayName,
        email: payload.email,
        registrationDate: new Date().toISOString(),
        photoURL: userAvatar?.imageUrl || '',
        imageHint: userAvatar?.imageHint || 'person portrait',
    };

    setDocumentNonBlocking(userRef, userData, { merge: true });
}
