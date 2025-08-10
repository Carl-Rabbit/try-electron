# try-electron

Verified with:
* Python 3.11
* Node.js v22

# Development

1. Prepare python env
```bash
python3 -m venv python_env
source python_env/bin/activate
pip install -r requirements.txt
```

1. Prepare electron & frontend env
```bash
npm install
cd frontend; npm install
```

1. Start the app
```bash
npm run dev
```

# Packaging

1. Pack
```bash
npm run build
```

