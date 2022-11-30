import yaml
import argparse
import webcolors
import colorsys
import jinja2 as j2
from playwright.sync_api import sync_playwright
from os.path import abspath
from pathlib import Path
from http.server import HTTPServer, SimpleHTTPRequestHandler
from multiprocessing import Process
from io import BytesIO
from PIL import Image
from base64 import b64decode
from time import sleep

def build_stickers(args, format='png', extension='png', quality=100):
  with open(args.config, 'r') as fp:
    config = yaml.safe_load(fp)
    stickers = config['stickers']
    icons = config['icons']

  for icon in icons:
    stickers.append({
      'name': f'icon-{ icon["name"] }',
      'icon': icon['code'],
      'file': 'circle.js.j2'
    })

  color_array = generate_colors(args.color)

  for i in range(len(stickers)):
    stickers[i]['color'] = color_array

    try: 
      stickers[i]['aspect_ratio']
    except KeyError:
      stickers[i]['aspect_ratio'] = '1/1'

  env = j2.Environment(
    loader=j2.FileSystemLoader('./src/templates')
  )

  pages = [env.get_template('stickers.html.j2').render(stickers=stickers)]

  with open(args.outfile / 'index.html', 'w') as fp:
    fp.write(env.get_template('full_page.html.j2').render(pages=pages))

  with open(args.outfile / 'stickers.js', 'w') as fp:
    fp.write(env.get_template('stickers.js.j2').render(stickers=stickers))

  generate_pngs(args.outfile / 'index.html', args.outfile / 'stickers.js', args.outfile, args, format=format, extension=extension, quality=quality)

def generate_colors(hex_value):
  colors = [hex_value]

  rgb = tuple(x / 255 for x in [*webcolors.hex_to_rgb(hex_value)])
  hls = colorsys.rgb_to_hls(*rgb)
  light_step = min((1 - hls[1]) / 5, hls[1] / 5)

  # Lighten colors
  temp_color = list(hls)
  for i in range(1, 5):
     temp_color[1] += light_step
     new_rgb = [int(255 * x) for x in colorsys.hls_to_rgb(*temp_color)]
     colors.insert(0, webcolors.rgb_to_hex(new_rgb))

  # Darken colors
  temp_color = list(hls)
  for i in range(1, 5):
     temp_color[1] -= light_step
     new_rgb = [int(255 * x) for x in colorsys.hls_to_rgb(*temp_color)]
     colors.append(webcolors.rgb_to_hex(new_rgb))

  return colors

def generate_pngs(html_file, js_file, out_directory, args, format='png', extension='png', quality=100):
  def setup_http_server():
    class Handler(SimpleHTTPRequestHandler):
      def __init__(self, *args, **kwargs):
          super().__init__(*args, directory=out_directory, **kwargs)
    httpd = HTTPServer(('', 8097), Handler)
    httpd.serve_forever()

  server_process = Process(target=setup_http_server)
  server_process.start()

  with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto('http://127.0.0.1:8097')
    page.add_script_tag(path=abspath(js_file))
    sleep(2)
    images_b64 = page.locator('canvas').evaluate_all("""elements => {
        let images = [];
        for (let i = 0; i < elements.length; i++) {
          images.push({id: elements[i].id, img: elements[i].toDataURL()});
        }
        return images;
      }""")
    browser.close()

  server_process.terminate()

  for image_b64 in images_b64:
    data = image_b64['img'].replace('data:image/png;base64,', '')
    id = image_b64['id']

    img = Image.open(BytesIO(b64decode(data)))
    img = img.crop(img.getbbox())
    img.save(Path(args.outfile, f'{id}.{extension}'), f'{format}', quality=quality)

if __name__ == "__main__":
  parser = argparse.ArgumentParser(prog="Functional Sticker Generator",
                                   description="Generates PNGs of functional stickers for use in digital planning.")

  parser.add_argument('-c', '--color', type=str, required=True, help='Hex code for desired color.')
  parser.add_argument('-f', '--font', type=str, help='Google Font name', default='Playfair Display')
  parser.add_argument('--config', type=str, default='./src/sticker_config.yml', help='YAML sticker config file.')
  parser.add_argument('--outfile', type=str, default='build/stickers', help='Directory to save stickers to.')

  args = parser.parse_args()

  build_stickers(args)
