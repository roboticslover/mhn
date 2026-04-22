import math

def generate_svg():
    width = 400
    height = 320
    cx = 200
    cy = 160

    svg = []
    svg.append(f'<svg width="{width}" height="{height}" viewBox="0 0 {width} {height}" fill="none" xmlns="http://www.w3.org/2000/svg">')
    
    # We will use the currentColor for stroke and fill but with opacity so it works with themes
    # The image is glowing green. The primary color in theme is likely green.
    # To make it "ditto same", we could just use the exact green: #00FF66 or similar.
    # But user said "compatible with both themes". Using `currentColor` is best if we want it to adapt, 
    # but maybe we should use a fixed color if the original image has a very specific green glow.
    # Actually, if we use `#00FF55` and just make it semi-transparent, it will look good on dark theme. 
    # On light theme, maybe a slightly darker green? 
    # Let's use `currentColor` and set the color in the React Native component.
    # React Native SVG allows setting `color` prop which maps to `currentColor`.

    # Wait, the prompt says "compatible with both themes", let's use the green color from the image, but maybe we can just make it partially transparent so it works. 
    # Or I can use `currentColor`. Let's use `#00E676` as the base color, which is a bright glowing green.

    svg.append('<defs>')
    # Glow filter
    svg.append('''
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        <radialGradient id="dotGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF" stop-opacity="1" />
            <stop offset="30%" stop-color="#00FF66" stop-opacity="0.8" />
            <stop offset="100%" stop-color="#00FF66" stop-opacity="0" />
        </radialGradient>
    ''')
    svg.append('</defs>')

    # Group for the ellipses
    svg.append(f'<g transform="translate({cx}, {cy})">')

    # Draw 12 ellipses
    # Let's adjust parameters to match the image
    rx = 45
    ry = 110
    
    for i in range(12):
        angle = i * 30
        # The petal has a stroke and a very transparent fill
        svg.append(f'<ellipse rx="{rx}" ry="{ry}" transform="rotate({angle})" ' +
                   'stroke="#00FF66" stroke-width="1.5" stroke-opacity="0.8" ' +
                   'fill="#00FF66" fill-opacity="0.05" filter="url(#glow)"/>')

    # Draw the inner and outer glowing dots
    # The intersections of these ellipses create the glowing dots
    # Let's approximate the radius for the dots
    # The tips of the ellipses are at ry = 110. The dots are slightly inside the tips.
    inner_r = 40
    outer_r = 105

    for i in range(12):
        angle = i * 30
        rad = math.radians(angle)
        
        # Outer dots (at the tips)
        x_out = outer_r * math.cos(rad)
        y_out = outer_r * math.sin(rad)
        svg.append(f'<circle cx="{x_out}" cy="{y_out}" r="6" fill="url(#dotGlow)"/>')
        svg.append(f'<circle cx="{x_out}" cy="{y_out}" r="1.5" fill="#FFFFFF"/>')

        # Inner dots
        x_in = inner_r * math.cos(rad)
        y_in = inner_r * math.sin(rad)
        svg.append(f'<circle cx="{x_in}" cy="{y_in}" r="4" fill="url(#dotGlow)"/>')
        svg.append(f'<circle cx="{x_in}" cy="{y_in}" r="1" fill="#FFFFFF"/>')

    svg.append('</g>')
    svg.append('</svg>')

    with open('d:/0.MyHealthNotion/App_V2/assets/analytics_insights.svg', 'w') as f:
        f.write('\\n'.join(svg))

generate_svg()
