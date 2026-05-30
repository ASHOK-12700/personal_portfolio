Place your final resume PDF in this folder and name it `resume.pdf`.

Recommended quick steps (PowerShell):

1) Copy your Word file into the project public folder:

```powershell
Copy-Item "C:\Users\ASHOK\Downloads\Professional Modern CV Resume.docx" -Destination ".\public\Professional Modern CV Resume.docx"
```

2a) Convert to PDF using LibreOffice (recommended if installed):

```powershell
# from project root
soffice --headless --convert-to pdf ".\public\Professional Modern CV Resume.docx" --outdir ".\public"
Rename-Item ".\public\Professional Modern CV Resume.pdf" "resume.pdf"
```

2b) Or convert using Microsoft Word COM (Windows + Word installed):

```powershell
$word = New-Object -ComObject Word.Application
$word.Visible = $false
$doc = $word.Documents.Open((Resolve-Path ".\public\Professional Modern CV Resume.docx").Path)
$doc.SaveAs((Resolve-Path ".\public\resume.pdf").Path, 17)
$doc.Close()
$word.Quit()
```

3) After placing `resume.pdf` in `public/`, run the dev server and open the site. The resume download button already points to `/resume.pdf`.

Notes:
- For Vite, files in `public/` are served at the root path (e.g. `/resume.pdf`).
- If you want, paste the path here and I can provide the exact copy command for you to run.
