#!/usr/bin/env python3
from pathlib import Path
import json, math

root = Path("/workspace/vaphia")
out = root / "public" / "coloring"
out.mkdir(parents=True, exist_ok=True)

def star(cx, cy, r):
    pts = []
    for i in range(10):
        a = -math.pi / 2 + i * math.pi / 5
        rad = r if i % 2 == 0 else r * 0.42
        pts.append(f"{cx + math.cos(a) * rad:.1f},{cy + math.sin(a) * rad:.1f}")
    return f'<polygon points="{" ".join(pts)}"/>'

def heart(cx, cy, s=1):
    return (f'<path d="M{cx} {cy + 38*s} C{cx - 90*s} {cy - 10*s}, {cx - 70*s} {cy - 90*s}, {cx} {cy - 42*s} '
            f'C{cx + 70*s} {cy - 90*s}, {cx + 90*s} {cy - 10*s}, {cx} {cy + 38*s} Z"/>')

def balloon(cx, cy):
    return (f'<ellipse cx="{cx}" cy="{cy}" rx="80" ry="100"/>'
            f'<path d="M{cx} {cy + 100} l-10 18 h20 z"/>'
            f'<path d="M{cx} {cy + 118} q-12 40 0 80" fill="none"/>')

def sun(cx, cy, r):
    rays = []
    for i in range(10):
        a = i * math.pi / 5
        rays.append(
            f'<line x1="{cx + math.cos(a)*(r+12):.1f}" y1="{cy + math.sin(a)*(r+12):.1f}" '
            f'x2="{cx + math.cos(a)*(r+48):.1f}" y2="{cy + math.sin(a)*(r+48):.1f}"/>'
        )
    return f'<circle cx="{cx}" cy="{cy}" r="{r}"/>' + "".join(rays)

def flower(cx, cy, s=1):
    petals = []
    for i in range(6):
        petals.append(
            f'<ellipse cx="{cx}" cy="{cy - 70*s}" rx="{28*s}" ry="{52*s}" transform="rotate({i*60} {cx} {cy})"/>'
        )
    return "".join(petals) + f'<circle cx="{cx}" cy="{cy}" r="{36*s}"/>'

def cupcake(cx, cy, s=1):
    return (
        f'<path d="M{cx-70*s} {cy} h{140*s} l{-20*s} {90*s} h{-100*s} z"/>'
        f'<ellipse cx="{cx}" cy="{cy}" rx="{80*s}" ry="{40*s}"/>'
        f'<circle cx="{cx-24*s}" cy="{cy-18*s}" r="{18*s}"/>'
        f'<circle cx="{cx+18*s}" cy="{cy-28*s}" r="{20*s}"/>'
        f'<circle cx="{cx}" cy="{cy-8*s}" r="{16*s}"/>'
        f'<circle cx="{cx}" cy="{cy-58*s}" r="{14*s}"/>'
    )

def cloud(cx, cy, s=1):
    return (
        f'<ellipse cx="{cx-50*s}" cy="{cy}" rx="{60*s}" ry="{40*s}"/>'
        f'<ellipse cx="{cx+40*s}" cy="{cy+6*s}" rx="{70*s}" ry="{46*s}"/>'
        f'<ellipse cx="{cx}" cy="{cy-28*s}" rx="{50*s}" ry="{36*s}"/>'
    )

def face(cx, cy, who="sophia"):
    if who == "sophia":
        hair = f'<path d="M{cx-90} {cy-10} q40 -110 90 -110 q50 0 90 110"/>'
    else:
        hair = f'<path d="M{cx-86} {cy} q20 -120 86 -120 q66 0 86 120"/>'
    return (
        f'<circle cx="{cx}" cy="{cy}" r="92"/>{hair}'
        f'<circle cx="{cx-28}" cy="{cy-8}" r="8"/>'
        f'<circle cx="{cx+28}" cy="{cy-8}" r="8"/>'
        f'<path d="M{cx-22} {cy+28} q22 18 44 0" fill="none"/>'
    )

