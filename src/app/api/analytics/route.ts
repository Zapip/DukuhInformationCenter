import { BetaAnalyticsDataClient } from '@google-analytics/data';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const analyticsDataClient = new BetaAnalyticsDataClient({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            },
        });

        const propertyId = process.env.GOOGLE_ANALYTICS_PROPERTY_ID;

        if (!propertyId) {
            return NextResponse.json(
                { error: 'Property ID tidak ditemukan' },
                { status: 500 }
            );
        }

        const [response] = await analyticsDataClient.runReport({
            property: `properties/${propertyId}`,
            dateRanges: [
                {
                    startDate: '2025-01-10',
                    endDate: 'today',
                },
            ],
            metrics: [
                {
                    name: 'totalUsers',
                },
                // { name: 'activeUsers' },
                // {
                //     name:'sessionsNewUsers'
                // }
            ],
        });

        const totalVisitors = response.rows?.[0]?.metricValues?.[0]?.value || '0';
        // const activeUsers = response.rows?.[0]?.metricValues?.[1]?.value || '0';
        // const newUsers = response.rows?.[0]?.metricValues?.[2]?.value || '0';

        return NextResponse.json({
            totalVisitors: parseInt(totalVisitors),
            //   activeUsers: parseInt(activeUsers),
            // newUsers: parseInt(newUsers),

            success: true,
        });
    } catch (error) {
        console.error('Error fetching analytics data:', error);
        return NextResponse.json(
            { error: 'Gagal mengambil data analytics', details: error },
            { status: 500 }
        );
    }
}

export const revalidate = 3600; 