/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'assets.suitdev.com',
                port: '',
                pathname: '/storage/files/**',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://suitmedia-backend.suitdev.com/api/:path*',
            },
        ]
    },
}

module.exports = nextConfig 