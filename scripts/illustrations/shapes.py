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

ICONS = {
    'mascot': {'still': mascot_icon, 'parts': {}},
}

# Three redraws per icon, flicked through four times a second: the "line boil" of a hand-drawn film.
BOIL_SEEDS = (5, 9, 13)
