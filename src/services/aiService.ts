import axios from 'axios';
import { PropertyInfo, AIResponse } from '../types';

const AI_SERVICE_URL = 'https://api.example.com/ai'; // Replace with actual AI service URL

export const processPropertyInfo = async (propertyData: PropertyInfo): Promise<AIResponse> => {
    try {
        const response = await axios.post<AIResponse>(AI_SERVICE_URL, propertyData);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error('Error processing property information: ' + error.message);
        } else {
            throw new Error('Error processing property information: Unknown error');
        }
    }
};