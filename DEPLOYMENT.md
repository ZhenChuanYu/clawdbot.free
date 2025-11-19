# Deployment Guide for Gemini3.us

## Prerequisites

- Node.js 18+ installed
- pnpm package manager
- Domain configured (gemini3.us)

## Build for Production

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build
```

The production files will be in the `dist/` directory.

## Deployment Options

### Option 1: Static Hosting (Recommended)

Deploy to any static hosting service:

#### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

#### Cloudflare Pages
1. Connect your GitHub repository
2. Set build command: `pnpm build`
3. Set output directory: `dist`
4. Deploy

### Option 2: Traditional Web Server

#### Nginx Configuration

```nginx
server {
    listen 80;
    server_name gemini3.us www.gemini3.us;
    
    root /var/www/gemini3.us/dist;
    index index.html;
    
    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

#### Apache Configuration (.htaccess)

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

## SSL Certificate

Use Let's Encrypt for free SSL:

```bash
# Install certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d gemini3.us -d www.gemini3.us
```

## Environment Variables

If you need environment variables, create a `.env` file:

```env
VITE_API_URL=https://api.gemini3.us
VITE_GA_ID=G-XXXXXXXXXX
```

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test responsive design on mobile devices
- [ ] Check SSL certificate is working
- [ ] Verify sitemap.xml is accessible
- [ ] Test all navigation links
- [ ] Verify meta tags and SEO elements
- [ ] Test form submissions (if any)
- [ ] Check browser console for errors
- [ ] Test page load speed
- [ ] Submit sitemap to Google Search Console

## SEO Setup

1. **Google Search Console**
   - Add property for gemini3.us
   - Submit sitemap: https://gemini3.us/sitemap.xml
   - Verify ownership

2. **Google Analytics** (Optional)
   - Create GA4 property
   - Add tracking code to index.html

3. **Bing Webmaster Tools**
   - Add site
   - Submit sitemap

## Monitoring

Consider setting up:
- Uptime monitoring (UptimeRobot, Pingdom)
- Error tracking (Sentry)
- Analytics (Google Analytics, Plausible)

## Updates

To update the site:

```bash
# Pull latest changes
git pull

# Install dependencies
pnpm install

# Build
pnpm build

# Deploy new build
# (method depends on your hosting choice)
```

## Troubleshooting

### 404 Errors on Refresh
- Ensure your server is configured for SPA routing
- Check that all routes redirect to index.html

### Slow Loading
- Enable gzip compression
- Optimize images
- Use CDN for static assets

### Build Errors
- Clear node_modules and reinstall: `rm -rf node_modules && pnpm install`
- Clear build cache: `rm -rf dist`
- Check Node.js version: `node --version` (should be 18+)
