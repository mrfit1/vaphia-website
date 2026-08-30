#!/usr/bin/env python3
"""Generate compositionally-correct Vaphia coloring SVGs. No labels, no watermarks."""
from pathlib import Path
import json
import math

root = Path("/workspace/vaphia")
out = root / "public" / "coloring"
out.mkdir(parents=True, exist_ok=True)

W, H = 800, 1000
GROUND = 860
SKY_SUN = (640, 150)
INK = "#2c2048"


def wrap(title: str, stroke: int, body: str) -> str:
    return f'''<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" role="img" aria-label="{title}">
  <title>{title}</title>
  <rect width="{W}" height="{H}" fill="#fffefb"/>
  <g fill="#fff" stroke="{INK}" stroke-linejoin="round" stroke-linecap="round" stroke-width="{stroke}">
    {body}
  </g>
</svg>
'''


def star(cx, cy, r):
    pts = []
    for i in range(10):
        a = -math.pi / 2 + i * math.pi / 5
        rad = r if i % 2 == 0 else r * 0.42
        pts.append(f"{cx + math.cos(a) * rad:.1f},{cy + math.sin(a) * rad:.1f}")
    return f'<polygon points="{" ".join(pts)}"/>'


def heart(cx, cy, s=1):
    return (
        f'<path d="M{cx} {cy + 38*s} C{cx - 90*s} {cy - 10*s}, {cx - 70*s} {cy - 90*s}, {cx} {cy - 42*s} '
        f'C{cx + 70*s} {cy - 90*s}, {cx + 90*s} {cy - 10*s}, {cx} {cy + 38*s} Z"/>'
    )


def balloon(cx, cy, s=1):
    string_end = min(cy + 220 * s, GROUND - 20)
    return (
        f'<ellipse cx="{cx}" cy="{cy}" rx="{80*s}" ry="{100*s}"/>'
        f'<path d="M{cx} {cy + 100*s} l{-10*s} {18*s} h{20*s} z"/>'
        f'<path d="M{cx} {cy + 118*s} q{-16*s} {40*s} 0 {string_end - (cy + 118*s)}" fill="none"/>'
    )


def sun(cx, cy, r):
    rays = []
    for i in range(12):
        a = i * math.pi / 6
        rays.append(
            f'<line x1="{cx + math.cos(a)*(r+14):.1f}" y1="{cy + math.sin(a)*(r+14):.1f}" '
            f'x2="{cx + math.cos(a)*(r+48):.1f}" y2="{cy + math.sin(a)*(r+48):.1f}"/>'
        )
    return f'<circle cx="{cx}" cy="{cy}" r="{r}"/>' + "".join(rays)


def smiling_sun(cx, cy, r):
    return (
        sun(cx, cy, r)
        + f'<circle cx="{cx-18}" cy="{cy-8}" r="6" fill="{INK}" stroke="none"/>'
        + f'<circle cx="{cx+18}" cy="{cy-8}" r="6" fill="{INK}" stroke="none"/>'
        + f'<path d="M{cx-20} {cy+16} q20 16 40 0" fill="none"/>'
    )


def cloud(cx, cy, s=1):
    return (
        f'<ellipse cx="{cx-50*s}" cy="{cy}" rx="{60*s}" ry="{40*s}"/>'
        f'<ellipse cx="{cx+40*s}" cy="{cy+6*s}" rx="{70*s}" ry="{46*s}"/>'
        f'<ellipse cx="{cx}" cy="{cy-28*s}" rx="{50*s}" ry="{36*s}"/>'
    )


def flower_head(cx, cy, s=1):
    petals = []
    for i in range(6):
        petals.append(
            f'<ellipse cx="{cx}" cy="{cy - 54*s}" rx="{22*s}" ry="{40*s}" transform="rotate({i*60} {cx} {cy})"/>'
        )
    return "".join(petals) + f'<circle cx="{cx}" cy="{cy}" r="{28*s}"/>'


def stemmed_flower(cx, ground, s=1, stem=140):
    cy = ground - stem * s
    leaf_y = ground - stem * s * 0.45
    return (
        f'<line x1="{cx}" y1="{ground}" x2="{cx}" y2="{cy + 28*s}"/>'
        f'<ellipse cx="{cx - 28*s}" cy="{leaf_y}" rx="{22*s}" ry="{10*s}" transform="rotate(-30 {cx-28*s} {leaf_y})"/>'
        f'<ellipse cx="{cx + 28*s}" cy="{leaf_y + 10}" rx="{22*s}" ry="{10*s}" transform="rotate(30 {cx+28*s} {leaf_y+10})"/>'
        + flower_head(cx, cy, s)
    )


def tulip(cx, ground, s=1, stem=160):
    cy = ground - stem * s
    return (
        f'<line x1="{cx}" y1="{ground}" x2="{cx}" y2="{cy}"/>'
        f'<ellipse cx="{cx-18*s}" cy="{cy+40*s}" rx="{12*s}" ry="{36*s}" transform="rotate(-20 {cx-18*s} {cy+40*s})"/>'
        f'<ellipse cx="{cx+18*s}" cy="{cy+40*s}" rx="{12*s}" ry="{36*s}" transform="rotate(20 {cx+18*s} {cy+40*s})"/>'
        f'<path d="M{cx-32*s} {cy+8*s} q{8*s} {-48*s} {32*s} {-56*s} q{24*s} 8 {32*s} {56*s} q{-32*s} {-16*s} {-64*s} 0 Z"/>'
    )


def cupcake(cx, cy, s=1):
    return (
        f'<path d="M{cx-70*s} {cy} h{140*s} l{-20*s} {90*s} h{-100*s} z"/>'
        f'<ellipse cx="{cx}" cy="{cy}" rx="{80*s}" ry="{40*s}"/>'
        f'<circle cx="{cx-24*s}" cy="{cy-18*s}" r="{18*s}"/>'
        f'<circle cx="{cx+18*s}" cy="{cy-28*s}" r="{20*s}"/>'
        f'<circle cx="{cx}" cy="{cy-8*s}" r="{16*s}"/>'
        f'<circle cx="{cx}" cy="{cy-58*s}" r="{14*s}"/>'
    )


def house(cx, ground, s=1):
    w, h = 220 * s, 150 * s
    x = cx - w / 2
    y = ground - h
    roof_peak = y - 90 * s
    door_w, door_h = 44 * s, 70 * s
    win = 32 * s
    return (
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8"/>'
        f'<path d="M{x - 20*s} {y} L{cx} {roof_peak} L{x + w + 20*s} {y} Z"/>'
        f'<rect x="{x + 28*s}" y="{y - 70*s}" width="{28*s}" height="{50*s}"/>'
        f'<rect x="{cx - door_w/2}" y="{ground - door_h}" width="{door_w}" height="{door_h}" rx="6"/>'
        f'<circle cx="{cx + 12*s}" cy="{ground - door_h/2}" r="{5*s}"/>'
        f'<rect x="{x + 28*s}" y="{y + 36*s}" width="{win}" height="{win}"/>'
        f'<rect x="{x + w - 28*s - win}" y="{y + 36*s}" width="{win}" height="{win}"/>'
        f'<line x1="{x + 28*s + win/2}" y1="{y + 36*s}" x2="{x + 28*s + win/2}" y2="{y + 36*s + win}"/>'
        f'<line x1="{x + 28*s}" y1="{y + 36*s + win/2}" x2="{x + 28*s + win}" y2="{y + 36*s + win/2}"/>'
        f'<line x1="{x + w - 28*s - win/2}" y1="{y + 36*s}" x2="{x + w - 28*s - win/2}" y2="{y + 36*s + win}"/>'
        f'<line x1="{x + w - 28*s - win}" y1="{y + 36*s + win/2}" x2="{x + w - 28*s}" y2="{y + 36*s + win/2}"/>'
    )


def bush(cx, ground, s=1):
    return (
        f'<ellipse cx="{cx}" cy="{ground - 28*s}" rx="{48*s}" ry="{32*s}"/>'
        f'<ellipse cx="{cx - 22*s}" cy="{ground - 40*s}" rx="{28*s}" ry="{24*s}"/>'
        f'<ellipse cx="{cx + 22*s}" cy="{ground - 40*s}" rx="{28*s}" ry="{24*s}"/>'
    )


def grass(y=GROUND):
    tufts = []
    for x in range(70, 750, 78):
        tufts.append(f'<path d="M{x} {y} q8 -16 16 0" fill="none"/>')
    return f'<line x1="40" y1="{y}" x2="760" y2="{y}"/>' + "".join(tufts)


def apple(cx, cy, s=1):
    return (
        f'<circle cx="{cx}" cy="{cy}" r="{70*s}"/>'
        f'<path d="M{cx} {cy-70*s} q10 {-40*s} 36 {-50*s}" fill="none"/>'
        f'<ellipse cx="{cx+28*s}" cy="{cy-78*s}" rx="{22*s}" ry="{12*s}"/>'
    )