def house(cx, cy, s=1):
    return (
        f'<rect x="{cx-80*s}" y="{cy-10*s}" width="{160*s}" height="{120*s}" rx="8"/>'
        f'<path d="M{cx-100*s} {cy-10*s} L{cx} {cy-110*s} L{cx+100*s} {cy-10*s} Z"/>'
        f'<rect x="{cx-18*s}" y="{cy+30*s}" width="{36*s}" height="{80*s}"/>'
        f'<circle cx="{cx-40*s}" cy="{cy+20*s}" r="{16*s}"/>'
        f'<circle cx="{cx+40*s}" cy="{cy+20*s}" r="{16*s}"/>'
    )

def apple(cx, cy, s=1):
    return (
        f'<circle cx="{cx}" cy="{cy}" r="{70*s}"/>'
        f'<path d="M{cx} {cy-70*s} q10 {-40*s} 36 {-50*s}" fill="none"/>'
        f'<ellipse cx="{cx+28*s}" cy="{cy-78*s}" rx="{22*s}" ry="{12*s}"/>'
    )

def bunny(cx, cy, s=1):
    return (
        f'<ellipse cx="{cx-28*s}" cy="{cy-90*s}" rx="{18*s}" ry="{50*s}"/>'
        f'<ellipse cx="{cx+28*s}" cy="{cy-90*s}" rx="{18*s}" ry="{50*s}"/>'
        f'<circle cx="{cx}" cy="{cy}" r="{70*s}"/>'
        f'<circle cx="{cx-22*s}" cy="{cy-6*s}" r="7"/>'
        f'<circle cx="{cx+22*s}" cy="{cy-6*s}" r="7"/>'
        f'<ellipse cx="{cx}" cy="{cy+18*s}" rx="8" ry="6"/>'
    )

def moon(cx, cy, r):
    return f'<path d="M{cx+20} {cy-r} a{r} {r} 0 1 0 0 {r*2} a{r*0.72:.1f} {r*0.72:.1f} 0 1 1 0 -{r*2}"/>'

def gift(cx, cy, s=1):
    return (
        f'<rect x="{cx-70*s}" y="{cy-20*s}" width="{140*s}" height="{110*s}" rx="10"/>'
        f'<rect x="{cx-80*s}" y="{cy-50*s}" width="{160*s}" height="{36*s}" rx="8"/>'
        f'<rect x="{cx-10*s}" y="{cy-50*s}" width="{20*s}" height="{140*s}"/>'
        f'<path d="M{cx} {cy-50*s} q{-30*s} {-40*s} {-50*s} -8"/>'
        f'<path d="M{cx} {cy-50*s} q{30*s} {-40*s} {50*s} -8"/>'
    )

def tree(cx, cy, s=1):
    return (
        f'<rect x="{cx-16*s}" y="{cy+20*s}" width="{32*s}" height="{80*s}"/>'
        f'<circle cx="{cx}" cy="{cy-20*s}" r="{70*s}"/>'
        f'<circle cx="{cx-40*s}" cy="{cy}" r="{40*s}"/>'
        f'<circle cx="{cx+42*s}" cy="{cy}" r="{38*s}"/>'
    )

def boat(cx, cy, s=1):
    return (
        f'<path d="M{cx-110*s} {cy} h{220*s} l{-30*s} {50*s} h{-160*s} z"/>'
        f'<path d="M{cx} {cy} L{cx} {cy-110*s} L{cx+80*s} {cy}"/>'
    )

def fish(cx, cy, s=1):
    return (
        f'<ellipse cx="{cx}" cy="{cy}" rx="{90*s}" ry="{50*s}"/>'
        f'<path d="M{cx-90*s} {cy} l{-50*s} -40 v80 z"/>'
        f'<circle cx="{cx+40*s}" cy="{cy-10*s}" r="8"/>'
    )

