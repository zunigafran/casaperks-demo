#!/bin/bash
npm create vite@latest frontend -- --template react-ts --yes 2>/dev/null || true
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