def bunny(cx, ground, s=1):
    body_cy = ground - 70 * s
    head_cy = body_cy - 78 * s
    return (
        f'<ellipse cx="{cx}" cy="{body_cy}" rx="{54*s}" ry="{62*s}"/>'
        f'<ellipse cx="{cx-28*s}" cy="{head_cy-50*s}" rx="{16*s}" ry="{44*s}"/>'
        f'<ellipse cx="{cx+28*s}" cy="{head_cy-50*s}" rx="{16*s}" ry="{44*s}"/>'
        f'<circle cx="{cx}" cy="{head_cy}" r="{48*s}"/>'
        f'<circle cx="{cx-16*s}" cy="{head_cy-4*s}" r="6"/>'
        f'<circle cx="{cx+16*s}" cy="{head_cy-4*s}" r="6"/>'
        f'<ellipse cx="{cx}" cy="{head_cy+16*s}" rx="7" ry="5"/>'
        f'<ellipse cx="{cx-40*s}" cy="{ground-8*s}" rx="{18*s}" ry="{10*s}"/>'
        f'<ellipse cx="{cx+40*s}" cy="{ground-8*s}" rx="{18*s}" ry="{10*s}"/>'
    )


def moon(cx, cy, r):
    return f'<path d="M{cx+20} {cy-r} a{r} {r} 0 1 0 0 {r*2} a{r*0.72:.1f} {r*0.72:.1f} 0 1 1 0 -{r*2}"/>'


def gift(cx, cy, s=1):
    return (
        f'<rect x="{cx-70*s}" y="{cy-20*s}" width="{140*s}" height="{110*s}" rx="10"/>'
        f'<rect x="{cx-80*s}" y="{cy-50*s}" width="{160*s}" height="{36*s}" rx="8"/>'
        f'<rect x="{cx-10*s}" y="{cy-50*s}" width="{20*s}" height="{140*s}"/>'
        f'<path d="M{cx} {cy-50*s} q{-30*s} {-40*s} {-50*s} -8" fill="none"/>'
        f'<path d="M{cx} {cy-50*s} q{30*s} {-40*s} {50*s} -8" fill="none"/>'
    )


def tree(cx, ground, s=1):
    trunk_h = 90 * s
    canopy_cy = ground - trunk_h - 50 * s
    return (
        f'<rect x="{cx-16*s}" y="{ground-trunk_h}" width="{32*s}" height="{trunk_h}"/>'
        f'<circle cx="{cx}" cy="{canopy_cy}" r="{70*s}"/>'
        f'<circle cx="{cx-40*s}" cy="{canopy_cy+22*s}" r="{40*s}"/>'
        f'<circle cx="{cx+42*s}" cy="{canopy_cy+22*s}" r="{38*s}"/>'
    )


def boat(cx, water_y, s=1):
    return (
        f'<path d="M{cx-110*s} {water_y-10*s} h{220*s} l{-30*s} {50*s} h{-160*s} z"/>'
        f'<path d="M{cx} {water_y-10*s} L{cx} {water_y-130*s} L{cx+80*s} {water_y-10*s}"/>'
    )


def fish(cx, cy, s=1):
    return (
        f'<ellipse cx="{cx}" cy="{cy}" rx="{90*s}" ry="{50*s}"/>'
        f'<path d="M{cx-90*s} {cy} l{-50*s} -40 v80 z"/>'
        f'<circle cx="{cx+40*s}" cy="{cy-10*s}" r="8"/>'
    )


def lolly(cx, cy, s=1):
    return (
        f'<circle cx="{cx}" cy="{cy-40*s}" r="{70*s}"/>'
        f'<rect x="{cx-8*s}" y="{cy+20*s}" width="{16*s}" height="{110*s}" rx="8"/>'
    )


def face(cx, cy, who="sophia", s=1):
    r = 70 * s
    if who == "sophia":
        hair = f'<path d="M{cx-r} {cy-4*s} q{r*0.45} {-r*1.2} {r} {-r*1.2} q{r*0.55} 0 {r} {r*1.2}"/>'
    else:
        hair = f'<path d="M{cx-r+4} {cy} q{r*0.22} {-r*1.3} {r-4} {-r*1.3} q{r*0.72} 0 {r-4} {r*1.3}"/>'
    return (
        f'<circle cx="{cx}" cy="{cy}" r="{r}"/>{hair}'
        f'<circle cx="{cx-22*s}" cy="{cy-8*s}" r="{7*s}"/>'
        f'<circle cx="{cx+22*s}" cy="{cy-8*s}" r="{7*s}"/>'
        f'<path d="M{cx-18*s} {cy+22*s} q{18*s} {14*s} {36*s} 0" fill="none"/>'
    )


def kid(cx, ground, who="sophia", s=1):
    head_cy = ground - 175 * s
    dress_top = head_cy + 62 * s
    return (
        face(cx, head_cy, who, s)
        + f'<path d="M{cx-40*s} {dress_top} L{cx-55*s} {ground-8*s} h{110*s} L{cx+40*s} {dress_top} Z"/>'
        + f'<line x1="{cx-18*s}" y1="{ground-8*s}" x2="{cx-18*s}" y2="{ground}"/>'
        + f'<line x1="{cx+18*s}" y1="{ground-8*s}" x2="{cx+18*s}" y2="{ground}"/>'
        + f'<line x1="{cx-40*s}" y1="{dress_top+20*s}" x2="{cx-70*s}" y2="{dress_top+70*s}"/>'
        + f'<line x1="{cx+40*s}" y1="{dress_top+20*s}" x2="{cx+70*s}" y2="{dress_top+70*s}"/>'
    )


def water(y=GROUND - 40):
    return f'<path d="M40 {y} q80 24 160 0 q80 -24 160 0 q80 24 160 0 q80 -24 160 0 v{H-y-20} H40 Z"/>'


# --- 3–5 simple pages ---
def scene_star():
    return star(400, 480, 210)


def scene_heart():
    return heart(400, 500, 2.2)


def scene_balloon():
    return balloon(400, 360, 1.35) + grass()


def scene_sun():
    return sun(400, 460, 150)


def scene_flower():
    return sun(640, 140, 54) + cloud(180, 160, 0.85) + stemmed_flower(400, GROUND, 1.5, 220) + grass()


def scene_cupcake():
    return cupcake(400, 470, 1.7)


def scene_cloud():
    return cloud(400, 460, 2.1)


def scene_sophia():
    return kid(400, GROUND, "sophia", 1.35) + grass()


def scene_vania():
    return kid(400, GROUND, "vania", 1.35) + grass()


def scene_house():
    return (
        sun(640, 140, 58)
        + cloud(180, 150, 0.9)
        + cloud(360, 120, 0.55)
        + house(400, GROUND, 1.15)
        + bush(170, GROUND, 1.1)
        + bush(630, GROUND, 1.1)
        + grass()
    )


def scene_apple():
    return apple(400, 500, 2.0)


def scene_bunny():
    return sun(640, 140, 50) + bunny(400, GROUND, 1.5) + grass()


def scene_two_stars():
    return star(280, 480, 150) + star(540, 500, 110)


def scene_heart_star():
    return heart(280, 520, 1.6) + star(560, 460, 120)


def scene_moon():
    return moon(400, 460, 150) + star(160, 220, 36) + star(640, 180, 28) + star(680, 320, 22)


def scene_gift():
    return gift(400, 500, 1.7)


def scene_tree():
    return sun(640, 140, 54) + cloud(200, 150, 0.7) + tree(400, GROUND, 1.5) + grass()


def scene_boat():
    wy = 640
    return sun(150, 150, 50) + cloud(500, 150, 0.8) + boat(400, wy, 1.4) + water(wy + 36)


def scene_fish():
    return fish(420, 500, 1.8) + f'<path d="M80 820 q80 -20 160 0 q80 20 160 0 q80 -20 160 0 q80 20 160 0" fill="none"/>'


def scene_lolly():
    return lolly(400, 480, 1.7)


def scene_cat():
    g = GROUND
    return (
        sun(640, 140, 48)
        + f'<ellipse cx="400" cy="{g-70}" rx="90" ry="60"/>'
        + f'<circle cx="330" cy="{g-130}" r="48"/>'
        + f'<path d="M300 {g-160} l-10 -50 l30 24 z"/><path d="M360 {g-160} l10 -50 l-30 24 z"/>'
        + f'<circle cx="318" cy="{g-136}" r="6"/><circle cx="348" cy="{g-136}" r="6"/>'
        + f'<path d="M330 {g-118} q10 10 20 0" fill="none"/>'
        + f'<path d="M480 {g-70} q40 -10 60 40" fill="none"/>'
        + f'<line x1="360" y1="{g-20}" x2="350" y2="{g}"/>'
        + f'<line x1="440" y1="{g-20}" x2="450" y2="{g}"/>'
        + grass()
    )


def scene_duck():
    g = GROUND
    wy = g - 80
    return (
        sun(150, 150, 48)
        + water(wy + 30)
        + f'<ellipse cx="400" cy="{wy-20}" rx="90" ry="50"/>'
        + f'<circle cx="490" cy="{wy-50}" r="36"/>'
        + f'<path d="M520 {wy-50} l40 8 l-40 12 z"/>'
        + f'<circle cx="502" cy="{wy-58}" r="5"/>'
        + f'<ellipse cx="340" cy="{wy-70}" rx="28" ry="16"/>'
    )


