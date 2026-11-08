"""The portfolio's hand-drawn illustrations, drawn the way Haus's are: a thick ink line with a
hand's tremor over a flat paper shape set a little off it. Run build.py after changing anything
here. Coordinates are on a 1000x1000 canvas."""
import math
from draw import Pen

def disc(c, r, n=10, sq=1):
    return [(c[0] + r * math.cos(i / n * 6.283), c[1] + r * sq * math.sin(i / n * 6.283)) for i in range(n)]

ICON_W = 74

def mascot_icon(seed):
    """The face: a round head, one open eye, one winking, a small smile."""
    p = Pen(seed, w=ICON_W, wob=1.6)
    p.blob(disc((530, 530), 400, 12), rough=12, corner=.32)
    p.circle((500, 500), 418, 418)
    p.circle((348, 424), 66, 66)
    p.line([(576, 424), (652, 372), (728, 424)])
    p.line([(310, 652), (500, 718), (690, 652)])
    return p

def heart_icon(seed):
    p = Pen(seed, w=ICON_W, wob=1.6)
    p.blob(disc((530, 540), 360, 12), rough=12, corner=.32)
    p.line([(500, 840), (250, 590), (180, 410), (250, 250), (390, 220), (500, 330), (610, 220), (750, 250), (820, 410), (750, 590)], closed=True)
    return p

def sparkle_icon(seed):
    p = Pen(seed, w=ICON_W, wob=1.6)
    p.blob(disc((530, 530), 330, 10), rough=12, corner=.32)
    p.line([(500, 120), (548, 452), (880, 500), (548, 548), (500, 880), (452, 548), (120, 500), (452, 452)], closed=True)
    return p

def bulb_icon(seed):
    p = Pen(seed, w=ICON_W, wob=1.6)
    p.blob(disc((530, 420), 270, 12), rough=12, corner=.32)
    p.circle((500, 400), 270, 290)
    p.line([(400, 730), (600, 730)])
    p.line([(420, 820), (580, 820)])
    p.line([(450, 900), (550, 900)])
    p.line([(420, 520), (500, 430), (580, 520)])
    return p

def pencil_icon(seed):
    p = Pen(seed, w=ICON_W, wob=1.6)
    p.blob([(250, 650), (710, 180), (830, 300), (370, 770)], rough=10, corner=.1)
    p.line([(150, 870), (240, 640), (710, 170), (840, 300), (370, 780)], closed=True)
    p.line([(630, 250), (760, 380)])
    return p

def sun_icon(seed):
    p = Pen(seed, w=ICON_W, wob=1.6)
    p.blob(disc((530, 530), 190, 10), rough=10, corner=.32)
    p.circle((500, 500), 200, 200)
    for k in range(8):
        a = k * math.pi / 4
        p.line([(500 + 330 * math.cos(a), 500 + 330 * math.sin(a)), (500 + 440 * math.cos(a), 500 + 440 * math.sin(a))])
    return p

# ── One icon per phase of "How I build" ────────────────────────────────────────────────

def magnifier_icon(seed):
    p = Pen(seed, w=ICON_W, wob=1.6)
    p.blob(disc((470, 450), 290, 12), rough=12, corner=.32)
    p.circle((430, 420), 290, 290)
    p.line([(645, 640), (860, 860)])
    return p

def flow_icon(seed):
    p = Pen(seed, w=ICON_W, wob=1.6)
    p.blob([(180, 640), (440, 640), (440, 860), (180, 860)], rough=8, corner=.15)
    p.blob([(560, 640), (840, 640), (840, 860), (560, 860)], rough=8, corner=.15)
    p.circle((500, 230), 130, 130)
    p.line([(180, 640), (420, 640), (420, 840), (180, 840)], closed=True)
    p.line([(580, 640), (820, 640), (820, 840), (580, 840)], closed=True)
    p.line([(500, 360), (500, 480), (300, 480), (300, 640)])
    p.line([(500, 480), (700, 480), (700, 640)])
    return p

def layout_icon(seed):
    p = Pen(seed, w=ICON_W, wob=1.6)
    p.blob([(160, 200), (880, 200), (880, 840), (160, 840)], rough=9, corner=.1)
    p.line([(130, 170), (850, 170), (850, 810), (130, 810)], closed=True)
    p.line([(130, 360), (850, 360)])
    p.line([(390, 360), (390, 810)])
    return p

def code_icon(seed):
    p = Pen(seed, w=ICON_W, wob=1.6)
    p.blob(disc((520, 520), 330, 10), rough=12, corner=.32)
    p.line([(380, 280), (150, 500), (380, 720)])
    p.line([(620, 280), (850, 500), (620, 720)])
    p.line([(570, 190), (430, 810)])
    return p

def check_icon(seed):
    p = Pen(seed, w=ICON_W, wob=1.6)
    p.blob(disc((530, 530), 370, 12), rough=12, corner=.32)
    p.circle((500, 500), 380, 380)
    p.line([(300, 520), (450, 670), (720, 340)])
    return p

def rocket_icon(seed):
    p = Pen(seed, w=ICON_W, wob=1.6)
    p.blob([(500, 130), (680, 330), (680, 650), (320, 650), (320, 330)], rough=9, corner=.2)
    p.line([(500, 90), (650, 280), (650, 620), (350, 620), (350, 280)], closed=True)
    p.circle((500, 380), 70, 70)
    p.line([(350, 500), (210, 700), (350, 680)])
    p.line([(650, 500), (790, 700), (650, 680)])
    p.line([(440, 730), (500, 900), (560, 730)])
    return p

def compass_icon(seed):
    p = Pen(seed, w=ICON_W, wob=1.6)
    p.blob(disc((530, 530), 370, 12), rough=12, corner=.32)
    p.circle((500, 500), 380, 380)
    p.line([(640, 360), (560, 560), (360, 640), (440, 440)], closed=True)
    return p

ICONS = {
    'mascot': {'still': mascot_icon, 'parts': {}},
    'heart': {'still': heart_icon, 'parts': {}},
    'sparkle': {'still': sparkle_icon, 'parts': {}},
    'bulb': {'still': bulb_icon, 'parts': {}},
    'pencil': {'still': pencil_icon, 'parts': {}},
    'sun': {'still': sun_icon, 'parts': {}},
    'magnifier': {'still': magnifier_icon, 'parts': {}},
    'flow': {'still': flow_icon, 'parts': {}},
    'layout': {'still': layout_icon, 'parts': {}},
    'code': {'still': code_icon, 'parts': {}},
    'check': {'still': check_icon, 'parts': {}},
    'rocket': {'still': rocket_icon, 'parts': {}},
    'compass': {'still': compass_icon, 'parts': {}},
}

# Which generated file each icon lands in. Phase icons are used by one page only, so they sit in their
# own file and load with that page; the rest are used by the bar and the home page.
FILES = {
    'sketchIcons.data.ts': ['mascot', 'heart', 'sparkle', 'bulb', 'pencil', 'sun'],
    'phaseIcons.data.ts': ['magnifier', 'flow', 'layout', 'code', 'check', 'rocket', 'compass'],
}

# Three redraws per icon, flicked through four times a second: the "line boil" of a hand-drawn film.
BOIL_SEEDS = (5, 9, 13)
