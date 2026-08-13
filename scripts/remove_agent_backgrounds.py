from multiprocessing import Pool, cpu_count
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter


SKIP = {"agents-banner.png", "agents-login-banner.png"}


def remove_connected_light_background(path_string: str) -> str:
    path = Path(path_string)
    source = Image.open(path).convert("RGB")
    pixels = np.asarray(source).astype(np.float32)
    minimum = pixels.min(axis=2)
    chroma = pixels.max(axis=2) - minimum

    candidate = (minimum > 175) & (chroma < 85)
    flood = Image.fromarray(
        np.where(candidate, 0, 255).astype(np.uint8).copy(), "L"
    ).copy()
    ImageDraw.floodfill(flood, (0, 0), 128)
    connected_background = np.asarray(flood) == 128

    whiteness = np.clip((minimum - 175) / 75, 0, 1)
    neutrality = np.clip(1 - chroma / 85, 0, 1)
    alpha = np.where(
        connected_background, 255 * (1 - whiteness * neutrality), 255
    ).astype(np.uint8)
    alpha = np.asarray(Image.fromarray(alpha, "L").filter(ImageFilter.MinFilter(3)))

    rgba = np.dstack([pixels.astype(np.uint8), alpha])
    Image.fromarray(rgba, "RGBA").save(path, compress_level=4)
    return path.name


if __name__ == "__main__":
    paths = [
        str(path)
        for path in Path("public/agents").glob("*.png")
        if path.name not in SKIP
    ]
    with Pool(min(8, cpu_count())) as pool:
        converted = pool.map(remove_connected_light_background, paths)
    print(f"Converted {len(converted)} agent images")
