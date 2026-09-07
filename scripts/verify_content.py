import os
import re

def verify():
    with open('index.html', 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Verify section order
    sections = [
        ('01 Hero', 'hero'),
        ('02 Challenge', 'the-challenge'),
        ('03 What Is Locana', 'what-is-locana'),
        ('04 Platform Wheel', 'platform-wheel'),
        ('05 Who We Connect', 'who-we-connect'),
        ('06 Capabilities', 'services-capabilities'),
        ('07 How It Works', 'how-it-works'),
        ('08 Local Node', 'local-node'),
        ('09 Why Trust Us', 'why-trust-us'),
        ('10 Numbers', 'numbers-metrics'),
        ('11 Impact', 'our-impact'),
        ('12 Ready CTA', 'ready-cta')
    ]

    last_idx = -1
    for name, s_id in sections:
        idx = html.find(f'id="{s_id}"')
        if idx == -1:
            print(f'FAIL: section {name} (id="{s_id}") not found')
            return False
        elif idx < last_idx:
            print(f'FAIL: section {name} out of sequence (at {idx} < {last_idx})')
            return False
        else:
            last_idx = idx
            print(f'PASS: {name} (id="{s_id}") in sequence at pos {idx}')

    # Check footer exists after ready-cta
    footer_idx = html.find('<footer class="site-footer">')
    if footer_idx < last_idx:
        print('FAIL: footer not after ready-cta')
        return False
    print('PASS: 13 Footer in sequence')

    # 2. Check 7 platform pillars
    pillars = ['ground-truth', 'access', 'connect', 'reach', 'roots', 'sage', 'elevate']
    for p in pillars:
        if f'data-pillar="{p}"' not in html:
            print(f'FAIL: pillar {p} missing in index.html')
            return False
    print('PASS: All 7 platform pillars present in Section 04')

    # 3. Check 5 Local Node pillars
    for node_elem in ['People', 'Skills', 'Technology', 'Assets', 'Trust']:
        if node_elem not in html[html.find('id="local-node"'):html.find('id="why-trust-us"')]:
            print(f'FAIL: local node element {node_elem} missing in Section 08')
            return False
    print('PASS: All 5 Local Node pillars present in Section 08')

    # 4. Banned claims audit
    banned = ['100% fpic', 'cryptographic gps', 'zero-curbstoning', 'full dpdp/gdpr compliance', 'sub-meter gps']
    files_to_check = ['index.html', 'about.html', 'services.html', 'pricing.html', 'contact.html', 'scripts/main.js']
    for fname in files_to_check:
        with open(fname, 'r', encoding='utf-8') as f:
            content = f.read().lower()
            for b in banned:
                if b in content:
                    print(f'FAIL: Banned claim "{b}" found in {fname}')
                    return False
    print('PASS: Zero prohibited/unverified absolute claims found across all pages')

    # 5. Core Numbers check
    numbers = ['2,100+', '225+', '25+', '150+']
    for n in numbers:
        if n not in html:
            print(f'FAIL: Metric "{n}" not found in index.html')
            return False
    print('PASS: All reconciled metrics verified in index.html')

    print('\nALL AUDIT CHECKS PASSED PERFECTLY!')
    return True

if __name__ == '__main__':
    verify()