def scene_car():
    g = GROUND
    return (
        sun(640, 140, 48)
        + cloud(180, 150, 0.7)
        + f'<rect x="160" y="{g-140}" width="480" height="110" rx="28"/>'
        + f'<path d="M250 {g-140} l40 -70 h220 l40 70 z"/>'
        + f'<rect x="300" y="{g-200}" width="70" height="50" rx="8"/>'
        + f'<rect x="430" y="{g-200}" width="70" height="50" rx="8"/>'
        + f'<circle cx="260" cy="{g}" r="38"/>'
        + f'<circle cx="540" cy="{g}" r="38"/>'
        + f'<circle cx="260" cy="{g}" r="16"/>'
        + f'<circle cx="540" cy="{g}" r="16"/>'
        + grass()
    )


def scene_bird():
    return (
        sun(640, 140, 50)
        + cloud(200, 160, 0.7)
        + f'<ellipse cx="400" cy="520" rx="90" ry="55"/>'
        + f'<circle cx="490" cy="500" r="32"/>'
        + f'<path d="M518 500 l32 6 l-32 10 z"/>'
        + f'<ellipse cx="360" cy="500" rx="50" ry="22" transform="rotate(-20 360 500)"/>'
        + f'<circle cx="500" cy="492" r="5"/>'
        + f'<line x1="380" y1="575" x2="370" y2="620"/>'
        + f'<line x1="420" y1="575" x2="430" y2="620"/>'
        + grass()
    )


def scene_mushroom():
    g = GROUND
    return (
        sun(150, 150, 48)
        + grass()
        + f'<rect x="360" y="{g-160}" width="80" height="160" rx="20"/>'
        + f'<path d="M240 {g-150} q160 -180 320 0 z"/>'
        + f'<circle cx="320" cy="{g-190}" r="16"/>'
        + f'<circle cx="400" cy="{g-230}" r="18"/>'
        + f'<circle cx="480" cy="{g-185}" r="14"/>'
    )


def scene_watermelon():
    return (
        f'<path d="M140 620 a280 280 0 0 0 520 0 Z"/>'
        + f'<path d="M180 620 a240 180 0 0 0 440 0" fill="none"/>'
        + f'<ellipse cx="320" cy="700" rx="8" ry="14"/>'
        + f'<ellipse cx="400" cy="730" rx="8" ry="14"/>'
        + f'<ellipse cx="480" cy="700" rx="8" ry="14"/>'
        + f'<ellipse cx="360" cy="780" rx="8" ry="14"/>'
        + f'<ellipse cx="440" cy="780" rx="8" ry="14"/>'
    )


def scene_ladybug():
    g = GROUND
    return (
        sun(640, 140, 48)
        + grass()
        + stemmed_flower(160, g, 0.7, 160)
        + f'<ellipse cx="430" cy="{g-90}" rx="120" ry="80"/>'
        + f'<line x1="430" y1="{g-170}" x2="430" y2="{g-10}"/>'
        + f'<circle cx="430" cy="{g-185}" r="36"/>'
        + f'<circle cx="416" cy="{g-190}" r="5"/>'
        + f'<circle cx="448" cy="{g-190}" r="5"/>'
        + f'<line x1="410" y1="{g-218}" x2="390" y2="{g-250}"/>'
        + f'<line x1="450" y1="{g-218}" x2="470" y2="{g-250}"/>'
        + f'<circle cx="370" cy="{g-110}" r="16"/>'
        + f'<circle cx="490" cy="{g-110}" r="16"/>'
        + f'<circle cx="400" cy="{g-50}" r="14"/>'
        + f'<circle cx="460" cy="{g-50}" r="14"/>'
    )


def scene_ball():
    return (
        f'<circle cx="400" cy="500" r="180"/>'
        + f'<path d="M220 500 h360" fill="none"/>'
        + f'<path d="M400 320 v360" fill="none"/>'
        + f'<path d="M250 380 q150 50 300 0" fill="none"/>'
        + f'<path d="M250 620 q150 -50 300 0" fill="none"/>'
        + grass()
    )


def scene_kite_simple():
    return (
        sun(150, 150, 48)
        + cloud(560, 160, 0.7)
        + '<polygon points="400,220 520,360 400,500 280,360"/>'
        + '<line x1="400" y1="500" x2="340" y2="820"/>'
        + '<polygon points="360,560 380,580 360,600 340,580"/>'
        + '<polygon points="330,680 350,700 330,720 310,700"/>'
        + grass()
    )


# --- 5–7 scenes ---
def scene_sisters_hands():
    return (
        sun(400, 130, 44)
        + cloud(160, 150, 0.55)
        + cloud(640, 140, 0.5)
        + kid(260, GROUND, "sophia", 1.05)
        + kid(540, GROUND, "vania", 1.05)
        + heart(400, GROUND - 90, 0.45)
        + grass()
    )


def scene_garden_flowers():
    return (
        smiling_sun(140, 140, 58)
        + cloud(500, 130, 0.7)
        + stemmed_flower(220, GROUND, 0.95, 220)
        + tulip(400, GROUND, 1.1, 250)
        + stemmed_flower(560, GROUND, 1.05, 200)
        + f'<path d="M620 {GROUND-20} q40 -70 90 -8 h-24 q-20 -40 -66 -10 z"/>'  # watering can
        + f'<ellipse cx="710" cy="{GROUND-28}" rx="16" ry="10"/>'
        + grass()
    )


def scene_park_swing():
    g = GROUND
    return (
        sun(150, 140, 50)
        + cloud(620, 130, 0.65)
        + tree(700, g, 0.7)
        + f'<rect x="200" y="{g-420}" width="18" height="420"/>'
        + f'<rect x="560" y="{g-420}" width="18" height="420"/>'
        + f'<rect x="200" y="{g-420}" width="378" height="18"/>'
        + f'<line x1="280" y1="{g-402}" x2="280" y2="{g-120}"/>'
        + f'<line x1="500" y1="{g-402}" x2="500" y2="{g-120}"/>'
        + f'<rect x="260" y="{g-128}" width="260" height="26" rx="8"/>'
        + kid(390, g - 128, "sophia", 0.55)
        + grass()
    )


def scene_cupcake_stand():
    g = GROUND
    return (
        sun(150, 140, 44)
        + f'<rect x="120" y="{g-40}" width="560" height="28" rx="8"/>'
        + f'<rect x="140" y="{g-200}" width="520" height="160" rx="12"/>'
        + f'<rect x="160" y="{g-260}" width="480" height="20"/>'
        + f'<path d="M160 {g-260} L400 {g-360} L640 {g-260}"/>'
        + cupcake(250, g - 120, 0.7)
        + cupcake(400, g - 130, 0.8)
        + cupcake(550, g - 120, 0.7)
        + grass()
    )


def scene_star_sky():
    g = GROUND
    return (
        moon(180, 160, 70)
        + star(360, 120, 28)
        + star(500, 180, 22)
        + star(640, 110, 18)
        + star(700, 220, 14)
        + cloud(560, 280, 0.7)
        + house(300, g, 0.85)
        + tree(620, g, 0.75)
        + grass()
    )


def scene_play_room():
    g = GROUND
    return (
        f'<rect x="60" y="80" width="680" height="720" rx="8"/>'  # room
        + f'<rect x="80" y="120" width="160" height="120" rx="8"/>'  # window
        + sun(160, 170, 24)
        + f'<rect x="220" y="{g-180}" width="260" height="90" rx="12"/>'  # toy box
        + bunny(160, g, 0.7)
        + gift(620, g - 70, 0.85)
        + star(400, g - 240, 28)
        + f'<line x1="60" y1="{g}" x2="740" y2="{g}"/>'
    )


def scene_kite_day():
    return (
        sun(150, 140, 50)
        + cloud(300, 130, 0.55)
        + cloud(640, 150, 0.7)
        + '<polygon points="420,180 530,300 420,420 310,300"/>'
        + '<line x1="420" y1="420" x2="300" y2="820"/>'
        + kid(240, GROUND, "vania", 0.85)
        + grass()
    )


def scene_boat_pond():
    wy = 700
    return (
        sun(150, 140, 50)
        + cloud(560, 140, 0.75)
        + tree(120, wy + 20, 0.55)
        + boat(430, wy, 1.05)
        + fish(200, wy + 80, 0.45)
        + fish(620, wy + 110, 0.35)
        + water(wy + 40)
    )


def scene_ice_cream():
    return (
        '<path d="M250 520 h300 l-150 280 z"/>'
        '<circle cx="310" cy="450" r="70"/>'
        '<circle cx="400" cy="400" r="78"/>'
        '<circle cx="490" cy="450" r="70"/>'
        '<circle cx="400" cy="330" r="24"/>'
        + grass()
    )


