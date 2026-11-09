"""Gera o QR code do app (PNG e SVG).

Uso:
    pip install "qrcode[pil]"
    python tools/gerar_qr.py https://SEU-SITE.netlify.app

Saída: qr/qr-app.png (para telas e impressão rápida) e qr/qr-app.svg (para impressão em tamanho grande).
"""
import sys
from pathlib import Path

import qrcode
import qrcode.image.svg


def main():
    if len(sys.argv) != 2 or not sys.argv[1].startswith("https://"):
        sys.exit("Uso: python tools/gerar_qr.py https://SEU-SITE.netlify.app")
    url = sys.argv[1].strip()
    out = Path("qr")
    out.mkdir(exist_ok=True)

    # Correção de erro alta (H) e margem branca de 4 módulos (padrão do QR code).
    qr = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, box_size=16, border=4)
    qr.add_data(url)
    qr.make(fit=True)
    qr.make_image(fill_color="black", back_color="white").save(out / "qr-app.png")

    svg = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_H, border=4,
                        image_factory=qrcode.image.svg.SvgPathImage)
    svg.add_data(url)
    svg.make(fit=True)
    svg.make_image().save(str(out / "qr-app.svg"))
    print("QR code gerado para:", url)
    print("Arquivos:", out / "qr-app.png", "e", out / "qr-app.svg")
    print("Teste a leitura em um iPhone e em um Android antes de imprimir.")


if __name__ == "__main__":
    main()
