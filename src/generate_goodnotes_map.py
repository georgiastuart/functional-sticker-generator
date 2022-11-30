import zipfile
from pathlib import Path
from os import mkdir
from generator import build_stickers
from PIL import Image, UnidentifiedImageError
from subprocess import run
import re
import json


def compare_stickers(sticker_path, template_path):
  stickers = list(sticker_path.glob('*.png'))
  print(len(stickers))
  templates_glob = list((template_path / 'attachments').glob('*'))

  matches = 0
  match_map = {}
  for sticker in stickers: 
    run(['convert', sticker, f'JP2:{ sticker.with_suffix(".jp2") }'])
    # original_img = original_img.convert('LA')
  for template in templates_glob:
    local_match = []
    try:
      goodnotes_img = Image.open(template)
    except UnidentifiedImageError:
      # Probably a pdf file
      pass

    for sticker in stickers:
      original_img = Image.open(sticker.with_suffix(".jp2"))
      if original_img.size == goodnotes_img.size:
        p = run(['compare', '-metric', 'AE', '-fuzz', '3%', '-alpha', 'remove', '-background', 'white', sticker.with_suffix(".jp2"), template, '/dev/null'], capture_output=True, text=True)
        try:
          local_match.append(float(re.match(r"(?:\d*.?\d*)", p.stderr).group(0)))
        except AttributeError:
          local_match.append(float(p.stderr))
      else: 
        local_match.append(100000000000)
        
    print(min(local_match))
    if min(local_match) < 1000:
      matches += 1
      print(f'Found match {matches}: {stickers[local_match.index(min(local_match))].with_suffix("").name} {template.with_suffix("").name}')
      match_map[template.with_suffix('').name] = stickers[local_match.index(min(local_match))].with_suffix('').name
        
  with open('src/assets/goodnotes_map.json', 'w') as fp:
    json.dump(match_map, fp, indent=2)

class Args:
  def __init__(self, color, config, outfile):
    self.color = color
    self.config = config
    self.outfile = outfile

if __name__ == "__main__":
  d = Path(__file__).parent.parent
  sticker_path = d / 'build' / 'stickers'
  template_path = d / 'build' / 'goodnotes'

  with zipfile.ZipFile(Path(Path(__file__).parent.resolve(), 'assets/sticker_template.goodnotes'), 'r') as zip_ref:
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
    d / 'build'
  )

  build_stickers(args)
  compare_stickers(sticker_path, template_path)