def scene_paint_table():
    g = GROUND
    return (
        f'<rect x="80" y="90" width="200" height="150" rx="10"/>'
        + sun(180, 150, 28)
        + f'<rect x="120" y="{g-80}" width="560" height="80" rx="16"/>'
        + f'<circle cx="240" cy="{g-140}" r="36"/>'
        + f'<circle cx="340" cy="{g-140}" r="36"/>'
        + f'<circle cx="440" cy="{g-140}" r="36"/>'
        + f'<rect x="540" y="{g-220}" width="22" height="150" rx="8"/>'
        + kid(160, g - 80, "sophia", 0.7)
        + star(640, 160, 26)
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
    )


def scene_story_nook():
    g = GROUND
    return (
        f'<rect x="90" y="120" width="70" height="320"/>'
        + f'<rect x="175" y="120" width="70" height="320"/>'
        + f'<rect x="555" y="120" width="70" height="320"/>'
        + f'<rect x="260" y="{g-160}" width="220" height="100" rx="12"/>'
        + f'<rect x="290" y="{g-250}" width="50" height="80"/>'
        + f'<rect x="370" y="{g-240}" width="50" height="70"/>'
        + bunny(160, g, 0.55)
        + cloud(400, 80, 0.4)
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
    )


def scene_butterfly_garden():
    return (
        sun(150, 140, 50)
        + stemmed_flower(200, GROUND, 1.0, 240)
        + stemmed_flower(400, GROUND, 1.15, 200)
        + stemmed_flower(600, GROUND, 0.9, 230)
        + '<ellipse cx="480" cy="220" rx="36" ry="60"/>'
        + '<ellipse cx="560" cy="220" rx="36" ry="60"/>'
        + '<circle cx="520" cy="220" r="10"/>'
        + '<line x1="520" y1="180" x2="500" y2="150"/>'
        + '<line x1="520" y1="180" x2="540" y2="150"/>'
        + grass()
    )


def scene_train():
    g = GROUND
    return (
        sun(150, 140, 46)
        + cloud(600, 130, 0.6)
        + f'<rect x="80" y="{g-140}" width="150" height="90" rx="12"/>'
        + f'<rect x="250" y="{g-140}" width="150" height="90" rx="12"/>'
        + f'<rect x="420" y="{g-190}" width="180" height="140" rx="12"/>'
        + f'<rect x="560" y="{g-250}" width="28" height="70" rx="6"/>'
        + f'<circle cx="130" cy="{g-20}" r="28"/>'
        + f'<circle cx="210" cy="{g-20}" r="28"/>'
        + f'<circle cx="300" cy="{g-20}" r="28"/>'
        + f'<circle cx="380" cy="{g-20}" r="28"/>'
        + f'<circle cx="470" cy="{g-20}" r="28"/>'
        + f'<circle cx="560" cy="{g-20}" r="28"/>'
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
        + grass()
    )


def scene_castle():
    g = GROUND
    return (
        sun(150, 130, 44)
        + cloud(620, 140, 0.6)
        + f'<rect x="200" y="{g-260}" width="400" height="260"/>'
        + f'<rect x="150" y="{g-360}" width="90" height="360"/>'
        + f'<rect x="560" y="{g-360}" width="90" height="360"/>'
        + f'<polygon points="150,{g-360} 195,{g-430} 240,{g-360}"/>'
        + f'<polygon points="560,{g-360} 605,{g-430} 650,{g-360}"/>'
        + f'<rect x="360" y="{g-120}" width="80" height="120"/>'
        + f'<circle cx="400" cy="{g-70}" r="8"/>'
        + f'<rect x="250" y="{g-200}" width="50" height="50"/>'
        + f'<rect x="500" y="{g-200}" width="50" height="50"/>'
        + grass()
    )


def scene_picnic():
    return (
        sun(150, 140, 50)
        + cloud(560, 140, 0.7)
        + tree(680, GROUND, 0.8)
        + f'<ellipse cx="400" cy="{GROUND-40}" rx="220" ry="60"/>'
        + cupcake(320, GROUND - 90, 0.55)
        + apple(460, GROUND - 90, 0.55)
        + kid(220, GROUND, "sophia", 0.7)
        + grass()
    )


def scene_camera_fun():
    return (
        star(150, 160, 28)
        + f'<rect x="200" y="360" width="400" height="240" rx="28"/>'
        + f'<circle cx="400" cy="480" r="80"/>'
        + f'<circle cx="400" cy="480" r="40"/>'
        + f'<rect x="250" y="310" width="90" height="50" rx="10"/>'
        + f'<circle cx="540" cy="400" r="14"/>'
        + grass()
    )


def scene_tea_party():
    g = GROUND
    return (
        sun(150, 140, 44)
        + f'<ellipse cx="400" cy="{g-40}" rx="220" ry="50"/>'
        + f'<path d="M280 {g-160} h70 v70 h-70 z"/>'
        + f'<path d="M450 {g-160} h70 v70 h-70 z"/>'
        + f'<path d="M350 {g-70} q20 30 50 0" fill="none"/>'
        + f'<circle cx="315" cy="{g-190}" r="28"/>'
        + f'<circle cx="485" cy="{g-190}" r="28"/>'
        + cupcake(400, g - 200, 0.4)
        + kid(180, g, "sophia", 0.65)
        + kid(620, g, "vania", 0.65)
        + grass()
    )


def scene_sandbox():
    g = GROUND
    return (
        sun(640, 140, 50)
        + cloud(180, 140, 0.65)
        + f'<rect x="140" y="{g-140}" width="520" height="140" rx="24"/>'
        + house(280, g - 140, 0.35)
        + f'<path d="M480 {g-200} h90 l-14 90 h-62 z"/>'
        + f'<ellipse cx="525" cy="{g-200}" rx="46" ry="14"/>'
        + grass()
    )


def scene_music_time():
    return (
        star(150, 150, 26)
        + f'<ellipse cx="300" cy="520" rx="90" ry="120"/>'
        + f'<rect x="470" y="300" width="36" height="280" rx="8"/>'
        + f'<circle cx="506" cy="580" r="50"/>'
        + kid(650, GROUND, "vania", 0.75)
        + grass()
    )


def scene_rainy_walk():
    g = GROUND
    return (
        cloud(220, 140, 1.0)
        + cloud(500, 120, 0.85)
        + '<line x1="160" y1="220" x2="140" y2="320"/>'
        + '<line x1="230" y1="230" x2="210" y2="340"/>'
        + '<line x1="300" y1="210" x2="280" y2="330"/>'
        + '<line x1="460" y1="200" x2="450" y2="320"/>'
        + '<line x1="540" y1="210" x2="530" y2="330"/>'
        + house(400, g, 0.9)
        + kid(180, g, "sophia", 0.7)
        + f'<path d="M140 {g-200} q50 -80 100 0" fill="none"/>'  # umbrella
        + f'<line x1="190" y1="{g-200}" x2="190" y2="{g-80}"/>'
        + grass()
    )


def scene_lemonade():
    g = GROUND
    return (
        sun(150, 140, 50)
        + cloud(620, 140, 0.6)
        + f'<rect x="180" y="{g-40}" width="440" height="24"/>'
        + f'<rect x="200" y="{g-220}" width="400" height="180" rx="10"/>'
        + f'<path d="M200 {g-220} L400 {g-320} L600 {g-220}"/>'
        + f'<rect x="300" y="{g-180}" width="50" height="70" rx="6"/>'
        + f'<rect x="380" y="{g-180}" width="50" height="70" rx="6"/>'
        + f'<rect x="460" y="{g-180}" width="50" height="70" rx="6"/>'
        + f'<ellipse cx="325" cy="{g-190}" rx="18" ry="8"/>'
        + kid(140, g, "vania", 0.7)
        + grass()
    )


def scene_farm():
    g = GROUND
    return (
        sun(150, 140, 50)
        + cloud(500, 130, 0.7)
        + house(250, g, 0.8)
        + f'<path d="M480 {g} L480 {g-220} L700 {g-220} L700 {g} Z"/>'
        + f'<path d="M460 {g-220} L590 {g-330} L720 {g-220}"/>'
        + f'<rect x="560" y="{g-80}" width="50" height="80"/>'
        + bunny(430, g, 0.45)
        + stemmed_flower(160, g, 0.5, 100)
        + grass()
    )


def scene_pond_ducks():
    wy = 720
    return (
        sun(640, 140, 50)
        + tree(140, wy + 10, 0.7)
        + water(wy)
        + f'<ellipse cx="300" cy="{wy-10}" rx="50" ry="28"/>'
        + f'<circle cx="350" cy="{wy-28}" r="18"/>'
        + f'<ellipse cx="500" cy="{wy+10}" rx="40" ry="22"/>'
        + f'<circle cx="540" cy="{wy-4}" r="14"/>'
        + cloud(400, 140, 0.6)
    )