def lolly(cx, cy, s=1):
    return f'<circle cx="{cx}" cy="{cy-40*s}" r="{70*s}"/><rect x="{cx-8*s}" y="{cy+20*s}" width="{16*s}" height="{110*s}" rx="8"/>'

def wrap(title, age, stroke, body):
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 520" role="img" aria-label="{title}">
  <title>{title} — Vaphia coloring page</title>
  <rect width="600" height="520" fill="#fffefb"/>
  <rect x="18" y="18" width="564" height="484" rx="28" fill="#fff" stroke="#2c2048" stroke-width="{max(4, stroke-4)}"/>
  <text x="40" y="56" font-family="Nunito, ui-rounded, sans-serif" font-size="22" font-weight="800" fill="#2c2048">Vaphia</text>
  <text x="560" y="56" text-anchor="end" font-family="Nunito, ui-rounded, sans-serif" font-size="16" fill="#6d6280">{age}</text>
  <g fill="#fff" stroke="#2c2048" stroke-linejoin="round" stroke-linecap="round" stroke-width="{stroke}">
    {body}
  </g>
</svg>
'''

tiny = [
    ("big-star", "Big Star", star(300, 260, 150)),
    ("big-heart", "Big Heart", heart(300, 280, 1.6)),
    ("big-balloon", "Big Balloon", balloon(300, 230)),
    ("big-sun", "Big Sun", sun(300, 250, 90)),
    ("big-flower", "Big Flower", flower(300, 250, 1.4)),
    ("big-cupcake", "Big Cupcake", cupcake(300, 270, 1.4)),
    ("big-cloud", "Big Cloud", cloud(300, 250, 1.5)),
    ("sophia-smile", "Sophia Smile", face(300, 250, "sophia")),
    ("vania-smile", "Vania Smile", face(300, 250, "vania")),
    ("big-house", "Big House", house(300, 270, 1.2)),
    ("big-apple", "Big Apple", apple(300, 250, 1.4)),
    ("big-bunny", "Big Bunny", bunny(300, 260, 1.3)),
    ("two-stars", "Two Stars", star(210, 260, 110) + star(400, 270, 80)),
    ("heart-star", "Heart and Star", heart(210, 270, 1.2) + star(410, 250, 90)),
    ("big-moon", "Big Moon", moon(300, 250, 110)),
    ("simple-gift", "A Gift", gift(300, 260, 1.3)),
    ("big-tree", "Big Tree", tree(300, 280, 1.3)),
    ("simple-boat", "A Boat", boat(300, 270, 1.3)),
    ("big-fish", "A Fish", fish(300, 250, 1.3)),
    ("lolly", "A Lolly", lolly(300, 250, 1.3)),
]

def sisters_hands():
    return face(200, 250, "sophia") + face(400, 250, "vania") + heart(300, 390, 0.55)

def garden_flowers():
    return flower(140, 300, 0.8) + flower(300, 250, 1) + flower(460, 300, 0.8) + tree(300, 400, 0.5)

def park_swing():
    return (
        '<rect x="160" y="140" width="16" height="260"/>'
        '<rect x="420" y="140" width="16" height="260"/>'
        '<rect x="160" y="140" width="276" height="16"/>'
        '<rect x="230" y="320" width="140" height="24" rx="8"/>'
        '<line x1="250" y1="156" x2="250" y2="320"/>'
        '<line x1="350" y1="156" x2="350" y2="320"/>'
        + sun(480, 120, 36)
    )

def cupcake_stand():
    return cupcake(180, 280, 0.9) + cupcake(300, 250, 1) + cupcake(430, 280, 0.9) + '<rect x="120" y="390" width="360" height="28" rx="8"/>'

def star_sky():
    return moon(160, 180, 70) + star(320, 160, 40) + star(420, 220, 28) + star(500, 140, 22) + cloud(360, 340, 1) + house(180, 360, 0.7)

def play_room():
    return house(300, 220, 0.7) + bunny(160, 360, 0.7) + gift(450, 360, 0.7) + star(300, 400, 28)

def kite_day():
    return (
        '<polygon points="300,140 380,230 300,320 220,230"/>'
        '<line x1="300" y1="320" x2="240" y2="430"/>'
        + cloud(160, 160, 0.7) + cloud(470, 150, 0.6) + sun(500, 120, 30)
    )

def boat_pond():
    return boat(300, 300, 1) + fish(160, 380, 0.5) + sun(120, 130, 36) + cloud(420, 140, 0.7)

def ice_cream():
    return (
        '<path d="M220 300 h160 l-80 160 z"/>'
        '<circle cx="250" cy="250" r="46"/>'
        '<circle cx="300" cy="220" r="50"/>'
        '<circle cx="350" cy="250" r="46"/>'
    )

def paint_table():
    return (
        '<rect x="120" y="320" width="360" height="80" rx="16"/>'
        '<circle cx="200" cy="250" r="28"/>'
        '<circle cx="280" cy="250" r="28"/>'
        '<circle cx="360" cy="250" r="28"/>'
        '<rect x="430" y="180" width="18" height="140" rx="8"/>'
        + star(140, 180, 24)
    )

def story_nook():
    return (
        '<rect x="180" y="180" width="240" height="200" rx="16"/>'
        '<rect x="210" y="210" width="80" height="110"/>'
        '<rect x="310" y="210" width="80" height="110"/>'
        + cloud(300, 140, 0.5) + bunny(140, 380, 0.55)
    )

def butterfly_garden():
    return (
        flower(180, 320, 0.8) + flower(400, 300, 0.9)
        + '<ellipse cx="300" cy="180" rx="40" ry="70"/><ellipse cx="380" cy="180" rx="40" ry="70"/><circle cx="340" cy="180" r="10"/>'
    )

def train_scene():
    return (
        '<rect x="80" y="260" width="120" height="80" rx="12"/>'
        '<rect x="220" y="260" width="120" height="80" rx="12"/>'
        '<rect x="360" y="220" width="140" height="120" rx="12"/>'
        '<circle cx="120" cy="360" r="22"/>'
        '<circle cx="260" cy="360" r="22"/>'
        '<circle cx="400" cy="360" r="22"/>'
        '<circle cx="470" cy="360" r="22"/>'
        + sun(120, 120, 32)
    )

def castle():
    return (
        '<rect x="160" y="220" width="280" height="180"/>'
        '<rect x="140" y="160" width="70" height="240"/>'
        '<rect x="390" y="160" width="70" height="240"/>'
        '<polygon points="140,160 175,110 210,160"/>'
        '<polygon points="390,160 425,110 460,160"/>'
        '<rect x="270" y="300" width="60" height="100"/>'
    )

def picnic():
    return '<ellipse cx="300" cy="360" rx="180" ry="50"/>' + cupcake(240, 300, 0.6) + apple(360, 300, 0.7) + sun(120, 130, 34)

def camera_fun():
    return (
        '<rect x="180" y="200" width="240" height="160" rx="24"/>'
        '<circle cx="300" cy="280" r="50"/>'
        '<circle cx="300" cy="280" r="24"/>'
        '<rect x="220" y="170" width="70" height="36" rx="8"/>'
        + star(470, 160, 28)
    )

def tea_party():
    return (
        '<ellipse cx="300" cy="360" rx="170" ry="40"/>'
        '<path d="M230 260 h60 v50 h-60 z"/>'
        '<path d="M330 260 h60 v50 h-60 z"/>'
        '<circle cx="260" cy="230" r="22"/>'
        '<circle cx="360" cy="230" r="22"/>'
        + cupcake(300, 200, 0.45)
    )

def sandbox():
    return (
        '<rect x="120" y="280" width="360" height="130" rx="20"/>'
        + house(220, 250, 0.4)
        + '<path d="M340 250 h80 l-12 90 h-56 z"/><ellipse cx="380" cy="250" rx="40" ry="12"/>'
        + sun(470, 140, 34)
    )

def music_time():
    return (
        '<ellipse cx="240" cy="300" rx="70" ry="90"/>'
        '<rect x="360" y="180" width="30" height="180" rx="8"/>'
        '<circle cx="390" cy="360" r="36"/>'
        + star(160, 160, 24)
    )

def rainy_walk():
    return (
        cloud(220, 150, 0.8) + cloud(400, 140, 0.6)
        + '<line x1="180" y1="210" x2="160" y2="280"/>'
        + '<line x1="230" y1="220" x2="214" y2="300"/>'
        + '<line x1="400" y1="200" x2="390" y2="280"/>'
        + house(300, 340, 0.7)
    )

little = [
    ("sisters-hands", "Sisters Hold Hands", sisters_hands()),
    ("garden-flowers", "Garden Flowers", garden_flowers()),
    ("park-swing", "Park Swing", park_swing()),
    ("cupcake-stand", "Cupcake Stand", cupcake_stand()),
    ("star-sky", "Star Sky", star_sky()),
    ("play-room", "Play Room", play_room()),
    ("kite-day", "Kite Day", kite_day()),
    ("boat-pond", "Boat Pond", boat_pond()),
    ("ice-cream", "Ice Cream", ice_cream()),
    ("paint-table", "Paint Table", paint_table()),
    ("story-nook", "Story Nook", story_nook()),
    ("butterfly-garden", "Butterfly Garden", butterfly_garden()),
    ("number-train", "A Train", train_scene()),
    ("simple-castle", "A Castle", castle()),
    ("picnic", "Picnic", picnic()),
    ("camera-fun", "Camera Fun", camera_fun()),
    ("tea-party", "Tea Party", tea_party()),
    ("sandbox", "Sandbox", sandbox()),
    ("music-time", "Music Time", music_time()),
    ("rainy-walk", "Rainy Walk", rainy_walk()),
]

def tent():
    return '<path d="M180 380 L300 180 L420 380 Z"/><rect x="270" y="300" width="60" height="80"/>'

def butterfly():
    return '<ellipse cx="400" cy="180" rx="24" ry="40"/><ellipse cx="440" cy="180" rx="24" ry="40"/><circle cx="420" cy="180" r="6"/>'

def sisters_stage():
    return (
        '<rect x="80" y="340" width="440" height="70" rx="10"/>'
        '<rect x="120" y="150" width="360" height="190" rx="16"/>'
        + face(240, 250, "sophia") + face(360, 250, "vania") + star(140, 130, 22) + star(460, 130, 22) + heart(300, 400, 0.35)
    )

def magic_garden():
    return tree(140, 280, 0.8) + tree(460, 300, 0.7) + flower(260, 340, 0.6) + flower(340, 330, 0.55) + bunny(300, 380, 0.45) + butterfly() + sun(300, 120, 34)

def kitchen_baking():
    return (
        '<rect x="90" y="280" width="420" height="30"/>'
        '<rect x="120" y="310" width="110" height="120"/>'
        '<rect x="370" y="250" width="130" height="180"/>'
        + cupcake(250, 230, 0.55) + cupcake(320, 230, 0.55) + apple(180, 230, 0.45) + face(300, 160, "vania")
    )

def art_studio():
    return (
        '<rect x="140" y="160" width="200" height="160"/>'
        + flower(240, 230, 0.45)
        + '<rect x="370" y="280" width="140" height="90" rx="12"/>'
        + '<circle cx="400" cy="250" r="16"/><circle cx="440" cy="250" r="16"/><circle cx="480" cy="250" r="16"/>'
        + face(160, 380, "sophia")
    )

def playground_full():
    return park_swing() + house(120, 380, 0.35) + tree(500, 340, 0.45) + star(300, 430, 18)

def cozy_bedroom():
    return (
        '<rect x="120" y="280" width="280" height="110" rx="16"/>'
        '<rect x="120" y="250" width="80" height="50" rx="10"/>'
        + moon(460, 160, 50) + star(400, 120, 16) + star(520, 130, 12) + house(200, 180, 0.28) + bunny(430, 360, 0.45)
    )

def park_festival():
    return balloon(160, 180) + balloon(240, 160) + tent() + star(460, 140, 24) + face(300, 340, "vania")

def library_nook():
    return (
        '<rect x="100" y="140" width="70" height="260"/>'
        '<rect x="180" y="140" width="70" height="260"/>'
        '<rect x="430" y="140" width="70" height="260"/>'
        '<rect x="270" y="280" width="140" height="90" rx="12"/>'
        '<rect x="290" y="200" width="50" height="70"/>'
        '<rect x="350" y="210" width="50" height="60"/>'
    )

def treehouse():
    return (
        tree(220, 280, 1)
        + '<rect x="300" y="200" width="160" height="110" rx="8"/>'
        + '<rect x="360" y="250" width="36" height="60"/>'
        + '<line x1="250" y1="360" x2="320" y2="310"/>'
        + '<path d="M420 160 q20 -20 40 0 q-20 -8 -40 0"/><circle cx="464" cy="158" r="5"/>'
    )

def beach_day():
    return (
        '<path d="M40 340 q140 -40 260 0 q130 40 260 0 v120 h-520 z"/>'
        + sun(120, 130, 40) + boat(400, 300, 0.6)
        + '<rect x="220" y="250" width="16" height="90"/>'
        + '<polygon points="228,250 228,190 290,250"/>'
    )

def city_walk():
    return house(150, 280, 0.7) + house(300, 250, 0.9) + house(460, 290, 0.65) + sun(120, 120, 28) + cloud(400, 130, 0.5)

def birthday_party():
    return balloon(140, 170) + balloon(200, 150) + balloon(460, 170) + cupcake(300, 300, 1) + gift(160, 360, 0.7) + gift(440, 360, 0.7) + star(300, 150, 26)

def camp_stars():
    return tent() + moon(140, 140, 46) + star(80, 160, 16) + star(220, 120, 14) + star(500, 150, 20) + tree(480, 320, 0.6) + '<circle cx="300" cy="390" r="18"/>'

def music_room():
    return (
        '<rect x="120" y="220" width="220" height="140"/>'
        '<rect x="140" y="240" width="180" height="20"/>'
        '<rect x="140" y="280" width="180" height="20"/>'
        '<circle cx="430" cy="300" r="60"/>'
        '<rect x="488" y="180" width="16" height="130"/>'
        + face(200, 160, "sophia")
    )

def snow_play():
    return (
        '<circle cx="300" cy="340" r="80"/>'
        '<circle cx="300" cy="230" r="58"/>'
        '<circle cx="300" cy="150" r="40"/>'
        + house(140, 340, 0.45) + tree(470, 320, 0.55) + star(160, 120, 16)
    )

def theater_show():
    return (
        '<path d="M80 120 q80 80 0 280"/>'
        '<path d="M520 120 q-80 80 0 280"/>'
        '<rect x="160" y="160" width="280" height="200"/>'
        + face(260, 260, "sophia") + face(360, 250, "vania") + star(300, 140, 20)
    )

def market_day():
    return tent() + apple(360, 300, 0.6) + flower(450, 300, 0.45) + gift(300, 360, 0.45) + sun(500, 120, 28)

def school_garden():
    return house(160, 260, 0.8) + flower(320, 340, 0.55) + flower(390, 350, 0.5) + tree(480, 300, 0.6) + sun(120, 120, 30)

def family_dinner():
    return (
        '<ellipse cx="300" cy="330" rx="180" ry="60"/>'
        + apple(240, 300, 0.4) + cupcake(300, 290, 0.4)
        + '<rect x="340" y="270" width="40" height="50"/>'
        + face(200, 200, "sophia") + face(400, 200, "vania")
    )

def star_observatory():
    return (
        house(220, 320, 0.7)
        + '<circle cx="400" cy="220" r="70"/>'
        + '<rect x="390" y="220" width="20" height="130"/>'
        + moon(140, 140, 40) + star(500, 120, 18) + star(460, 170, 12) + star(80, 180, 14)
    )

big = [
    ("sisters-stage", "Sisters On Stage", sisters_stage()),
    ("magic-garden", "Magic Garden", magic_garden()),
    ("kitchen-baking", "Kitchen Baking", kitchen_baking()),
    ("art-studio", "Art Studio", art_studio()),
    ("playground-full", "Playground", playground_full()),
    ("cozy-bedroom", "Cozy Bedroom", cozy_bedroom()),
    ("park-festival", "Park Festival", park_festival()),
    ("library-nook", "Library Nook", library_nook()),
    ("treehouse", "Treehouse", treehouse()),
    ("beach-day", "Beach Day", beach_day()),
    ("city-walk", "City Walk", city_walk()),
    ("birthday-party", "Birthday Party", birthday_party()),
    ("camp-stars", "Camp Stars", camp_stars()),
    ("music-room", "Music Room", music_room()),
    ("snow-play", "Snow Play", snow_play()),
    ("theater-show", "Theater Show", theater_show()),
    ("market-day", "Market Day", market_day()),
    ("school-garden", "School Garden", school_garden()),
    ("family-dinner", "Family Dinner", family_dinner()),
    ("star-observatory", "Star Night", star_observatory()),
]

catalog = []
for slug, title, body in tiny:
    fid = f"tiny-{slug}"
    (out / f"{fid}.svg").write_text(wrap(title, "3-5", 12, body), encoding="utf-8")
    catalog.append({"id": fid, "file": f"/coloring/{fid}.svg", "age": "3-5", "title": title})
for slug, title, body in little:
    fid = f"little-{slug}"
    (out / f"{fid}.svg").write_text(wrap(title, "5-7", 7, body), encoding="utf-8")
    catalog.append({"id": fid, "file": f"/coloring/{fid}.svg", "age": "5-7", "title": title})
for slug, title, body in big:
    fid = f"big-{slug}"
    (out / f"{fid}.svg").write_text(wrap(title, "7-10", 5, body), encoding="utf-8")
    catalog.append({"id": fid, "file": f"/coloring/{fid}.svg", "age": "7-10", "title": title})

items = []
for item in catalog:
    items.append(
        "  { id: %s, file: %s, age: %s, titles: { en: %s, fa: %s, fr: %s, es: %s } }"
        % (
            json.dumps(item["id"]),
            json.dumps(item["file"]),
            json.dumps(item["age"]),
            json.dumps(item["title"]),
            json.dumps(item["title"]),
            json.dumps(item["title"]),
            json.dumps(item["title"]),
        )
    )

ts = '''import type { AgeBand } from "@/lib/age";
import type { Locale } from "@/lib/i18n";

export type ColoringPage = {
  id: string;
  file: string;
  age: AgeBand;
  titles: Record<Locale, string>;
};

export const coloringCatalog: ColoringPage[] = [
%s
];

export function coloringForAge(age: AgeBand | null) {
  if (!age) return coloringCatalog;
  return coloringCatalog.filter((page) => page.age === age);
}

export function coloringById(id: string) {
  return coloringCatalog.find((page) => page.id === id);
}
''' % ",\n".join(items)

(root / "src/lib/coloring/catalog.ts").write_text(ts, encoding="utf-8")
print("generated", len(catalog), "pages")
