# Joyee Game Studio Website

A professional game development studio website built for deployment on Cloudflare Pages.

## 🌐 Multi-Language Support

This website is available in:
- **English** (`index.html`)
- **中文简体** (`index-zh.html`)

Users can easily switch between languages using the language switcher in the top-right corner.

## 🚀 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Multi-Language**: Support for English and Chinese (久夷资产)
- **Responsive**: Fully responsive design that works on all devices
- **Fast Loading**: Optimized for performance with Cloudflare's global CDN
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Interactive**: Smooth scrolling, form validation, and engaging animations
- **Secure**: Security headers and best practices implemented
- **Game-Focused**: Tailored specifically for showcasing game development services

## 📁 Project Structure

```
joyeeassets/
├── index.html          # Main HTML file (English)
├── index-zh.html       # Chinese version
├── styles.css          # CSS styles and responsive design
├── script.js           # JavaScript functionality
├── wrangler.toml       # Cloudflare configuration
├── _redirects          # Redirect rules
├── package.json        # Project configuration
└── README.md          # This file
```

## 🛠 Deployment on Cloudflare Pages

### Method 1: Cloudflare Dashboard (Recommended)

1. **Login to Cloudflare Dashboard**
   - Go to [dash.cloudflare.com](https://dash.cloudflare.com)
   - Navigate to "Pages" in the sidebar

2. **Create a New Project**
   - Click "Create a project"
   - Choose "Upload assets" (for direct upload)
   - Or connect your Git repository if you have one

3. **Upload Files**
   - Upload all files from this directory
   - Set build command: (leave empty for static site)
   - Set output directory: `/` (root)

4. **Configure Custom Domain**
   - Go to "Custom domains" tab
   - Add `joyeeassets.net` and `www.joyeeassets.net`
   - Follow DNS configuration instructions

### Method 2: Wrangler CLI

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Deploy the Site**
   ```bash
   wrangler pages deploy . --project-name joyeeassets
   ```

## 🔧 Local Development

### Using Python (Simple HTTP Server)
```bash
python -m http.server 8000
```
Then visit `http://localhost:8000`

### Using Node.js (if you have it installed)
```bash
npm install -g http-server
http-server . -p 8000
```

### Using Wrangler (Cloudflare local development)
```bash
npm install
npm run dev
```

## 📝 Customization

### Content Updates
- Edit `index.html` and `index-zh.html` to update text content, contact information, and structure
- Modify `styles.css` to change colors, fonts, and layout
- Update `script.js` to add new interactive features

### Branding
- Logo image: `JoyeeLOGO.jpg` (teal background with "Joyee" and "久夷资产" text)
- Update color scheme in `styles.css` (search for color variables)
- Modify the hero section background gradient

### Contact Information
Update the contact details in the contact section:
- Email: `hello@joyee.games`
- Game Inquiries: `games@joyee.games`
- Website: `www.joyee.games`

## 🔒 Security Features

- Content Security Policy headers
- XSS protection
- Frame options to prevent clickjacking
- Secure referrer policy
- Permissions policy for enhanced privacy

## 📊 Performance Optimizations

- Minified and optimized CSS
- Efficient JavaScript with event delegation
- Lazy loading animations
- Optimized images and assets
- CDN delivery through Cloudflare

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📞 Support

For technical support or customization requests, please contact:
- Email: hello@joyee.games
- Game Inquiries: games@joyee.games
- Website: https://www.joyee.games

## 🎮 About

Joyee (久夷) is a creative game development studio dedicated to bringing joy and entertainment to players around the world. We specialize in:
- Game design and development
- Cross-platform game solutions
- UI/UX design for games
- Game deployment and maintenance

## 📄 License

This project is licensed under the MIT License - see the package.json file for details.

---

**Built with ❤️ for Joyee Game Studio**