def scene_snowman():
    g = GROUND
    return (
        moon(150, 150, 54)
        + star(300, 110, 18)
        + star(500, 150, 14)
        + star(680, 120, 20)
        + house(160, g, 0.55)
        + tree(680, g, 0.7)
        + f'<circle cx="400" cy="{g-70}" r="70"/>'
        + f'<circle cx="400" cy="{g-175}" r="52"/>'
        + f'<circle cx="400" cy="{g-255}" r="36"/>'
        + f'<circle cx="388" cy="{g-262}" r="4"/>'
        + f'<circle cx="412" cy="{g-262}" r="4"/>'
        + f'<path d="M400 {g-248} l24 6" fill="none"/>'
        + grass()
    )


def scene_bakery_window():
    g = GROUND
    return (
        f'<rect x="80" y="80" width="640" height="780" rx="8"/>'
        + f'<rect x="160" y="140" width="480" height="280" rx="8"/>'
        + sun(400, 220, 36)
        + f'<rect x="140" y="{g-200}" width="520" height="200"/>'
        + cupcake(250, g - 80, 0.55)
        + cupcake(400, g - 90, 0.65)
        + cupcake(550, g - 80, 0.55)
        + f'<line x1="80" y1="{g}" x2="720" y2="{g}"/>'
    )


def scene_park_path():
    g = GROUND
    return (
        sun(150, 140, 50)
        + cloud(500, 130, 0.7)
        + tree(140, g, 0.85)
        + tree(660, g, 0.9)
        + f'<path d="M300 {g} q50 -200 200 -260 q80 -30 160 40" fill="none"/>'
        + stemmed_flower(280, g, 0.55, 110)
        + stemmed_flower(520, g, 0.5, 90)
        + kid(400, g, "sophia", 0.75)
        + grass()
    )


# --- 7–10 richer scenes ---
def scene_sisters_stage():
    g = GROUND
    return (
        f'<rect x="80" y="{g-40}" width="640" height="50" rx="10"/>'
        + f'<rect x="140" y="{g-360}" width="520" height="280" rx="18"/>'
        + kid(300, g - 80, "sophia", 0.9)
        + kid(500, g - 80, "vania", 0.9)
        + star(180, 160, 24)
        + star(620, 150, 24)
        + heart(400, g - 30, 0.3)
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
    )


def scene_magic_garden():
    g = GROUND
    return (
        sun(150, 130, 52)
        + cloud(500, 120, 0.6)
        + tree(140, g, 0.95)
        + tree(670, g, 0.85)
        + stemmed_flower(320, g, 0.7, 160)
        + stemmed_flower(400, g, 0.85, 190)
        + stemmed_flower(500, g, 0.65, 150)
        + bunny(400, g, 0.45)
        + '<ellipse cx="560" cy="210" rx="28" ry="48"/>'
        + '<ellipse cx="620" cy="210" rx="28" ry="48"/>'
        + '<circle cx="590" cy="210" r="8"/>'
        + grass()
    )


def scene_kitchen_baking():
    g = GROUND
    return (
        f'<rect x="70" y="90" width="220" height="160" rx="8"/>'  # window
        + sun(180, 150, 28)
        + cloud(220, 130, 0.25)
        + f'<rect x="70" y="{g-280}" width="280" height="20"/>'  # counter
        + f'<rect x="70" y="{g-260}" width="120" height="260"/>'
        + f'<rect x="520" y="{g-340}" width="180" height="340"/>'
        + f'<ellipse cx="400" cy="{g-40}" rx="200" ry="50"/>'
        + cupcake(330, g - 90, 0.5)
        + cupcake(420, g - 90, 0.5)
        + apple(500, g - 90, 0.4)
        + kid(300, g - 70, "vania", 0.7)
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
    )


def scene_art_studio():
    g = GROUND
    return (
        f'<rect x="80" y="90" width="180" height="140" rx="8"/>'
        + sun(170, 150, 24)
        + f'<rect x="160" y="280" width="220" height="180"/>'
        + flower_head(270, 370, 0.55)
        + f'<rect x="430" y="{g-200}" width="220" height="90" rx="12"/>'
        + f'<circle cx="480" cy="{g-240}" r="20"/>'
        + f'<circle cx="540" cy="{g-240}" r="20"/>'
        + f'<circle cx="600" cy="{g-240}" r="20"/>'
        + kid(200, g, "sophia", 0.8)
        + f'<rect x="500" y="{g-90}" width="22" height="90" rx="6"/>'
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
    )


def scene_playground_full():
    g = GROUND
    return (
        sun(150, 130, 50)
        + cloud(420, 120, 0.55)
        + tree(700, g, 0.7)
        + house(120, g, 0.4)
        + f'<rect x="260" y="{g-360}" width="16" height="360"/>'
        + f'<rect x="520" y="{g-360}" width="16" height="360"/>'
        + f'<rect x="260" y="{g-360}" width="276" height="16"/>'
        + f'<line x1="330" y1="{g-344}" x2="330" y2="{g-120}"/>'
        + f'<line x1="460" y1="{g-344}" x2="460" y2="{g-120}"/>'
        + f'<rect x="310" y="{g-128}" width="170" height="22" rx="8"/>'
        + kid(390, g - 128, "vania", 0.45)
        + stemmed_flower(220, g, 0.45, 90)
        + grass()
    )


def scene_cozy_bedroom():
    g = GROUND
    return (
        f'<rect x="70" y="80" width="200" height="150" rx="8"/>'
        + moon(170, 150, 36)
        + star(240, 110, 12)
        + f'<rect x="140" y="{g-160}" width="360" height="120" rx="18"/>'
        + f'<rect x="140" y="{g-210}" width="90" height="50" rx="12"/>'
        + bunny(620, g, 0.7)
        + gift(520, g - 50, 0.45)
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
    )


def scene_park_festival():
    g = GROUND
    return (
        sun(150, 130, 46)
        + balloon(220, 220, 0.7)
        + balloon(320, 180, 0.65)
        + balloon(640, 200, 0.6)
        + f'<path d="M280 {g} L400 {g-240} L520 {g} Z"/>'
        + f'<rect x="370" y="{g-80}" width="60" height="80"/>'
        + kid(400, g, "vania", 0.7)
        + star(700, 140, 22)
        + grass()
    )


def scene_library_nook():
    g = GROUND
    return (
        f'<rect x="80" y="100" width="80" height="400"/>'
        + f'<rect x="180" y="100" width="80" height="400"/>'
        + f'<rect x="540" y="100" width="80" height="400"/>'
        + f'<rect x="640" y="100" width="80" height="400"/>'
        + f'<rect x="300" y="{g-140}" width="200" height="90" rx="12"/>'
        + f'<rect x="330" y="{g-230}" width="55" height="80"/>'
        + f'<rect x="410" y="{g-220}" width="55" height="70"/>'
        + kid(200, g, "sophia", 0.65)
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
    )


def scene_treehouse():
    g = GROUND
    return (
        sun(150, 130, 46)
        + cloud(600, 130, 0.55)
        + tree(280, g, 1.35)
        + f'<rect x="420" y="{g-420}" width="200" height="130" rx="10"/>'
        + f'<rect x="500" y="{g-360}" width="40" height="70"/>'
        + f'<line x1="300" y1="{g-80}" x2="430" y2="{g-290}"/>'
        + f'<rect x="248" y="{g-90}" width="36" height="12"/>'
        + f'<rect x="288" y="{g-150}" width="36" height="12"/>'
        + f'<rect x="328" y="{g-210}" width="36" height="12"/>'
        + grass()
    )


def scene_beach_day():
    sand = 700
    return (
        sun(150, 140, 60)
        + cloud(500, 140, 0.65)
        + f'<path d="M40 {sand} q180 -50 360 0 q180 50 360 0 V{H-20} H40 Z"/>'
        + boat(560, sand - 10, 0.7)
        + f'<rect x="300" y="{sand-140}" width="16" height="140"/>'
        + f'<polygon points="308,{sand-140} 308,{sand-220} 390,{sand-140}"/>'
        + kid(220, sand, "sophia", 0.65)
    )


def scene_city_walk():
    g = GROUND
    return (
        sun(150, 120, 40)
        + cloud(500, 110, 0.5)
        + house(180, g, 0.7)
        + house(400, g, 0.95)
        + house(640, g, 0.75)
        + kid(300, g, "vania", 0.55)
        + grass()
    )


def scene_birthday_party():
    g = GROUND
    return (
        balloon(140, 200, 0.7)
        + balloon(240, 160, 0.65)
        + balloon(640, 180, 0.7)
        + star(400, 140, 30)
        + cupcake(400, 420, 1.1)
        + gift(180, g - 70, 0.85)
        + gift(620, g - 70, 0.85)
        + kid(400, g, "sophia", 0.7)
        + grass()
    )


def scene_camp_stars():
    g = GROUND
    return (
        moon(150, 140, 50)
        + star(80, 200, 16)
        + star(280, 110, 14)
        + star(500, 140, 18)
        + star(700, 180, 22)
        + f'<path d="M250 {g} L400 {g-280} L550 {g} Z"/>'
        + f'<rect x="370" y="{g-90}" width="60" height="90"/>'
        + tree(660, g, 0.7)
        + f'<circle cx="400" cy="{g-20}" r="22"/>'
        + grass()
    )


