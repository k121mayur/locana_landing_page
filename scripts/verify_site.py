import os
import re

html_files = ['index.html', 'about.html', 'services.html', 'pricing.html', 'contact.html']
all_ok = True

for fname in html_files:
    if not os.path.exists(fname):
        print(f'ERROR: Missing file {fname}')
        all_ok = False
        continue
    
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Check referenced local files
    matches = re.findall(r'(?:src|href)=["\']([^"\']+)["\']', content)
    for m in matches:
        if m.startswith('http://') or m.startswith('https://') or m.startswith('#') or m.startswith('mailto:') or m.startswith('tel:'):
            continue
        clean = m.split('?')[0].split('#')[0]
        if clean and not os.path.exists(clean):
            print(f'In {fname}: Missing asset -> {clean}')
            all_ok = False

if all_ok:
    print('SUCCESS: All 5 HTML pages and referenced local assets verified with 0 broken links!')
