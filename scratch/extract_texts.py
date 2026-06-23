import os
import zipfile
import xml.etree.ElementTree as ET

def extract_text_from_docx(docx_path):
    if not os.path.exists(docx_path):
        return f"{docx_path} does not exist."
    try:
        texts = []
        with zipfile.ZipFile(docx_path) as z:
            xml_content = z.read('word/document.xml')
            root = ET.fromstring(xml_content)
            # Find all text elements
            ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
            for el in root.iter('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}t'):
                if el.text:
                    texts.append(el.text)
        return "\n".join(texts)
    except Exception as e:
        return f"Error reading docx: {e}"

def extract_text_from_pptx(pptx_path):
    if not os.path.exists(pptx_path):
        return f"{pptx_path} does not exist."
    try:
        texts = []
        with zipfile.ZipFile(pptx_path) as z:
            # Slides are in ppt/slides/slide1.xml, slide2.xml, etc.
            slide_files = [f for f in z.namelist() if f.startswith('ppt/slides/slide') and f.endswith('.xml')]
            slide_files.sort(key=lambda x: int(''.join(c for c in x if c.isdigit())))
            
            for slide_file in slide_files:
                xml_content = z.read(slide_file)
                root = ET.fromstring(xml_content)
                slide_texts = []
                for el in root.iter('{http://schemas.openxmlformats.org/drawingml/2006/main}t'):
                    if el.text:
                        slide_texts.append(el.text)
                if slide_texts:
                    texts.append(f"--- {slide_file} ---")
                    texts.append("\n".join(slide_texts))
        return "\n".join(texts)
    except Exception as e:
        return f"Error reading pptx: {e}"

print("=== DOCX TEXT ===")
docx_text = extract_text_from_docx("c:\\Share\\DASAN\\홈페이지_제작_일정_보고서.docx")
print(docx_text[:1000])

print("\n=== PPTX TEXT (First 2000 chars) ===")
pptx_text = extract_text_from_pptx("c:\\Share\\DASAN\\AI 기반 홈페이지 제작.pptx")
print(pptx_text[:2000])

# Let's save all extracted text to scratch files for easy reading/searching
with open("c:\\Share\\DASAN\\scratch\\docx_extracted.txt", "w", encoding="utf-8") as f:
    f.write(docx_text)
    
with open("c:\\Share\\DASAN\\scratch\\pptx_extracted.txt", "w", encoding="utf-8") as f:
    f.write(pptx_text)
