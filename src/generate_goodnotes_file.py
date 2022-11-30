from generator import build_stickers
from os import mkdir, rename
from shutil import copyfile, copytree, make_archive, rmtree
from pathlib import Path
import json
import argparse
from subprocess import run
import zipfile

def mkdir_if_not_exists(path):
  try:
    mkdir(path)
  except FileExistsError: 
    pass

def pack_release(args):
  mkdir_if_not_exists('release')
  release_path = Path('release')
  mkdir_if_not_exists(release_path / 'png')
  mkdir_if_not_exists(release_path / 'png')
  
  build_path = Path(args.outfile)
  sticker_path = build_path / 'stickers'
  sticker_glob = sticker_path.glob('*.png')
  j2_glob = sticker_path.glob('*.jp2')

  try:
    rmtree(release_path / 'goodnotes')
  except FileNotFoundError:
    # Above path doesn't exist, do nothing
    pass 

  with zipfile.ZipFile(Path(Path(__file__).parent.resolve(), 'assets/sticker_template.goodnotes'), 'r') as zip_ref:
    try:
      mkdir(release_path / 'goodnotes')
    except FileExistsError:
      pass
    zip_ref.extractall(release_path / 'goodnotes')

  with open('src/assets/goodnotes_map.json', 'r') as fp:
    mapping = json.load(fp)

  # for j2_sticker in j2_glob:
  #   copyfile(j2_sticker, release_path / 'goodnotes/attachments' / mapping[j2_sticker.with_suffix('').name])

  for png_sticker in sticker_glob:
    copyfile(png_sticker, release_path / 'png' / png_sticker.name)

  for template in (release_path / 'goodnotes/attachments').glob('*'):
    try:
      run(['convert', (release_path / "png" / mapping[template.name]).with_suffix(".png"), f'JP2:{template}'])
    except KeyError:
      # Attachment with no match
      pass

  make_archive(release_path / f'stickers_{args.color.lstrip("#")}.goodnotes', 'zip', release_path / 'goodnotes')
  rename(release_path / f'stickers_{args.color.lstrip("#")}.goodnotes.zip', release_path / f'stickers_{args.color.lstrip("#")}.goodnotes')

if __name__ == '__main__':
  parser = argparse.ArgumentParser(prog="Functional Sticker Generator",
                                   description="Generates PNGs of functional stickers for use in digital planning.")

  parser.add_argument('-c', '--color', type=str, required=True, help='Hex code for desired color.')
  parser.add_argument('-f', '--font', type=str, help='Google Font name', default='Playfair Display')
  parser.add_argument('--config', type=str, default='src/assets/sticker_config.yml', help='YAML sticker config file.')
  parser.add_argument('--outfile', type=str, default='build', help='Directory to save stickers to.')

  args = parser.parse_args()

  build_stickers(args)
  pack_release(args)
