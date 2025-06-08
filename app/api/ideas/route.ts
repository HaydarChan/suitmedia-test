import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    
    const pageNumber = searchParams.get('page[number]') || '1';
    const pageSize = searchParams.get('page[size]') || '10';
    const sort = searchParams.get('sort') || '-published_at';
    
    const apiUrl = new URL('https://suitmedia-backend.suitdev.com/api/ideas');
    apiUrl.searchParams.append('page[number]', pageNumber);
    apiUrl.searchParams.append('page[size]', pageSize);
    apiUrl.searchParams.append('append[]', 'small_image');
    apiUrl.searchParams.append('append[]', 'medium_image');
    apiUrl.searchParams.append('sort', sort);

    try {
        const response = await fetch(apiUrl.toString(), {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data)
        return NextResponse.json(data);
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch ideas' },
            { status: 500 }
        );
    }
} 