def scene_music_room():
    g = GROUND
    return (
        f'<rect x="80" y="90" width="180" height="140" rx="8"/>'
        + sun(170, 150, 24)
        + f'<rect x="140" y="300" width="260" height="160"/>'
        + f'<rect x="160" y="325" width="220" height="18"/>'
        + f'<rect x="160" y="365" width="220" height="18"/>'
        + f'<rect x="160" y="405" width="220" height="18"/>'
        + f'<circle cx="560" cy="480" r="70"/>'
        + f'<rect x="622" y="320" width="18" height="160"/>'
        + kid(240, g, "sophia", 0.75)
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
    )


def scene_snow_play():
    g = GROUND
    return (
        star(160, 120, 18)
        + star(400, 90, 14)
        + star(640, 130, 20)
        + house(150, g, 0.55)
        + tree(680, g, 0.75)
        + f'<circle cx="400" cy="{g-80}" r="80"/>'
        + f'<circle cx="400" cy="{g-195}" r="58"/>'
        + f'<circle cx="400" cy="{g-285}" r="40"/>'
        + f'<circle cx="386" cy="{g-292}" r="5"/>'
        + f'<circle cx="414" cy="{g-292}" r="5"/>'
        + grass()
    )


def scene_theater_show():
    g = GROUND
    return (
        f'<path d="M60 80 q100 120 0 420"/>'
        + f'<path d="M740 80 q-100 120 0 420"/>'
        + f'<rect x="180" y="160" width="440" height="280" rx="12"/>'
        + kid(320, 440, "sophia", 0.7)
        + kid(480, 440, "vania", 0.7)
        + star(400, 130, 22)
        + f'<rect x="140" y="{g-40}" width="520" height="40"/>'
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
    )


def scene_market_day():
    g = GROUND
    return (
        sun(640, 130, 46)
        + cloud(200, 130, 0.55)
        + f'<path d="M160 {g} L280 {g-220} L400 {g} Z"/>'
        + f'<path d="M420 {g} L540 {g-200} L660 {g} Z"/>'
        + apple(250, g - 40, 0.45)
        + flower_head(540, g - 90, 0.45)
        + gift(400, g - 50, 0.4)
        + kid(400, g, "sophia", 0.55)
        + grass()
    )


def scene_school_garden():
    g = GROUND
    return (
        sun(150, 130, 48)
        + house(200, g, 0.85)
        + stemmed_flower(420, g, 0.7, 150)
        + stemmed_flower(510, g, 0.6, 130)
        + tree(660, g, 0.8)
        + kid(400, g, "vania", 0.6)
        + grass()
    )


def scene_family_dinner():
    g = GROUND
    return (
        f'<rect x="80" y="90" width="200" height="150" rx="8"/>'
        + sun(180, 150, 26)
        + f'<ellipse cx="400" cy="{g-80}" rx="240" ry="70"/>'
        + apple(320, g - 120, 0.35)
        + cupcake(400, g - 130, 0.4)
        + f'<rect x="470" y="{g-150}" width="50" height="55" rx="6"/>'
        + kid(240, g - 90, "sophia", 0.7)
        + kid(560, g - 90, "vania", 0.7)
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
    )


def scene_star_observatory():
    g = GROUND
    return (
        moon(150, 140, 46)
        + star(80, 220, 16)
        + star(300, 100, 14)
        + star(620, 120, 20)
        + star(720, 200, 12)
        + house(240, g, 0.75)
        + f'<circle cx="560" cy="280" r="80"/>'
        + f'<rect x="548" y="280" width="24" height="200"/>'
        + grass()
    )


def scene_classroom():
    g = GROUND
    return (
        f'<rect x="120" y="100" width="560" height="160" rx="8"/>'
        + star(200, 160, 20)
        + heart(400, 170, 0.35)
        + sun(600, 160, 28)
        + f'<rect x="80" y="{g-160}" width="200" height="100" rx="8"/>'
        + f'<rect x="300" y="{g-160}" width="200" height="100" rx="8"/>'
        + f'<rect x="520" y="{g-160}" width="200" height="100" rx="8"/>'
        + kid(200, g - 160, "sophia", 0.5)
        + kid(400, g - 160, "vania", 0.5)
        + apple(700, g - 40, 0.35)
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
    )


def scene_bakery_shop():
    g = GROUND
    return (
        f'<rect x="80" y="90" width="200" height="150" rx="8"/>'
        + sun(180, 150, 26)
        + f'<rect x="70" y="{g-240}" width="660" height="24"/>'
        + f'<rect x="90" y="{g-216}" width="140" height="216"/>'
        + f'<rect x="570" y="{g-216}" width="140" height="216"/>'
        + cupcake(280, g - 80, 0.55)
        + cupcake(400, g - 90, 0.65)
        + cupcake(520, g - 80, 0.55)
        + gift(400, g - 200, 0.4)
        + kid(200, g, "sophia", 0.65)
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
    )


def scene_greenhouse():
    g = GROUND
    return (
        sun(150, 130, 48)
        + f'<path d="M80 {g} L80 {g-360} L400 {g-500} L720 {g-360} L720 {g} Z"/>'
        + stemmed_flower(250, g, 0.7, 160)
        + stemmed_flower(400, g, 0.9, 190)
        + tulip(560, g, 0.85, 170)
        + f'<rect x="360" y="{g-90}" width="70" height="90"/>'
        + grass()
    )


def scene_science_desk():
    g = GROUND
    return (
        f'<rect x="80" y="90" width="200" height="150" rx="8"/>'
        + sun(180, 150, 26)
        + f'<rect x="100" y="{g-80}" width="600" height="70" rx="10"/>'
        + f'<rect x="180" y="{g-200}" width="70" height="120" rx="8"/>'
        + f'<ellipse cx="215" cy="{g-210}" rx="40" ry="16"/>'
        + f'<rect x="360" y="{g-180}" width="70" height="100" rx="8"/>'
        + f'<circle cx="560" cy="{g-150}" r="50"/>'
        + f'<circle cx="560" cy="{g-150}" r="28"/>'
        + kid(700, g - 80, "vania", 0.6)
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
    )


def scene_city_park():
    g = GROUND
    return (
        sun(150, 130, 50)
        + cloud(420, 120, 0.55)
        + house(120, g, 0.45)
        + tree(280, g, 0.9)
        + tree(660, g, 1.0)
        + stemmed_flower(430, g, 0.55, 120)
        + stemmed_flower(500, g, 0.5, 100)
        + kid(400, g, "sophia", 0.7)
        + f'<ellipse cx="560" cy="{g-20}" rx="70" ry="18"/>'
        + grass()
    )


def scene_rainy_window():
    g = GROUND
    return (
        f'<rect x="120" y="80" width="560" height="420" rx="12"/>'
        + cloud(280, 180, 0.7)
        + cloud(500, 160, 0.55)
        + '<line x1="220" y1="250" x2="210" y2="340"/>'
        + '<line x1="300" y1="240" x2="290" y2="350"/>'
        + '<line x1="480" y1="230" x2="470" y2="340"/>'
        + house(400, 500, 0.45)
        + f'<rect x="160" y="{g-180}" width="480" height="120" rx="16"/>'
        + cupcake(300, g - 90, 0.45)
        + kid(500, g - 180, "sophia", 0.55)
        + f'<line x1="40" y1="{g}" x2="760" y2="{g}"/>'
    )


