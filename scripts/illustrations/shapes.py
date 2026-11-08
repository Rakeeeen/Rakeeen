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

ICONS = {
    'mascot': {'still': mascot_icon, 'parts': {}},
    'heart': {'still': heart_icon, 'parts': {}},
    'sparkle': {'still': sparkle_icon, 'parts': {}},
    'bulb': {'still': bulb_icon, 'parts': {}},
    'pencil': {'still': pencil_icon, 'parts': {}},
    'sun': {'still': sun_icon, 'parts': {}},
}

# Three redraws per icon, flicked through four times a second: the "line boil" of a hand-drawn film.
BOIL_SEEDS = (5, 9, 13)
