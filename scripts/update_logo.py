import os
import base64
import io
from PIL import Image

src_img = 'assets/images/locana-symbol.png'
if not os.path.exists(src_img):
    raise FileNotFoundError(f'{src_img} not found')

img = Image.open(src_img)

# 1. High-res 256x256 for crisp SVG display
img_256 = img.resize((256, 256), Image.Resampling.LANCZOS)
buf = io.BytesIO()
img_256.save(buf, format='PNG', optimize=True)
b64_str = base64.b64encode(buf.getvalue()).decode('utf-8')

# 2. Update locana-logo.svg (for light backgrounds like header)
svg_light = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 56" fill="none">
  <!-- Locana Location & People Emblem -->
  <g transform="translate(4, 4)">
    <image href="data:image/png;base64,{b64_str}" width="48" height="48" />
  </g>
  
  <!-- Wordmark -->
  <text x="62" y="32" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="23" font-weight="800" letter-spacing="-0.03em" fill="#0F172A">LOCANA</text>
  <text x="63" y="44" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" letter-spacing="0.1em" fill="#173E9A">GROUND TRUTH NETWORK</text>
</svg>'''

with open('assets/images/locana-logo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_light)

# 3. Update locana-logo-white.svg (for dark backgrounds like footer)
svg_dark = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 56" fill="none">
  <!-- Locana Location & People Emblem -->
  <g transform="translate(4, 4)">
    <image href="data:image/png;base64,{b64_str}" width="48" height="48" />
  </g>
  
  <!-- Wordmark -->
  <text x="62" y="32" font-family="'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="23" font-weight="800" letter-spacing="-0.03em" fill="#FFFFFF">LOCANA</text>
  <text x="63" y="44" font-family="'JetBrains Mono', monospace" font-size="8.5" font-weight="600" letter-spacing="0.1em" fill="#60A5FA">GROUND TRUTH NETWORK</text>
</svg>'''

with open('assets/images/locana-logo-white.svg', 'w', encoding='utf-8') as f:
    f.write(svg_dark)

# 4. Update favicon.svg
svg_favicon = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
  <image href="data:image/png;base64,{b64_str}" width="64" height="64" />
</svg>'''

with open('assets/images/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_favicon)

print('Generated locana-logo.svg, locana-logo-white.svg, and favicon.svg successfully!')
