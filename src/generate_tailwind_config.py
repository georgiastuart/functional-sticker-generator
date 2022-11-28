import webcolors
import colorsys
from copy import deepcopy
import argparse
import jinja2 as j2

def generate_tailwind_config(args):
  colors = []
  for color in args.color[0]:
    colors.append(generate_tailwind_colors(color))

  env = j2.Environment(
    loader=j2.FileSystemLoader('./src/templates')
  )

  return env.get_template('tailwind.config.js.j2').render(
    colors=colors, 
    font=args.font
  )
  
def generate_input_css(args):
  env = j2.Environment(
    loader=j2.FileSystemLoader('./src/templates')
  )

  return env.get_template('input.css.j2').render(
    font=args.font
  )

def generate_tailwind_colors(hex_value):
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

# Modified from https://stackoverflow.com/a/69215990
class ColorAppend(argparse._AppendAction):
  def __call__(self, parser, namespace, values, option_string=None):
    if not (1 <= len(values) <= 5):
      raise argparse.ArgumentError(self, f"{ option_string } takes 1 to 5 values, { len(values) } given")
    super().__call__(parser, namespace, values, option_string)

if __name__ == "__main__":
  parser = argparse.ArgumentParser(prog="Functional Sticker Generator",
                                   description="Generates PNGs of functional stickers for use in digital planning.")

  parser.add_argument('-c', '--color', nargs='+', action=ColorAppend, default=[], type=str,
                      help='Hex codes for desired color scheme. May be used up to 5 times.')
  parser.add_argument('-f', '--font', type=str, help='Google Font name', default='Playfair Display')

  args = parser.parse_args()

  with open('build/tailwind.config.js', 'w') as fp:
    fp.write(generate_tailwind_config(args))

  with open('build/input.css', 'w') as fp:
    fp.write(generate_input_css(args))