TITLES = {
    "tiny-big-star": dict(en="Big Star", fa="ستاره بزرگ", fr="Grande étoile", es="Estrella grande"),
    "tiny-big-heart": dict(en="Big Heart", fa="قلب بزرگ", fr="Grand cœur", es="Corazón grande"),
    "tiny-big-balloon": dict(en="Big Balloon", fa="بادکنک بزرگ", fr="Grand ballon", es="Globo grande"),
    "tiny-big-sun": dict(en="Big Sun", fa="خورشید بزرگ", fr="Grand soleil", es="Sol grande"),
    "tiny-big-flower": dict(en="Big Flower", fa="گل بزرگ", fr="Grande fleur", es="Flor grande"),
    "tiny-big-cupcake": dict(en="Big Cupcake", fa="کاپ‌کیک بزرگ", fr="Gros cupcake", es="Cupcake grande"),
    "tiny-big-cloud": dict(en="Big Cloud", fa="ابر بزرگ", fr="Gros nuage", es="Nube grande"),
    "tiny-sophia-smile": dict(en="Sophia Smile", fa="لبخند سوفیا", fr="Sourire de Sophia", es="Sonrisa de Sophia"),
    "tiny-vania-smile": dict(en="Vania Smile", fa="لبخند وانیا", fr="Sourire de Vania", es="Sonrisa de Vania"),
    "tiny-big-house": dict(en="Big House", fa="خانه بزرگ", fr="Grande maison", es="Casa grande"),
    "tiny-big-apple": dict(en="Big Apple", fa="سیب بزرگ", fr="Grande pomme", es="Manzana grande"),
    "tiny-big-bunny": dict(en="Big Bunny", fa="خرگوش بزرگ", fr="Gros lapin", es="Conejito grande"),
    "tiny-two-stars": dict(en="Two Stars", fa="دو ستاره", fr="Deux étoiles", es="Dos estrellas"),
    "tiny-heart-star": dict(en="Heart and Star", fa="قلب و ستاره", fr="Cœur et étoile", es="Corazón y estrella"),
    "tiny-big-moon": dict(en="Big Moon", fa="ماه بزرگ", fr="Grande lune", es="Luna grande"),
    "tiny-simple-gift": dict(en="A Gift", fa="یک هدیه", fr="Un cadeau", es="Un regalo"),
    "tiny-big-tree": dict(en="Big Tree", fa="درخت بزرگ", fr="Grand arbre", es="Árbol grande"),
    "tiny-simple-boat": dict(en="A Boat", fa="یک قایق", fr="Un bateau", es="Un barco"),
    "tiny-big-fish": dict(en="A Fish", fa="یک ماهی", fr="Un poisson", es="Un pez"),
    "tiny-lolly": dict(en="A Lolly", fa="آبنبات چوبی", fr="Une sucette", es="Una paleta"),
    "tiny-big-cat": dict(en="A Cat", fa="یک گربه", fr="Un chat", es="Un gato"),
    "tiny-big-duck": dict(en="A Duck", fa="یک اردک", fr="Un canard", es="Un pato"),
    "tiny-big-car": dict(en="A Car", fa="یک ماشین", fr="Une voiture", es="Un coche"),
    "tiny-big-bird": dict(en="A Bird", fa="یک پرنده", fr="Un oiseau", es="Un pájaro"),
    "tiny-big-mushroom": dict(en="A Mushroom", fa="یک قارچ", fr="Un champignon", es="Una seta"),
    "tiny-watermelon": dict(en="Watermelon", fa="هندوانه", fr="Pastèque", es="Sandía"),
    "tiny-ladybug": dict(en="Ladybug", fa="کفشدوزک", fr="Coccinelle", es="Mariquita"),
    "tiny-big-ball": dict(en="A Ball", fa="یک توپ", fr="Un ballon", es="Una pelota"),
    "tiny-simple-kite": dict(en="A Kite", fa="یک بادبادک", fr="Un cerf-volant", es="Una cometa"),
    "house-sun": dict(en="House and Sun", fa="خانه و خورشید", fr="Maison et soleil", es="Casa y sol"),
    "butterfly": dict(en="Butterfly", fa="پروانه", fr="Papillon", es="Mariposa"),
    "little-sisters-hands": dict(en="Sisters Hold Hands", fa="خواهرها دست در دست", fr="Sœurs main dans la main", es="Hermanas de la mano"),
    "little-garden-flowers": dict(en="Garden Flowers", fa="گل‌های باغ", fr="Fleurs du jardin", es="Flores del jardín"),
    "little-park-swing": dict(en="Park Swing", fa="تاب پارک", fr="Balançoire", es="Columpio del parque"),
    "little-cupcake-stand": dict(en="Cupcake Stand", fa="غرفه کاپ‌کیک", fr="Stand de cupcakes", es="Puesto de cupcakes"),
    "little-star-sky": dict(en="Star Sky", fa="آسمان ستاره‌ای", fr="Ciel étoilé", es="Cielo de estrellas"),
    "little-play-room": dict(en="Play Room", fa="اتاق بازی", fr="Salle de jeux", es="Cuarto de juegos"),
    "little-kite-day": dict(en="Kite Day", fa="روز بادبادک", fr="Jour de cerf-volant", es="Día de cometas"),
    "little-boat-pond": dict(en="Boat Pond", fa="برکه قایق", fr="Étang et bateau", es="Estanque y barco"),
    "little-ice-cream": dict(en="Ice Cream", fa="بستنی", fr="Glace", es="Helado"),
    "little-paint-table": dict(en="Paint Table", fa="میز نقاشی", fr="Table de peinture", es="Mesa de pintura"),
    "little-story-nook": dict(en="Story Nook", fa="گوشه قصه", fr="Coin histoire", es="Rincón de cuentos"),
    "little-butterfly-garden": dict(en="Butterfly Garden", fa="باغ پروانه", fr="Jardin des papillons", es="Jardín de mariposas"),
    "little-number-train": dict(en="A Train", fa="یک قطار", fr="Un train", es="Un tren"),
    "little-simple-castle": dict(en="A Castle", fa="یک قلعه", fr="Un château", es="Un castillo"),
    "little-picnic": dict(en="Picnic", fa="پیک‌نیک", fr="Pique-nique", es="Picnic"),
    "little-camera-fun": dict(en="Camera Fun", fa="دوربین شاد", fr="Appareil photo", es="Cámara divertida"),
    "little-tea-party": dict(en="Tea Party", fa="مهمانی چای", fr="Goûter", es="Fiesta del té"),
    "little-sandbox": dict(en="Sandbox", fa="جعبه شنی", fr="Bac à sable", es="Arenero"),
    "little-music-time": dict(en="Music Time", fa="وقت موسیقی", fr="Musique", es="Hora de música"),
    "little-rainy-walk": dict(en="Rainy Walk", fa="پیاده‌روی بارانی", fr="Promenade sous la pluie", es="Paseo bajo la lluvia"),
    "little-lemonade": dict(en="Lemonade Stand", fa="غرفه لیموناد", fr="Stand de limonade", es="Puesto de limonada"),
    "little-farm": dict(en="The Farm", fa="مزرعه", fr="La ferme", es="La granja"),
    "little-pond-ducks": dict(en="Pond Ducks", fa="اردک‌های برکه", fr="Canards de l’étang", es="Patos del estanque"),
    "little-snowman": dict(en="Snowman", fa="آدم‌برفی", fr="Bonhomme de neige", es="Muñeco de nieve"),
    "little-bakery-window": dict(en="Bakery Window", fa="ویترین نانوایی", fr="Vitrine de boulangerie", es="Escaparate de panadería"),
    "little-park-path": dict(en="Park Path", fa="مسیر پارک", fr="Chemin du parc", es="Camino del parque"),
    "garden": dict(en="Sunny Garden", fa="باغ آفتابی", fr="Jardin ensoleillé", es="Jardín soleado"),
    "big-sisters-stage": dict(en="Sisters On Stage", fa="خواهرها روی صحنه", fr="Sœurs sur scène", es="Hermanas en el escenario"),
    "big-magic-garden": dict(en="Magic Garden", fa="باغ جادویی", fr="Jardin magique", es="Jardín mágico"),
    "big-kitchen-baking": dict(en="Kitchen Baking", fa="آشپزی در آشپزخانه", fr="Cuisine gourmande", es="Cocina dulce"),
    "big-art-studio": dict(en="Art Studio", fa="اتاق هنر", fr="Atelier d’art", es="Estudio de arte"),
    "big-playground-full": dict(en="Playground", fa="زمین بازی", fr="Aire de jeux", es="Parque de juegos"),
    "big-cozy-bedroom": dict(en="Cozy Bedroom", fa="اتاق خواب دنج", fr="Chambre douillette", es="Dormitorio acogedor"),
    "big-park-festival": dict(en="Park Festival", fa="جشن پارک", fr="Fête au parc", es="Fiesta en el parque"),
    "big-library-nook": dict(en="Library Nook", fa="گوشه کتابخانه", fr="Coin bibliothèque", es="Rincón de biblioteca"),
    "big-treehouse": dict(en="Treehouse", fa="خانه درختی", fr="Cabane dans l’arbre", es="Casa del árbol"),
    "big-beach-day": dict(en="Beach Day", fa="روز ساحل", fr="Jour de plage", es="Día de playa"),
    "big-city-walk": dict(en="City Walk", fa="پیاده‌روی شهر", fr="Promenade en ville", es="Paseo por la ciudad"),
    "big-birthday-party": dict(en="Birthday Party", fa="جشن تولد", fr="Fête d’anniversaire", es="Fiesta de cumpleaños"),
    "big-camp-stars": dict(en="Camp Stars", fa="ستاره‌های کمپ", fr="Camp sous les étoiles", es="Campamento estrella"),
    "big-music-room": dict(en="Music Room", fa="اتاق موسیقی", fr="Salle de musique", es="Sala de música"),
    "big-snow-play": dict(en="Snow Play", fa="بازی برفی", fr="Jeux de neige", es="Juegos de nieve"),
    "big-theater-show": dict(en="Theater Show", fa="نمایش تئاتر", fr="Spectacle", es="Función de teatro"),
    "big-market-day": dict(en="Market Day", fa="روز بازار", fr="Jour de marché", es="Día de mercado"),
    "big-school-garden": dict(en="School Garden", fa="باغ مدرسه", fr="Jardin de l’école", es="Jardín de la escuela"),
    "big-family-dinner": dict(en="Family Dinner", fa="شام خانوادگی", fr="Dîner en famille", es="Cena en familia"),
    "big-star-observatory": dict(en="Star Night", fa="شب ستاره‌ای", fr="Nuit étoilée", es="Noche de estrellas"),
    "big-classroom": dict(en="Classroom", fa="کلاس درس", fr="Salle de classe", es="Aula"),
    "big-bakery-shop": dict(en="Bakery Shop", fa="نانوایی", fr="Boulangerie", es="Panadería"),
    "big-greenhouse": dict(en="Greenhouse", fa="گلخانه", fr="Serre", es="Invernadero"),
    "big-science-desk": dict(en="Science Desk", fa="میز علوم", fr="Table des sciences", es="Mesa de ciencias"),
    "big-city-park": dict(en="City Park", fa="پارک شهر", fr="Parc de la ville", es="Parque de la ciudad"),
    "big-rainy-window": dict(en="Rainy Window", fa="پنجره بارانی", fr="Fenêtre sous la pluie", es="Ventana lluviosa"),
    "kitchen": dict(en="Busy Kitchen", fa="آشپزخانه شلوغ", fr="Cuisine animée", es="Cocina animada"),
}

