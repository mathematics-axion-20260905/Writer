# Writer

This repository contains the standalone Writer project.

- `app/`, `components/`, `lib/`, `public/`: Next.js scientific writing UI
- `backend/`: Django API for `paper_builder`, publishing, and lab-result linking
- papers persist validated `scientific_object_references`; imported markdown is an editable publication projection, not the canonical computation payload
- `backend/laboratory/` is a legacy compatibility boundary and must not receive new solver functionality

Frontend start:

```bash
npm install
npm run dev
```

Optional frontend env:

```bash
npm install
cp .env.example .env.local
npm run dev
```

Backend start:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```
