import os, struct
d = 'c:/Share/DASAN/public/extracted_media/ppt/media/'
for f in os.listdir(d):
    if f.endswith('.png'):
        try:
            with open(d+f, 'rb') as fp:
                data = fp.read(24)
                if len(data) >= 24 and data[:8] == b'\x89PNG\r\n\x1a\n':
                    w, h = struct.unpack('>II', data[16:24])
                    print(f"{f} : {w}x{h}")
        except Exception as e:
            pass
