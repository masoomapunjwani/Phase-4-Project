import fetch from 'unfetch'

export const getAllCards =id=>fetch(`/cards/${id}`); 
export const getUser =id=>fetch(`/users/${id}`); 
export const getCurrentUser =()=>fetch(`/me`); 