tiny = [
    ("tiny-big-star", scene_star),
    ("tiny-big-heart", scene_heart),
    ("tiny-big-balloon", scene_balloon),
    ("tiny-big-sun", scene_sun),
    ("tiny-big-flower", scene_flower),
    ("tiny-big-cupcake", scene_cupcake),
    ("tiny-big-cloud", scene_cloud),
    ("tiny-sophia-smile", scene_sophia),
    ("tiny-vania-smile", scene_vania),
    ("tiny-big-house", scene_house),
    ("tiny-big-apple", scene_apple),
    ("tiny-big-bunny", scene_bunny),
    ("tiny-two-stars", scene_two_stars),
    ("tiny-heart-star", scene_heart_star),
    ("tiny-big-moon", scene_moon),
    ("tiny-simple-gift", scene_gift),
    ("tiny-big-tree", scene_tree),
    ("tiny-simple-boat", scene_boat),
    ("tiny-big-fish", scene_fish),
    ("tiny-lolly", scene_lolly),
    ("tiny-big-cat", scene_cat),
    ("tiny-big-duck", scene_duck),
    ("tiny-big-car", scene_car),
    ("tiny-big-bird", scene_bird),
    ("tiny-big-mushroom", scene_mushroom),
    ("tiny-watermelon", scene_watermelon),
    ("tiny-ladybug", scene_ladybug),
    ("tiny-big-ball", scene_ball),
    ("tiny-simple-kite", scene_kite_simple),
]

little = [
    ("little-sisters-hands", scene_sisters_hands),
    ("little-garden-flowers", scene_garden_flowers),
    ("little-park-swing", scene_park_swing),
    ("little-cupcake-stand", scene_cupcake_stand),
    ("little-star-sky", scene_star_sky),
    ("little-play-room", scene_play_room),
    ("little-kite-day", scene_kite_day),
    ("little-boat-pond", scene_boat_pond),
    ("little-ice-cream", scene_ice_cream),
    ("little-paint-table", scene_paint_table),
    ("little-story-nook", scene_story_nook),
    ("little-butterfly-garden", scene_butterfly_garden),
    ("little-number-train", scene_train),
    ("little-simple-castle", scene_castle),
    ("little-picnic", scene_picnic),
    ("little-camera-fun", scene_camera_fun),
    ("little-tea-party", scene_tea_party),
    ("little-sandbox", scene_sandbox),
    ("little-music-time", scene_music_time),
    ("little-rainy-walk", scene_rainy_walk),
    ("little-lemonade", scene_lemonade),
    ("little-farm", scene_farm),
    ("little-pond-ducks", scene_pond_ducks),
    ("little-snowman", scene_snowman),
    ("little-bakery-window", scene_bakery_window),
    ("little-park-path", scene_park_path),
]

big = [
    ("big-sisters-stage", scene_sisters_stage),
    ("big-magic-garden", scene_magic_garden),
    ("big-kitchen-baking", scene_kitchen_baking),
    ("big-art-studio", scene_art_studio),
    ("big-playground-full", scene_playground_full),
    ("big-cozy-bedroom", scene_cozy_bedroom),
    ("big-park-festival", scene_park_festival),
    ("big-library-nook", scene_library_nook),
    ("big-treehouse", scene_treehouse),
    ("big-beach-day", scene_beach_day),
    ("big-city-walk", scene_city_walk),
    ("big-birthday-party", scene_birthday_party),
    ("big-camp-stars", scene_camp_stars),
    ("big-music-room", scene_music_room),
    ("big-snow-play", scene_snow_play),
    ("big-theater-show", scene_theater_show),
    ("big-market-day", scene_market_day),
    ("big-school-garden", scene_school_garden),
    ("big-family-dinner", scene_family_dinner),
    ("big-star-observatory", scene_star_observatory),
    ("big-classroom", scene_classroom),
    ("big-bakery-shop", scene_bakery_shop),
    ("big-greenhouse", scene_greenhouse),
    ("big-science-desk", scene_science_desk),
    ("big-city-park", scene_city_park),
    ("big-rainy-window", scene_rainy_window),
]


def ts_titles(tid):
    t = TITLES[tid]
    return "{ en: %s, fa: %s, fr: %s, es: %s }" % (
        json.dumps(t["en"], ensure_ascii=False),
        json.dumps(t["fa"], ensure_ascii=False),
        json.dumps(t["fr"], ensure_ascii=False),
        json.dumps(t["es"], ensure_ascii=False),
    )


catalog_rows = []

# Featured PNGs first in each band
pngs = [
    ("house-sun", "/coloring/ages/3-5/house-sun.png", "3-5", "png"),
    ("butterfly", "/coloring/ages/3-5/butterfly.png", "3-5", "png"),
    ("garden", "/coloring/ages/5-7/garden.png", "5-7", "png"),
    ("kitchen", "/coloring/ages/7-10/kitchen.png", "7-10", "png"),
]

png_by_age = {"3-5": [], "5-7": [], "7-10": []}
for pid, file, age, kind in pngs:
    png_by_age[age].append((pid, file, kind))


def emit_row(pid, file, age, kind):
    catalog_rows.append(
        '  { id: %s, file: %s, age: %s, kind: %s, titles: %s }'
        % (json.dumps(pid), json.dumps(file), json.dumps(age), json.dumps(kind), ts_titles(pid))
    )


for pid, file, kind in png_by_age["3-5"]:
    emit_row(pid, file, "3-5", kind)
for pid, fn in tiny:
    (out / f"{pid}.svg").write_text(wrap(TITLES[pid]["en"], 14, fn()), encoding="utf-8")
    emit_row(pid, f"/coloring/{pid}.svg", "3-5", "svg")

for pid, file, kind in png_by_age["5-7"]:
    emit_row(pid, file, "5-7", kind)
for pid, fn in little:
    (out / f"{pid}.svg").write_text(wrap(TITLES[pid]["en"], 9, fn()), encoding="utf-8")
    emit_row(pid, f"/coloring/{pid}.svg", "5-7", "svg")

for pid, file, kind in png_by_age["7-10"]:
    emit_row(pid, file, "7-10", kind)
for pid, fn in big:
    (out / f"{pid}.svg").write_text(wrap(TITLES[pid]["en"], 6, fn()), encoding="utf-8")
    emit_row(pid, f"/coloring/{pid}.svg", "7-10", "svg")

ts = '''import type { AgeBand } from "@/lib/age";
import type { Locale } from "@/lib/i18n";

export type ColoringKind = "svg" | "png";

export type ColoringPage = {
  id: string;
  file: string;
  age: AgeBand;
  kind: ColoringKind;
  titles: Record<Locale, string>;
};

export const coloringCatalog: ColoringPage[] = [
%s
];

export function coloringForAge(age: AgeBand) {
  return coloringCatalog.filter((page) => page.age === age);
}

export function coloringById(id: string) {
  return coloringCatalog.find((page) => page.id === id);
}
''' % ",\\n".join(catalog_rows)

# fix the join - I escaped wrong
ts = '''import type { AgeBand } from "@/lib/age";
import type { Locale } from "@/lib/i18n";

export type ColoringKind = "svg" | "png";

export type ColoringPage = {
  id: string;
  file: string;
  age: AgeBand;
  kind: ColoringKind;
  titles: Record<Locale, string>;
};

export const coloringCatalog: ColoringPage[] = [
''' + ",\n".join(catalog_rows) + '''
];

export function coloringForAge(age: AgeBand) {
  return coloringCatalog.filter((page) => page.age === age);
}

export function coloringById(id: string) {
  return coloringCatalog.find((page) => page.id === id);
}
'''

(root / "src/lib/coloring/catalog.ts").write_text(ts, encoding="utf-8")

# Remove leftover SVGs that are no longer generated
keep = {f"{pid}.svg" for pid, _ in tiny + little + big}
for path in out.glob("*.svg"):
    if path.name not in keep:
        path.unlink()
        print("removed", path.name)

print("generated", len(tiny), "tiny,", len(little), "little,", len(big), "big, plus", len(pngs), "pngs")
print("catalog", len(catalog_rows))
