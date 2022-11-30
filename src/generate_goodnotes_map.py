import zipfile
from pathlib import Path, PurePath
from os import mkdir
from generator import build_stickers
from PIL import Image, UnidentifiedImageError
import numpy as np


def compare_stickers(sticker_path, template_path):
  stickers = list(sticker_path.glob('*.jp2'))
  print(len(stickers))
  templates_glob = list((template_path / 'attachments').glob('*'))
  templates = []

  for template in templates_glob:
    try:
        j2_img = Image.open(template)
        j2_img = j2_img.convert('L')
    except UnidentifiedImageError:
      # It's probably a pdf we don't want to do anything with
      print(f'Can\'t open {template.name}')
      pass
    templates.append({'img': j2_img, 'name': template.name})

  print(len(templates))
  matches = 0
  for sticker in stickers: 
    original_img = Image.open(sticker)
    original_img = original_img.convert('L')
    for template in templates:
      match = False
      try:
        match = np.allclose(np.array(original_img.getdata()), np.array(template['img'].getdata()))
        # match = original_img.getdata() == template['img'].getdata()
      except ValueError:
        # Wrong shape probably
        pass
      if match:
        matches += 1
        print(f'Found match {matches}: {sticker.name} {template["name"]}')
        break
class Args:
  def __init__(self, color, config, outfile):
    self.color = color
    self.config = config
    self.outfile = outfile

if __name__ == "__main__":
  with zipfile.ZipFile(Path(Path(__file__).parent.resolve(), 'assets/sticker_template.goodnotes'), 'r') as zip_ref:
    d = Path(__file__).parent.resolve()
    sticker_path = d / 'assets' / 'stickers'
    template_path = d / 'assets' / 'sticker_template'

    try:
      mkdir(template_path)
    except FileExistsError:
      pass
    zip_ref.extractall(template_path)

    try: 
      mkdir(sticker_path)
    except FileExistsError:
      pass

    args = Args(
      '#000000', 
      d / 'sticker_config.yml',
      sticker_path
    )

    build_stickers(args, format='jpeg2000', quality=92, extension='jp2')
    compare_stickers(sticker_path, template_path)
